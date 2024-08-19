/**
 * A model class representing stitch totals by stitch type
 */
export class StitchTotals {
    /**
     * @param totalFullStitches - The total amount of full stitches
     * @param totalThreeQuarterStitches - The total amount of three quarter stitches
     * @param totalHalfStitches - The total amount of half stitches
     * @param totalQuarterStitches - The total amount of quarter stitches
     * @param totalBackStitches - The total amount of back stitches
     * @param totalLongStitches - The total amount of long stitches
     */
    constructor(
        public totalFullStitches?: number,
        public totalThreeQuarterStitches?: number,
        public totalHalfStitches?: number,
        public totalQuarterStitches?: number,
        public totalBackStitches?: number,
        public totalLongStitches?: number
    ){}
}