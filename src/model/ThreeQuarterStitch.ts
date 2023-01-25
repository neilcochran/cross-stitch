import { validateNonNegativeInteger, validateNonNegativeDecimalPrecision } from '../validation';
import { StitchAngle } from './StitchAngle';
import { StitchPlacement } from './StitchPlacement';

/**
 * Model class representing a single three quarter stitch in the pattern.
 *
 * A three quarter stitch is simply a quarter stitch and a half stitch combined. Therefore, the half stitch angle
 * and the quarter stitch placement must be given. For a 45 degree angle half stitch top-right and bottom-left are
 * valid quarterStitchPlacement values. Conversely, for a 135 degree angle half stitch top-left and bottom-right
 * are valid quarterStitchPlacement values.
 */
export class ThreeQuarterStitch {

    private colorId!: number;
    private x!: number;
    private y!: number;

    /**
     * @param colorId - The id of the desired color of the stitch.
     * @param x - The x coordinate of the lower left corner of the square on the grid.
     * @param y - The y coordinate of the lower left corner of square on the grid.
     * @param halfStitchAngle - The angle of the half stitch which can be either `45` or `135`.
     * @param quarterStitchPlacement - The placement of the quarter stitch within the square on the grid.
     * @throws {@link Error} if any invalid parameters are provided.
     */
    constructor(
        colorId: number,
        x: number,
        y: number,
        public halfStitchAngle: StitchAngle,
        public quarterStitchPlacement: StitchPlacement
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