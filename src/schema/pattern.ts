import { z } from 'zod';
import { Color } from './palette';
import { HexCode } from './primitives';
import { Stitch } from './stitch';

/** Descriptive, non-structural information about a pattern. */
export const Metadata = z.object({
    title: z.string().optional().describe('Pattern title.'),
    author: z.string().optional().describe('Pattern author or designer.'),
    copyright: z.string().optional().describe('Copyright or license statement.'),
    notes: z.string().optional().describe('Free-form notes or comments.')
});

/** Validated pattern metadata. */
export type Metadata = z.infer<typeof Metadata>;

/** The fabric a pattern is stitched on. */
export const Fabric = z.object({
    count: z.number().int().positive().describe('Fabric count in stitches per inch, e.g. 14 for 14-count Aida.'),
    hex: HexCode.optional().describe('Fabric color as a #rrggbb hexadecimal string.'),
    kind: z.string().min(1).optional().describe('Fabric type, e.g. "aida", "evenweave", or "linen".')
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
        version: z
            .literal(1)
            .describe(
                'Document format version this pattern conforms to. Independent of the cross-stitch package version; it stays 1 for the 2.0 format.'
            ),
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
                ctx.addIssue({
                    code: 'custom',
                    message: `duplicate color id ${color.id}`,
                    path: ['colors', index, 'id']
                });
            }
            seenIds.add(color.id);
            if (seenSymbols.has(color.symbol)) {
                ctx.addIssue({
                    code: 'custom',
                    message: `duplicate color symbol "${color.symbol}"`,
                    path: ['colors', index, 'symbol']
                });
            }
            seenSymbols.add(color.symbol);
        }
        for (const [index, stitch] of pattern.stitches.entries()) {
            if (!seenIds.has(stitch.colorId)) {
                ctx.addIssue({
                    code: 'custom',
                    message: `stitch references unknown color id ${stitch.colorId}`,
                    path: ['stitches', index, 'colorId']
                });
            }
        }
    });

/** A validated cross stitch pattern. */
export type CrossStitchPattern = z.infer<typeof CrossStitchPattern>;

/**
 * A JSON-string codec for {@link CrossStitchPattern}. Decoding (`CrossStitchPatternJson.safeParse`
 * or `z.decode`) parses the JSON and validates it, so malformed JSON and schema violations both
 * surface as ordinary issues rather than thrown errors. Encoding (`z.encode` / `z.safeEncode`)
 * serializes a validated pattern back to a JSON string.
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
