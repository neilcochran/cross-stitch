import type { CrossStitchPattern, Stitch } from './schema';

/** Counts of each stitch kind. */
export interface StitchCounts {
    /** Number of full stitches. */
    full: number;
    /** Number of three-quarter stitches. */
    'three-quarter': number;
    /** Number of half stitches. */
    half: number;
    /** Number of quarter stitches. */
    quarter: number;
    /** Number of back stitches. */
    back: number;
    /** Number of long stitches. */
    long: number;
}

/** Stitch counts for a single color. */
export interface ColorStitchCounts extends StitchCounts {
    /** The color these counts belong to. */
    colorId: number;
}

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
    return { full: 0, 'three-quarter': 0, half: 0, quarter: 0, back: 0, long: 0 };
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
        total[stitch.kind] += 1;
        const colorCounts = byColor.get(stitch.colorId);
        if (colorCounts !== undefined) {
            colorCounts[stitch.kind] += 1;
        }
    }
    return { total, byColor: [...byColor.values()] };
}

function rightExtent(stitch: Stitch): number {
    if (stitch.kind === 'back' || stitch.kind === 'long') {
        return Math.max(stitch.from.x, stitch.to.x);
    }
    return stitch.x + 1;
}

function topExtent(stitch: Stitch): number {
    if (stitch.kind === 'back' || stitch.kind === 'long') {
        return Math.max(stitch.from.y, stitch.to.y);
    }
    return stitch.y + 1;
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
        const right = rightExtent(stitch);
        const top = topExtent(stitch);
        if (right > maxX) {
            maxX = right;
        }
        if (top > maxY) {
            maxY = top;
        }
    }
    return { stitchWidth: Math.ceil(maxX), stitchHeight: Math.ceil(maxY) };
}
