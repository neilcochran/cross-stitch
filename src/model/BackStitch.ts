import { validateNonNegativeDecimalPrecision } from '../validation';
import { Stitch } from './Stitch';

/**
 * Model class representing a single back stitch in the pattern.
 *
 * Back stitches can go laterally, vertically, or diagonally. A back stitch typically
 * moves a full space in any of the possible directions, but 1/2 space fractional amounts
 * are also supported. A back stitch can move across at most 1 grid space in any supported direction.
 */
export class BackStitch extends Stitch {
    private _x2!: number;
    private _y2!: number;

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
        this.x2 = x2;
        this.y2 = y2;
    }

    get x(): number {
        return this._x;
    }

    set x(x: number) {
        if(!validateNonNegativeDecimalPrecision(x)) {
            throw new Error(`invalid x coordinate: ${x}, must be non-negative and only supports decimals of .5 (half stitches)`);
        }
        this._x = x;
    }

    get y(): number {
        return this._y;
    }

    set y(y: number) {
        if(!validateNonNegativeDecimalPrecision(y)) {
            throw new Error(`invalid y coordinate: ${y}, must be non-negative and only supports decimals of .5 (half stitches)`);
        }
        this._y = y;
    }

    get x2(): number {
        return this._x2;
    }

    set x2(x2: number) {
        if(!validateNonNegativeDecimalPrecision(x2)) {
            throw new Error(`invalid x2 coordinate: ${x2}, must be non-negative and only supports decimals of .5 (half stitches)`);
        }
        this._x2 = x2;
    }

    get y2(): number {
        return this._y2;
    }

    set y2(y2: number) {
        if(!validateNonNegativeDecimalPrecision(y2)) {
            throw new Error(`invalid y2 coordinate: ${y2}, must be non-negative and only supports decimals of .5 (half stitches)`);
        }
        this._y2 = y2;
    }
}