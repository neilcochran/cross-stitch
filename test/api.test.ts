import { encodePattern, encodePatternSafe, parsePattern, parsePatternJson } from '../src';
import { MALFORMED_JSON, UNKNOWN_COLOR_JSON, VALID_PATTERN, clonePattern } from './test-utils';

test('parsePattern returns typed data on success', () => {
    const result = parsePattern(VALID_PATTERN);
    expect(result.success).toBe(true);
    if (result.success) {
        expect(result.data.colors.length).toBe(2);
    }
});

test('parsePattern surfaces a typed unknown-color-reference issue with the offending id', () => {
    const pattern = clonePattern();
    pattern.stitches[0].colorId = 99;
    const result = parsePattern(pattern);
    expect(result.success).toBe(false);
    if (!result.success) {
        const issue = result.issues.find((i) => i.kind === 'unknown-color-reference');
        expect(issue).toBeDefined();
        if (issue && issue.kind === 'unknown-color-reference') {
            expect(issue.colorId).toBe(99);
        }
    }
});

test('parsePattern surfaces a typed duplicate-color-id issue', () => {
    const pattern = clonePattern();
    pattern.colors[1].id = 0;
    const result = parsePattern(pattern);
    expect(result.success).toBe(false);
    if (!result.success) {
        expect(result.issues.some((i) => i.kind === 'duplicate-color-id')).toBe(true);
    }
});

test('parsePattern surfaces a typed unreachable-placement issue carrying angle and placement', () => {
    const pattern = clonePattern();
    pattern.stitches[2] = { kind: 'three-quarter', colorId: 0, x: 0, y: 0, angle: 'tl-br', placement: 'top-left' };
    const result = parsePattern(pattern);
    expect(result.success).toBe(false);
    if (!result.success) {
        const issue = result.issues.find((i) => i.kind === 'unreachable-placement');
        expect(issue).toBeDefined();
        if (issue && issue.kind === 'unreachable-placement') {
            expect(issue.angle).toBe('tl-br');
            expect(issue.placement).toBe('top-left');
        }
    }
});

test('parsePattern maps structural failures to schema-violation', () => {
    const result = parsePattern({ schemaVersion: 1, colors: [], stitches: 'nope' });
    expect(result.success).toBe(false);
    if (!result.success) {
        expect(result.issues.length).toBeGreaterThan(0);
        expect(result.issues.every((i) => i.kind === 'schema-violation')).toBe(true);
    }
});

test('parsePatternJson reports malformed JSON as an issue instead of throwing', () => {
    expect(parsePatternJson(MALFORMED_JSON).success).toBe(false);
});

test('parsePatternJson rejects an unknown color reference', () => {
    expect(parsePatternJson(UNKNOWN_COLOR_JSON).success).toBe(false);
});

test('encodePattern serializes a parsed pattern and round-trips through parsePatternJson', () => {
    const parsed = parsePattern(VALID_PATTERN);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
        const json = encodePattern(parsed.data);
        expect(typeof json).toBe('string');
        expect(parsePatternJson(json).success).toBe(true);
    }
});

test('encodePatternSafe succeeds for a valid pattern', () => {
    const parsed = parsePattern(VALID_PATTERN);
    if (parsed.success) {
        expect(encodePatternSafe(parsed.data).success).toBe(true);
    }
});

test('parsePattern surfaces a typed duplicate-color-symbol issue carrying the symbol', () => {
    const pattern = clonePattern();
    pattern.colors[1].symbol = pattern.colors[0].symbol;
    const result = parsePattern(pattern);
    expect(result.success).toBe(false);
    if (!result.success) {
        const issue = result.issues.find((i) => i.kind === 'duplicate-color-symbol');
        expect(issue).toBeDefined();
        if (issue && issue.kind === 'duplicate-color-symbol') {
            expect(issue.symbol).toBe(pattern.colors[0].symbol);
        }
    }
});

test('parsePattern surfaces a typed segment-empty issue for a zero-length back stitch', () => {
    const pattern = clonePattern();
    pattern.stitches[8] = { kind: 'back', colorId: 0, from: { x: 1, y: 1 }, to: { x: 1, y: 1 } };
    const result = parsePattern(pattern);
    expect(result.success).toBe(false);
    if (!result.success) {
        expect(result.issues.some((i) => i.kind === 'segment-empty')).toBe(true);
    }
});

test('parsePattern surfaces a typed back-stitch-too-long issue', () => {
    const pattern = clonePattern();
    pattern.stitches[8] = { kind: 'back', colorId: 0, from: { x: 0, y: 0 }, to: { x: 2, y: 0 } };
    const result = parsePattern(pattern);
    expect(result.success).toBe(false);
    if (!result.success) {
        expect(result.issues.some((i) => i.kind === 'back-stitch-too-long')).toBe(true);
    }
});

test('parsePattern surfaces a typed long-stitch-too-short issue', () => {
    const pattern = clonePattern();
    pattern.stitches[10] = { kind: 'long', colorId: 0, from: { x: 0, y: 0 }, to: { x: 1, y: 1 } };
    const result = parsePattern(pattern);
    expect(result.success).toBe(false);
    if (!result.success) {
        expect(result.issues.some((i) => i.kind === 'long-stitch-too-short')).toBe(true);
    }
});

test('parsePattern maps a Zod range failure to a schema-violation with an owned code', () => {
    const result = parsePattern({
        schemaVersion: 1,
        colors: [{ id: 0, name: 'Blue', symbol: '@', strands: [{ brand: 'DMC', code: '825', name: 'Blue' }] }],
        stitches: [{ kind: 'full', colorId: 0, x: -1, y: 0 }]
    });
    expect(result.success).toBe(false);
    if (!result.success) {
        const issue = result.issues.find((i) => i.kind === 'schema-violation');
        expect(issue).toBeDefined();
        if (issue && issue.kind === 'schema-violation') {
            expect(issue.code).toBe('out-of-range');
        }
    }
});

test('encodePatternSafe returns issues for an invalid pattern instead of throwing', () => {
    const parsed = parsePattern(VALID_PATTERN);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
        const broken = parsed.data;
        broken.colors = []; // stitches now reference colors that do not exist
        const result = encodePatternSafe(broken);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.issues.length).toBeGreaterThan(0);
        }
    }
});
