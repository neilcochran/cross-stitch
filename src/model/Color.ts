import { Strand } from "./Strand";

export class Color {
    
    constructor(
        public colorId: number,
        public colorName: string,
        public patternSymbol: string,
        public strands: Strand[],
        public totalFullStitches?: number,
        public totalThreeQuarterStitches?: number,
        public totalHalfStitches?: number,
        public totalQuarterStitches?: number,
        public totalBackStitches?: number,
        public totalLongStitches?: number
    ){}
}