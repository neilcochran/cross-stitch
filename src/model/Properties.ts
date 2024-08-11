import { validateNonNegativeInteger } from '../validation';
import { PatternColor } from './PatternColor';
import { PatternTotals } from './PatternTotals';

/**
 * Model class representing a pattern's properties.
 */
export class Properties {
    private _stitchWidth?: number;
    private _stitchHeight?: number;

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
        public patternColors: PatternColor[],
        public patternTotals?: PatternTotals,
        stitchWidth?: number,  //TODO calculate and make required. Consider moving to PatternTotals model?
        stitchHeight?: number, //TODO calculate and make required. Consider moving to PatternTotals model?
        public notes?: string
    ){
        this.stitchWidth = stitchWidth;
        this.stitchHeight = stitchHeight;
    }

    get stitchWidth(): number | undefined {
        return this._stitchWidth;
    }

    set stitchWidth(stitchWidth: number | undefined) {
        if(stitchWidth && !validateNonNegativeInteger(stitchWidth)){
            throw new Error(`invalid stitchWidth provided: ${stitchWidth}`);
        }
        this._stitchWidth = stitchWidth;
    }

    get stitchHeight(): number | undefined {
        return this._stitchHeight;
    }

    set stitchHeight(stitchHeight: number | undefined) {
        if(stitchHeight && !(validateNonNegativeInteger(stitchHeight))){
            throw new Error(`invalid stitchHeight provided: ${stitchHeight}`);
        }
        this._stitchHeight = stitchHeight;
    }
}