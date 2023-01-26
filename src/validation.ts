/**
 * Validate that the input number is non negative and an integer.
 *
 * @param input - The number to validate.
 *
 * @returns True if the input is valid, false otherwise.
 */
export function validateNonNegativeInteger(input: number): boolean {
    return input % 1 == 0 && input >= 0;
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
 * @param x1 - The x1 coordinate of the first point.
 * @param y1 - The y1 coordinate of the first point.
 * @param x2 - The x2 coordinate of the second point.
 * @param y2 - The y2 coordinate of the second point.
 *
 * @returns True if the two points are within a single grid space, false otherwise.
 */
export function validateSingleSpaceDistance(x1: number, y1: number, x2: number, y2: number): boolean {
    return (x2 - x1) <= 1 && (y2 - y1) <= 1;
}

//patternSymbol must be a single non-whitespace character 33-126
/**
 * Validate that the patternSymbol string is a single printable ASCII character,
 * additionally excluding space (32), and DEL (127) leaving the acceptable ASCII range [33, 126].
 *
 * @param patternSymbol - The patternSymbol input to validate
 *
 * @returns True if the patternSymbol provided is valid, false otherwise.
 */
export function validatePatternSymbol(patternSymbol: string): boolean {
    return patternSymbol.length === 1 && patternSymbol.trim().length === 1;
}

//TODO validation for each type if stitch - ensure distances are within limits.