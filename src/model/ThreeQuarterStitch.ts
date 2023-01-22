import { StitchAngle } from "./StitchAngle";
import { StitchPlacement } from "./StitchPlacement";

export class ThreeQuarterStitch {
    
    constructor(
        public colorId: number,
        public x: number, 
        public y: number,
        public halfStitchAngle: StitchAngle,
        public quarterStitchPlacement: StitchPlacement
    ){}
}