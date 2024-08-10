import { validateNonNegativeInteger } from '../validation';
import { PatternColor } from './PatternColor';
import { PatternTotals } from './PatternTotals';

/**
 * Model class representing a pattern's properties.
 */
export class Properties {
    /**
     * @param patternColors - The list of PatternColors that are used in the pattern.
     * @param patternTotals - The PatternTotals containing stitch counts by type and color
     * @param stitchWidth - The width, in stitches, of the pattern.
     * @param stitchHeight - The height, in stitches, of the pattern.
     * @param notes - Any notes or comments about the pattern.
     *
     * @throws {@link Error} TODO!!
     */
    constructor(
        public readonly patternColors: PatternColor[],
        public readonly patternTotals: PatternTotals,
        public readonly stitchWidth?: number,  //TODO calculate and make required. Consider moving to PatternTotals model?
        public readonly stitchHeight?: number, //TODO calculate and make required. Consider moving to PatternTotals model?
        public readonly notes?: string
    ){
        if(!(patternColors.length > 0)) {
            throw new Error('colors cannot be empty, at least one color must be defined');
        }
        if(!patternTotals) {
            throw new Error('patternTotals must be defined');
        }
        if(stitchWidth && !validateNonNegativeInteger(stitchWidth)){
            throw new Error(`invalid stitchWidth provided: ${stitchWidth}`);
        }

        if(stitchHeight && !(validateNonNegativeInteger(stitchHeight))){
            throw new Error(`invalid stitchHeight provided: ${stitchHeight}`);
        }
    }
}