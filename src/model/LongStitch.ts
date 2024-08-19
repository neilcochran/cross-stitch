import { Stitch } from './Stitch';

/**
 * Model class representing a single long stitch in the pattern.
 *
 * Long stitches follow the same rules as back stitches expect that they have no maximum distance. They can move laterally, vertically,
 * or diagonally. Long stitch coordinates also support 1/2 space fractional values.
 */
export class LongStitch implements Stitch {
    /**
     * @param colorId - The ID of the color of the stitch
     * @param x - The x coordinate of the start of the stitch
     * @param y - The y coordinate of the start of the stitch
     * @param x2 - The x2 coordinate of the end of the stitch
     * @param y2 - The y2 coordinate of the end of the stitch
     */
    constructor(
        public colorId: number,
        public x: number,
        public y: number,
        public x2: number,
        public y2: number
    ) {}
}
