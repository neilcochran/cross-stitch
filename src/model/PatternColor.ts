import { validateNonNegativeInteger, validatePatternSymbol } from '../validation';
import { Floss } from './Floss';

/**
 * Model class representing a color used in the pattern.
 *
 * A PatternColor represents a color used in the pattern. The color is made up of one or more strands of Floss.
 * Each strand can be a different color, allowing blended colors to be defined.
 */
export class PatternColor {

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
        public readonly colorId: number,
        public readonly colorName: string,
        public readonly patternSymbol: string,
        public readonly flossStrands: Floss[],
        public readonly hexCode?: number
    ){
        if(!validatePatternSymbol(patternSymbol)) {
            throw new Error(`invalid patternSymbol provided: '${patternSymbol}'. patternSymbol must be a single non-whitespace character`);
        }
        if(!(flossStrands.length > 0)) {
            throw new Error('strands is empty. At least one Strand must be defined');
        }
        if(hexCode && !validateNonNegativeInteger(hexCode)){
            throw new Error('hexCode must be a non-negative integer');
        }
    }
}