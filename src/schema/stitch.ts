import { z } from 'zod';
import { ColorId, SegmentCoordinate, CellCoordinate } from './primitives';
import { addSemanticIssue } from './issues';

/**
 * Every stitch kind discriminator, in canonical order. The single source of truth for which
 * kinds exist; the {@link Stitch} union and the totals keys are kept in step with it, and the
 * compile-time parity guard at the bottom of this file fails the build if the union and this
 * tuple ever diverge.
 */
export const STITCH_KINDS = ['full', 'half', 'quarter', 'three-quarter', 'back', 'long'] as const;

/** A stitch kind discriminator value. */
export type StitchKind = (typeof STITCH_KINDS)[number];

/** The two valid half-stitch diagonals, named by the corners they connect. */
export const StitchAngle = z.enum(['tl-br', 'bl-tr']);

/** A validated half-stitch diagonal. */
export type StitchAngle = z.infer<typeof StitchAngle>;

/** The corner of a grid square a quarter stitch reaches toward. */
export const StitchPlacement = z.enum(['top-right', 'bottom-right', 'bottom-left', 'top-left']);

/** A validated quarter-stitch placement. */
export type StitchPlacement = z.infer<typeof StitchPlacement>;

/** A point on the stitch grid. Coordinates may use half-step (0.5) values. */
export const Point = z.object({
    x: SegmentCoordinate.describe('X position on the grid; may be a half-step.'),
    y: SegmentCoordinate.describe('Y position on the grid; may be a half-step.')
});

/** A validated grid point. */
export type Point = z.infer<typeof Point>;

/**
 * Fields shared by every stitch. Internal base used to compose the stitch schemas without
 * repeating the common fields; not part of the public surface.
 */
const StitchBase = z.object({
    colorId: ColorId.describe('Id of the Color this stitch is worked in.')
});

/** Internal base for cell-anchored stitches: a whole-integer lower-left corner. */
const CellStitchBase = StitchBase.extend({
    x: CellCoordinate.describe('X of the lower-left corner of the square.'),
    y: CellCoordinate.describe('Y of the lower-left corner of the square.')
});

/** Internal base for segment stitches: a start and end point that may use half-steps. */
const SegmentStitchBase = StitchBase.extend({
    from: Point.describe('Start point of the stitch.'),
    to: Point.describe('End point of the stitch.')
});

/** A full stitch: an 'X' filling one grid square. */
export const FullStitch = CellStitchBase.extend({
    kind: z.literal('full')
});

/** A validated full stitch. */
export type FullStitch = z.infer<typeof FullStitch>;

/** A half stitch: one diagonal across a grid square. */
export const HalfStitch = CellStitchBase.extend({
    kind: z.literal('half'),
    angle: StitchAngle.describe('Which diagonal the half stitch runs along.')
});

/** A validated half stitch. */
export type HalfStitch = z.infer<typeof HalfStitch>;

/** A quarter stitch: from the center of a square to one corner. */
export const QuarterStitch = CellStitchBase.extend({
    kind: z.literal('quarter'),
    placement: StitchPlacement.describe('Which corner of the square the quarter stitch reaches.')
});

/** A validated quarter stitch. */
export type QuarterStitch = z.infer<typeof QuarterStitch>;

/**
 * A three-quarter stitch: a half stitch plus a quarter stitch on the perpendicular
 * diagonal. The quarter can only reach the two corners the half does not occupy, so a
 * `tl-br` half allows `top-right` or `bottom-left`, and a `bl-tr` half allows `top-left`
 * or `bottom-right`.
 */
export const ThreeQuarterStitch = CellStitchBase.extend({
    kind: z.literal('three-quarter'),
    angle: StitchAngle.describe('The half-stitch diagonal of the three-quarter stitch.'),
    placement: StitchPlacement.describe('The corner the quarter reaches; must be reachable for the angle.')
}).superRefine((stitch, ctx) => {
    const reachable =
        stitch.angle === 'tl-br'
            ? stitch.placement === 'top-right' || stitch.placement === 'bottom-left'
            : stitch.placement === 'top-left' || stitch.placement === 'bottom-right';
    if (!reachable) {
        addSemanticIssue(
            ctx,
            { kind: 'unreachable-placement', angle: stitch.angle, placement: stitch.placement },
            'placement is not reachable for the given angle',
            ['placement']
        );
    }
});

/** A validated three-quarter stitch. */
export type ThreeQuarterStitch = z.infer<typeof ThreeQuarterStitch>;

/** A back stitch: a short outline segment spanning at most one grid space in any direction. */
export const BackStitch = SegmentStitchBase.extend({
    kind: z.literal('back')
}).superRefine((stitch, ctx) => {
    const dx = Math.abs(stitch.to.x - stitch.from.x);
    const dy = Math.abs(stitch.to.y - stitch.from.y);
    if (dx === 0 && dy === 0) {
        addSemanticIssue(
            ctx,
            { kind: 'segment-empty' },
            'a back stitch must not be empty (from and to are the same point)',
            ['to']
        );
        return;
    }
    if (dx > 1 || dy > 1) {
        addSemanticIssue(
            ctx,
            { kind: 'back-stitch-too-long' },
            'a back stitch may span at most one grid space in each direction',
            ['to']
        );
    }
});

/** A validated back stitch. */
export type BackStitch = z.infer<typeof BackStitch>;

/** A long stitch: a segment spanning more than one grid space, in any direction. */
export const LongStitch = SegmentStitchBase.extend({
    kind: z.literal('long')
}).superRefine((stitch, ctx) => {
    const dx = Math.abs(stitch.to.x - stitch.from.x);
    const dy = Math.abs(stitch.to.y - stitch.from.y);
    if (dx === 0 && dy === 0) {
        addSemanticIssue(
            ctx,
            { kind: 'segment-empty' },
            'a long stitch must not be empty (from and to are the same point)',
            ['to']
        );
        return;
    }
    if (dx <= 1 && dy <= 1) {
        addSemanticIssue(
            ctx,
            { kind: 'long-stitch-too-short' },
            'a long stitch must span more than one grid space; use a back stitch for shorter segments',
            ['to']
        );
    }
});

/** A validated long stitch. */
export type LongStitch = z.infer<typeof LongStitch>;

/** Any stitch in a pattern, discriminated by its `kind`. */
export const Stitch = z.discriminatedUnion('kind', [
    FullStitch,
    HalfStitch,
    QuarterStitch,
    ThreeQuarterStitch,
    BackStitch,
    LongStitch
]);

/** A validated stitch of any kind. */
export type Stitch = z.infer<typeof Stitch>;

// Compile-time parity guard: STITCH_KINDS and the Stitch union's kind members must be exactly
// equal. If a kind is added to one but not the other, AssertTrue<false> violates its constraint
// and the build fails here, pointing back to STITCH_KINDS.
type Equals<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
type AssertTrue<T extends true> = T;
type _StitchKindParity = AssertTrue<Equals<StitchKind, z.infer<typeof Stitch>['kind']>>;
