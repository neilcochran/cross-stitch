import { validateNonNegativeInteger } from '../validation';
import { Stitch } from './Stitch';

/**
 * Model class representing a single full stitch in the pattern.
 *
 * A full stitch covers a single square on the pattern in an 'X' shape.
 * A full stitch is the combination of 2 opposing angle half stitches.
 */
export class FullStitch extends Stitch {

    /**
     * @param colorId - The id of the desired color of the stitch.
     * @param x - The x coordinate of the lower left corner of the stitch.
     * @param y - The y coordinate of the lower left corner of stitch.
     *
     * @throws {@link Error} if any invalid parameters are provided.
     */
    constructor(
        colorId: number,
        x: number,
        y: number
    ){
        super(colorId, x,y);
    }

    //override setX() since this stitch only supports non negative integers
    public setX(x: number): boolean {
        if(validateNonNegativeInteger(x)) {
            this.x = x;
            return true;
        }
        return false;
    }

    //override setY() since this stitch only supports non negative integers
    public setY(y: number): boolean {
        if(validateNonNegativeInteger(y)) {
            this.y = y;
            return true;
        }
        return false;
    }
}