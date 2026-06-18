import { writeFileSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';
import { CrossStitchPattern } from '../src/schema';

/**
 * Generates `cross-stitch.schema.json` from the {@link CrossStitchPattern} Zod schema. This is a
 * structure-only artifact: the semantic refinements (3/4 reachability, color id / symbol
 * uniqueness, referential integrity, the back / long span rules) have no JSON Schema
 * representation and live only in the Zod schema. Run via `npm run schema`.
 */

/** Canonical identity of the schema; resolves to the committed file on `master`. */
const SCHEMA_ID = 'https://raw.githubusercontent.com/neilcochran/cross-stitch/master/cross-stitch.schema.json';

/** Repo-root path of the generated artifact. */
const OUTPUT_PATH = join(__dirname, '..', 'cross-stitch.schema.json');

// `io: 'input'` so the artifact validates hand-authored documents (defaulted fields such as
// `strandCount` may be omitted), matching what `parsePattern` accepts.
const jsonSchema = z.toJSONSchema(CrossStitchPattern, { io: 'input' });
const document = { $id: SCHEMA_ID, ...jsonSchema };

writeFileSync(OUTPUT_PATH, `${JSON.stringify(document, null, 4)}\n`);
