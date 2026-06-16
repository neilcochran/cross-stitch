import type { Stitch } from './schema';

/** The axis-aligned bounding box of a stitch, in grid coordinates. */
export interface StitchBounds {
    /** Smallest x the stitch occupies. */
    minX: number;
    /** Smallest y the stitch occupies. */
    minY: number;
    /** Largest x the stitch occupies. */
    maxX: number;
    /** Largest y the stitch occupies. */
    maxY: number;
}

/** Internal: signals an unhandled stitch kind. Unreachable while the switch below is exhaustive. */
function assertNever(value: never): never {
    throw new Error(`unhandled stitch kind: ${JSON.stringify(value)}`);
}

/**
 * Compute the axis-aligned bounding box of a single stitch, normalizing the two stitch
 * shapes (cell-anchored `x` / `y` versus segment `from` / `to`) into one position-and-extent
 * value. Cell-anchored stitches occupy the unit square at their lower-left corner; segment
 * stitches span their two endpoints. The switch is exhaustive over {@link Stitch} kinds, so a
 * new kind that is neither cell- nor segment-shaped fails to compile until it is handled here.
 *
 * @param stitch - The stitch to measure.
 * @returns The stitch's bounding box.
 */
export function stitchBounds(stitch: Stitch): StitchBounds {
    switch (stitch.kind) {
        case 'back':
        case 'long':
            return {
                minX: Math.min(stitch.from.x, stitch.to.x),
                minY: Math.min(stitch.from.y, stitch.to.y),
                maxX: Math.max(stitch.from.x, stitch.to.x),
                maxY: Math.max(stitch.from.y, stitch.to.y)
            };
        case 'full':
        case 'half':
        case 'quarter':
        case 'three-quarter':
            return {
                minX: stitch.x,
                minY: stitch.y,
                maxX: stitch.x + 1,
                maxY: stitch.y + 1
            };
        default:
            return assertNever(stitch);
    }
}
