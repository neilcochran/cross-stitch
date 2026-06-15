import { Floss } from '../src';
import { dmcFloss } from '../src/data/dmc';

test('dmcFloss has 575 entries each keyed by its own code', () => {
    const entries = Object.entries(dmcFloss);
    expect(entries.length).toBe(575);
    for (const [key, floss] of entries) {
        expect(floss.code).toBe(key);
    }
});

test('every DMC entry is a valid Floss', () => {
    for (const floss of Object.values(dmcFloss)) {
        expect(Floss.safeParse(floss).success).toBe(true);
    }
});

test('DMC E5200 is corrected and hex colors are recovered', () => {
    expect(dmcFloss['E5200']).toEqual({ code: 'E5200', name: 'Metallic - White', brand: 'DMC', count: 1 });
    expect(dmcFloss['150'].hex).toBe('#ab0249');
});
