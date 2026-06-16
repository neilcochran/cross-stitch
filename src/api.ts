import { z } from 'zod';
import { CrossStitchPattern, CrossStitchPatternJson } from './schema';
import type { StitchAngle, StitchPlacement } from './schema';

/** A path to a location within a pattern: object keys and array indices. */
export type PatternPath = (string | number)[];

/**
 * A validation problem found in a pattern, as a discriminated union on `kind`. The named
 * variants describe cross-stitch-specific rule violations and carry structured data; the
 * `schema-violation` variant is the catch-all for structural and primitive failures, tagged
 * with a coarse `code`. Every variant also carries the offending `path` and a human-readable
 * `message`.
 */
export type PatternIssue =
    | { kind: 'duplicate-color-id'; colorId: number; path: PatternPath; message: string }
    | { kind: 'duplicate-color-symbol'; symbol: string; path: PatternPath; message: string }
    | { kind: 'unknown-color-reference'; colorId: number; path: PatternPath; message: string }
    | {
          kind: 'unreachable-placement';
          angle: StitchAngle;
          placement: StitchPlacement;
          path: PatternPath;
          message: string;
      }
    | { kind: 'segment-empty'; path: PatternPath; message: string }
    | { kind: 'back-stitch-too-long'; path: PatternPath; message: string }
    | { kind: 'long-stitch-too-short'; path: PatternPath; message: string }
    | {
          kind: 'schema-violation';
          code: 'invalid-type' | 'out-of-range' | 'invalid-format' | 'invalid-value';
          path: PatternPath;
          message: string;
      };

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

function toPatternIssue(issue: z.core.$ZodIssue): PatternIssue {
    const path = toPath(issue.path);
    const message = issue.message;
    if (issue.code === 'custom' && issue.params !== undefined) {
        const params = issue.params;
        switch (params.kind) {
            case 'duplicate-color-id':
                return { kind: 'duplicate-color-id', colorId: Number(params.colorId), path, message };
            case 'duplicate-color-symbol':
                return { kind: 'duplicate-color-symbol', symbol: String(params.symbol), path, message };
            case 'unknown-color-reference':
                return { kind: 'unknown-color-reference', colorId: Number(params.colorId), path, message };
            case 'unreachable-placement':
                return {
                    kind: 'unreachable-placement',
                    angle: params.angle,
                    placement: params.placement,
                    path,
                    message
                };
            case 'segment-empty':
                return { kind: 'segment-empty', path, message };
            case 'back-stitch-too-long':
                return { kind: 'back-stitch-too-long', path, message };
            case 'long-stitch-too-short':
                return { kind: 'long-stitch-too-short', path, message };
            default:
                break;
        }
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
 * Serialize a validated pattern to a JSON string.
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
