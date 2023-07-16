import { validateNonNegativeDecimalPrecision } from '../validation';
import { Stitch } from './Stitch';

/**
 * Model class representing a single long stitch in the pattern.
 *
 * Long stitches follow the same rules as back stitches expect that they have no maximum distance. They can move laterally, vertically,
 * or diagonally. Long stitch coordinates also support 1/2 space fractional values.
 */
export class LongStitch implements Stitch {

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
        if(!validateNonNegativeDecimalPrecision(x)) {
            throw new Error('The x coordinate must be a non-negative integer');
        }
        if(!validateNonNegativeDecimalPrecision(y)) {
            throw new Error('The y coordinate must be a non-negative integer');
        }
        if(!validateNonNegativeDecimalPrecision(x2)) {
            throw new Error('The x2 coordinate must be a non-negative integer');
        }
        if(!validateNonNegativeDecimalPrecision(y2)) {
            throw new Error('The y2 coordinate must be a non-negative integer');
        }
    }
}