import { validateNonNegativeInteger, validateStitchAngle } from '../validation';
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
     * @param colorId - The id of the desired color of the stitch.
     * @param x - The x coordinate of the lower left corner of the square on the grid.
     * @param y - The y coordinate of the lower left corner of square on the grid.
     * @param stitchAngle - The angle of the half stitch which can be either `45` or `135`.
     *
     * @throws {@link Error} if any invalid parameters are provided.
     */
    constructor(
        public readonly colorId: number,
        public readonly x: number,
        public readonly y: number,
        public readonly  stitchAngle: StitchAngle
    ){
        if(!validateStitchAngle(stitchAngle)) {
            throw new Error(`Invalid stitch angle: ${stitchAngle}`);
        }
        //this stitch only supports non negative integers for x,y
        if(!validateNonNegativeInteger(x)) {
            throw new Error('The x coordinate must be a non-negative integer');
        }
        if(!validateNonNegativeInteger(y)) {
            throw new Error('The y coordinate must be a non-negative integer');
        }
    }
}