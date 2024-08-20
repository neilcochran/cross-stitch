# **cross-stitch**

This repository defines a json schema to represent cross stitch patterns and provides tools to work with them.

For full code documentation, please visit [`this`](https://neilcochran.github.io/cross-stitch/) page.

## Versions

View all versions of in the <a href="/CHANGELOG.md">CHANGELOG.md</a>

## License

This project is licensed under the MIT License - see the <a href="/LICENSE.md">LICENSE.md</a> file for details

<br/>

## **JSON Schemas**

### **CrossStitchPattern Schema:**

See a full example [below](#full-schema-example)

```json
{
    "properties": {
        "stitchWidth": 10,
        "stitchHeight": 10,
        "patternColors": [],
        "patternTotals": {},
        "notes": ""
    },
    "fullStitches": [],
    "threeQuarterStitches": [],
    "halfStitches": [],
    "quarterStitches": [],
    "backStitches": [],
    "longStitches": []
}
```

-   `properties` - Holds top level information about the cross stitch pattern, such as color and dimension information.

    -   `stitchWidth` - A non negative integer representing the width, counted in stitches, of the pattern. This is not required.

    -   `stitchHeight` - A non negative integer representing the height, counted in stitches, of the pattern. This is not required.

    -   `patternColors` - An array of [`PatternColor`](#patterncolor-schema) objects defining all colors used in the pattern.

    -   `patternTotals` - An optional [`PatternTotals`](#patterntotals-schema) object containing the stitch totals (by stitch type and color) for the pattern

    -   `notes` - An optional string for any notes/comment about the pattern.

-   `fullStitches` - An array of [`FullStitch`](#full-stitch-schema) objects defining all the full stitches in the pattern.

-   `threeQuarterStitches` - An array of [`ThreeQuarterStitch`](#three-quarter-stitch-schema) objects defining all the three quarter stitches in the pattern.

-   `halfStitches` - An array of [`HalfStitch`](#half-stitch-schema) objects defining all the half stitches in the pattern.

-   `quarterStitches` - An array of [`QuarterStitch`](#quarter-stitch-schema) objects defining all the quarter stitches in the pattern.

-   `backStitches` - An array of [`BackStitch`](#back-stitch-schema) objects defining all the back stitches in the pattern.

-   `longStitches` - An array of [`LongStitch`](#long-stitch-schema) objects defining all the long stitches in the pattern.

<hr/>
<br/>

### **PatternColor Schema:**

A PatternColor represents a color used in the pattern. The color is made up of one or more strands of [`Floss`](#floss-schema). Each floss strand can be a different color/brand, allowing blended colors to be defined.

```json
{
    "colorId": 1,
    "colorName": "Burnt Orange",
    "patternSymbol": "@",
    "flossStrands": []
}
```

-   `colorId` - The ID of the [`PatternColor`](#PatternColor-schema) of the stitch

-   `colorName` - A name for the overall color (since it could be a blend)

-   `patternSymbol` - The ASCII character used to represent the color on the pattern visually. This must be unique within all the `PatternColor` objects in the `patternColors` array

-   `flossStrands` - An array of [`Floss`](#floss-schema) objects defining all the strands of floss that make up the color

<hr/>
<br/>

### **Floss Schema:**

This represents floss of a single color and brand, and by default, a single strand. If more than one strand of the same floss is needed, strandCount can be increased.

```json
{
    "colorCode": "721",
    "colorName": "Orange Spice - Medium",
    "brandName": "DMC",
    "strandCount": 2,
    "hexCode": "0xf27842"
}
```

-   `colorCode` - A string representing the unique brand code for the color. This is often a number, but can be a string like 'ecru' or 'blanc'.

-   `colorName` The brand's name for the color

-   `brandName` - The name of the brand. See a list of supported Brands [`here`](#supported-brandname-values).

-   `strandCount` - An integer greater than zero, representing the number of times the strand should be used in the given color. If not given, this defaults to 1.

-   `hexCode` - An optional string defining the color's hexadecimal value

<hr/>
<br/>

### **FullStitch Schema:**

A full stitch covers a single square on the pattern in an 'X' shape. It is the combination of 2 opposing angle half stitches.

```json
{
    "colorId": 1,
    "x": 10,
    "y": 20
}
```

-   `colorId` - The ID of the [`PatternColor`](#PatternColor-schema) of the stitch

-   `x` - The x coordinate of the lower left corner of the stitch.

-   `y` - The y coordinate of the lower left corner of stitch.

**Example:**

![FullStitch](images/full-stitch.png)

```json
{
    "colorId": 1,
    "x": 1,
    "y": 1
}
```

<hr/>
<br/>

### **Three Quarter Stitch Schema:**

A three quarter stitch is simply a [QuarterStitch](#quarter-stitch-schema) and a [HalfStitch](#half-stitch-schema) combined. Therefore, the half stitch angle and the quarter stitch placement must be given. For a 45 degree angle half stitch `top-right` and `bottom-left` are valid `quarterStitchPlacement` values. Conversely, for a 135 degree angle half stitch `top-left` and `bottom-right` are valid `quarterStitchPlacement` values.

```json
{
    "colorId": 1,
    "x": 10,
    "y": 20,
    "halfStitchAngle": 45,
    "quarterStitchPlacement": "top-right"
}
```

-   `colorId` - The ID of the [`PatternColor`](#patterncolor-schema) of the stitch

-   `x` - The x coordinate of the lower left corner of the space on the grid.

-   `y` - The y coordinate of the lower left corner of space on the grid.

-   `halfStitchAngle` - The angle of the half stitch which can be either `45` or `135`. See the [`HalfStitch`](#half-stitch-schema) schema for more information.

-   `quarterStitchPlacement` - One of 4 values: `top-right`, `top-left`, `bottom-right`, `bottom-left` indicating the placement of the quarter stitch. See the [`QuarterStitch`](#quarter-stitch-schema) schema for more information.

**Examples:**

**ThreeQuarterStitch Top Right**

![ThreeQuarterStitch top right](images/three-quarter-top-right.png)

```json
{
    "colorId": 1,
    "x": 1,
    "y": 1,
    "halfStitchAngle": 45,
    "quarterStitchPlacement": "top-right"
}
```

<hr/>
<br/>

**ThreeQuarterStitch Bottom Left**

![ThreeQuarterStitch bottom left](images/three-quarter-bottom-left.png)

```json
{
    "colorId": 1,
    "x": 1,
    "y": 1,
    "halfStitchAngle": 45,
    "quarterStitchPlacement": "bottom-left"
}
```

<hr/>
<br/>

**ThreeQuarterStitch Top Left**

![ThreeQuarterStitch top left](images/three-quarter-top-left.png)

```json
{
    "colorId": 1,
    "x": 1,
    "y": 1,
    "halfStitchAngle": 135,
    "quarterStitchPlacement": "top-left"
}
```

<hr/>
<br/>

**ThreeQuarterStitch Bottom Right**

![ThreeQuarterStitch bottom right](images/three-quarter-bottom-right.png)

```json
{
    "colorId": 1,
    "x": 1,
    "y": 1,
    "halfStitchAngle": 135,
    "quarterStitchPlacement": "bottom-right"
}
```

<hr/>
<br/>

### **HalfStitch Schema:**

Half stitches comes in two forms. The first form goes between the top left and bottom right corners of the space on the grid forming a 45 degree line. The other form goes between the top right and bottom left corners of the space on the grid forming a 135 degree line. This is why `45` and `135` are the only valid values for `stitchAngle`.

```json
{
    "colorId": 1,
    "x": 10,
    "y": 20,
    "stitchAngle": 45
}
```

-   `colorId` - The ID of the [`PatternColor`](#patterncolor-schema) of the stitch

-   `x` - The x coordinate of the lower left corner of the square on the grid.

-   `y` - The y coordinate of the lower left corner of square on the grid.

-   `stitchAngle` - The angle of the half stitch which can be either `45` or `135`.

**Examples:**

**HalfStitch 45 Degree**

![HalfStitch 45](images/half-45.png)

```json
{
    "colorId": 1,
    "x": 1,
    "y": 1,
    "stitchAngle": 45
}
```

<hr/>
<br/>

**HalfStitch 135 Degree**

![HalfStitch 135](images/half-135.png)

```json
{
    "colorId": 1,
    "x": 1,
    "y": 1,
    "stitchAngle": 135
}
```

<hr/>
<br/>

### **QuarterStitch Schema:**

A quarter stitch spans a quarter of a space on the grid and can be located in either the `top-right`, `bottom-right`, `bottom-left`, or `top-left` quadrant of a grid space as indicated by the `placement` field. A quarter stitch is a half stitch cut in half vertically. Therefore, one end of the quarter stitch is always in the center of a grid space, while the other extends to the corner indicated by the `placement` value.

```json
{
    "colorId": 1,
    "x": 10,
    "y": 20,
    "placement": "top-right"
}
```

-   `colorId` - The ID of the [`PatternColor`](#patterncolor-schema) of the stitch

-   `x` - The x coordinate of the lower left corner of the square on the grid

-   `y` - The y coordinate of the lower left corner of the square on the grid

-   `placement` - The placement of the quarter stitch within the square on the grid

**Examples:**

**QuarterStitch Top Right**

![QuarterStitch top right](images/quarter-top-right.png)

```json
{
    "colorId": 1,
    "x": 1,
    "y": 1,
    "placement": "top-right"
}
```

<hr/>
<br/>

**QuarterStitch Bottom Right**

![QuarterStitch bottom right](images/quarter-bottom-right.png)

```json
{
    "colorId": 1,
    "x": 1,
    "y": 1,
    "placement": "bottom-right"
}
```

<hr/>
<br/>

**QuarterStitch Bottom Left**

![QuarterStitch bottom left](images/quarter-bottom-left.png)

```json
{
    "colorId": 1,
    "x": 1,
    "y": 1,
    "placement": "bottom-left"
}
```

<hr/>
<br/>

**QuarterStitch Top Left**

![QuarterStitch top left](images/quarter-top-left.png)

```json
{
    "colorId": 1,
    "x": 1,
    "y": 1,
    "placement": "top-left"
}
```

<hr/>
<br/>

### **BackStitch Schema:**

Back stitches can go laterally, vertically, or diagonally. A back stitch typically moves a full space in any of the possible directions, but 1/2 space fractional amounts are supported for any of the 4 coordinate values. A single back stitch can move across at most 1 grid space in any supported direction. For example if a single back stitch segment spans 1.5 spaces, it must be defined as 2 back stitches, one moving a full space, and one moving a half space.

```json
{
    "colorId": 1,
    "x": 0,
    "y": 0,
    "x2": 1,
    "y2": 0
}
```

-   `colorId` - The ID of the [`PatternColor`](#patterncolor-schema) of the stitch

-   `x` - The x coordinate of the start of the stitch

-   `y` - The y coordinate of the start of the stitch

-   `x2` - The x2 coordinate of the end of the stitch

-   `y2` - The y2 coordinate of the end of the stitch

**Examples:**

**BackStitch Lateral**

![BackStitch lateral](images/back-stitch-lateral.png)

Red:

```json
{
    "colorId": 1,
    "x": 1,
    "y": 1,
    "x2": 2,
    "y2": 1
}
```

Green:

```json
{
    "colorId": 1,
    "x": 1,
    "y": 2,
    "x2": 1.5,
    "y2": 2
}
```

<hr/>
<br/>

**BackStitch Vertical**

![BackStitch vertical](images/back-stitch-vertical.png)

Red:

```json
{
    "colorId": 1,
    "x": 2,
    "y": 1,
    "x2": 2,
    "y2": 2
}
```

Green:

```json
{
    "colorId": 1,
    "x": 1,
    "y": 1,
    "x2": 1,
    "y2": 1.5
}
```

<hr/>
<br/>

**BackStitch Diagonal**

![BackStitch diagonal](images/back-stitch-diagonal.png)

Red:

```json
{
    "colorId": 1,
    "x": 1,
    "y": 2,
    "x2": 2,
    "y2": 1
}
```

Green:

```json
{
    "colorId": 1,
    "x": 0,
    "y": 1,
    "x2": 0.5,
    "y2": 1.5
}
```

<hr/>
<br/>

### **LongStitch Schema:**

Long stitches are stitches that span more than 1 space. They can move laterally, vertically, or diagonally (just like back stitches). Long stitch coordinates also support 1/2 space fractional values.

```json
{
    "colorId": 1,
    "x": 0,
    "y": 0,
    "x2": 5,
    "y2": 2
}
```

-   `colorId` - The ID of the [`PatternColor`](#patterncolor-schema) of the stitch

-   `x` - The x coordinate of the start of the stitch

-   `y` - The y coordinate of the start of the stitch

-   `x2` - The x2 coordinate of the end of the stitch

-   `y2` - The y2 coordinate of the end of the stitch

**Examples:**

![LongStitch](images/long-stitch.png)

Red:

```json
{
    "colorId": 1,
    "x": 0,
    "y": 3,
    "x2": 2.5,
    "y2": 0
}
```

Green:

```json
{
    "colorId": 1,
    "x": 0,
    "y": 3,
    "x2": 3,
    "y2": 3
}
```

<hr/>
<br/>

### **StitchColorTotals Schema:**

StitchColorTotals holds the total number of each type of stitch for a specific color in the pattern

```json
{
    "colorId": 1,
    "totalFullStitches": 2,
    "totalThreeQuarterStitches": 3,
    "totalHalfStitches": 2,
    "totalQuarterStitches": 2,
    "totalBackStitches": 4,
    "totalLongStitches": 1
}
```

-   `colorId` - The ID of the [`PatternColor`](#patterncolor-schema) of the stitch

-   `totalFullStitches` - The total number of [`FullStitches`](#fullstitch-schema) using this color

-   `totalThreeQuarterStitches` - The total number of [`ThreeQuarterStitches`](#three-quarter-stitch-schema)stitches using this color

-   `totalHalfStitches` - The total number of [`HalfStitches`](#halfstitch-schema) using this color

-   `totalQuarterStitches` - The total number of [`QuarterStitches`](#quarterstitch-schema) using this color

-   `totalBackStitches` - The total number of [`BackStitches`](#backstitch-schema) using this color

-   `totalLongStitches` - The total number of [`LongStitches`](#longstitch-schema) using this color

<hr/>
<br/>

### **PatternTotals Schema:**

PatternTotals holds the total number of each stitch type for the pattern, as well as the total number of each stitch type grouped by color

```json
{
    "totalFullStitches": 2,
    "totalThreeQuarterStitches": 3,
    "totalHalfStitches": 2,
    "totalQuarterStitches": 2,
    "totalBackStitches": 4,
    "totalLongStitches": 1,
    "stitchColorTotals": {}
}
```

-   `totalFullStitches` - The total number of [`FullStitches`](#fullstitch-schema) in the pattern

-   `totalThreeQuarterStitches` - The total number of [`ThreeQuarterStitches`](#three-quarter-stitch-schema) stitches in the pattern

-   `totalHalfStitches` - The total number of [`HalfStitches`](#halfstitch-schema) in the pattern

-   `totalQuarterStitches` - The total number of [`QuarterStitches`](#quarterstitch-schema) in the pattern

-   `totalBackStitches` - The total number of [`BackStitches`](#backstitch-schema) in the pattern

-   `totalLongStitches` - The total number of [`LongStitches`](#longstitch-schema) in the pattern

-   `stitchColorTotals` - A list of [stitchColorTotals](#stitchcolortotals-schema) for each [`PatternColor`](#patterncolor-schema) in the pattern

<hr/>
<br/>

### **Full Schema Example:**

An example of each stitch being used can be seen in the below image:

![full pattern example](images/full-pattern-example.png)

Here is the corresponding JSON that describes the stitches in the above image:

```json
{
    "properties": {
        "stitchWidth": 3,
        "stitchHeight": 3,
        "patternColors": [
            {
                "colorId": 0,
                "colorName": "Dark Blue",
                "patternSymbol": "@",
                "flossStrands": [
                    {
                        "colorCode": "825",
                        "colorName": "Dark Blue",
                        "brandName": "DMC",
                        "strandCount": 2
                    }
                ]
            },
            {
                "colorId": 1,
                "colorName": "Orange Blend",
                "patternSymbol": "&",
                "flossStrands": [
                    {
                        "colorCode": "721",
                        "colorName": "Orange Spice",
                        "brandName": "DMC",
                        "strandCount": 1
                    },
                    {
                        "colorCode": "947",
                        "colorName": "Burnt Orange",
                        "brandName": "DMC",
                        "strandCount": 1
                    }
                ]
            }
        ],
        "patternTotals": {
            "totalFullStitches": 1,
            "totalThreeQuarterStitches": 1,
            "totalHalfStitches": 1,
            "totalQuarterStitches": 1,
            "totalBackStitches": 1,
            "totalLongStitches": 1,
            "stitchColorTotals": [
                {
                    "colorId": 0,
                    "totalFullStitches": 1,
                    "totalThreeQuarterStitches": 1,
                    "totalHalfStitches": 0,
                    "totalQuarterStitches": 0,
                    "totalBackStitches": 0,
                    "totalLongStitches": 0
                },
                {
                    "colorId": 1,
                    "totalFullStitches": 0,
                    "totalThreeQuarterStitches": 0,
                    "totalHalfStitches": 1,
                    "totalQuarterStitches": 1,
                    "totalBackStitches": 1,
                    "totalLongStitches": 1
                }
            ]
        },
        "notes": "This is a tiny 3x3 contrived example 'pattern'. Enjoy!"
    },
    "fullStitches": [
        {
            "colorId": 0,
            "x": 0,
            "y": 1
        }
    ],
    "threeQuarterStitches": [
        {
            "colorId": 0,
            "x": 2,
            "y": 1,
            "halfStitchAngle": 135,
            "quarterStitchPlacement": "top-right"
        }
    ],
    "halfStitches": [
        {
            "colorId": 1,
            "x": 1,
            "y": 1,
            "stitchAngle": 135
        }
    ],
    "quarterStitches": [
        {
            "colorId": 1,
            "x": 2,
            "y": 0,
            "placement": "bottom-right"
        }
    ],
    "backStitches": [
        {
            "colorId": 1,
            "x": 0,
            "y": 0,
            "x2": 1,
            "y2": 0
        }
    ],
    "longStitches": [
        {
            "colorId": 1,
            "x": 0,
            "y": 3,
            "x2": 3,
            "y2": 2
        }
    ]
}
```

### **Supported BrandName Values:**

-   Anchor,
-   Appletons,
-   Cosmo,
-   DMC,
-   J&P Coats,
-   Kreinik,
-   Madeira,
-   Presenica,
-   Sullivans,
-   Unbranded
