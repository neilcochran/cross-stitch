import type { CrossStitchPatternInput } from '../src';

/** A fully valid pattern that exercises all six stitch kinds across two colors. */
export const VALID_PATTERN: CrossStitchPatternInput = {
    schemaVersion: 1,
    metadata: { title: 'Tiny Sampler', author: 'Test', notes: 'A contrived example.' },
    fabric: { count: 14, hex: '#f5f5dc', kind: 'aida' },
    colors: [
        {
            id: 0,
            name: 'Dark Blue',
            symbol: '@',
            strands: [{ brand: 'DMC', code: '825', name: 'Dark Blue', strandCount: 2 }]
        },
        {
            id: 1,
            name: 'Orange Blend',
            symbol: '&',
            strands: [
                { brand: 'DMC', code: '721', name: 'Orange Spice', strandCount: 1 },
                { brand: 'DMC', code: '947', name: 'Burnt Orange', strandCount: 1 }
            ]
        }
    ],
    stitches: [
        { kind: 'full', colorId: 0, x: 0, y: 1 },
        { kind: 'full', colorId: 1, x: 3, y: 4 },
        { kind: 'three-quarter', colorId: 0, x: 2, y: 1, angle: 'bl-tr', placement: 'top-left' },
        { kind: 'three-quarter', colorId: 1, x: 10, y: 7, angle: 'tl-br', placement: 'bottom-left' },
        { kind: 'half', colorId: 0, x: 1, y: 1, angle: 'bl-tr' },
        { kind: 'half', colorId: 1, x: 2, y: 2, angle: 'tl-br' },
        { kind: 'quarter', colorId: 0, x: 12, y: 7, placement: 'top-left' },
        { kind: 'quarter', colorId: 1, x: 2, y: 0, placement: 'bottom-right' },
        { kind: 'back', colorId: 0, from: { x: 1, y: 1 }, to: { x: 0, y: 0 } },
        { kind: 'back', colorId: 1, from: { x: 0, y: 0 }, to: { x: 1, y: 0 } },
        { kind: 'long', colorId: 0, from: { x: 0, y: 3 }, to: { x: 3, y: 2 } },
        { kind: 'long', colorId: 1, from: { x: 10, y: 15 }, to: { x: 12, y: 20 } }
    ]
};

/** Deep clone of {@link VALID_PATTERN} for tests that mutate it into an invalid variant. */
export function clonePattern(): CrossStitchPatternInput {
    return JSON.parse(JSON.stringify(VALID_PATTERN));
}

/** Valid pattern JSON; `strandCount` is omitted on the floss to exercise the schema default. */
export const VALID_PATTERN_JSON = `{
    "schemaVersion": 1,
    "colors": [
        { "id": 0, "name": "Blue", "symbol": "@", "strands": [ { "brand": "DMC", "code": "825", "name": "Dark Blue" } ] }
    ],
    "stitches": [ { "kind": "full", "colorId": 0, "x": 0, "y": 0 } ]
}`;

/** JSON with a syntax error. */
export const MALFORMED_JSON = '{ "schemaVersion": 1, "colors": [ ] ';

/** Structurally fine JSON that references a color which does not exist. */
export const UNKNOWN_COLOR_JSON = `{
    "schemaVersion": 1,
    "colors": [
        { "id": 0, "name": "Blue", "symbol": "@", "strands": [ { "brand": "DMC", "code": "825", "name": "Dark Blue" } ] }
    ],
    "stitches": [ { "kind": "full", "colorId": 9, "x": 0, "y": 0 } ]
}`;
