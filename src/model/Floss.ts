import { validateNonNegativeInteger } from '../validation';
import { BrandName } from './BrandName';

/**
 * A model class representing a single color of floss from a brand. This defaults to a single strand of floss, but can be increased
 * using the strandCount property
 */
export class Floss {

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
        public readonly colorCode: string,
        public readonly colorName: string,
        public readonly brandName: BrandName,
        public readonly strandCount = 1,
        public readonly hexCode?: number
    ){
        if(!validateNonNegativeInteger(strandCount) && strandCount !== 0) {
            throw new Error('Floss strand count must be greater, or equal, to 0');
        }
        if(hexCode && !validateNonNegativeInteger(hexCode)) {
            throw new Error(`Invalid hex code provided: ${hexCode}`);
        }
    }
}