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