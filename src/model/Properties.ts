import { PatternColor } from './PatternColor';
import { PatternTotals } from './PatternTotals';

/**
 * Model class representing a pattern's various properties.
 */
export class Properties {
    /**
     * @param patternColors - The list of PatternColors that are used in the pattern.
     * @param patternTotals - The PatternTotals containing stitch counts by type and color
     * @param stitchWidth - The width, in stitches, of the pattern.
     * @param stitchHeight - The height, in stitches, of the pattern.
     * @param notes - Any notes or comments about the pattern.
     */
    constructor(
        public patternColors: PatternColor[],
        public patternTotals: PatternTotals,
        public stitchWidth: number,
        public stitchHeight: number,
        public notes?: string
    ) {}
}
