import { validateNonNegativeInteger } from '../validation';

export class StitchTotals {
    private _totalFullStitches?: number;
    private _totalThreeQuarterStitches?: number;
    private _totalHalfStitches?: number;
    private _totalQuarterStitches?: number;
    private _totalBackStitches?: number;
    private _totalLongStitches?: number;

    /**
     * TODO JSDoc!!
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
        totalFullStitches?: number,
        totalThreeQuarterStitches?: number,
        totalHalfStitches?: number,
        totalQuarterStitches?: number,
        totalBackStitches?: number,
        totalLongStitches?: number
    ){
        this.totalFullStitches = totalFullStitches;
        this.totalThreeQuarterStitches = totalThreeQuarterStitches;
        this.totalHalfStitches = totalHalfStitches;
        this.totalQuarterStitches = totalQuarterStitches;
        this.totalBackStitches = totalBackStitches;
        this.totalLongStitches = totalLongStitches;
    }

    get totalFullStitches(): number | undefined {
        return this._totalFullStitches;
    }

    set totalFullStitches(totalFullStitches: number | undefined) {
        if(totalFullStitches && !validateNonNegativeInteger(totalFullStitches)) {
            throw new Error('totalFullStitches must be a positive integer');
        }
        this._totalFullStitches = totalFullStitches;
    }

    get totalThreeQuarterStitches(): number | undefined {
        return this._totalThreeQuarterStitches;
    }

    set totalThreeQuarterStitches(totalThreeQuarterStitches: number | undefined) {
        if(totalThreeQuarterStitches && !validateNonNegativeInteger(totalThreeQuarterStitches)) {
            throw new Error('totalThreeQuarterStitches must be a positive integer');
        }
        this._totalThreeQuarterStitches = totalThreeQuarterStitches;
    }

    get totalHalfStitches(): number | undefined {
        return this._totalHalfStitches;
    }

    set totalHalfStitches(totalHalfStitches: number | undefined) {
        if(totalHalfStitches && !validateNonNegativeInteger(totalHalfStitches)) {
            throw new Error('totalHalfStitches must be a positive integer');
        }
        this._totalHalfStitches = totalHalfStitches;
    }

    get totalQuarterStitches(): number | undefined {
        return this._totalQuarterStitches;
    }

    set totalQuarterStitches(totalQuarterStitches: number | undefined) {
        if(totalQuarterStitches && !validateNonNegativeInteger(totalQuarterStitches)) {
            throw new Error('totalQuarterStitches must be a positive integer');
        }
        this._totalQuarterStitches = totalQuarterStitches;
    }

    get totalBackStitches(): number | undefined {
        return this._totalBackStitches;
    }

    set totalBackStitches(totalBackStitches: number | undefined) {
        if(totalBackStitches && !validateNonNegativeInteger(totalBackStitches)) {
            throw new Error('totalBackStitches must be a positive integer');
        }
        this._totalBackStitches = totalBackStitches;
    }

    get totalLongStitches(): number | undefined {
        return this._totalLongStitches;
    }

    set totalLongStitches(totalLongStitches: number | undefined) {
        if(totalLongStitches && !validateNonNegativeInteger(totalLongStitches)) {
            throw new Error('totalLongStitches must be a positive integer');
        }
        this._totalLongStitches = totalLongStitches;
    }
}