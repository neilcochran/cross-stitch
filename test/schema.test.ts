import { BackStitch, Color, Floss, FullStitch, LongStitch, Stitch, ThreeQuarterStitch } from '../src';

test('FullStitch coordinates must be non-negative integers', () => {
    expect(FullStitch.safeParse({ kind: 'full', colorId: 0, x: 1, y: 2 }).success).toBe(true);

    // expect false
    expect(FullStitch.safeParse({ kind: 'full', colorId: 0, x: 1.5, y: 2 }).success).toBe(false);
    expect(FullStitch.safeParse({ kind: 'full', colorId: 0, x: -1, y: 2 }).success).toBe(false);
});

test('BackStitch allows half steps but at most one space in any direction', () => {
    expect(BackStitch.safeParse({ kind: 'back', colorId: 0, from: { x: 0, y: 0 }, to: { x: 1, y: 1 } }).success).toBe(
        true
    );
    expect(BackStitch.safeParse({ kind: 'back', colorId: 0, from: { x: 1, y: 2 }, to: { x: 1.5, y: 2 } }).success).toBe(
        true
    );

    // expect false
    expect(BackStitch.safeParse({ kind: 'back', colorId: 0, from: { x: 0, y: 0 }, to: { x: 2, y: 0 } }).success).toBe(
        false
    );
    // reversed direction: slipped past the old missing-abs check
    expect(
        BackStitch.safeParse({ kind: 'back', colorId: 0, from: { x: 33, y: 17 }, to: { x: 9, y: 12 } }).success
    ).toBe(false);
    // bad coordinate precision
    expect(BackStitch.safeParse({ kind: 'back', colorId: 0, from: { x: 0, y: 0 }, to: { x: 0.3, y: 0 } }).success).toBe(
        false
    );
});

test('ThreeQuarterStitch placement must be reachable for the angle', () => {
    // tl-br leaves the top-right and bottom-left corners free
    expect(
        ThreeQuarterStitch.safeParse({
            kind: 'three-quarter',
            colorId: 0,
            x: 0,
            y: 0,
            angle: 'tl-br',
            placement: 'top-right'
        }).success
    ).toBe(true);
    expect(
        ThreeQuarterStitch.safeParse({
            kind: 'three-quarter',
            colorId: 0,
            x: 0,
            y: 0,
            angle: 'tl-br',
            placement: 'bottom-left'
        }).success
    ).toBe(true);
    // bl-tr leaves the top-left and bottom-right corners free
    expect(
        ThreeQuarterStitch.safeParse({
            kind: 'three-quarter',
            colorId: 0,
            x: 0,
            y: 0,
            angle: 'bl-tr',
            placement: 'top-left'
        }).success
    ).toBe(true);
    expect(
        ThreeQuarterStitch.safeParse({
            kind: 'three-quarter',
            colorId: 0,
            x: 0,
            y: 0,
            angle: 'bl-tr',
            placement: 'bottom-right'
        }).success
    ).toBe(true);

    // expect false: the unreachable corners
    expect(
        ThreeQuarterStitch.safeParse({
            kind: 'three-quarter',
            colorId: 0,
            x: 0,
            y: 0,
            angle: 'tl-br',
            placement: 'top-left'
        }).success
    ).toBe(false);
    expect(
        ThreeQuarterStitch.safeParse({
            kind: 'three-quarter',
            colorId: 0,
            x: 0,
            y: 0,
            angle: 'tl-br',
            placement: 'bottom-right'
        }).success
    ).toBe(false);
    expect(
        ThreeQuarterStitch.safeParse({
            kind: 'three-quarter',
            colorId: 0,
            x: 0,
            y: 0,
            angle: 'bl-tr',
            placement: 'top-right'
        }).success
    ).toBe(false);
    expect(
        ThreeQuarterStitch.safeParse({
            kind: 'three-quarter',
            colorId: 0,
            x: 0,
            y: 0,
            angle: 'bl-tr',
            placement: 'bottom-left'
        }).success
    ).toBe(false);
});

test('Floss defaults count to 1 and validates brand and hex', () => {
    const parsed = Floss.safeParse({ brand: 'DMC', code: '721', name: 'Orange' });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
        expect(parsed.data.count).toBe(1);
    }
    expect(Floss.safeParse({ brand: 'DMC', code: '721', name: 'Orange', hex: '#f27842' }).success).toBe(true);

    // expect false
    expect(Floss.safeParse({ brand: 'DMC', code: '721', name: 'Orange', count: 0 }).success).toBe(false);
    expect(Floss.safeParse({ brand: 'Nope', code: '721', name: 'Orange' }).success).toBe(false);
    expect(Floss.safeParse({ brand: 'DMC', code: '721', name: 'Orange', hex: '0xf27842' }).success).toBe(false);
});

test('Color requires a single printable symbol and at least one floss strand', () => {
    const base = { id: 0, name: 'Blue', symbol: '@', strands: [{ brand: 'DMC', code: '825', name: 'Blue' }] };
    expect(Color.safeParse(base).success).toBe(true);

    // expect false
    expect(Color.safeParse({ ...base, symbol: ' ' }).success).toBe(false);
    expect(Color.safeParse({ ...base, symbol: 'ab' }).success).toBe(false);
    expect(Color.safeParse({ ...base, strands: [] }).success).toBe(false);
});

test('Stitch is discriminated on kind', () => {
    expect(Stitch.safeParse({ kind: 'half', colorId: 0, x: 1, y: 1, angle: 'tl-br' }).success).toBe(true);

    // expect false
    expect(Stitch.safeParse({ kind: 'nope', colorId: 0, x: 1, y: 1 }).success).toBe(false);
});

test('BackStitch rejects an empty (zero-length) span', () => {
    // expect false
    expect(BackStitch.safeParse({ kind: 'back', colorId: 0, from: { x: 1, y: 1 }, to: { x: 1, y: 1 } }).success).toBe(
        false
    );
});

test('LongStitch must span more than one space and be non-empty', () => {
    expect(LongStitch.safeParse({ kind: 'long', colorId: 0, from: { x: 0, y: 0 }, to: { x: 2, y: 0 } }).success).toBe(
        true
    );
    expect(LongStitch.safeParse({ kind: 'long', colorId: 0, from: { x: 0, y: 0 }, to: { x: 0, y: 3 } }).success).toBe(
        true
    );

    // expect false
    // a one-space segment is a back stitch, not a long stitch
    expect(LongStitch.safeParse({ kind: 'long', colorId: 0, from: { x: 0, y: 0 }, to: { x: 1, y: 1 } }).success).toBe(
        false
    );
    // empty span
    expect(LongStitch.safeParse({ kind: 'long', colorId: 0, from: { x: 2, y: 2 }, to: { x: 2, y: 2 } }).success).toBe(
        false
    );
});
