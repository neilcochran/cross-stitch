/**
 * A model class representing total stitch counts by stitch type
 */
export class StitchColorTotals {
    /**
     * TODO JSDoc!!
     * @param colorId
     * @param totalFullStitches
     * @param totalThreeQuarterStitches
     * @param totalHalfStitches
     * @param totalQuarterStitches
     * @param totalBackStitches
     * @param totalLongStitches
     *
     * @throws {@link Error} TODO (if needed)!!
     */
    constructor(
        public readonly colorId: number,
        public readonly totalFullStitches: number,
        public readonly totalThreeQuarterStitches: number,
        public readonly totalHalfStitches: number,
        public readonly totalQuarterStitches: number,
        public readonly totalBackStitches: number,
        public readonly totalLongStitches: number
    ){}
}