import { validateNonNegativeInteger } from '../validation';
import { BrandedFloss } from './BrandedFloss';

/**
 * Model class representing a strand of floss within a defined color.
 */
export class Strand {

    private strandCount!: number;

    /**
     * @param brandedFloss - The branded floss being used for the strand
     * @param strandCount - The number of times this strand should be used in the given color.
     *
     * @throws {@link Error} if any invalid parameters are provided.
     */
    constructor(
        public brandedFloss: BrandedFloss,
        strandCount: number,
    ) {
        if(!this.setStrandCount(strandCount)){
            throw new Error(`invalid strandCount provided: ${strandCount}`);
        }
    }

    public setStrandCount(strandCount: number): boolean {
        if(validateNonNegativeInteger(strandCount)){
            this.strandCount = strandCount;
            return true;
        }
        return false;
    }

    public getStrandCount(): number {
        return this.strandCount;
    }
}