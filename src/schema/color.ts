import { z } from 'zod';
import { Floss } from './floss';
import { ColorId, HexCode, PatternSymbol } from './primitives';

/**
 * A color used in a pattern, made of one or more strands of floss (which may differ from
 * each other to describe a blended color).
 */
export const Color = z.object({
    id: ColorId.describe('Identifier referenced by stitches to select this color.'),
    name: z.string().min(1).describe('Name for the overall color (it may be a blend).'),
    symbol: PatternSymbol.describe(
        'Single ASCII character used to render this color on a chart. Unique within a pattern.'
    ),
    strands: z.array(Floss).min(1).describe('The strands of floss that make up this color.'),
    hex: HexCode.optional().describe('Optional color value as a #rrggbb hexadecimal string.')
});

/** A validated pattern color. */
export type Color = z.infer<typeof Color>;
