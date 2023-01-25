import { validateNonNegativeInteger, validateNonNegativeDecimalPrecision } from '../validation';
import { StitchPlacement } from './StitchPlacement';

/**
 * Model class representing a single quarter stitch in the pattern.
 *
 * A quarter stitch spans a quarter of a space on the grid and can be located in either the `top-right`, `bottom-right`,
 * `bottom-left`, or `top-left` quadrant of a grid space as indicated by the `placement` field. A quarter stitch is a
 * half stitch cut in half vertically. Therefore, one end of the quarter stitch is always in the center of a grid space,
 * while the other extends to the corner indicated by the `placement` value.
 */
export class QuarterStitch {

    private colorId!: number;
    private x!: number;
    private y!: number;

    /**
     * @param colorId - The id of the desired color of the stitch.
     * @param x - The x coordinate of the lower left corner of the square on the grid.
     * @param y - The y coordinate of the lower left corner of square on the grid.
     * @param placement - The placement of the quarter stitch within the square on the grid.
     */
    constructor(
        colorId: number,
        x: number,
        y: number,
        public placement: StitchPlacement
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
     * Set the colorId of the stitch.
     *
     * @param colorId - The id of the desired color of the stitch.
     *
     * @returns True if the colorId provided was valid and set, or false if it was invalid and not set.
     */
    public setColorId(colorId: number): boolean {
        if(validateNonNegativeInteger(colorId)){
            this.colorId = colorId;
            return true;
        }
        return false;
    }

    /**
     * Get the colorId of the stitch.
     *
     * @returns The colorId of the stitch.
     */
    public getColorId(): number {
        return this.colorId;
    }

    /**
     * Set the x coordinate of the lower left corner of the square on the grid.
     *
     * @param x - The x coordinate of the lower left corner of the square on the grid.
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
     * Get the x coordinate of the lower left corner of the square on the grid.
     *
     * @returns The x coordinate of the lower left corner of the square on the grid.
     */
    public getX(): number {
        return this.x;
    }

    /**
     * Set the y coordinate of the lower left corner of the square on the grid.
     *
     * @param y - The y coordinate of the lower left corner of the square on the grid.
     *
     * @returns True if the y value provided was valid and set, or false if it was invalid and not set.
     */
    public setY(y: number): boolean {
        if(validateNonNegativeDecimalPrecision(y)){
            this.y = y;
            return true;
        }
        return false;
    }

    /**
     * Get the y coordinate of the lower left corner of the square on the grid.
     *
     * @returns The y coordinate of the lower left corner of the square on the grid.
     */
    public getY(): number {
        return this.y;
    }
}