import { z } from 'zod';
import { CrossStitchPattern, CrossStitchPatternJson } from '../src/schema';
import { MALFORMED_JSON, UNKNOWN_COLOR_JSON, VALID_PATTERN, VALID_PATTERN_JSON, clonePattern } from './test-utils';

test('CrossStitchPattern accepts a valid pattern', () => {
    expect(CrossStitchPattern.safeParse(VALID_PATTERN).success).toBe(true);
});

test('CrossStitchPattern reports duplicate color ids', () => {
    const pattern = clonePattern();
    pattern.colors[1].id = 0;
    const result = CrossStitchPattern.safeParse(pattern);
    expect(result.success).toBe(false);
    if (!result.success) {
        expect(result.error.issues.some((issue) => issue.message.includes('duplicate color id'))).toBe(true);
    }
});

test('CrossStitchPattern reports duplicate color symbols', () => {
    const pattern = clonePattern();
    pattern.colors[1].symbol = '@';
    const result = CrossStitchPattern.safeParse(pattern);
    expect(result.success).toBe(false);
    if (!result.success) {
        expect(result.error.issues.some((issue) => issue.message.includes('duplicate color symbol'))).toBe(true);
    }
});

test('CrossStitchPattern reports stitches referencing an unknown color id', () => {
    const pattern = clonePattern();
    pattern.stitches[0].colorId = 99;
    const result = CrossStitchPattern.safeParse(pattern);
    expect(result.success).toBe(false);
    if (!result.success) {
        expect(result.error.issues.some((issue) => issue.message.includes('unknown color id'))).toBe(true);
    }
});

test('CrossStitchPatternJson decodes valid JSON and applies schema defaults', () => {
    const result = CrossStitchPatternJson.safeParse(VALID_PATTERN_JSON);
    expect(result.success).toBe(true);
    if (result.success) {
        expect(result.data.colors[0].strands[0].strandCount).toBe(1);
    }
});

test('CrossStitchPatternJson reports malformed JSON as an issue instead of throwing', () => {
    const result = CrossStitchPatternJson.safeParse(MALFORMED_JSON);
    expect(result.success).toBe(false);
    if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
    }
});

test('CrossStitchPatternJson reports semantic errors', () => {
    expect(CrossStitchPatternJson.safeParse(UNKNOWN_COLOR_JSON).success).toBe(false);
});

test('CrossStitchPatternJson encodes a pattern back to JSON and round-trips', () => {
    const pattern = CrossStitchPattern.parse(VALID_PATTERN);
    const encoded = z.safeEncode(CrossStitchPatternJson, pattern);
    expect(encoded.success).toBe(true);
    if (encoded.success) {
        expect(typeof encoded.data).toBe('string');
        const decoded = CrossStitchPatternJson.safeParse(encoded.data);
        expect(decoded.success).toBe(true);
    }
});
