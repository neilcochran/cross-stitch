import { BackStitch } from "./BackStitch";
import { FullStitch } from "./FullStitch";
import { HalfStitch } from "./HalfStitch";
import { LongStitch } from "./LongStitch";
import { Properties } from "./Properties";
import { QuarterStitch } from "./QuarterStitch";
import { ThreeQuarterStitch } from "./ThreeQuarterStitch";

export class CrossStitchPattern {

    constructor(
        public properties: Properties,
        public fullStitches: FullStitch[],
        public threeQuarterStitches: ThreeQuarterStitch[],
        public halfStitches: HalfStitch[],
        public quarterStitches: QuarterStitch[],
        public backStitches: BackStitch[],
        public longStitches: LongStitch[]
    ){}
}