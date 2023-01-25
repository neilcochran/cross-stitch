import { validateNonNegativeInteger } from '../validation';

/**
 * Model class representing a strand of thread within a defined color.
 */
export class Strand {

    private strandCount!: number;

    /**
     * @param dmcThreadCode - The DMC color code
     * @param strandCount - The number of times this strand should be used in the given color.
     * @param colorName - The name of the strand color.
     *
     * @throws {@link Error} if any invalid parameters are provided.
     */
    constructor(
        public dmcThreadCode: string,
        strandCount: number,
        public colorName?: string
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