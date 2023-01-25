import { validateNonNegativeInteger, validateNonNegativeDecimalPrecision } from '../validation';
import { StitchAngle } from './StitchAngle';

/**
 * Model class representing a single half stitch in the pattern.
 *
 * Half stitches comes in two forms. The first form goes between the top left and bottom
 * right corners of the space on the grid forming a 45 degree line. The other form goes
 * between the top right and bottom left corners of the space on the grid forming a 135
 * degree line. This is why `45` and `135` are the only valid values for `stitchAngle`.
 */
export class HalfStitch {

    private colorId!: number;
    private x!: number;
    private y!: number;

    /**
     * @param colorId - The id of the desired color of the stitch.
     * @param x - The x coordinate of the lower left corner of the square on the grid.
     * @param y - The y coordinate of the lower left corner of square on the grid.
     * @param stitchAngle - The angle of the half stitch which can be either `45` or `135`.
     * @throws {@link Error} if any invalid parameters are provided.
     */
    constructor(
        colorId: number,
        x: number,
        y: number,
        public stitchAngle: StitchAngle
    ){
        if(!this.setColorId(colorId)) {
            throw new Error(`invalid colorId provided: ${colorId}`);
        }
        if(!this.setX(x)) {
            throw new Error(`invalid x provided: ${x}`);
        }
        if(!this.setY(y)) {
            throw new Error(`invalid y provided: ${y}`);
        }
    }

    public setColorId(colorId: number): boolean {
        if(validateNonNegativeInteger(colorId)){
            this.colorId = colorId;
            return true;
        }
        return false;
    }

    public getColorId(): number {
        return this.colorId;
    }

    public setX(x: number): boolean {
        if(validateNonNegativeDecimalPrecision(x)){
            this.x = x;
            return true;
        }
        return false;
    }

    public getX(): number {
        return this.x;
    }

    public setY(y: number): boolean {
        if(validateNonNegativeDecimalPrecision(y)){
            this.y = y;
            return true;
        }
        return false;
    }

    public getY(): number {
        return this.y;
    }
}