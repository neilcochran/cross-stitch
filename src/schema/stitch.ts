import { z } from 'zod';
import { ColorId, Coordinate, IntegerCoordinate } from './primitives';

/**
 * Every stitch kind discriminator, in canonical order. The single source of truth for
 * which kinds exist; the {@link Stitch} union and the totals keys are kept in step with it.
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
    x: Coordinate.describe('X position on the grid; may be a half-step.'),
    y: Coordinate.describe('Y position on the grid; may be a half-step.')
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
    x: IntegerCoordinate.describe('X of the lower-left corner of the square.'),
    y: IntegerCoordinate.describe('Y of the lower-left corner of the square.')
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
}).refine(
    (stitch) =>
        stitch.angle === 'tl-br'
            ? stitch.placement === 'top-right' || stitch.placement === 'bottom-left'
            : stitch.placement === 'top-left' || stitch.placement === 'bottom-right',
    { message: 'placement is not reachable for the given angle', path: ['placement'] }
);

/** A validated three-quarter stitch. */
export type ThreeQuarterStitch = z.infer<typeof ThreeQuarterStitch>;

/** A back stitch: a short outline segment spanning at most one grid space in any direction. */
export const BackStitch = SegmentStitchBase.extend({
    kind: z.literal('back')
}).refine((stitch) => Math.abs(stitch.to.x - stitch.from.x) <= 1 && Math.abs(stitch.to.y - stitch.from.y) <= 1, {
    message: 'a back stitch may span at most one grid space in each direction',
    path: ['to']
});

/** A validated back stitch. */
export type BackStitch = z.infer<typeof BackStitch>;

/** A long stitch: like a back stitch but with no maximum length. */
export const LongStitch = SegmentStitchBase.extend({
    kind: z.literal('long')
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
