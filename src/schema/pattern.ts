import { z } from 'zod';
import { Color } from './color';
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
    color: HexCode.optional().describe('Fabric color as a #rrggbb hexadecimal string.'),
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
        version: z.literal(1).describe('Schema version this document conforms to.'),
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
 * A JSON-string form of {@link CrossStitchPattern}. Parsing a string with this schema
 * decodes the JSON and then validates the result, so malformed JSON and schema violations
 * both surface as ordinary `safeParse` issues rather than thrown errors.
 */
export const CrossStitchPatternJson = z
    .string()
    .transform((json, ctx) => {
        try {
            return JSON.parse(json);
        } catch (error) {
            ctx.addIssue({ code: 'custom', message: error instanceof Error ? error.message : 'invalid JSON' });
            return z.NEVER;
        }
    })
    .pipe(CrossStitchPattern);
