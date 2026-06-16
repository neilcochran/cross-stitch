import type { ColorId, CrossStitchPattern, StitchKind } from './schema';
import { stitchBounds } from './geometry';

/**
 * Maps a kebab-case stitch {@link StitchKind} to its camelCase totals key. Keyed by every
 * kind, so a new kind fails to type-check here until it is given a count key.
 */
const KIND_TO_COUNT_KEY = {
    full: 'full',
    half: 'half',
    quarter: 'quarter',
    'three-quarter': 'threeQuarter',
    back: 'back',
    long: 'long'
} as const satisfies Record<StitchKind, string>;

/** The camelCase key used for a stitch kind in count objects. */
export type StitchCountKey = (typeof KIND_TO_COUNT_KEY)[StitchKind];

/** Counts of each stitch kind, keyed by camelCase stitch name. */
export type StitchCounts = Record<StitchCountKey, number>;

/** Stitch counts for a single color. */
export interface ColorStitchCounts {
    /** The id of the color these counts belong to. */
    colorId: ColorId;
    /** The per-kind stitch counts for this color. */
    counts: StitchCounts;
}

/** Overall pattern stitch counts plus a per-color breakdown. */
export interface PatternTotals {
    /** Counts across the whole pattern. */
    total: StitchCounts;
    /** Counts broken down per color, in palette order. */
    byColor: ColorStitchCounts[];
}

/** The size of a pattern in whole stitches, plus the lower-left offset of its stitched area. */
export interface PatternDimensions {
    /** Width of the stitched area in stitches. */
    stitchWidth: number;
    /** Height of the stitched area in stitches. */
    stitchHeight: number;
    /** X of the lower-left corner of the stitched area (0 when anchored at the origin or empty). */
    offsetX: number;
    /** Y of the lower-left corner of the stitched area (0 when anchored at the origin or empty). */
    offsetY: number;
}

function emptyCounts(): StitchCounts {
    return { full: 0, half: 0, quarter: 0, threeQuarter: 0, back: 0, long: 0 };
}

/**
 * Count the stitches in a pattern, overall and per color.
 *
 * @param pattern - The pattern to total.
 * @returns The overall and per-color stitch counts.
 */
export function calculateTotals(pattern: CrossStitchPattern): PatternTotals {
    const total = emptyCounts();
    const byColor = new Map<ColorId, ColorStitchCounts>();
    for (const color of pattern.colors) {
        byColor.set(color.id, { colorId: color.id, counts: emptyCounts() });
    }
    for (const stitch of pattern.stitches) {
        const key = KIND_TO_COUNT_KEY[stitch.kind];
        total[key] += 1;
        const colorCounts = byColor.get(stitch.colorId);
        if (colorCounts !== undefined) {
            colorCounts.counts[key] += 1;
        }
    }
    return { total, byColor: [...byColor.values()] };
}

/**
 * Calculate the size of a pattern, and the offset of its stitched area, from its stitches.
 *
 * Corner-anchored stitches (full, half, quarter, three-quarter) occupy the whole grid
 * square at their lower-left corner; back and long stitches extend to their endpoints. The
 * width and height span the bounding box of every stitch and are rounded out to whole
 * stitches; the offset is the lower-left corner of that box. An empty pattern measures zero.
 *
 * @param pattern - The pattern to measure.
 * @returns The pattern width, height, and lower-left offset in stitches.
 */
export function calculateDimensions(pattern: CrossStitchPattern): PatternDimensions {
    if (pattern.stitches.length === 0) {
        return { stitchWidth: 0, stitchHeight: 0, offsetX: 0, offsetY: 0 };
    }
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const stitch of pattern.stitches) {
        const bounds = stitchBounds(stitch);
        if (bounds.minX < minX) {
            minX = bounds.minX;
        }
        if (bounds.minY < minY) {
            minY = bounds.minY;
        }
        if (bounds.maxX > maxX) {
            maxX = bounds.maxX;
        }
        if (bounds.maxY > maxY) {
            maxY = bounds.maxY;
        }
    }
    const offsetX = Math.floor(minX);
    const offsetY = Math.floor(minY);
    return {
        stitchWidth: Math.ceil(maxX) - offsetX,
        stitchHeight: Math.ceil(maxY) - offsetY,
        offsetX,
        offsetY
    };
}
