import type { z } from 'zod';
import type { StitchAngle, StitchPlacement } from './stitch';

/**
 * The structured payload carried by every cross-stitch semantic validation issue, discriminated
 * on `kind`. This is the single source of truth for the semantic issue set: {@link addSemanticIssue}
 * type-checks each emitted issue against it, and the `PatternIssue` taxonomy in `api.ts` derives
 * its semantic variants from it and is checked against it, so a new rule is declared in one place.
 */
export type IssueParams =
    | { kind: 'duplicate-color-id'; colorId: number }
    | { kind: 'duplicate-color-symbol'; symbol: string }
    | { kind: 'unknown-color-reference'; colorId: number }
    | { kind: 'unreachable-placement'; angle: StitchAngle; placement: StitchPlacement }
    | { kind: 'segment-empty' }
    | { kind: 'back-stitch-too-long' }
    | { kind: 'long-stitch-too-short' };

/** The discriminator string of a semantic {@link IssueParams}. */
export type IssueKind = IssueParams['kind'];

/**
 * Raise a semantic cross-stitch validation issue from inside a schema refinement. The single
 * entry point for tagging a custom Zod issue with structured {@link IssueParams}, so the payload
 * is type-checked at every emit site and stays in step with the `PatternIssue` mapper.
 *
 * @param ctx - The refinement context to add the issue to.
 * @param params - The structured, discriminated issue payload.
 * @param message - A human-readable description of the problem.
 * @param path - Path to the offending value, relative to the value being refined.
 */
export function addSemanticIssue(
    ctx: z.core.$RefinementCtx,
    params: IssueParams,
    message: string,
    path: PropertyKey[]
): void {
    ctx.addIssue({ code: 'custom', params, message, path });
}
