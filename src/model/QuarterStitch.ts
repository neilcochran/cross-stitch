import { StitchPlacement } from "./StitchPlacement";

export class QuarterStitch {
    
    constructor(
        public colorId: number,
        public x: number, 
        public y: number,
        public placement: StitchPlacement
    ){}
}