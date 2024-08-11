import { validateNonNegativeInteger } from '../validation';
import { StitchTotals } from './StitchTotals';

/**
 * A model class representing total stitch counts by stitch type
 */
export class StitchColorTotals extends StitchTotals {
    private _colorId!: number;

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
        colorId: number,
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
        this.colorId = colorId;
    }

    get colorId(): number {
        return this._colorId;
    }

    set colorId(colorId: number) {
        if(!validateNonNegativeInteger(colorId)) {
            throw new Error('colorId must be a non negative integer');
        }
        this._colorId = colorId;
    }
}