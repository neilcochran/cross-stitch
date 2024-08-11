import { validateNonNegativeInteger } from '../validation';

export class Stitch {
    protected _colorId!: number;
    protected _x!: number;
    protected _y!: number;

    constructor(colorId: number, x: number, y: number) {
        this.colorId = colorId;
        this.x = x;
        this.y = y;
    }

    get colorId(): number {
        return this._colorId;
    }

    set colorId(colorId: number) {
        if(!validateNonNegativeInteger(colorId)) {
            throw new Error('colorId must be a non negative integer');
        }
        this._colorId = colorId;
    }

    get x(): number {
        return this._x;
    }

    set x(x: number) {
        if(!validateNonNegativeInteger(x)) {
            throw new Error('x must be a positive integer');
        }
        this._x = x;
    }

    get y(): number {
        return this._y;
    }

    set y(y: number) {
        if(!validateNonNegativeInteger(y)) {
            throw new Error('y must be a positive integer');
        }
        this._y = y;
    }

}