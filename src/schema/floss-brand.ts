import { z } from 'zod';

/**
 * The supported floss brand names. Each value is the exact string stored in JSON.
 */
export const BrandName = z.enum([
    'Anchor',
    'Appletons',
    'Cosmo',
    'DMC',
    'J&P Coats',
    'Kreinik',
    'Madeira',
    'Presencia',
    'Sullivans',
    'Unbranded'
]);

/** A validated floss brand name. */
export type BrandName = z.infer<typeof BrandName>;
