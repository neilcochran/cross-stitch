import { Stitch } from './Stitch';
import { StitchAngle } from './StitchAngle';
import { StitchPlacement } from './StitchPlacement';

/**
 * Model class representing a single three quarter stitch in the pattern.
 *
 * A three quarter stitch is simply a quarter stitch and a half stitch combined. Therefore, the half stitch angle
 * and the quarter stitch placement must be given. For a 45 degree angle half stitch top-left and bottom-right are
 * valid quarterStitchPlacement values. Conversely, for a 135 degree angle half stitch top-right and bottom-right
 * are valid quarterStitchPlacement values.
 */
export class ThreeQuarterStitch implements Stitch {
    /**
     * @param colorId - The ID of the color of the stitch.
     * @param x - The x coordinate of the lower left corner of the square on the grid.
     * @param y - The y coordinate of the lower left corner of square on the grid.
     * @param halfStitchAngle - The angle of the half stitch which can be either `45` or `135`.
     * @param quarterStitchPlacement - The placement of the quarter stitch within the square on the grid.
     */
    constructor(
        public colorId: number,
        public x: number,
        public y: number,
        public halfStitchAngle: StitchAngle,
        public quarterStitchPlacement: StitchPlacement
    ) {}
}
