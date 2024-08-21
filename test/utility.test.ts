import { INVALID_PATTERN_JSON, VALID_PATTERN, VALID_PATTERN_JSON } from './test-utils';
import { calculatePatternDimensions, calculatePatternTotals, jsonToModel } from '../src/utility';

test('jsonToModel', () => {
    //positive tests
    expect(jsonToModel(VALID_PATTERN_JSON)).toBeDefined();

    //negative tests
    expect(() => jsonToModel(INVALID_PATTERN_JSON)).toThrowError();
});

test('calculatePatternDimensions', () => {
    expect(calculatePatternDimensions(VALID_PATTERN)).toEqual({
        stitchWidth: VALID_PATTERN.properties.stitchWidth,
        stitchHeight: VALID_PATTERN.properties.stitchHeight
    });
});

test('calculatePatternTotals', () => {
    expect(calculatePatternTotals(VALID_PATTERN)).toEqual(VALID_PATTERN.properties.patternTotals);
});
