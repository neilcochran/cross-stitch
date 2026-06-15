import { calculateDimensions, calculateTotals } from '../src';
import { VALID_PATTERN } from './test-utils';

test('calculateDimensions measures the pattern', () => {
    expect(calculateDimensions(VALID_PATTERN)).toEqual({ stitchWidth: 13, stitchHeight: 20 });
});

test('calculateTotals counts stitches overall and per color', () => {
    const totals = calculateTotals(VALID_PATTERN);
    expect(totals.total).toEqual({ full: 2, 'three-quarter': 2, half: 2, quarter: 2, back: 2, long: 2 });
    expect(totals.byColor).toEqual([
        { colorId: 0, full: 1, 'three-quarter': 1, half: 1, quarter: 1, back: 1, long: 1 },
        { colorId: 1, full: 1, 'three-quarter': 1, half: 1, quarter: 1, back: 1, long: 1 }
    ]);
});
