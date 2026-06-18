import { z } from 'zod';
import { Color } from './palette';
import { HexCode, NonEmptyString, PositiveInt } from './primitives';
import { Stitch } from './stitch';
import { addSemanticIssue } from './issues';

/** Descriptive, non-structural information about a pattern. */
export const Metadata = z.object({
    title: NonEmptyString.optional().describe('Pattern title.'),
    author: NonEmptyString.optional().describe('Pattern author or designer.'),
    copyright: NonEmptyString.optional().describe('Copyright or license statement.'),
    notes: NonEmptyString.optional().describe('Free-form notes or comments.')
});

/** Validated pattern metadata. */
export type Metadata = z.infer<typeof Metadata>;

/** The fabric a pattern is stitched on. */
export const Fabric = z.object({
    count: PositiveInt.describe('Fabric count in stitches per inch, e.g. 14 for 14-count Aida.'),
    hex: HexCode.optional().describe('Fabric color as a #rrggbb hexadecimal string.'),
    kind: NonEmptyString.optional().describe('Fabric type, e.g. "aida", "evenweave", or "linen".')
});

/** Validated fabric details. */
export type Fabric = z.infer<typeof Fabric>;

/**
 * A complete cross stitch pattern.
 *
 * Beyond per-field validation, this enforces that color ids and symbols are unique across
 * the palette and that every stitch references a color that exists.
 */
export const CrossStitchPattern = z
    .object({
        schemaVersion: z.literal(1).describe('Version of the cross-stitch document format. Currently 1.'),
        metadata: Metadata.optional(),
        fabric: Fabric.optional(),
        colors: z.array(Color).describe('The palette of colors used in the pattern.'),
        stitches: z.array(Stitch).describe('Every stitch in the pattern.')
    })
    .superRefine((pattern, ctx) => {
        const seenIds = new Set<number>();
        const seenSymbols = new Set<string>();
        for (const [index, color] of pattern.colors.entries()) {
            if (seenIds.has(color.id)) {
                addSemanticIssue(
                    ctx,
                    { kind: 'duplicate-color-id', colorId: color.id },
                    `duplicate color id ${color.id}`,
                    ['colors', index, 'id']
                );
            }
            seenIds.add(color.id);
            if (seenSymbols.has(color.symbol)) {
                addSemanticIssue(
                    ctx,
                    { kind: 'duplicate-color-symbol', symbol: color.symbol },
                    `duplicate color symbol "${color.symbol}"`,
                    ['colors', index, 'symbol']
                );
            }
            seenSymbols.add(color.symbol);
        }
        for (const [index, stitch] of pattern.stitches.entries()) {
            if (!seenIds.has(stitch.colorId)) {
                addSemanticIssue(
                    ctx,
                    { kind: 'unknown-color-reference', colorId: stitch.colorId },
                    `stitch references unknown color id ${stitch.colorId}`,
                    ['stitches', index, 'colorId']
                );
            }
        }
    });

/** A validated cross stitch pattern. */
export type CrossStitchPattern = z.infer<typeof CrossStitchPattern>;

/**
 * The input (pre-validation) shape of a {@link CrossStitchPattern}: plain numbers for ids and
 * coordinates, and defaulted fields optional. Type a pattern you build by hand with this, then
 * parse it to obtain a validated {@link CrossStitchPattern}.
 */
export type CrossStitchPatternInput = z.input<typeof CrossStitchPattern>;

/**
 * A JSON-string codec for {@link CrossStitchPattern}. Decoding (`CrossStitchPatternJson.safeParse`
 * or `z.decode`) parses the JSON and validates it, so malformed JSON and schema violations both
 * surface as ordinary issues rather than thrown errors. Encoding (`z.encode` / `z.safeEncode`)
 * re-validates the pattern against {@link CrossStitchPattern} and serializes it back to a JSON
 * string; an invalid pattern makes `z.encode` throw and `z.safeEncode` return the issues.
 */
export const CrossStitchPatternJson = z.codec(z.string(), CrossStitchPattern, {
    decode: (json, payload) => {
        try {
            return JSON.parse(json);
        } catch (error) {
            payload.issues.push({
                code: 'invalid_format',
                format: 'json',
                input: json,
                message: error instanceof Error ? error.message : 'invalid JSON'
            });
            return z.NEVER;
        }
    },
    encode: (pattern) => JSON.stringify(pattern)
});
