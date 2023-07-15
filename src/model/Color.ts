import { validateNonNegativeInteger, validatePatternSymbol } from '../validation';
import { Strand } from './Strand';

/**
 * Model class representing a color used in the pattern.
 *
 * A color represents a color used in the pattern. The color is made up of one or more strands of floss.
 * Each strand can be a different color, allowing blended colors to be defined.
 */
export class Color {

    private colorId!: number;
    private patternSymbol!: string;
    private strands!: Strand[];

    /**
     * @param colorId - An id for the color. Stitches will use to reference which color they are.
     * @param colorName - A name for the overall color.
     * @param patternSymbol - The ASCII character used to represent the color on the pattern visually.
     * @param strands - An array of strand objects defining all the strands of floss that make up the color.
     *
     * @throws {@link Error} if any invalid parameters are provided.
     */
    constructor(
        colorId: number,
        public colorName: string,
        patternSymbol: string,
        strands: Strand[]
    ){
        if(!this.setColorId(colorId)) {
            throw new Error(`invalid colorId provided: ${colorId}`);
        }
        if(!this.setPatternSymbol(patternSymbol)) {
            throw new Error(`invalid patternSymbol provided: '${patternSymbol}'. patternSymbol must be a single non-whitespace character`);
        }
        if(!this.setStrands(strands)) {
            throw new Error('strands is empty. At least one Strand must be defined');
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

    public setPatternSymbol(patternSymbol: string): boolean {
        if(validatePatternSymbol(patternSymbol)) {
            this.patternSymbol = patternSymbol;
            return true;
        }

        return false;
    }

    public getPatternSymbol(): string | undefined {
        return this.patternSymbol;
    }

    public setStrands(strands: Strand[]): boolean {
        if(strands.length > 0) {
            this.strands = strands;
            return true;
        }

        return false;
    }

    public getStrands(): Strand[] {
        return this.strands;
    }
}