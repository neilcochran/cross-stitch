import { z } from 'zod';
import { BrandName } from './brand';
import { HexCode } from './primitives';

/**
 * A single color and brand of floss. Defaults to one strand; raise `count` when a color
 * uses multiple strands of the same floss.
 */
export const Floss = z.object({
    brand: BrandName.describe('Manufacturer of the floss.'),
    code: z.string().min(1).describe('Brand-specific code for the color, such as "721" or "Ecru".'),
    name: z.string().min(1).describe('Brand name for the color, such as "Burnt Orange".'),
    count: z.number().int().positive().default(1).describe('Number of strands of this floss to use. Defaults to 1.'),
    hex: HexCode.optional().describe('Optional color value as a #rrggbb hexadecimal string.')
});

/** A validated strand of floss. */
export type Floss = z.infer<typeof Floss>;
