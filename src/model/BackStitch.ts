import { validateNonNegativeDecimalPrecision, validateSingleSpaceDistance } from '../validation';
import { Stitch } from './Stitch';

/**
 * Model class representing a single back stitch in the pattern.
 *
 * Back stitches can go laterally, vertically, or diagonally. A back stitch typically
 * moves a full space in any of the possible directions, but 1/2 space fractional amounts
 * are also supported. A back stitch can move across at most 1 grid space in any supported direction.
 */
export class BackStitch extends Stitch {

    private x2!: number;
    private y2!: number;

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
        colorId: number,
        x: number,
        y: number,
        x2: number,
        y2: number
    ){
        super(colorId, x, y);

        if(!this.setX2(x2)) {
            throw new Error(`invalid x2 provided: ${x2}`);
        }
        if(!this.setY2(y2)) {
            throw new Error(`invalid y2 provided: ${y2}`);
        }
        if(!validateSingleSpaceDistance(x, y, x2, y2)) {
            throw new Error(`invalid coordinates have a distance greater than 1: (${x}, ${y}), (${x2}, ${y2})`);
        }
    }

    public setX2(x2: number): boolean {
        if(validateNonNegativeDecimalPrecision(x2)){
            this.x2 = x2;
            return true;
        }
        return false;
    }

    public getX2(): number {
        return this.x2;
    }

    public setY2(y2: number): boolean {
        if(validateNonNegativeDecimalPrecision(y2)){
            this.y2 = y2;
            return true;
        }
        return false;
    }

    public getY2(): number {
        return this.y2;
    }
}