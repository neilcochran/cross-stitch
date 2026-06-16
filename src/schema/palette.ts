import { z } from 'zod';
import { BrandName } from './floss-brand';
import { ColorId, HexCode, NonEmptyString, PatternSymbol, PositiveInt } from './primitives';

/**
 * A single color and brand of floss. Defaults to one strand; raise `count` when a color
 * uses multiple strands of the same floss.
 */
export const Floss = z.object({
    brand: BrandName.describe('Manufacturer of the floss.'),
    code: NonEmptyString.describe('Brand-specific code for the color, such as "721" or "Ecru".'),
    name: NonEmptyString.describe('Brand name for the color, such as "Burnt Orange".'),
    count: PositiveInt.default(1).describe('Number of strands of this floss to use. Defaults to 1.'),
    hex: HexCode.optional().describe('Optional published color of this floss as a #rrggbb hexadecimal string.')
});

/** A validated strand of floss. */
export type Floss = z.infer<typeof Floss>;

/**
 * A color used in a pattern, made of one or more strands of floss (which may differ from
 * each other to describe a blended color). `hex` is the authoritative color to render;
 * `strands` describe the floss used to achieve it.
 */
export const Color = z.object({
    id: ColorId.describe('Identifier referenced by stitches to select this color.'),
    name: NonEmptyString.describe('Name for the overall color (it may be a blend).'),
    symbol: PatternSymbol.describe(
        'Single ASCII character used to render this color on a chart. Unique within a pattern.'
    ),
    strands: z.array(Floss).min(1).describe('The strands of floss that make up this color (its thread composition).'),
    hex: HexCode.optional().describe(
        'Authoritative display color as a #rrggbb hexadecimal string. When present, render this; the strands describe how it is achieved. Optional.'
    )
});

/** A validated pattern color. */
export type Color = z.infer<typeof Color>;
