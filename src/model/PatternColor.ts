import { Floss } from './Floss';

/**
 * Model class representing a color used in the pattern.
 *
 * A PatternColor represents a color used in the pattern. The color is made up of one or more strands of Floss.
 * Each strand can be a different color, allowing blended colors to be defined.
 */
export class PatternColor {
    /**
     * @param colorId - An ID for the color. Stitches will use this ID to reference which color they are.
     * @param colorName - A name for the overall color.
     * @param patternSymbol - The ASCII character used to represent the color on the pattern visually.
     * @param flossStrands - An array of Floss objects defining all the strands of floss that make up the color.
     * @param hexCode - Optionally defines the color's hexadecimal value.
     */
    constructor(
        public colorId: number,
        public colorName: string,
        public patternSymbol: string,
        public flossStrands: Floss[],
        public hexCode?: number
    ) {}
}
