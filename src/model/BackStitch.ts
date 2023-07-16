import { validateNonNegativeDecimalPrecision, validateSingleSpaceDistance } from '../validation';
import { Stitch } from './Stitch';

/**
 * Model class representing a single back stitch in the pattern.
 *
 * Back stitches can go laterally, vertically, or diagonally. A back stitch typically
 * moves a full space in any of the possible directions, but 1/2 space fractional amounts
 * are also supported. A back stitch can move across at most 1 grid space in any supported direction.
 */
export class BackStitch implements Stitch {

    /**
     * @param colorId - The id of the desired color of the stitch
     * @param x - The x coordinate of the start of the stitch
     * @param y - The y coordinate of the start of the stitch
     * @param x2 - The x2 coordinate of the end of the stitch
     * @param y2 - The y2 coordinate of the end of the stitch
     *
     * @throws {@link Error} if any invalid parameters are provided.
     */
    constructor(
        public readonly colorId: string,
        public readonly x: number,
        public readonly y: number,
        public readonly x2: number,
        public readonly y2: number
    ){
        if(!validateNonNegativeDecimalPrecision(x2)) {
            throw new Error(`invalid x2 provided: ${x2}`);
        }
        if(!validateNonNegativeDecimalPrecision(y2)) {
            throw new Error(`invalid y2 provided: ${y2}`);
        }
        if(!validateSingleSpaceDistance(x, y, x2, y2)) {
            throw new Error(`invalid coordinates have a distance greater than 1: (${x}, ${y}), (${x2}, ${y2})`);
        }
    }
}