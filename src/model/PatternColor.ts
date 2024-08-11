import { validateNonNegativeInteger, validatePatternSymbol } from '../validation';
import { Floss } from './Floss';

/**
 * Model class representing a color used in the pattern.
 *
 * A PatternColor represents a color used in the pattern. The color is made up of one or more strands of Floss.
 * Each strand can be a different color, allowing blended colors to be defined.
 */
export class PatternColor {
    private _colorId!: number;
    private _patternSymbol!: string;
    private _flossStrands!: Floss[];
    private _hexCode?: number;

    /**
     * @param colorId - An id for the color. Stitches will use this id to reference which color they are.
     * @param colorName - A name for the overall color.
     * @param patternSymbol - The ASCII character used to represent the color on the pattern visually.
     * @param flossStrands - An array of Floss objects defining all the strands of floss that make up the color.
     * @param hexCode - Optionally defines the color's hexadecimal value.
     *
     * @throws {@link Error} if any invalid parameters are provided.
     */
    constructor(
        colorId: number,
        public colorName: string,
        patternSymbol: string,
        flossStrands: Floss[],
        hexCode?: number
    ){
        this.colorId = colorId;
        this.patternSymbol = patternSymbol;
        this.flossStrands = flossStrands;
        if(hexCode) {
            this.hexCode = hexCode;
        }
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

    get patternSymbol(): string {
        return this._patternSymbol;
    }

    set patternSymbol(patternSymbol: string) {
        if(!validatePatternSymbol(patternSymbol)) {
            throw new Error(`invalid patternSymbol provided: '${patternSymbol}'. patternSymbol must be a single non-whitespace character`);
        }
    }

    get flossStrands(): Floss[] {
        return this._flossStrands;
    }

    set flossStrands(flossStrands: Floss[]) {
        if(!(flossStrands.length > 0)) {
            throw new Error('flossStrands is empty. At least one Floss strand must be defined');
        }
        this._flossStrands = flossStrands;
    }

    get hexCode(): number | undefined {
        return this._hexCode;
    }

    set hexCode(hexCode: number | undefined) {
        if(hexCode && !validateNonNegativeInteger(hexCode)){
            throw new Error('hexCode must be a non-negative integer');
        }
        this._hexCode = hexCode;
    }
}