import { validateNonNegativeDecimalPrecision, validateNonNegativeInteger } from '../validation';

/**
 * A model class representing a generic stitch and houses common properties to all stitches.
 */
export class Stitch {
    protected colorId!: number;
    protected x!: number;
    protected y!: number;

    /**
     * @param colorId - The id of the desired color of the stitch.
     * @param x - The x coordinate of the stitch.
     * @param y - The y coordinate of the of stitch.
     *
     * @throws {@link Error} if any invalid parameters are provided.
     */
    constructor(colorId: number, x: number, y: number) {
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