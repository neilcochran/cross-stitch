import { validateStitchAngle } from '../validation';
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
export class HalfStitch extends Stitch {
    private _stitchAngle!: StitchAngle;
    /**
     * @param colorId - The id of the desired color of the stitch.
     * @param x - The x coordinate of the lower left corner of the square on the grid.
     * @param y - The y coordinate of the lower left corner of square on the grid.
     * @param stitchAngle - The angle of the half stitch which can be either `45` or `135`.
     *
     * @throws {@link Error} if any invalid parameters are provided.
     */
    constructor(
        colorId: number,
        x: number,
        y: number,
        stitchAngle: StitchAngle
    ){
        super(colorId, x, y);
        this.stitchAngle = stitchAngle;
    }

    get stitchAngle(): StitchAngle {
        return this._stitchAngle;
    }

    set stitchAngle(stitchAngle: StitchAngle) {
        if(!validateStitchAngle(stitchAngle)) {
            throw new Error(`Invalid stitch angle: ${stitchAngle}`);
        }
        this._stitchAngle = stitchAngle;
    }

}