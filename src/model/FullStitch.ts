import { validateNonNegativeDecimalPrecision, validateNonNegativeInteger } from '../validation';

/**
 * Model class representing a single full stitch in the pattern.
 *
 * A full stitch covers a single square on the pattern in an 'X' shape.
 * A full stitch is the combination of 2 opposing angle half stitches.
 */
export class FullStitch {

    private colorId!: number;
    private x!: number;
    private y!: number;

    /**
     * @param colorId - The id of the desired color of the stitch
     * @param x - The x coordinate of the lower left corner of the stitch.
     * @param y - The y coordinate of the lower left corner of stitch.
     *
     * @throws {@link Error} if invalid coordinates or colorId is passed
     */
    constructor(
        colorId: number,
        x: number,
        y: number
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

    /**
     * Set the colorId of the stitch
     *
     * @param colorId - The id of the desired color of the stitch
     *
     * @returns True if the colorId provided was valid and set, or false if it was invalid and not set
     */
    public setColorId(colorId: number): boolean {
        if(validateNonNegativeInteger(colorId)){
            this.colorId = colorId;
            return true;
        }
        return false;
    }

    /**
     * Get the colorId of the stitch
     *
     * @returns The colorId of the stitch
     */
    public getColorId(): number {
        return this.colorId;
    }

    /**
     * Set the x coordinate of the lower left corner of the stitch.
     *
     * @param x - The x coordinate of the lower left corner of the stitch.
     *
     * @returns True if the x value provided was valid and set, or false if it was invalid and not set.
     */
    public setX(x: number): boolean {
        if(validateNonNegativeDecimalPrecision(x)){
            this.x = x;
            return true;
        }
        return false;
    }

    /**
     * Get the x coordinate of the lower left corner of the stitch.
     *
     * @returns The x coordinate of the lower left corner of the stitch.
     */
    public getX(): number {
        return this.x;
    }

    /**
     * Set the y coordinate of the lower left corner of the stitch
     *
     * @param y - The y coordinate of the lower left corner of the stitch.
     *
     * @returns True if the y value provided was valid and set, or false if it was invalid and not set
     */
    public setY(y: number): boolean {
        if(validateNonNegativeDecimalPrecision(y)){
            this.y = y;
            return true;
        }
        return false;
    }

    /**
     * Get the y coordinate of the lower left corner of the stitch
     * @returns The y coordinate of the lower left corner of the stitch
     */
    public getY(): number {
        return this.y;
    }
}