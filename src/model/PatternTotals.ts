import { StitchColorTotals } from './StitchColorTotals';
import { StitchTotals } from './StitchTotals';

/**
 * A model class representing the calculated total stitch counts by stitch type & stitch color for a given pattern
 */
export class PatternTotals extends StitchTotals {
    /**
     * @param totalFullStitches - The total amount of full stitches in the pattern
     * @param totalThreeQuarterStitches - The total amount of three quarter stitches in the pattern
     * @param totalHalfStitches - The total amount of half stitches in the pattern
     * @param totalQuarterStitches - The total amount of quarter stitches in the pattern
     * @param totalBackStitches - The total amount of back stitches in the pattern
     * @param totalLongStitches - The total amount of long stitches in the pattern
     * @param stitchColorTotals - A list of StichTotals for each color in the pattern
     */
    constructor(
        totalFullStitches?: number,
        totalThreeQuarterStitches?: number,
        totalHalfStitches?: number,
        totalQuarterStitches?: number,
        totalBackStitches?: number,
        totalLongStitches?: number,
        public stitchColorTotals?: StitchColorTotals[]
    ) {
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
