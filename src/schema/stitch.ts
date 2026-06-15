import { z } from 'zod';
import { ColorId, Coordinate, IntegerCoordinate } from './primitives';

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
    x: Coordinate,
    y: Coordinate
});

/** A validated grid point. */
export type Point = z.infer<typeof Point>;

/** A full stitch: an 'X' filling one grid square. */
export const FullStitch = z.object({
    kind: z.literal('full'),
    colorId: ColorId,
    x: IntegerCoordinate.describe('X of the lower-left corner of the square.'),
    y: IntegerCoordinate.describe('Y of the lower-left corner of the square.')
});

/** A validated full stitch. */
export type FullStitch = z.infer<typeof FullStitch>;

/** A half stitch: one diagonal across a grid square. */
export const HalfStitch = z.object({
    kind: z.literal('half'),
    colorId: ColorId,
    x: IntegerCoordinate,
    y: IntegerCoordinate,
    angle: StitchAngle
});

/** A validated half stitch. */
export type HalfStitch = z.infer<typeof HalfStitch>;

/** A quarter stitch: from the center of a square to one corner. */
export const QuarterStitch = z.object({
    kind: z.literal('quarter'),
    colorId: ColorId,
    x: IntegerCoordinate,
    y: IntegerCoordinate,
    placement: StitchPlacement
});

/** A validated quarter stitch. */
export type QuarterStitch = z.infer<typeof QuarterStitch>;

/**
 * A three-quarter stitch: a half stitch plus a quarter stitch on the perpendicular
 * diagonal. The quarter can only reach the two corners the half does not occupy, so a
 * `tl-br` half allows `top-right` or `bottom-left`, and a `bl-tr` half allows `top-left`
 * or `bottom-right`.
 */
export const ThreeQuarterStitch = z
    .object({
        kind: z.literal('three-quarter'),
        colorId: ColorId,
        x: IntegerCoordinate,
        y: IntegerCoordinate,
        angle: StitchAngle,
        placement: StitchPlacement
    })
    .refine(
        (stitch) =>
            stitch.angle === 'tl-br'
                ? stitch.placement === 'top-right' || stitch.placement === 'bottom-left'
                : stitch.placement === 'top-left' || stitch.placement === 'bottom-right',
        { message: 'placement is not reachable for the given angle', path: ['placement'] }
    );

/** A validated three-quarter stitch. */
export type ThreeQuarterStitch = z.infer<typeof ThreeQuarterStitch>;

/** A back stitch: a short outline segment spanning at most one grid space in any direction. */
export const BackStitch = z
    .object({
        kind: z.literal('back'),
        colorId: ColorId,
        from: Point,
        to: Point
    })
    .refine((stitch) => Math.abs(stitch.to.x - stitch.from.x) <= 1 && Math.abs(stitch.to.y - stitch.from.y) <= 1, {
        message: 'a back stitch may span at most one grid space in each direction',
        path: ['to']
    });

/** A validated back stitch. */
export type BackStitch = z.infer<typeof BackStitch>;

/** A long stitch: like a back stitch but with no maximum length. */
export const LongStitch = z.object({
    kind: z.literal('long'),
    colorId: ColorId,
    from: Point,
    to: Point
});

/** A validated long stitch. */
export type LongStitch = z.infer<typeof LongStitch>;

/** Any stitch in a pattern, discriminated by its `kind`. */
export const Stitch = z.discriminatedUnion('kind', [
    FullStitch,
    ThreeQuarterStitch,
    HalfStitch,
    QuarterStitch,
    BackStitch,
    LongStitch
]);

/** A validated stitch of any kind. */
export type Stitch = z.infer<typeof Stitch>;
