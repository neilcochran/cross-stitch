import { z } from 'zod';

/**
 * A non-negative grid coordinate measured in stitches. Whole numbers and half-step
 * (0.5) increments are valid; finer subdivisions correspond to no real stitch and are
 * rejected.
 */
export const Coordinate = z
    .number()
    .nonnegative()
    .refine((value) => Number.isInteger(value * 2), {
        message: 'coordinate must be a whole number or a multiple of 0.5'
    });

/**
 * A non-negative whole-number grid coordinate, for stitches that can only begin on an
 * integer grid corner (full, half, quarter, and three-quarter stitches).
 */
export const IntegerCoordinate = z.number().int().nonnegative();

/** A non-negative integer color identifier referenced by stitches. */
export const ColorId = z.number().int().nonnegative();

/** A color value expressed as a `#rrggbb` hexadecimal string. */
export const HexCode = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'hexCode must be a #rrggbb hexadecimal color');

/**
 * A single printable ASCII character (codes 33 to 126) used to render a color on a
 * chart. Space and DEL are excluded so symbols stay visually unambiguous.
 */
export const PatternSymbol = z
    .string()
    .refine((symbol) => symbol.length === 1 && symbol.charCodeAt(0) > 32 && symbol.charCodeAt(0) < 127, {
        message: 'patternSymbol must be a single printable ASCII character (codes 33 to 126)'
    });
