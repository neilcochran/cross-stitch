import { Stitch } from './Stitch';
import { StitchPlacement } from './StitchPlacement';

/**
 * Model class representing a single quarter stitch in the pattern.
 *
 * A quarter stitch spans a quarter of a space on the grid and can be located in either the `top-right`, `bottom-right`,
 * `bottom-left`, or `top-left` quadrant of a grid space as indicated by the `placement` field. A quarter stitch is a
 * half stitch cut in half vertically. Therefore, one end of the quarter stitch is always in the center of a grid space,
 * while the other extends to the corner indicated by the `placement` value.
 * This also means one coordinate will always be an integer, while the other will always be fractional.
 */
export class QuarterStitch implements Stitch {
    /**
     * @param colorId - The id of the desired color of the stitch.
     * @param x - The x coordinate of the lower left corner of the square on the grid.
     * @param y - The y coordinate of the lower left corner of square on the grid.
     * @param placement - The placement of the quarter stitch within the square on the grid.
     */
    constructor(
        public colorId: number,
        public x: number,
        public y: number,
        public placement: StitchPlacement
    ){}
}