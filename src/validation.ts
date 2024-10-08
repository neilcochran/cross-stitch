import deepEqual from 'deep-equal';
import {
    BackStitch,
    CrossStitchPattern,
    FullStitch,
    HalfStitch,
    LongStitch,
    Color,
    Properties,
    QuarterStitch,
    StitchAngle,
    StitchPlacement,
    ThreeQuarterStitch
} from './model';
import { calculatePatternDimensions, calculatePatternTotals } from './utility';

/**
 * Validate that the input number is non negative and an integer.
 *
 * @param input - The number to validate.
 *
 * @returns True if the input is valid, false otherwise.
 */
export function validateNonNegativeInteger(input: number): boolean {
    //check for zero explicitly to avoid 0 % 0 == NaN in below check.
    if (input === 0) {
        return true;
    }
    return input % 1 == 0 && input >= 1;
}

/**
 * Validate that the input number is non negative, and either an integer or an increment of 0.5.
 * No other decimal increments are supported.
 *
 * @param input - The number to validate.
 *
 * @returns True if the input is valid, false otherwise.
 */
export function validateNonNegativeDecimalPrecision(input: number): boolean {
    //to avoid any floating point issue, convert to a string and attempt to split off the decimal portion.
    //if found, ensure it is always '5' to allow only decimal increments of 0.5
    const remainderString = input.toString().split('.')[1];
    return input >= 0 && (remainderString === undefined || remainderString == '5');
}

/**
 * Validate that the distance between two coordinate points is less than or equal to one grid space.
 *
 * @param x - The x coordinate of the first point.
 * @param y - The y coordinate of the first point.
 * @param x2 - The x2 coordinate of the second point.
 * @param y2 - The y2 coordinate of the second point.
 *
 * @returns True if the two points are within a single grid space, false otherwise.
 */
export function validateSingleSpaceDistance(x: number, y: number, x2: number, y2: number): boolean {
    return x2 - x <= 1 && y2 - y <= 1;
}

/**
 * Validate a full stitch against patterns properties. This validates the stitch's colorId maps to a valid color and
 * that the that the stitch is within the bounds of the pattern (properties.stitchWidth &  properties.stitchHeight).
 *
 * @param fullStitch - The full stitch to validate.
 * @param properties - The pattern properties, which holds the needed pattern dimensions.
 *
 * @returns True if the full stitch is valid, false otherwise.
 */
export function validateFullStitch(fullStitch: FullStitch, properties: Properties): boolean {
    //make sure the stitch has a colorId that maps to a valid color
    if (!validateColorExists(fullStitch.colorId, properties.colors)) {
        return false;
    }
    //check that the stitch is within the bounds of the pattern
    if (fullStitch.y > properties.stitchHeight) {
        return false;
    }

    if (fullStitch.x > properties.stitchWidth) {
        return false;
    }

    return true;
}

/**
 * Validate all full stitches for the given pattern.
 *
 * @param fullStitches - The pattern's full stitches to validate.
 * @param properties - The pattern's properties.
 *
 * @returns True if all full stitches are valid, false if any are invalid.
 */
export function validateAllFullStitches(fullStitches: FullStitch[], properties: Properties): boolean {
    if (fullStitches.length > 0) {
        for (const fullStitch of fullStitches) {
            if (!validateFullStitch(fullStitch, properties)) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Validate a three quarter stitch. This validates that the halfStitchAngle and quarterStitchPlacement are a valid combination.
 * If properties are provided this validates the stitch's colorId maps to a valid color.
 * Additionally if properties has a stitchHeight and/or stitchWidth defined, the relevant coordinate(s) will be range checked.
 *
 * @param threeQuarterStitch - The three quarter stitch to be validated.
 * @param properties - The pattern properties.
 *
 * @returns True if the three quarter stitch is valid, false otherwise.
 */
export function validateThreeQuarterStitch(threeQuarterStitch: ThreeQuarterStitch, properties: Properties): boolean {
    if (!validateColorExists(threeQuarterStitch.colorId, properties.colors)) {
        return false;
    }

    if (!validateStitchAngle(threeQuarterStitch.halfStitchAngle)) {
        return false;
    }

    if (!validateStitchPlacement(threeQuarterStitch.quarterStitchPlacement)) {
        return false;
    }

    //with a 45 degree half stitch angle, the quarter stitch placement must be either bottom-right or top-left
    if (threeQuarterStitch.halfStitchAngle === 45) {
        if (
            threeQuarterStitch.quarterStitchPlacement !== StitchPlacement.BOTTOM_RIGHT &&
            threeQuarterStitch.quarterStitchPlacement !== StitchPlacement.TOP_LEFT
        ) {
            return false;
        }
    } else {
        //with a 135 degree half stitch angle, the quarter stitch placement must be either bottom-left or top-right
        if (
            threeQuarterStitch.quarterStitchPlacement !== StitchPlacement.BOTTOM_LEFT &&
            threeQuarterStitch.quarterStitchPlacement !== StitchPlacement.TOP_RIGHT
        ) {
            return false;
        }
    }

    if (properties) {
        const maxHeight = properties.stitchHeight;
        //if a stitch height is provided, check that the stitch is within its bounds
        if (maxHeight && threeQuarterStitch.y > maxHeight) {
            return false;
        }

        const maxWidth = properties.stitchWidth;
        //if a stitch width is provided, check that the stitch is within its bounds
        if (maxWidth && threeQuarterStitch.x > maxWidth) {
            return false;
        }
    }

    return true;
}

/**
 * Validate all three quarter stitches for the given pattern.
 *
 * @param threeQuarterStitches - The pattern's three quarter stitches to validate.
 * @param properties - The pattern's properties.
 *
 * @returns True if all three quarter stitches are valid, false if any are invalid.
 */
export function validateAllThreeQuarterStitches(
    threeQuarterStitches: ThreeQuarterStitch[],
    properties: Properties
): boolean {
    if (threeQuarterStitches.length > 0) {
        for (const threeQuarterStitch of threeQuarterStitches) {
            if (!validateThreeQuarterStitch(threeQuarterStitch, properties)) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Validate a half stitch against pattern properties. This validates the stitch's colorId maps to a valid color and
 * if properties has a stitchHeight and/or stitchWidth defined, the relevant coordinate(s) will be range checked.
 *
 * @param halfStitch - The half stitch to validate.
 * @param properties - The pattern properties.
 *
 * @returns True if the half stitch is valid, false otherwise.
 */
export function validateHalfStitch(halfStitch: HalfStitch, properties: Properties): boolean {
    //make sure the stitch has a colorId that maps to a valid color
    if (!validateColorExists(halfStitch.colorId, properties.colors)) {
        return false;
    }

    if (!validateStitchAngle(halfStitch.stitchAngle)) {
        return false;
    }

    const maxHeight = properties.stitchHeight;
    //if a stitch height is provided, check that the stitch is within its bounds
    if (maxHeight && halfStitch.y > maxHeight) {
        return false;
    }

    const maxWidth = properties.stitchWidth;
    //if a stitch width is provided, check that the stitch is within its bounds
    if (maxWidth && halfStitch.x > maxWidth) {
        return false;
    }

    return true;
}

/**
 * Validate all half stitches for the given pattern.
 *
 * @param halfStitches - The pattern's half stitches to validate.
 * @param properties - The pattern properties.
 *
 * @returns True if all half stitches are valid, false if any are invalid.
 */
export function validateAllHalfStitches(halfStitches: HalfStitch[], properties: Properties): boolean {
    if (halfStitches.length) {
        for (const halfStitch of halfStitches) {
            if (!validateHalfStitch(halfStitch, properties)) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Validate a quarter stitch against pattern properties. This validates the stitch's colorId maps to a valid color and
 * if properties has a stitchHeight and/or stitchWidth defined, the relevant coordinate(s) will be range checked.
 *
 * @param quarterStitch - The quarter stitch to validate.
 * @param properties - The pattern properties.
 *
 * @returns True if the quarter stitch is valid, false otherwise.
 */
export function validateQuarterStitch(quarterStitch: QuarterStitch, properties: Properties): boolean {
    //make sure the stitch has a colorId that maps to a valid color
    if (!validateColorExists(quarterStitch.colorId, properties.colors)) {
        return false;
    }

    if (!validateStitchPlacement(quarterStitch.placement)) {
        return false;
    }

    const maxHeight = properties.stitchHeight;
    //if a stitch height is provided, check that the stitch is within its bounds
    if (maxHeight && quarterStitch.y > maxHeight) {
        return false;
    }

    const maxWidth = properties.stitchWidth;
    //if a stitch width is provided, check that the stitch is within its bounds
    if (maxWidth && quarterStitch.x > maxWidth) {
        return false;
    }

    return true;
}

/**
 * Validate all quarter stitches for the given pattern.
 *
 * @param quarterStitches - The pattern's quarter stitches to validate.
 * @param properties - The pattern properties.
 *
 * @returns True if all quarter stitches are valid, false if any are invalid.
 */
export function validateAllQuarterStitches(quarterStitches: QuarterStitch[], properties: Properties): boolean {
    if (quarterStitches) {
        for (const quarterStitch of quarterStitches) {
            if (!validateQuarterStitch(quarterStitch, properties)) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Validate a back stitch. This validates the back stitch's length does not exceed a single space in any direction.
 * If properties are provided this validates the stitch's colorId maps to a valid color.
 * Additionally if properties has a stitchHeight and/or stitchWidth defined, the relevant coordinate(s) will be range checked.
 *
 * @param backStitch - The back stitch to be validated.
 * @param properties - The pattern properties.
 *
 * @returns True if the back stitch is valid, false otherwise.
 */
export function validateBackStitch(backStitch: BackStitch, properties?: Properties): boolean {
    //check that the back stitch's length does not exceed a single space
    if (!validateSingleSpaceDistance(backStitch.x, backStitch.y, backStitch.x2, backStitch.y2)) {
        return false;
    }

    //if properties were provided, perform additional checks
    if (properties) {
        //make sure the stitch has a colorId that maps to a valid color
        if (!validateColorExists(backStitch.colorId, properties.colors)) {
            return false;
        }

        const maxHeight = properties.stitchHeight;
        //if a stitch height is provided, check that the stitch is within its bounds
        if (maxHeight && (backStitch.y > maxHeight || backStitch.y2 > maxHeight)) {
            return false;
        }

        const maxWidth = properties.stitchWidth;
        //if a stitch width is provided, check that the stitch is within its bounds
        if (maxWidth && (backStitch.x > maxWidth || backStitch.x2 > maxWidth)) {
            return false;
        }
    }

    return true;
}

/**
 * Validate all back stitches for the given pattern.
 *
 * @param backStitches - The pattern's back stitches to validate.
 * @param properties - The pattern properties.
 *
 * @returns True if all back stitches are valid, false if any are invalid.
 */
export function validateAllBackStitches(backStitches: BackStitch[], properties: Properties): boolean {
    if (backStitches) {
        for (const backStitch of backStitches) {
            if (!validateBackStitch(backStitch, properties)) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Validate a long stitch against pattern properties. This validates the stitch's colorId maps to a valid color and
 * if properties has a stitchHeight and/or stitchWidth defined, the relevant coordinate(s) will be range checked.
 *
 * @param longStitch - The long stitch to be validated.
 * @param properties - The pattern properties.
 *
 * @returns True if the long stitch is valid, false otherwise.
 */
export function validateLongStitch(longStitch: LongStitch, properties: Properties): boolean {
    //make sure the stitch has a colorId that maps to a valid color
    if (!validateColorExists(longStitch.colorId, properties.colors)) {
        return false;
    }

    const maxHeight = properties.stitchHeight;
    //if a stitch height is provided, check that the stitch is within its bounds
    if (maxHeight && (longStitch.y > maxHeight || longStitch.y2 > maxHeight)) {
        return false;
    }

    const maxWidth = properties.stitchWidth;
    //if a stitch width is provided, check that the stitch is within its bounds
    if (maxWidth && (longStitch.x > maxWidth || longStitch.x2 > maxWidth)) {
        return false;
    }

    return true;
}

/**
 * Validate all long stitches for the given pattern.
 *
 * @param longStitches - The pattern's long stitches to validate.
 * @param properties - The pattern properties.
 *
 * @returns True if all long stitches are valid, false if any are invalid.
 */
export function validateAllLongStitches(longStitches: LongStitch[], properties: Properties): boolean {
    if (longStitches) {
        for (const longStitch of longStitches) {
            if (!validateLongStitch(longStitch, properties)) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Validate that a stitchPlacement is a valid member of the StitchPlacement enum.
 * This is needed when parsing from JSON, where invalid enum strings may be otherwise accepted.
 *
 * @param stitchPlacement - The stitchPlacement to validate.
 *
 * @returns True if the stitchPlacement is a valid member of the StitchPlacement enum, false otherwise.
 */
export function validateStitchPlacement(stitchPlacement: StitchPlacement): boolean {
    return Object.values(StitchPlacement).includes(stitchPlacement);
}

/**
 * Validate that a stitchAngle is a valid member of the StitchAngle type alias.
 * This is needed when parsing from JSON, where invalid enum strings may be otherwise accepted
 *
 * @param stitchAngle - The stitchAngle to validate
 *
 * @returns True if the stitchAngle is a valid member of
 */
export function validateStitchAngle(stitchAngle: StitchAngle): boolean {
    return stitchAngle === 45 || stitchAngle === 135;
}

/**
 * Validate that the patternSymbol string is a single printable ASCII character,
 * additionally excluding space (32), and DEL (127) leaving the acceptable ASCII range [33, 126].
 *
 * @param patternSymbol - The patternSymbol input to validate.
 *
 * @returns True if the patternSymbol provided is valid, false otherwise.
 */
export function validatePatternSymbol(patternSymbol: string): boolean {
    //Validate patternSymbol is a single ASCII character in range [33, 126]
    if (
        patternSymbol.length !== 1 ||
        patternSymbol.trim().length !== 1 ||
        patternSymbol.charCodeAt(0) <= 32 ||
        patternSymbol.charCodeAt(0) >= 127
    ) {
        return false;
    }

    return true;
}

/**
 * Validate that all the pattern's colors have valid pattern symbols.
 *
 * @param colors - The pattern's colors to validate the symbols of.
 *
 * @returns True if all the pattern symbols are valid, false otherwise.
 */
export function validateAllPatternSymbols(colors: Color[]): boolean {
    const patternSymbols: string[] = [];
    if (colors.length > 0) {
        for (const color of colors) {
            if (!validatePatternSymbol(color.patternSymbol)) {
                return false;
            }
            if (patternSymbols.find((symbol) => symbol === color.patternSymbol) !== undefined) {
                return false;
            }
            patternSymbols.push(color.patternSymbol);
        }
    }
    return true;
}

/**
 * Validate that a colorId maps to a valid color defined in the properties.
 *
 * @param colorId - The colorId to validate.
 * @param colors - The list of colors in the pattern.
 *
 * @returns True if the colorId maps to a color defined in the colors list.
 */
export function validateColorExists(colorId: number, colors: Color[]): boolean {
    if (colorId < 0) {
        return false;
    }
    return colors.find((color) => color.colorId === colorId) !== undefined;
}

/**
 * Validate all of a pattern's color Id's to ensure they are all unique and non-negative integers.
 *
 * @param colors - The pattern's colors to validate the Id's of.
 *
 * @returns True if all the color's Id's are valid, false otherwise.
 */
export function validateAllColorIds(colors: Color[]): boolean {
    const colorIds: number[] = [];
    if (colors.length > 0) {
        for (const color of colors) {
            if (!validateNonNegativeInteger(color.colorId)) {
                return false;
            }
            if (colorIds.find((colorId) => colorId === color.colorId) !== undefined) {
                return false;
            }
            colorIds.push(color.colorId);
        }
    }
    return true;
}

/**
 * Validate all the colors in a given pattern.
 *
 * @param colors - The pattern's colors to validate.
 *
 * @returns True if all the colors are valid, false otherwise.
 */
export function validateAllColors(colors: Color[]): boolean {
    if (colors.length > 0) {
        //validate each colorId and patternSymbol is unique across all colors
        if (!validateAllColorIds(colors)) {
            return false;
        }
        if (!validateAllPatternSymbols(colors)) {
            return false;
        }
        for (const color of colors) {
            if (color.hexCode) {
                if (!validateNonNegativeInteger(color.hexCode) || color.hexCode > 0xffffff) {
                    return false;
                }
            }
            if (color.flossStrands.length === 0) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Validate the pattern's totals are accurate.
 *
 * @param crossStitchPattern - The pattern to validate the totals of.
 *
 * @returns True if the current pattern's totals are accurate, false if they are not.
 */
export function validatePatternTotals(crossStitchPattern: CrossStitchPattern): boolean {
    const recalculatedTotals = calculatePatternTotals(crossStitchPattern);
    //Intended to use Lodash's isEqual but it failed to detect equal objects for some reason.
    //Instead, use deep-equal's deepEqual which works as expected
    return deepEqual(crossStitchPattern.properties.patternTotals, recalculatedTotals);
}

/**
 * Validate the pattern's dimensions are accurate.
 *
 * @param crossStitchPattern - The pattern to validate the dimensions of.
 *
 * @returns True if the pattern's dimensions are accurate, false if they are not.
 */
export function validatePatternDimensions(crossStitchPattern: CrossStitchPattern): boolean {
    const recalculatedDimensions = calculatePatternDimensions(crossStitchPattern);
    return (
        crossStitchPattern.properties.stitchWidth === recalculatedDimensions.stitchWidth &&
        crossStitchPattern.properties.stitchHeight === recalculatedDimensions.stitchHeight
    );
}

/**
 * Validate a full pattern, applying all relevant validations.
 *
 * @param crossStitchPattern - The pattern to validate.
 *
 * @returns True if the pattern is valid, false otherwise.
 */
export function validateCrossStitchPattern(crossStitchPattern: CrossStitchPattern): boolean {
    //validate all stitches
    if (!validateAllFullStitches(crossStitchPattern.fullStitches, crossStitchPattern.properties)) {
        return false;
    }
    if (!validateAllThreeQuarterStitches(crossStitchPattern.threeQuarterStitches, crossStitchPattern.properties)) {
        return false;
    }
    if (!validateAllHalfStitches(crossStitchPattern.halfStitches, crossStitchPattern.properties)) {
        return false;
    }
    if (!validateAllQuarterStitches(crossStitchPattern.quarterStitches, crossStitchPattern.properties)) {
        return false;
    }
    if (!validateAllBackStitches(crossStitchPattern.backStitches, crossStitchPattern.properties)) {
        return false;
    }
    if (!validateAllLongStitches(crossStitchPattern.longStitches, crossStitchPattern.properties)) {
        return false;
    }

    //validate pattern properties
    if (!validateAllColors(crossStitchPattern.properties.colors)) {
        return false;
    }
    if (!validatePatternDimensions(crossStitchPattern)) {
        return false;
    }
    if (!validatePatternTotals(crossStitchPattern)) {
        return false;
    }

    return true;
}
