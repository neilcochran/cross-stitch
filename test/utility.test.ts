import { TEST_INVALID_FULL_PATTERN_JSON, TEST_VALID_FULL_PATTERN_JSON } from './test-utils';
import { jsonToModel } from '../src/utility';

test('jsonToModel', () => {
    expect(jsonToModel(TEST_VALID_FULL_PATTERN_JSON)).toBeDefined();
    expect(() => jsonToModel(TEST_INVALID_FULL_PATTERN_JSON)).toThrowError();
});