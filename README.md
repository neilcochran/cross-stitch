# **cross-stitch**

This repository defines a schema to represent cross stitch patterns and provides javascript/typescript tools to work with them.

For full code documentation, please visit [`this`](https://neilcochran.github.io/cross-stitch/) page.

## Installation

Install via `npm` using the below terminal command

```
    npm install cross-stitch
```

## Usage

`cross-stitch` validates and serializes patterns through a small set of functions. The schemas underneath are built with [Zod](https://zod.dev) and are exported too (see [the Zod schemas](#advanced-the-zod-schemas) below), but you do not need to use Zod directly for everyday work. Parsing never throws; counts and dimensions are derived on demand and are not stored on the pattern.

```ts
import { parsePattern, parsePatternJson, encodePattern, calculateTotals, calculateDimensions } from 'cross-stitch';

// Validate an in-memory value
const result = parsePattern(value);
if (result.success) {
    const pattern = result.data; // fully typed CrossStitchPattern
} else {
    console.error(result.issues); // every problem found, as typed PatternIssue objects
}

// Validate a JSON string. Malformed JSON is reported as an issue, never thrown.
const parsed = parsePatternJson(jsonString);

if (result.success) {
    // Serialize a validated pattern back to a JSON string
    const json = encodePattern(result.data); // or encodePatternSafe(...) for a non-throwing result

    // Counts and dimensions are derived on demand
    const totals = calculateTotals(result.data);
    const { stitchWidth, stitchHeight, offsetX, offsetY } = calculateDimensions(result.data);
}
```

Each validation problem is a typed `PatternIssue`, discriminated on `kind`. Cross-stitch-specific variants carry structured data (`unknown-color-reference` with the offending `colorId`, `duplicate-color-id`, `unreachable-placement` with its `angle` and `placement`, and the segment-span rules), and a `schema-violation` catch-all covers structural failures. Every issue also carries a `path` and a human-readable `message`.

When you build a pattern by hand instead of parsing one, type it as `CrossStitchPatternInput` - the pre-validation shape that accepts plain numbers for ids and coordinates and lets defaulted fields be omitted - then parse it:

```ts
import { parsePattern } from 'cross-stitch';
import type { CrossStitchPatternInput } from 'cross-stitch';

const draft: CrossStitchPatternInput = {
    version: 1,
    colors: [{ id: 0, name: 'Blue', symbol: '@', strands: [{ brand: 'DMC', code: '825', name: 'Dark Blue' }] }],
    stitches: [{ kind: 'full', colorId: 0, x: 0, y: 0 }]
};
const result = parsePattern(draft);
```

### Advanced: the Zod schemas

Every schema is exported as well (`CrossStitchPattern`, `CrossStitchPatternJson`, `Stitch`, `Color`, and the rest). Reach for them to compose schemas (`.pick`, `.extend`) or to read raw Zod issues; they are the same validators the functions above are built on.

```ts
import { z } from 'zod';
import { CrossStitchPattern, CrossStitchPatternJson } from 'cross-stitch';

const result = CrossStitchPattern.safeParse(value); // Zod's native result, with result.error.issues
if (result.success) {
    const json = z.encode(CrossStitchPatternJson, result.data); // or z.safeEncode(...) to avoid throwing
}
```

The full DMC floss palette is published on a separate subpath so you only load it if you need it:

```ts
import { dmcFloss } from 'cross-stitch/dmc';

const orangeSpice = dmcFloss['721']; // { brand: 'DMC', code: '721', name: 'Orange Spice - Medium', count: 1, hex: '#...' }
```

## Versions

View all versions of in the <a href="/CHANGELOG.md">CHANGELOG.md</a>

## License

This project is licensed under the MIT License - see the <a href="/LICENSE.md">LICENSE.md</a> file for details

<br/>

## **CrossStitchPattern Schema:**

This section is the canonical reference for the pattern shape. See a full example [below](#full-schema-example).

```json
{
    "version": 1,
    "metadata": {},
    "fabric": {},
    "colors": [],
    "stitches": []
}
```

-   `version` - The document format version this pattern conforms to. Must be the number `1`. This is independent of the `cross-stitch` package version and stays `1` for the 2.0 format.

-   `metadata` - An optional [`Metadata`](#metadata-schema) object holding descriptive, non-structural information about the pattern.

-   `fabric` - An optional [`Fabric`](#fabric-schema) object describing the fabric the pattern is stitched on.

-   `colors` - An array of [`Color`](#color-schema) objects defining the palette used in the pattern.

-   `stitches` - An array of [`Stitch`](#stitch-schema) objects defining every stitch in the pattern. Each stitch is tagged with a `kind`.

Beyond per-field validation, a complete pattern must satisfy three whole-pattern rules: color `id` values are unique, color `symbol` values are unique, and every stitch's `colorId` refers to a color that exists.

<hr/>
<br/>

### **Metadata Schema:**

Optional, descriptive information about the pattern. Every field is optional.

```json
{
    "title": "Tiny Sampler",
    "author": "Jane Stitcher",
    "copyright": "(c) 2024 Jane Stitcher",
    "notes": "A contrived example."
}
```

-   `title` - The pattern title.

-   `author` - The pattern author or designer.

-   `copyright` - A copyright or license statement.

-   `notes` - Free-form notes or comments about the pattern.

<hr/>
<br/>

### **Fabric Schema:**

Describes the fabric the pattern is worked on.

```json
{
    "count": 14,
    "hex": "#f5f5dc",
    "kind": "aida"
}
```

-   `count` - The fabric count in stitches per inch (for example `14` for 14-count Aida). A positive integer.

-   `hex` - An optional fabric color as a `#rrggbb` hexadecimal string.

-   `kind` - An optional fabric type, such as `aida`, `evenweave`, or `linen`.

<hr/>
<br/>

### **Color Schema:**

A Color represents a color used in the pattern. The color is made up of one or more strands of [`Floss`](#floss-schema). Each floss strand can be a different color/brand, allowing blended colors to be defined.

```json
{
    "id": 1,
    "name": "Burnt Orange",
    "symbol": "@",
    "strands": []
}
```

-   `id` - A non-negative integer identifier referenced by stitches to select this color. Must be unique within the pattern.

-   `name` - A name for the overall color (since it could be a blend).

-   `symbol` - A single printable ASCII character (codes 33 to 126) used to represent the color on the chart. Must be unique within the pattern.

-   `strands` - An array of one or more [`Floss`](#floss-schema) objects defining the strands that make up the color (its thread composition).

-   `hex` - The authoritative display color as a `#rrggbb` hexadecimal string. When present, render this; the strands describe how the color is achieved. Optional.

<hr/>
<br/>

### **Floss Schema:**

This represents floss of a single color and brand, and by default, a single strand. If more than one strand of the same floss is needed, `count` can be increased.

```json
{
    "brand": "DMC",
    "code": "721",
    "name": "Orange Spice - Medium",
    "count": 2,
    "hex": "#f27842"
}
```

-   `brand` - The name of the brand. See a list of supported brands [`here`](#supported-brand-values).

-   `code` - A string representing the brand code for the color. This is often a number, but can be a string like `Ecru` or `Blanc`.

-   `name` - The brand's name for the color.

-   `count` - A positive integer giving the number of strands of this floss to use in the color. If not given, defaults to `1`.

-   `hex` - An optional color value as a `#rrggbb` hexadecimal string.

<hr/>
<br/>

## **Stitch Schema:**

Every entry in `stitches` is one of six kinds, discriminated by its `kind` field. All stitches carry a `colorId` referencing a [`Color`](#color-schema).

Coordinates use a lower-left origin. Cell-anchored stitches (`full`, `half`, `quarter`, `three-quarter`) sit on a grid square and take whole-integer `x` / `y` for the lower-left corner of that square. Segment stitches (`back`, `long`) take `from` and `to` points whose coordinates may also use half-step (`0.5`) values. No finer fraction is accepted, and all coordinates are non-negative.

<hr/>
<br/>

### **Full Stitch Schema:**

A full stitch covers a single square on the pattern in an 'X' shape. It is the combination of 2 opposing half stitches.

```json
{
    "kind": "full",
    "colorId": 1,
    "x": 10,
    "y": 20
}
```

-   `kind` - The literal `"full"`.

-   `colorId` - The `id` of the [`Color`](#color-schema) of the stitch.

-   `x` - The x coordinate of the lower left corner of the square.

-   `y` - The y coordinate of the lower left corner of the square.

**Example:**

![FullStitch image](https://github.com/neilcochran/cross-stitch/blob/master/images/full-stitch.png)

```json
{
    "kind": "full",
    "colorId": 1,
    "x": 1,
    "y": 1
}
```

<hr/>
<br/>

### **Half Stitch Schema:**

A half stitch is one diagonal across a grid square. It comes in two forms named for the corners they connect. A `tl-br` half goes from the top-left corner to the bottom-right corner. A `bl-tr` half goes from the bottom-left corner to the top-right corner. These are the only two valid values for `angle`.

```json
{
    "kind": "half",
    "colorId": 1,
    "x": 10,
    "y": 20,
    "angle": "tl-br"
}
```

-   `kind` - The literal `"half"`.

-   `colorId` - The `id` of the [`Color`](#color-schema) of the stitch.

-   `x` - The x coordinate of the lower left corner of the square.

-   `y` - The y coordinate of the lower left corner of the square.

-   `angle` - The half-stitch diagonal: `tl-br` or `bl-tr`.

**Examples:**

**Half Stitch tl-br**

![HalfStitch tl-br image](https://github.com/neilcochran/cross-stitch/blob/master/images/half-45.png)

```json
{
    "kind": "half",
    "colorId": 1,
    "x": 1,
    "y": 1,
    "angle": "tl-br"
}
```

<hr/>
<br/>

**Half Stitch bl-tr**

![HalfStitch bl-tr image](https://github.com/neilcochran/cross-stitch/blob/master/images/half-135.png)

```json
{
    "kind": "half",
    "colorId": 1,
    "x": 1,
    "y": 1,
    "angle": "bl-tr"
}
```

<hr/>
<br/>

### **Quarter Stitch Schema:**

A quarter stitch spans a quarter of a grid square and can be located in the `top-right`, `bottom-right`, `bottom-left`, or `top-left` quadrant of the square as indicated by `placement`. A quarter stitch is a half stitch cut in half: one end is always at the center of the square, and the other extends to the corner indicated by `placement`.

```json
{
    "kind": "quarter",
    "colorId": 1,
    "x": 10,
    "y": 20,
    "placement": "top-right"
}
```

-   `kind` - The literal `"quarter"`.

-   `colorId` - The `id` of the [`Color`](#color-schema) of the stitch.

-   `x` - The x coordinate of the lower left corner of the square.

-   `y` - The y coordinate of the lower left corner of the square.

-   `placement` - The corner of the square the quarter stitch reaches: `top-right`, `bottom-right`, `bottom-left`, or `top-left`.

**Examples:**

**Quarter Stitch Top Right**

![QuarterStitch top right image](https://github.com/neilcochran/cross-stitch/blob/master/images/quarter-top-right.png)

```json
{
    "kind": "quarter",
    "colorId": 1,
    "x": 1,
    "y": 1,
    "placement": "top-right"
}
```

<hr/>
<br/>

**Quarter Stitch Bottom Right**

![QuarterStitch bottom right image](https://github.com/neilcochran/cross-stitch/blob/master/images/quarter-bottom-right.png)

```json
{
    "kind": "quarter",
    "colorId": 1,
    "x": 1,
    "y": 1,
    "placement": "bottom-right"
}
```

<hr/>
<br/>

**Quarter Stitch Bottom Left**

![QuarterStitch bottom left image](https://github.com/neilcochran/cross-stitch/blob/master/images/quarter-bottom-left.png)

```json
{
    "kind": "quarter",
    "colorId": 1,
    "x": 1,
    "y": 1,
    "placement": "bottom-left"
}
```

<hr/>
<br/>

**Quarter Stitch Top Left**

![QuarterStitch top left image](https://github.com/neilcochran/cross-stitch/blob/master/images/quarter-top-left.png)

```json
{
    "kind": "quarter",
    "colorId": 1,
    "x": 1,
    "y": 1,
    "placement": "top-left"
}
```

<hr/>
<br/>

### **Three Quarter Stitch Schema:**

A three quarter stitch is a [half stitch](#half-stitch-schema) plus a [quarter stitch](#quarter-stitch-schema) in the same square, so both an `angle` and a `placement` are given. The quarter can only reach the two corners the half does not occupy. A `tl-br` half occupies the top-left and bottom-right corners, so its quarter is `top-right` or `bottom-left`. A `bl-tr` half occupies the bottom-left and top-right corners, so its quarter is `top-left` or `bottom-right`.

```json
{
    "kind": "three-quarter",
    "colorId": 1,
    "x": 10,
    "y": 20,
    "angle": "tl-br",
    "placement": "top-right"
}
```

-   `kind` - The literal `"three-quarter"`.

-   `colorId` - The `id` of the [`Color`](#color-schema) of the stitch.

-   `x` - The x coordinate of the lower left corner of the square.

-   `y` - The y coordinate of the lower left corner of the square.

-   `angle` - The half-stitch diagonal: `tl-br` or `bl-tr`. See the [`Half Stitch`](#half-stitch-schema) schema.

-   `placement` - The corner the quarter stitch reaches. Must be reachable for the given `angle` (see above). See the [`Quarter Stitch`](#quarter-stitch-schema) schema.

**Examples:**

**Three Quarter Stitch Top Right** (`tl-br` + `top-right`)

![ThreeQuarterStitch top right image](https://github.com/neilcochran/cross-stitch/blob/master/images/three-quarter-top-right.png)

```json
{
    "kind": "three-quarter",
    "colorId": 1,
    "x": 1,
    "y": 1,
    "angle": "tl-br",
    "placement": "top-right"
}
```

<hr/>
<br/>

**Three Quarter Stitch Bottom Left** (`tl-br` + `bottom-left`)

![ThreeQuarterStitch bottom left image](https://github.com/neilcochran/cross-stitch/blob/master/images/three-quarter-bottom-left.png)

```json
{
    "kind": "three-quarter",
    "colorId": 1,
    "x": 1,
    "y": 1,
    "angle": "tl-br",
    "placement": "bottom-left"
}
```

<hr/>
<br/>

**Three Quarter Stitch Top Left** (`bl-tr` + `top-left`)

![ThreeQuarterStitch top left image](https://github.com/neilcochran/cross-stitch/blob/master/images/three-quarter-top-left.png)

```json
{
    "kind": "three-quarter",
    "colorId": 1,
    "x": 1,
    "y": 1,
    "angle": "bl-tr",
    "placement": "top-left"
}
```

<hr/>
<br/>

**Three Quarter Stitch Bottom Right** (`bl-tr` + `bottom-right`)

![ThreeQuarterStitch bottom right image](https://github.com/neilcochran/cross-stitch/blob/master/images/three-quarter-bottom-right.png)

```json
{
    "kind": "three-quarter",
    "colorId": 1,
    "x": 1,
    "y": 1,
    "angle": "bl-tr",
    "placement": "bottom-right"
}
```

<hr/>
<br/>

### **Back Stitch Schema:**

Back stitches can go laterally, vertically, or diagonally. A back stitch may span at most one grid space in each direction; half-step (`0.5`) coordinates are supported. A segment longer than one space must be split into multiple back stitches (or use a [`Long Stitch`](#long-stitch-schema)).

```json
{
    "kind": "back",
    "colorId": 1,
    "from": { "x": 0, "y": 0 },
    "to": { "x": 1, "y": 0 }
}
```

-   `kind` - The literal `"back"`.

-   `colorId` - The `id` of the [`Color`](#color-schema) of the stitch.

-   `from` - The start point of the stitch as `{ x, y }`.

-   `to` - The end point of the stitch as `{ x, y }`.

**Examples:**

**Back Stitch Lateral**

![BackStitch lateral image](https://github.com/neilcochran/cross-stitch/blob/master/images/back-stitch-lateral.png)

Red:

```json
{
    "kind": "back",
    "colorId": 1,
    "from": { "x": 1, "y": 1 },
    "to": { "x": 2, "y": 1 }
}
```

Green:

```json
{
    "kind": "back",
    "colorId": 1,
    "from": { "x": 1, "y": 2 },
    "to": { "x": 1.5, "y": 2 }
}
```

<hr/>
<br/>

**Back Stitch Vertical**

![BackStitch vertical image](https://github.com/neilcochran/cross-stitch/blob/master/images/back-stitch-vertical.png)

Red:

```json
{
    "kind": "back",
    "colorId": 1,
    "from": { "x": 2, "y": 1 },
    "to": { "x": 2, "y": 2 }
}
```

Green:

```json
{
    "kind": "back",
    "colorId": 1,
    "from": { "x": 1, "y": 1 },
    "to": { "x": 1, "y": 1.5 }
}
```

<hr/>
<br/>

**Back Stitch Diagonal**

![BackStitch diagonal image](https://github.com/neilcochran/cross-stitch/blob/master/images/back-stitch-diagonal.png)

Red:

```json
{
    "kind": "back",
    "colorId": 1,
    "from": { "x": 1, "y": 2 },
    "to": { "x": 2, "y": 1 }
}
```

Green:

```json
{
    "kind": "back",
    "colorId": 1,
    "from": { "x": 0, "y": 1 },
    "to": { "x": 0.5, "y": 1.5 }
}
```

<hr/>
<br/>

### **Long Stitch Schema:**

Long stitches span more than one space. They can move laterally, vertically, or diagonally just like back stitches, and they also support half-step (`0.5`) coordinates, but they have no maximum length.

```json
{
    "kind": "long",
    "colorId": 1,
    "from": { "x": 0, "y": 0 },
    "to": { "x": 5, "y": 2 }
}
```

-   `kind` - The literal `"long"`.

-   `colorId` - The `id` of the [`Color`](#color-schema) of the stitch.

-   `from` - The start point of the stitch as `{ x, y }`.

-   `to` - The end point of the stitch as `{ x, y }`.

**Examples:**

![LongStitch image](https://github.com/neilcochran/cross-stitch/blob/master/images/long-stitch.png)

Red:

```json
{
    "kind": "long",
    "colorId": 1,
    "from": { "x": 0, "y": 3 },
    "to": { "x": 2.5, "y": 0 }
}
```

Green:

```json
{
    "kind": "long",
    "colorId": 1,
    "from": { "x": 0, "y": 3 },
    "to": { "x": 3, "y": 3 }
}
```

<hr/>
<br/>

### **Totals and Dimensions:**

Stitch counts and pattern size are not stored in the schema. Derive them from a validated pattern with the exported helpers:

-   `calculateTotals(pattern)` returns the overall stitch counts and a per-color breakdown (`{ total, byColor }`). `total` is a count object with one entry per stitch kind, keyed by camelCase name (`full`, `half`, `quarter`, `threeQuarter`, `back`, `long`), so counts read as `total.threeQuarter`. Each `byColor` entry is `{ colorId, counts }`, where `counts` is a count object of the same shape, so per-color counts read as `byColor[0].counts.threeQuarter`.

-   `calculateDimensions(pattern)` returns `{ stitchWidth, stitchHeight, offsetX, offsetY }` in whole stitches: the width and height of the stitched area's bounding box, plus the lower-left offset of that box (both offsets are `0` when the pattern is anchored at the origin or has no stitches).

-   `stitchBounds(stitch)` returns the axis-aligned bounding box (`{ minX, minY, maxX, maxY }`) of a single stitch, normalizing the cell-anchored and segment shapes into one position-and-extent value.

<hr/>
<br/>

### **Full Schema Example:**

The image below shows a tiny 3x3 pattern that uses every stitch kind. Here is the JSON that describes it:

![full pattern example image](https://github.com/neilcochran/cross-stitch/blob/master/images/full-pattern-example.png)

```json
{
    "version": 1,
    "metadata": {
        "title": "Tiny Sampler",
        "notes": "A tiny 3x3 example using every stitch kind."
    },
    "fabric": {
        "count": 14,
        "kind": "aida"
    },
    "colors": [
        {
            "id": 0,
            "name": "Dark Blue",
            "symbol": "@",
            "strands": [
                {
                    "brand": "DMC",
                    "code": "825",
                    "name": "Dark Blue",
                    "count": 2
                }
            ]
        },
        {
            "id": 1,
            "name": "Orange Blend",
            "symbol": "&",
            "strands": [
                {
                    "brand": "DMC",
                    "code": "721",
                    "name": "Orange Spice",
                    "count": 1
                },
                {
                    "brand": "DMC",
                    "code": "947",
                    "name": "Burnt Orange",
                    "count": 1
                }
            ]
        }
    ],
    "stitches": [
        { "kind": "full", "colorId": 0, "x": 0, "y": 1 },
        { "kind": "three-quarter", "colorId": 0, "x": 2, "y": 1, "angle": "tl-br", "placement": "top-right" },
        { "kind": "half", "colorId": 1, "x": 1, "y": 1, "angle": "bl-tr" },
        { "kind": "quarter", "colorId": 1, "x": 2, "y": 0, "placement": "bottom-right" },
        { "kind": "back", "colorId": 1, "from": { "x": 0, "y": 0 }, "to": { "x": 1, "y": 0 } },
        { "kind": "long", "colorId": 1, "from": { "x": 0, "y": 3 }, "to": { "x": 3, "y": 2 } }
    ]
}
```

### **Supported brand values:**

-   Anchor
-   Appletons
-   Cosmo
-   DMC
-   J&P Coats
-   Kreinik
-   Madeira
-   Presencia
-   Sullivans
-   Unbranded

<hr/>
