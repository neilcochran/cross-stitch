import { StitchColorTotals } from './StitchColorTotals';
import { StitchTotals } from './StitchTotals';

/**
 * A model class representing the calculated total stitch counts by stitch type & stitch color for a given pattern
 */
export class PatternTotals extends StitchTotals {
    /**
     * TODO JSDoc!!
     * @param totalFullStitches
     * @param totalThreeQuarterStitches
     * @param totalHalfStitches
     * @param totalQuarterStitches
     * @param totalBackStitches
     * @param totalLongStitches
     * @param stitchColorTotals
     */
    constructor(
        totalFullStitches?: number,
        totalThreeQuarterStitches?: number,
        totalHalfStitches?: number,
        totalQuarterStitches?: number,
        totalBackStitches?: number,
        totalLongStitches?: number,
        public stitchColorTotals?: StitchColorTotals[]
    ){
        super(
            totalFullStitches,
            totalThreeQuarterStitches,
            totalHalfStitches,
            totalQuarterStitches,
            totalBackStitches,
            totalLongStitches
        );
    }
}