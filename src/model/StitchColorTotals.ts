import { StitchTotals } from './StitchTotals';

/**
 * A model class representing total stitch counts by stitch type
 */
export class StitchColorTotals extends StitchTotals {
    /**
     * TODO JSDoc!!
     * @param colorId
     * @param totalFullStitches
     * @param totalThreeQuarterStitches
     * @param totalHalfStitches
     * @param totalQuarterStitches
     * @param totalBackStitches
     * @param totalLongStitches
     */
    constructor(
        public colorId: number,
        totalFullStitches?: number,
        totalThreeQuarterStitches?: number,
        totalHalfStitches?: number,
        totalQuarterStitches?: number,
        totalBackStitches?: number,
        totalLongStitches?: number
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