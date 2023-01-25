export function validateNonNegativeInteger(input: number): boolean {
    return input % 1 == 0 && input >= 0;
}

//The only supported decimals for cross stitching are increments of 0.5
export function validateNonNegativeDecimalPrecision(input: number): boolean {
    //to avoid any floating point issue, convert to a string and attempt to split off the decimal portion.
    //if found, ensure it is always '5' to allow only decimal increments of 0.5
    const remainderString = input.toString().split('.')[1];
    return input >= 0 && (remainderString === undefined || remainderString == '5');
}

export function validateSingleSpaceDistance(x1: number, y1: number, x2: number, y2: number): boolean {
    return (x2 - x1) <= 1 && (y2 - y1) <= 1;
}

//patternSymbol must be a single non-whitespace character
export function validatePatternSymbol(patternSymbol: string): boolean {
    return patternSymbol.length === 1 && patternSymbol.trim().length === 1;
}

//TODO validation for each type if stitch - ensure distances are within limits.