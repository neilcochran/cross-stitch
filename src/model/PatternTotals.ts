import { StitchColorTotals } from './StitchColorTotals';

/**
 * A model class representing the calculated total stitch counts by stitch type & stitch color for a given pattern
 */
export class PatternTotals {

    /**
     * TODO JSDoc!!
     * @param totalFullStitches
     * @param totalThreeQuarterStitches
     * @param totalHalfStitches
     * @param totalQuarterStitches
     * @param totalBackStitches
     * @param totalLongStitches
     * @param stitchColorTotals
     *
     * @throws {@link Error} TODO (if needed)!!
     */
    constructor(
        public readonly totalFullStitches: number,
        public readonly totalThreeQuarterStitches: number,
        public readonly totalHalfStitches: number,
        public readonly totalQuarterStitches: number,
        public readonly totalBackStitches: number,
        public readonly totalLongStitches: number,
        public readonly stitchColorTotals: StitchColorTotals[]
    ){}
}