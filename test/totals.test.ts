import { CrossStitchPattern, calculateDimensions, calculateTotals } from '../src';
import { VALID_PATTERN } from './test-utils';

const pattern = CrossStitchPattern.parse(VALID_PATTERN);

test('calculateDimensions measures the pattern and reports a zero offset when anchored at the origin', () => {
    expect(calculateDimensions(pattern)).toEqual({ stitchWidth: 13, stitchHeight: 20, offsetX: 0, offsetY: 0 });
});

test('calculateDimensions reports the offset of a pattern not anchored at the origin', () => {
    const offset = CrossStitchPattern.parse({
        version: 1,
        colors: [{ id: 0, name: 'Blue', symbol: '@', strands: [{ brand: 'DMC', code: '825', name: 'Blue' }] }],
        stitches: [{ kind: 'full', colorId: 0, x: 5, y: 7 }]
    });
    expect(calculateDimensions(offset)).toEqual({ stitchWidth: 1, stitchHeight: 1, offsetX: 5, offsetY: 7 });
});

test('calculateTotals counts stitches overall and per color', () => {
    const totals = calculateTotals(pattern);
    expect(totals.total).toEqual({ full: 2, half: 2, quarter: 2, threeQuarter: 2, back: 2, long: 2 });
    expect(totals.byColor).toEqual([
        { colorId: 0, counts: { full: 1, half: 1, quarter: 1, threeQuarter: 1, back: 1, long: 1 } },
        { colorId: 1, counts: { full: 1, half: 1, quarter: 1, threeQuarter: 1, back: 1, long: 1 } }
    ]);
});
