/**
 * Public entry point (`cross-stitch`). Exposes the blessed surface: the validate/serialize
 * facade, the derived-data helpers, and every type needed to describe and work with a pattern -
 * none of which require importing Zod. The Zod schema objects themselves (for composition with
 * `.pick` / `.extend` or direct `.safeParse`) are published separately on the `cross-stitch/schema`
 * subpath.
 */

// Validate and serialize patterns.
export { parsePattern, parsePatternJson, encodePattern, encodePatternSafe } from './api';
export type { PatternResult, PatternIssue, PatternPath, EncodeResult } from './api';

// Derive counts, dimensions, and per-stitch bounds.
export { calculateTotals, calculateDimensions } from './totals';
export type { StitchCounts, StitchCountKey, ColorStitchCounts, PatternTotals, PatternDimensions } from './totals';
export { stitchBounds } from './geometry';
export type { StitchBounds } from './geometry';

// The canonical stitch-kind set, plus every type needed to describe a pattern. The matching Zod
// schemas live on the `cross-stitch/schema` subpath.
export { STITCH_KINDS } from './schema';
export type {
    CrossStitchPattern,
    CrossStitchPatternInput,
    Metadata,
    Fabric,
    Color,
    Floss,
    BrandName,
    Stitch,
    StitchKind,
    FullStitch,
    HalfStitch,
    QuarterStitch,
    ThreeQuarterStitch,
    BackStitch,
    LongStitch,
    StitchAngle,
    StitchPlacement,
    Point
} from './schema';
