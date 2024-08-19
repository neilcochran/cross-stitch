import { StitchAngle, StitchPlacement } from '../src/model';
import {
    validateNonNegativeDecimalPrecision,
    validateNonNegativeInteger,
    validatePatternSymbol,
    validateSingleSpaceDistance,
    validateColorId,
    validateStitchAngle,
    validateStitchPlacement,
    validatePatternTotals,
    validatePatternDimensions
} from '../src/validation';
import {
    INVALID_DECIMALS,
    INVALID_DIMENSIONS_PATTERN,
    INVALID_INTS,
    INVALID_TOTALS_PATTERN,
    TEST_PATTERN_PROPERTIES,
    TEST_VALID_PATTERN,
    VALID_NON_NEG_DECIMALS,
    VALID_NON_NEG_INTS
} from './test-utils';

test('validateNonNegativeInteger', () => {
    //expect true
    VALID_NON_NEG_INTS.forEach((int) => expect(validateNonNegativeInteger(int)).toBe(true));

    //expect false
    INVALID_INTS.forEach((int) => expect(validateNonNegativeInteger(int)).toBe(false));
    VALID_NON_NEG_DECIMALS.forEach((float) => expect(validateNonNegativeInteger(float)).toBe(false));
    INVALID_DECIMALS.forEach((float) => expect(validateNonNegativeInteger(float)).toBe(false));
});

test('validateNonNegativeDecimalPrecision', () => {
    //expect true
    VALID_NON_NEG_INTS.forEach((int) => expect(validateNonNegativeDecimalPrecision(int)).toBe(true));
    VALID_NON_NEG_DECIMALS.forEach((float) => expect(validateNonNegativeDecimalPrecision(float)).toBe(true));

    //expect false
    INVALID_INTS.forEach((int) => expect(validateNonNegativeDecimalPrecision(int)).toBe(false));
    INVALID_DECIMALS.forEach((float) => expect(validateNonNegativeDecimalPrecision(float)).toBe(false));
});

test('validateSingleSpaceDistance', () => {
    //expect true
    expect(validateSingleSpaceDistance(0, 0, 1, 1)).toBe(true);
    expect(validateSingleSpaceDistance(0, 0, 0.5, 0.5)).toBe(true);
    expect(validateSingleSpaceDistance(37, 88.5, 37.5, 89.5)).toBe(true);

    //expect false
    expect(validateSingleSpaceDistance(0, 0, 1, 2)).toBe(false);
    expect(validateSingleSpaceDistance(0, 0, 1.5, 1)).toBe(false);
    expect(validateSingleSpaceDistance(9, 17, 33, 12)).toBe(false);
});

test('validatePatternSymbol', () => {
    //expect true
    expect(validatePatternSymbol('x')).toBe(true);
    expect(validatePatternSymbol('9')).toBe(true);
    expect(validatePatternSymbol('?')).toBe(true);
    expect(validatePatternSymbol('\\')).toBe(true);

    //expect false
    expect(validatePatternSymbol('')).toBe(false);
    expect(validatePatternSymbol(' ')).toBe(false);
    expect(validatePatternSymbol('ab')).toBe(false);
    expect(validatePatternSymbol('\n')).toBe(false);
});

test('validateColorId', () => {
    //expect true
    expect(validateColorId(0, TEST_PATTERN_PROPERTIES)).toBe(true);
    expect(validateColorId(1, TEST_PATTERN_PROPERTIES)).toBe(true);

    //expect false
    expect(validateColorId(-1, TEST_PATTERN_PROPERTIES)).toBe(false);
});

//only needed due to parsing from json into a model (see validateStitchAngle method documentation)
test('validateStitchAngle', () => {
    //expect true
    expect(validateStitchAngle(45)).toBe(true);
    expect(validateStitchAngle(135)).toBe(true);

    //expect false
    expect(validateStitchAngle(99 as StitchAngle));
});

//only needed due to parsing from json into a model (see validateStitchPlacement method documentation)
test('validateStitchPlacement', () => {
    //expect true
    expect(validateStitchPlacement('top-right' as StitchPlacement)).toBe(true);
    expect(validateStitchPlacement('top-left' as StitchPlacement)).toBe(true);
    expect(validateStitchPlacement('bottom-right' as StitchPlacement)).toBe(true);
    expect(validateStitchPlacement('bottom-left' as StitchPlacement)).toBe(true);

    //expect false
    expect(validateStitchPlacement('foo-bar' as StitchPlacement)).toBe(false);
});

test('validatePatternDimensions', () => {
    //expect true
    expect(validatePatternDimensions(TEST_VALID_PATTERN)).toBe(true);

    //expect false
    expect(validatePatternDimensions(INVALID_DIMENSIONS_PATTERN)).toBe(false);
});

test('validatePatternTotals', () => {
    //expect true
    expect(validatePatternTotals(TEST_VALID_PATTERN)).toBe(true);

    //expect false
    expect(validatePatternTotals(INVALID_TOTALS_PATTERN)).toBe(false);
});
