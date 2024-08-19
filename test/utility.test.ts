import { TEST_INVALID_FULL_PATTERN_JSON, TEST_VALID_FULL_PATTERN_JSON, TEST_VALID_PATTERN } from './test-utils';
import { calculatePatternDimensions, calculatePatternTotals, jsonToModel } from '../src/utility';

test('jsonToModel', () => {
    //positive tests
    expect(jsonToModel(TEST_VALID_FULL_PATTERN_JSON)).toBeDefined();

    //negative tests
    expect(() => jsonToModel(TEST_INVALID_FULL_PATTERN_JSON)).toThrowError();
});

test('calculatePatternDimensions', () => {
    expect(calculatePatternDimensions(TEST_VALID_PATTERN)).toEqual({
        stitchWidth: TEST_VALID_PATTERN.properties.stitchWidth,
        stitchHeight: TEST_VALID_PATTERN.properties.stitchHeight
    });
});

test('calculatePatternTotals', () => {
    expect(calculatePatternTotals(TEST_VALID_PATTERN)).toEqual(TEST_VALID_PATTERN.properties.patternTotals);
});
