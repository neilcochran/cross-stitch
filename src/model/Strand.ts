import { validateNonNegativeInteger } from '../validation';

export class Strand {

    private strandCount!: number;

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