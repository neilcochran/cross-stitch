import { validateNonNegativeInteger, validatePatternSymbol } from '../validation';
import { Strand } from './Strand';

export class Color {

    private colorId!: number;
    private patternSymbol!: string;
    private strands!: Strand[];
    private totalFullStitches?: number;
    private totalThreeQuarterStitches?: number;
    private totalHalfStitches?: number;
    private totalQuarterStitches?: number;
    private totalBackStitches?: number;
    private totalLongStitches?: number;

    constructor(
        colorId: number,
        public colorName: string,
        patternSymbol: string,
        strands: Strand[],
        totalFullStitches?: number,
        totalThreeQuarterStitches?: number,
        totalHalfStitches?: number,
        totalQuarterStitches?: number,
        totalBackStitches?: number,
        totalLongStitches?: number
    ){
        if(!this.setColorId(colorId)) {
            throw new Error(`invalid colorId provided: ${colorId}`);
        }
        if(!this.setPatternSymbol(patternSymbol)) {
            throw new Error(`invalid patternSymbol provided: '${patternSymbol}'. patternSymbol must be a single non-whitespace character`);
        }
        if(!this.setStrands(strands)) {
            throw new Error('strands is empty. At least one Strand must be defined');
        }
        if(totalFullStitches && !this.setTotalFullStitches(totalFullStitches)) {
            throw new Error(`invalid totalFullStitches provided: ${totalFullStitches}`);
        }
        if(totalThreeQuarterStitches && !this.setTotalThreeQuarterStitches(totalThreeQuarterStitches)) {
            throw new Error(`invalid totalThreeQuarterStitches provided: ${totalThreeQuarterStitches}`);
        }
        if(totalHalfStitches && !this.setTotalHalfStitches(totalHalfStitches)) {
            throw new Error(`invalid totalHalfStitches provided: ${totalHalfStitches}`);
        }
        if(totalQuarterStitches && !this.setTotalQuarterStitches(totalQuarterStitches)) {
            throw new Error(`invalid totalQuarterStitches provided: ${totalQuarterStitches}`);
        }
        if(totalBackStitches && !this.setTotalBackStitches(totalBackStitches)) {
            throw new Error(`invalid totalBackStitches provided: ${totalBackStitches}`);
        }
        if(totalLongStitches && !this.setTotalLongStitches(totalLongStitches)) {
            throw new Error(`invalid totalLongStitches provided: ${totalLongStitches}`);
        }
    }

    public setColorId(colorId: number): boolean {
        if(validateNonNegativeInteger(colorId)){
            this.colorId = colorId;
            return true;
        }
        return false;
    }

    public getColorId(): number {
        return this.colorId;
    }

    public setPatternSymbol(patternSymbol: string): boolean {
        if(validatePatternSymbol(patternSymbol)) {
            this.patternSymbol = patternSymbol;
            return true;
        }

        return false;
    }

    public getPatternSymbol(): string | undefined {
        return this.patternSymbol;
    }

    public setStrands(strands: Strand[]): boolean {
        if(strands.length > 0) {
            this.strands = strands;
            return true;
        }

        return false;
    }

    public getStrands(): Strand[] {
        return this.strands;
    }

    public setTotalFullStitches(totalFullStitches: number): boolean {
        if(validateNonNegativeInteger(totalFullStitches)) {
            this.totalFullStitches = totalFullStitches;
            return true;
        }
        return false;
    }

    public getTotalFullStitches(): number | undefined {
        return this.totalFullStitches;
    }

    public setTotalThreeQuarterStitches(totalThreeQuarterStitches: number): boolean {
        if(validateNonNegativeInteger(totalThreeQuarterStitches)) {
            this.totalThreeQuarterStitches = totalThreeQuarterStitches;
            return true;
        }
        return false;
    }

    public getTotalThreeQuarterStitches(): number | undefined {
        return this.totalThreeQuarterStitches;
    }

    public setTotalHalfStitches(totalHalfStitches: number): boolean {
        if(validateNonNegativeInteger(totalHalfStitches)) {
            this.totalHalfStitches = totalHalfStitches;
            return true;
        }
        return false;
    }

    public getTotalHalfStitches(): number | undefined {
        return this.totalHalfStitches;
    }

    public setTotalQuarterStitches(totalQuarterStitches: number): boolean {
        if(validateNonNegativeInteger(totalQuarterStitches)) {
            this.totalQuarterStitches = totalQuarterStitches;
            return true;
        }
        return false;
    }

    public getTotalQuarterStitches(): number | undefined {
        return this.totalQuarterStitches;
    }

    public setTotalBackStitches(totalBackStitches: number): boolean {
        if(validateNonNegativeInteger(totalBackStitches)) {
            this.totalBackStitches = totalBackStitches;
            return true;
        }
        return false;
    }

    public getTotalBackStitches(): number | undefined {
        return this.totalBackStitches;
    }

    public setTotalLongStitches(totalLongStitches: number): boolean {
        if(validateNonNegativeInteger(totalLongStitches)) {
            this.totalLongStitches = totalLongStitches;
            return true;
        }
        return false;
    }

    public getTotalLongStitches(): number | undefined {
        return this.totalLongStitches;
    }
}