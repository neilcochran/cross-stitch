import {
    CrossStitchPattern,
    Color,
    Floss,
    Properties,
    FullStitch,
    ThreeQuarterStitch,
    HalfStitch,
    QuarterStitch,
    BackStitch,
    LongStitch
} from './model';
import { PatternTotals } from './model/PatternTotals';
import { StitchColorTotals } from './model/StitchColorTotals';
import { validateCrossStitchPattern } from './validation';

/**
 * Parse JSON implementing the cross stitch pattern schema into the corresponding typescript objects. Constructor validation will enforce validity.
 *
 * @param json - The json string to be parsed into a CrossStitchPattern model object.
 *
 * @returns A CrossStitchPattern object.
 */
export function jsonToModel(json: string): CrossStitchPattern {
    const jsonData = JSON.parse(json);
    //MUST parse Colors first so we can ensure each stitch references an existing Color
    const colors: Color[] = [];
    for (const color of jsonData.properties.colors) {
        const flossStrands: Floss[] = [];
        for (const flossStrand of color.flossStrands) {
            flossStrands.push(
                new Floss(
                    flossStrand.colorCode,
                    flossStrand.colorName,
                    flossStrand.brandName,
                    flossStrand.strandCount ? flossStrand.strandCount : 1,
                    flossStrand.hexCode
                )
            );
        }
        colors.push(
            new Color(
                color.colorId,
                color.colorName.trim(),
                color.patternSymbol.trim(),
                flossStrands
            )
        );
    }
    const patternTotals = new PatternTotals(
        jsonData.properties?.patternTotals?.totalFullStitches ?? 0,
        jsonData.properties?.patternTotals?.totalThreeQuarterStitches ?? 0,
        jsonData.properties?.patternTotals?.totalHalfStitches ?? 0,
        jsonData.properties?.patternTotals?.totalQuarterStitches ?? 0,
        jsonData.properties?.patternTotals?.totalBackStitches ?? 0,
        jsonData.properties?.patternTotals?.totalLongStitches ?? 0,
        jsonData.properties?.patternTotals?.stitchColorTotals ?? []
    );

    const properties = new Properties(
        colors,
        patternTotals,
        jsonData.properties?.stitchWidth,
        jsonData.properties?.stitchHeight,
        jsonData.properties?.notes
    );
    const fullStitches: FullStitch[] = [];
    const threeQuarterStitches: ThreeQuarterStitch[] = [];
    const halfStitches: HalfStitch[] = [];
    const quarterStitches: QuarterStitch[] = [];
    const backStitches: BackStitch[] = [];
    const longStitches: LongStitch[] = [];

    if (jsonData.fullStitches) {
        for (const fullStitch of jsonData.fullStitches) {
            const newFullStitch = new FullStitch(fullStitch.colorId, fullStitch.x, fullStitch.y);
            fullStitches.push(newFullStitch);
        }
    }

    if (jsonData.threeQuarterStitches) {
        for (const threeQuarterStitch of jsonData.threeQuarterStitches) {
            const newThreeQuarterStitch = new ThreeQuarterStitch(
                threeQuarterStitch.colorId,
                threeQuarterStitch.x,
                threeQuarterStitch.y,
                threeQuarterStitch.halfStitchAngle,
                threeQuarterStitch.quarterStitchPlacement
            );
            threeQuarterStitches.push(newThreeQuarterStitch);
        }
    }

    if (jsonData.halfStitches) {
        for (const halfStitch of jsonData.halfStitches) {
            const newHalfStitch = new HalfStitch(
                halfStitch.colorId,
                halfStitch.x,
                halfStitch.y,
                halfStitch.stitchAngle
            );
            halfStitches.push(newHalfStitch);
        }
    }

    if (jsonData.quarterStitches) {
        for (const quarterStitch of jsonData.quarterStitches) {
            const newQuarterStitch = new QuarterStitch(
                quarterStitch.colorId,
                quarterStitch.x,
                quarterStitch.y,
                quarterStitch.placement
            );
            quarterStitches.push(newQuarterStitch);
        }
    }

    if (jsonData.backStitches) {
        for (const backStitch of jsonData.backStitches) {
            const newBackStitch = new BackStitch(
                backStitch.colorId,
                backStitch.x,
                backStitch.y,
                backStitch.x2,
                backStitch.y2
            );
            backStitches.push(newBackStitch);
        }
    }

    if (jsonData.longStitches) {
        for (const longStitch of jsonData.longStitches) {
            const newLongStitch = new LongStitch(
                longStitch.colorId,
                longStitch.x,
                longStitch.y,
                longStitch.x2,
                longStitch.y2
            );
            longStitches.push(newLongStitch);
        }
    }

    const pattern = {
        properties,
        fullStitches,
        threeQuarterStitches,
        halfStitches,
        quarterStitches,
        backStitches,
        longStitches
    };

    if (!validateCrossStitchPattern(pattern)) {
        throw new Error('invalid CrossStitchPattern JSON');
    }

    return pattern;
}

/**
 * Calculate the pattern's stitchWidth and stitchHeight
 *
 * @param crossStitchPattern - The pattern to calculate the dimensions of
 */
export function calculatePatternDimensions(crossStitchPattern: CrossStitchPattern): {
    stitchWidth: number;
    stitchHeight: number;
} {
    let maxX = 0;
    let maxY = 0;
    for (const fullStitch of crossStitchPattern.fullStitches) {
        if (fullStitch.x > maxX) {
            maxX = fullStitch.x;
        }
        if (fullStitch.y > maxY) {
            maxY = fullStitch.y;
        }
    }

    for (const threeQuarterStitch of crossStitchPattern.threeQuarterStitches) {
        if (threeQuarterStitch.x > maxX) {
            maxX = threeQuarterStitch.x;
        }
        if (threeQuarterStitch.y > maxY) {
            maxY = threeQuarterStitch.y;
        }
    }

    for (const halfStitch of crossStitchPattern.halfStitches) {
        if (halfStitch.x > maxX) {
            maxX = halfStitch.x;
        }
        if (halfStitch.y > maxY) {
            maxY = halfStitch.y;
        }
    }

    for (const quarterStitch of crossStitchPattern.quarterStitches) {
        if (quarterStitch.x > maxX) {
            maxX = quarterStitch.x;
        }
        if (quarterStitch.y > maxY) {
            maxY = quarterStitch.y;
        }
    }
    //since the x,y describe the lower left corner of the stitches, the actual width will be +1 to account for the width & height of the stitch
    //Additionally, quarter stitches are considered to have a width of 1 regardless of the quarter stitches placement within the grid space
    //Edge case: to ensure a zero width or zero height pattern (such as an empty pattern) doesn't get rounded to 1 here, check if any stitches of the above types exist.
    //If they don't, it's a zero width or height pattern, and if they do, they we must have encountered x & y values of only 0 (a nonsensical pattern), which means we should still increment below.
    if (
        crossStitchPattern.fullStitches.length > 0 ||
        crossStitchPattern.threeQuarterStitches.length > 0 ||
        crossStitchPattern.halfStitches.length > 0 ||
        crossStitchPattern.quarterStitches.length > 0
    ) {
        maxX += 1;
        maxY += 1;
    }

    for (const backStitch of crossStitchPattern.backStitches) {
        if (backStitch.x2 > maxX) {
            maxX = backStitch.x2;
        }
        if (backStitch.y2 > maxY) {
            maxY = backStitch.y2;
        }
    }

    for (const longStitch of crossStitchPattern.longStitches) {
        if (longStitch.x2 > maxX) {
            maxX = longStitch.x2;
        }
        if (longStitch.y2 > maxY) {
            maxY = longStitch.y2;
        }
    }
    //pattern dimensions are always rounded up to the nearest integer
    return {
        stitchWidth: Math.ceil(maxX),
        stitchHeight: Math.ceil(maxY)
    };
}
/**
 * Calculate the overall stitch totals and stitch totals by color for the given pattern.
 *
 * @param crossStitchPattern - The pattern to calculate the totals of
 *
 * @returns A PatternTotals object
 */
export function calculatePatternTotals(crossStitchPattern: CrossStitchPattern): PatternTotals {
    const patternTotals = new PatternTotals(
        crossStitchPattern.fullStitches.length,
        crossStitchPattern.threeQuarterStitches.length,
        crossStitchPattern.halfStitches.length,
        crossStitchPattern.quarterStitches.length,
        crossStitchPattern.backStitches.length,
        crossStitchPattern.longStitches.length
    );
    //count stitch totals by color
    const allStitchColorTotals = [];
    if (crossStitchPattern.properties.colors) {
        //initialize all colors
        for (const color of crossStitchPattern.properties.colors) {
            allStitchColorTotals.push(new StitchColorTotals(color.colorId));
        }
        //iterate each type of stitch, updating color totals
        for (const fullStitch of crossStitchPattern.fullStitches) {
            const stitchColor = allStitchColorTotals.find((totals) => fullStitch.colorId === totals.colorId);
            if (!stitchColor) {
                throw new Error(`Encountered an unknown colorId: ${fullStitch.colorId}`);
            }
            stitchColor.totalFullStitches =
                stitchColor.totalFullStitches == undefined ? 1 : stitchColor.totalFullStitches + 1;
        }

        for (const threeQuarterStitch of crossStitchPattern.threeQuarterStitches) {
            const stitchColor = allStitchColorTotals.find((totals) => threeQuarterStitch.colorId === totals.colorId);
            if (!stitchColor) {
                throw new Error(`Encountered an unknown colorId: ${threeQuarterStitch.colorId}`);
            }
            stitchColor.totalThreeQuarterStitches =
                stitchColor.totalThreeQuarterStitches == undefined ? 1 : stitchColor.totalThreeQuarterStitches + 1;
        }

        for (const halfStitch of crossStitchPattern.halfStitches) {
            const stitchColor = allStitchColorTotals.find((totals) => halfStitch.colorId === totals.colorId);
            if (!stitchColor) {
                throw new Error(`Encountered an unknown colorId: ${halfStitch.colorId}`);
            }
            stitchColor.totalHalfStitches =
                stitchColor.totalHalfStitches == undefined ? 1 : stitchColor.totalHalfStitches + 1;
        }

        for (const quarterStitch of crossStitchPattern.quarterStitches) {
            const stitchColor = allStitchColorTotals.find((totals) => quarterStitch.colorId === totals.colorId);
            if (!stitchColor) {
                throw new Error(`Encountered an unknown colorId: ${quarterStitch.colorId}`);
            }
            stitchColor.totalQuarterStitches =
                stitchColor.totalQuarterStitches == undefined ? 1 : stitchColor.totalQuarterStitches + 1;
        }

        for (const backStitch of crossStitchPattern.backStitches) {
            const stitchColor = allStitchColorTotals.find((totals) => backStitch.colorId === totals.colorId);
            if (!stitchColor) {
                throw new Error(`Encountered an unknown colorId: ${backStitch.colorId}`);
            }
            stitchColor.totalBackStitches =
                stitchColor.totalBackStitches == undefined ? 1 : stitchColor.totalBackStitches + 1;
        }

        for (const longStitch of crossStitchPattern.longStitches) {
            const stitchColor = allStitchColorTotals.find((totals) => longStitch.colorId === totals.colorId);
            if (!stitchColor) {
                throw new Error(`Encountered an unknown colorId: ${longStitch.colorId}`);
            }
            stitchColor.totalLongStitches =
                stitchColor.totalLongStitches == undefined ? 1 : stitchColor.totalLongStitches + 1;
        }
    }
    patternTotals.stitchColorTotals = allStitchColorTotals;
    return patternTotals;
}
