import { StitchTotals } from './StitchTotals';

/**
 * A model class representing total stitch counts by stitch type
 */
export class StitchColorTotals extends StitchTotals {
    /**
     * @param colorId - The ID of the color of the stitches being totaled
     * @param totalFullStitches - The total amount of full stitches using this color
     * @param totalThreeQuarterStitches - The total amount of three quarter stitches using this color
     * @param totalHalfStitches - The total amount of half stitches using this color
     * @param totalQuarterStitches - The total amount of quarter stitches using this color
     * @param totalBackStitches - The total amount of back stitches using this color
     * @param totalLongStitches - The total amount of long stitches using this color
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