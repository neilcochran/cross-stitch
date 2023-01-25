import { validateNonNegativeInteger, validateNonNegativeDecimalPrecision } from '../validation';

/**
 * Model class representing a single long stitch in the pattern.
 *
 * Long stitches follow the same rules as back stitches expect that they have no maximum distance. They can move laterally, vertically,
 * or diagonally. Long stitch coordinates also support 1/2 space fractional values.
 */
export class LongStitch {

    private colorId!: number;
    private x1!: number;
    private y1!: number;
    private x2!: number;
    private y2!: number;

    /**
     * @param colorId - The id of the desired color of the stitch
     * @param x1 - The x1 coordinate of the start of the stitch
     * @param y1 - The y1 coordinate of the start of the stitch
     * @param x2 - The x2 coordinate of the end of the stitch
     * @param y2 - The y2 coordinate of the end of the stitch
     *
     * @throws {@link Error} if any invalid parameters are provided.
     */
    constructor(
        colorId: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ){
        if(!this.setColorId(colorId)) {
            throw new Error(`invalid colorId provided: ${colorId}`);
        }
        if(!this.setX1(x1)) {
            throw new Error(`invalid x1 provided: ${x1}`);
        }
        if(!this.setY1(y1)) {
            throw new Error(`invalid y1 provided: ${y1}`);
        }
        if(!this.setX2(x2)) {
            throw new Error(`invalid x2 provided: ${x2}`);
        }
        if(!this.setY2(y2)) {
            throw new Error(`invalid y2 provided: ${y2}`);
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

    public setX1(x1: number): boolean {
        if(validateNonNegativeDecimalPrecision(x1)){
            this.x1 = x1;
            return true;
        }
        return false;
    }

    public getX1(): number {
        return this.x1;
    }

    public setY1(y1: number): boolean {
        if(validateNonNegativeDecimalPrecision(y1)){
            this.y1 = y1;
            return true;
        }
        return false;
    }

    public getY1(): number {
        return this.y1;
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