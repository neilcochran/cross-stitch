import { BackStitch } from './BackStitch';
import { FullStitch } from './FullStitch';
import { HalfStitch } from './HalfStitch';
import { LongStitch } from './LongStitch';
import { Properties } from './Properties';
import { QuarterStitch } from './QuarterStitch';
import { ThreeQuarterStitch } from './ThreeQuarterStitch';

/**
 * Model interface representing a full cross stitch pattern.
 */
export interface CrossStitchPattern {
    properties: Properties;
    fullStitches: FullStitch[];
    threeQuarterStitches: ThreeQuarterStitch[];
    halfStitches: HalfStitch[];
    quarterStitches: QuarterStitch[];
    backStitches: BackStitch[];
    longStitches: LongStitch[];
}
