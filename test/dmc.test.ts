import { Floss } from '../src/schema';
import { dmcFloss } from '../src/data/dmc';

test('dmcFloss is keyed by code across a full palette of entries', () => {
    const entries = Object.entries(dmcFloss);
    expect(entries.length).toBeGreaterThan(500);
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
    expect(dmcFloss['E5200']).toEqual({ code: 'E5200', name: 'Metallic - White', brand: 'DMC', strandCount: 1 });
    expect(dmcFloss['150'].hex).toBe('#ab0249');
});
