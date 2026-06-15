import type { CrossStitchPattern, StitchKind } from './schema';
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
export type ColorStitchCounts = StitchCounts & {
    /** The id of the color these counts belong to. */
    colorId: number;
};

/** Overall pattern stitch counts plus a per-color breakdown. */
export interface PatternTotals {
    /** Counts across the whole pattern. */
    total: StitchCounts;
    /** Counts broken down per color, in palette order. */
    byColor: ColorStitchCounts[];
}

/** The width and height of a pattern, measured in whole stitches. */
export interface PatternDimensions {
    /** Width in stitches. */
    stitchWidth: number;
    /** Height in stitches. */
    stitchHeight: number;
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
    const byColor = new Map<number, ColorStitchCounts>();
    for (const color of pattern.colors) {
        byColor.set(color.id, { colorId: color.id, ...emptyCounts() });
    }
    for (const stitch of pattern.stitches) {
        const key = KIND_TO_COUNT_KEY[stitch.kind];
        total[key] += 1;
        const colorCounts = byColor.get(stitch.colorId);
        if (colorCounts !== undefined) {
            colorCounts[key] += 1;
        }
    }
    return { total, byColor: [...byColor.values()] };
}

/**
 * Calculate the width and height of a pattern from its stitches.
 *
 * Corner-anchored stitches (full, half, quarter, three-quarter) occupy the whole grid
 * square at their lower-left corner; back and long stitches extend to their endpoints.
 * Dimensions are rounded up to whole stitches.
 *
 * @param pattern - The pattern to measure.
 * @returns The pattern width and height in stitches.
 */
export function calculateDimensions(pattern: CrossStitchPattern): PatternDimensions {
    let maxX = 0;
    let maxY = 0;
    for (const stitch of pattern.stitches) {
        const bounds = stitchBounds(stitch);
        if (bounds.maxX > maxX) {
            maxX = bounds.maxX;
        }
        if (bounds.maxY > maxY) {
            maxY = bounds.maxY;
        }
    }
    return { stitchWidth: Math.ceil(maxX), stitchHeight: Math.ceil(maxY) };
}
