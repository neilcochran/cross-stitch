import { validateNonNegativeDecimalPrecision, validateNonNegativeInteger } from '../validation';
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
     *
     * @throws {@link Error} if any invalid parameters are provided.
     */
    constructor(
        public readonly colorId: number,
        public readonly x: number,
        public readonly y: number,
        public readonly placement: StitchPlacement
    ){
        //if placement is bottom, x must be a non negative integer and y must be non neg but can be a supported decimal
        if(StitchPlacement.BOTTOM_LEFT === placement || StitchPlacement.BOTTOM_RIGHT === placement) {
            if(!validateNonNegativeInteger(x)) {
                throw new Error(`Given the stitch placement: ${placement}, the x coordinate must be a non negative integer`);
            }
            if(!validateNonNegativeDecimalPrecision(y)) {
                throw new Error(`Given the stitch placement: ${placement}, the y coordinate must be of non negative decimal precision`);
            }
        }
        else { //if placement is top, x must be non negative and can be a supported decimal, and y must be a non negative integer
            if(!validateNonNegativeDecimalPrecision(x)) {
                throw new Error(`Given the stitch placement: ${placement}, the x coordinate must be of non negative decimal precision`);
            }
            if(!validateNonNegativeInteger(y)) {
                throw new Error(`Given the stitch placement: ${placement}, the y coordinate must be a non negative integer`);
            }
        }
    }
}