import { validateNonNegativeInteger } from '../validation';
import { Stitch } from './Stitch';

/**
 * Model class representing a single full stitch in the pattern.
 *
 * A full stitch covers a single square on the pattern in an 'X' shape.
 * A full stitch is the combination of 2 opposing angle half stitches.
 */
export class FullStitch implements Stitch {

    /**
     * @param colorId - The id of the desired color of the stitch.
     * @param x - The x coordinate of the lower left corner of the stitch.
     * @param y - The y coordinate of the lower left corner of stitch.
     *
     * @throws {@link Error} if any invalid parameters are provided.
     */
    constructor(
        public readonly colorId: string,
        public readonly x: number,
        public readonly y: number
    ){
        //this stitch only supports non negative integers for x,y
        if(!validateNonNegativeInteger(x)) {
            throw new Error('The x coordinate must be a non-negative integer' + x);
        }
        if(!validateNonNegativeInteger(y)) {
            throw new Error('The y coordinate must be a non-negative integer');
        }
    }
}