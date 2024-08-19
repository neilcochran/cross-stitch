import { Stitch } from './Stitch';
import { StitchAngle } from './StitchAngle';

/**
 * Model class representing a single half stitch in the pattern.
 *
 * Half stitches comes in two forms. The first form goes between the top left and bottom
 * right corners of the space on the grid forming a 45 degree line. The other form goes
 * between the top right and bottom left corners of the space on the grid forming a 135
 * degree line. This is why `45` and `135` are the only valid values for `stitchAngle`.
 */
export class HalfStitch implements Stitch {
    /**
     * @param colorId - The ID of the color of the stitch.
     * @param x - The x coordinate of the lower left corner of the square on the grid.
     * @param y - The y coordinate of the lower left corner of square on the grid.
     * @param stitchAngle - The angle of the half stitch which can be either `45` or `135`.
     */
    constructor(
        public colorId: number,
        public x: number,
        public y: number,
        public stitchAngle: StitchAngle
    ){}
}