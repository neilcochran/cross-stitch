import { StitchAngle } from "./StitchAngle";

export class HalfStitch {
    
    constructor(
        public colorId: number,
        public x: number, 
        public y: number,
        public stitchAngle: StitchAngle
    ){}   
}