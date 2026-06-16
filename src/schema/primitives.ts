import { z } from 'zod';

/** True when a number lands on a whole grid step or an exact half-step (a multiple of 0.5). */
function isHalfStep(value: number): boolean {
    return Number.isInteger(value * 2);
}

/** A non-empty string. */
export const NonEmptyString = z.string().min(1);

/** A validated non-empty string. */
export type NonEmptyString = z.infer<typeof NonEmptyString>;

/** A positive integer (1 or greater). */
export const PositiveInt = z.number().int().positive();

/** A validated positive integer. */
export type PositiveInt = z.infer<typeof PositiveInt>;

/**
 * A non-negative grid coordinate measured in stitches. Whole numbers and half-step
 * (0.5) increments are valid; finer subdivisions correspond to no real stitch and are
 * rejected. Branded so it cannot be interchanged with a plain number or another scalar.
 */
export const Coordinate = z
    .number()
    .nonnegative()
    .refine(isHalfStep, { message: 'coordinate must be a whole number or a multiple of 0.5' })
    .brand<'Coordinate'>();

/** A validated grid coordinate. */
export type Coordinate = z.infer<typeof Coordinate>;

/**
 * A non-negative whole-number grid coordinate, for stitches that can only begin on an
 * integer grid corner (full, half, quarter, and three-quarter stitches). Branded so it
 * cannot be interchanged with a plain number or another scalar.
 */
export const IntegerCoordinate = z.number().int().nonnegative().brand<'IntegerCoordinate'>();

/** A validated whole-number grid coordinate. */
export type IntegerCoordinate = z.infer<typeof IntegerCoordinate>;

/**
 * A non-negative integer color identifier referenced by stitches. Branded so it cannot be
 * interchanged with a coordinate or other number.
 */
export const ColorId = z.number().int().nonnegative().brand<'ColorId'>();

/** A validated color identifier. */
export type ColorId = z.infer<typeof ColorId>;

/** A color value expressed as a `#rrggbb` hexadecimal string. */
export const HexCode = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'hex must be a #rrggbb hexadecimal color');

/** A validated `#rrggbb` hex color string. */
export type HexCode = z.infer<typeof HexCode>;

/**
 * A single printable ASCII character (codes 33 to 126) used to render a color on a
 * chart. Space and DEL are excluded so symbols stay visually unambiguous.
 */
export const PatternSymbol = z
    .string()
    .refine((symbol) => symbol.length === 1 && symbol.charCodeAt(0) > 32 && symbol.charCodeAt(0) < 127, {
        message: 'symbol must be a single printable ASCII character (codes 33 to 126)'
    });

/** A validated single-character chart symbol. */
export type PatternSymbol = z.infer<typeof PatternSymbol>;
