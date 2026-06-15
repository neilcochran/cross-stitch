import { z } from 'zod';

/** True when a number lands on a whole grid step or an exact half-step (a multiple of 0.5). */
export function isHalfStep(value: number): boolean {
    return Number.isInteger(value * 2);
}

/**
 * A non-negative grid coordinate measured in stitches. Whole numbers and half-step
 * (0.5) increments are valid; finer subdivisions correspond to no real stitch and are
 * rejected.
 */
export const Coordinate = z
    .number()
    .nonnegative()
    .refine(isHalfStep, { message: 'coordinate must be a whole number or a multiple of 0.5' });

/** A validated grid coordinate. */
export type Coordinate = z.infer<typeof Coordinate>;

/**
 * A non-negative whole-number grid coordinate, for stitches that can only begin on an
 * integer grid corner (full, half, quarter, and three-quarter stitches).
 */
export const IntegerCoordinate = z.number().int().nonnegative();

/** A validated whole-number grid coordinate. */
export type IntegerCoordinate = z.infer<typeof IntegerCoordinate>;

/** A non-negative integer color identifier referenced by stitches. */
export const ColorId = z.number().int().nonnegative();

/** A validated color identifier. */
export type ColorId = z.infer<typeof ColorId>;

/** A color value expressed as a `#rrggbb` hexadecimal string. */
export const HexCode = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'hexCode must be a #rrggbb hexadecimal color');

/** A validated `#rrggbb` hex color string. */
export type HexCode = z.infer<typeof HexCode>;

/**
 * A single printable ASCII character (codes 33 to 126) used to render a color on a
 * chart. Space and DEL are excluded so symbols stay visually unambiguous.
 */
export const PatternSymbol = z
    .string()
    .refine((symbol) => symbol.length === 1 && symbol.charCodeAt(0) > 32 && symbol.charCodeAt(0) < 127, {
        message: 'patternSymbol must be a single printable ASCII character (codes 33 to 126)'
    });

/** A validated single-character chart symbol. */
export type PatternSymbol = z.infer<typeof PatternSymbol>;
