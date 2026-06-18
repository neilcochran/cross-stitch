import { z } from 'zod';
import { CrossStitchPattern, CrossStitchPatternJson } from './schema';
import type { IssueParams, IssueKind } from './schema';

/** A path to a location within a pattern: object keys and array indices. */
export type PatternPath = (string | number)[];

/** The location fields carried by every {@link PatternIssue}. */
interface IssueLocation {
    /** Path to the offending value within the pattern. */
    path: PatternPath;
    /** A human-readable description of the problem. */
    message: string;
}

/**
 * A validation problem found in a pattern, as a discriminated union on `kind`. The semantic
 * variants describe cross-stitch-specific rule violations and derive from {@link IssueParams}
 * (the single source of truth for those rules), each carrying structured data; the
 * `schema-violation` variant is the catch-all for structural and primitive failures, tagged with
 * a coarse owned `code`. Every variant also carries the offending `path` and a human-readable
 * `message`.
 */
export type PatternIssue =
    | (IssueParams & IssueLocation)
    | ({
          kind: 'schema-violation';
          code: 'invalid-type' | 'out-of-range' | 'invalid-format' | 'invalid-value';
      } & IssueLocation);

/** The result of validating a pattern: the typed data on success, or the collected issues on failure. */
export type PatternResult = { success: true; data: CrossStitchPattern } | { success: false; issues: PatternIssue[] };

/** The result of encoding a pattern: the JSON string on success, or the collected issues on failure. */
export type EncodeResult = { success: true; data: string } | { success: false; issues: PatternIssue[] };

function toPath(path: ReadonlyArray<PropertyKey>): PatternPath {
    return path.map((segment) => (typeof segment === 'symbol' ? segment.toString() : segment));
}

function schemaViolationCode(code: string): 'invalid-type' | 'out-of-range' | 'invalid-format' | 'invalid-value' {
    switch (code) {
        case 'invalid_type':
            return 'invalid-type';
        case 'too_big':
        case 'too_small':
        case 'not_multiple_of':
            return 'out-of-range';
        case 'invalid_format':
            return 'invalid-format';
        default:
            return 'invalid-value';
    }
}

/**
 * The semantic issue kinds as a runtime lookup. The `satisfies Record<IssueKind, true>` clause
 * makes this fail to compile unless it lists exactly the {@link IssueKind} members, keeping it in
 * step with {@link IssueParams}.
 */
const ISSUE_KINDS = {
    'duplicate-color-id': true,
    'duplicate-color-symbol': true,
    'unknown-color-reference': true,
    'unreachable-placement': true,
    'segment-empty': true,
    'back-stitch-too-long': true,
    'long-stitch-too-short': true
} as const satisfies Record<IssueKind, true>;

/** True when a custom Zod issue's `params` is one of our semantic {@link IssueParams}. */
function isIssueParams(params: unknown): params is IssueParams {
    return (
        typeof params === 'object' &&
        params !== null &&
        'kind' in params &&
        typeof params.kind === 'string' &&
        Object.prototype.hasOwnProperty.call(ISSUE_KINDS, params.kind)
    );
}

function toPatternIssue(issue: z.core.$ZodIssue): PatternIssue {
    const path = toPath(issue.path);
    const message = issue.message;
    if (issue.code === 'custom' && isIssueParams(issue.params)) {
        return { ...issue.params, path, message };
    }
    return { kind: 'schema-violation', code: schemaViolationCode(issue.code), path, message };
}

function toResult(
    parsed:
        | { success: true; data: CrossStitchPattern }
        | { success: false; error: { issues: ReadonlyArray<z.core.$ZodIssue> } }
): PatternResult {
    if (parsed.success) {
        return { success: true, data: parsed.data };
    }
    return { success: false, issues: parsed.error.issues.map(toPatternIssue) };
}

/**
 * Validate an in-memory value as a cross stitch pattern.
 *
 * @param value - The value to validate.
 * @returns The validated pattern, or the collected issues.
 */
export function parsePattern(value: unknown): PatternResult {
    return toResult(CrossStitchPattern.safeParse(value));
}

/**
 * Validate a JSON string as a cross stitch pattern. Malformed JSON is reported as an issue,
 * never thrown.
 *
 * @param json - The JSON string to validate.
 * @returns The validated pattern, or the collected issues.
 */
export function parsePatternJson(json: string): PatternResult {
    return toResult(CrossStitchPatternJson.safeParse(json));
}

/**
 * Serialize a validated pattern to a JSON string. Throws if given an invalid pattern; use
 * {@link encodePatternSafe} for a non-throwing variant.
 *
 * @param pattern - The validated pattern to serialize.
 * @returns The pattern as a JSON string.
 */
export function encodePattern(pattern: CrossStitchPattern): string {
    return z.encode(CrossStitchPatternJson, pattern);
}

/**
 * Serialize a validated pattern to a JSON string without throwing.
 *
 * @param pattern - The validated pattern to serialize.
 * @returns The JSON string, or the collected issues.
 */
export function encodePatternSafe(pattern: CrossStitchPattern): EncodeResult {
    const result = z.safeEncode(CrossStitchPatternJson, pattern);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, issues: result.error.issues.map(toPatternIssue) };
}
