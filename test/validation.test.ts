import { validateNonNegativeDecimalPrecision, validateNonNegativeInteger, validateSingleSpaceDistance } from '../src/validation';

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