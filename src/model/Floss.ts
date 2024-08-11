import { validateNonNegativeInteger } from '../validation';
import { BrandName } from './BrandName';

/**
 * A model class representing a single color of floss from a brand. This defaults to a single strand of floss, but can be increased
 * using the strandCount property
 */
export class Floss {
    private _strandCount!: number;
    private _hexCode?: number;
    /**
     * @param colorCode - The brand given code for the floss (i.e. '721' or 'Ecru')
     * @param colorName - The brand given description of the floss color (i.e. 'Burnt Orange')
     * @param brandName - The brand name of the floss
     * @param strandCount - The number of strands of this floss that are to be used. By default, this is 1.
     * @param hexCode - The optional hexadecimal color code
     *
     * @throws {@link Error} TODO!!
     */
    constructor(
        public colorCode: string,
        public colorName: string,
        public brandName: BrandName,
        strandCount = 1,
        hexCode?: number
    ){
        this.strandCount = strandCount;
        if(hexCode) {
            this.hexCode = hexCode;
        }
    }

    get strandCount(): number {
        return this._strandCount;
    }

    set strandCount(strandCount: number) {
        if(!validateNonNegativeInteger(strandCount) && strandCount !== 0) {
            throw new Error('Floss strandCount must be greater, or equal, to 0');
        }
        this._strandCount = strandCount;
    }

    get hexCode(): number | undefined {
        return this._hexCode;
    }

    set hexCode(hexCode: number | undefined) {
        if(hexCode && !validateNonNegativeInteger(hexCode)) {
            throw new Error('hexCode must be a non-negative integer');
        }
        this._hexCode = hexCode;
    }
}