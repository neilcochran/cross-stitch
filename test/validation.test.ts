import { StitchAngle, StitchPlacement } from '../src/model';
import {
    validateNonNegativeDecimalPrecision,
    validateNonNegativeInteger,
    validatePatternSymbol,
    validateSingleSpaceDistance,
    validateColorId,
    validateStitchAngle,
    validateStitchPlacement
} from '../src/validation';
import { TEST_PATTERN_PROPERTIES } from './test-utils';

const validNonNegativeInts = [0, 1, 9, 9999];
const invalidInts = [-1, -99, -9999];
const validNonNegativeDecimals = [0.5, 1.5, 2.5, 9999.5];
const invalidDecimals = [-0.5, 1.3, 9.9, 0.1];

test('validateNonNegativeInteger', () => {
    //expect true
    validNonNegativeInts.forEach(int => expect(validateNonNegativeInteger(int)).toBe(true));

    //expect false
    invalidInts.forEach(int => expect(validateNonNegativeInteger(int)).toBe(false));
    validNonNegativeDecimals.forEach(float => expect(validateNonNegativeInteger(float)).toBe(false));
    invalidDecimals.forEach(float => expect(validateNonNegativeInteger(float)).toBe(false));
});

test('validateNonNegativeDecimalPrecision', () => {
    //expect true
    validNonNegativeInts.forEach(int => expect(validateNonNegativeDecimalPrecision(int)).toBe(true));
    validNonNegativeDecimals.forEach(float => expect(validateNonNegativeDecimalPrecision(float)).toBe(true));

    //expect false
    invalidInts.forEach(int => expect(validateNonNegativeDecimalPrecision(int)).toBe(false));
    invalidDecimals.forEach(float => expect(validateNonNegativeDecimalPrecision(float)).toBe(false));
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
    expect(validateColorId('0', TEST_PATTERN_PROPERTIES)).toBe(true);
    expect(validateColorId('1', TEST_PATTERN_PROPERTIES)).toBe(true);
    expect(validateColorId('abc', TEST_PATTERN_PROPERTIES)).toBe(true);


    //expect false
    expect(validateColorId('2', TEST_PATTERN_PROPERTIES)).toBe(false);
    expect(validateColorId('Q', TEST_PATTERN_PROPERTIES)).toBe(false);
    expect(validateColorId(' ', TEST_PATTERN_PROPERTIES)).toBe(false);
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