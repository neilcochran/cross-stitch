# **cross-stitch**

This repository defines a json schema to represent cross stitch patterns and provides tools to work with them.

For full code documentation, please visit [`this`](https://neilcochran.github.io/cross-stitch/) page.
<hr/>
<br/>

## **JSON Schemas**

### **Cross Stitch Pattern Schema:**

See a full example [below](#full-schema-example)
```json
{
    "properties": {
        "stitchWidth": 30,
        "stitchHeight": 30,
        "patternColors": [],
        "notes": "",
    },
    "fullStitches": [],
    "threeQuarterStitches": [],
    "halfStitches": [],
    "quarterStitches": [],
    "backStitches": [],
    "longStitches": []
}
```

* `properties` - holds top level information about the cross stitch pattern, such as color and dimension information.

    * `stitchWidth` - a non negative integer representing the width, counted in stitches, of the pattern. This is not required.

    * `stitchHeight` - a non negative integer representing the height, counted in stitches, of the pattern. This is not required.

    * `notes` - an optional string for any notes/comment about the pattern.

    * `patternColors` - an array of [`pattern color`](#patterncolor-schema) objects defining all colors used in the pattern.

* `fullStitches` - an array of [`full stitch`](#full-stitch-schema) objects defining all the full stitches in the pattern.

* `threeQuarterStitches` - an array of [`three quarter stitch`](#three-quarter-stitch-schema) objects defining all the three quarter stitches in the pattern.

* `halfStitches` - an array of [`half stitch`](#half-stitch-schema) objects defining all the half stitches in the pattern.

* `quarterStitches` - an array of [`quarter stitch`](#quarter-stitch-schema) objects defining all the quarter stitches in the pattern.

* `backStitches` - an array of [`back stitch`](#back-stitch-schema) objects defining all the back stitches in the pattern.

* `longStitches` - an array of [`long stitch`](#long-stitch-schema) objects defining all the long stitches in the pattern.

<hr/>
<br/>

### **PatternColor Schema:**

A PatternColor represents a color used in the pattern. The color is made up of one or more strands of [`floss`](#floss-schema). Each floss strand can be a different color/brand, allowing blended colors to be defined.
```json
{
    "colorId": "1",
    "colorName": "Burnt Orange",
    "patternSymbol": "@",
    "flossStrands": []
}
```

* `colorId` - the id of the desired [`pattern color`](#PatternColor-schema) of the stitch

* `colorName` - a name for the overall color (since it could be a blend)

* `patternSymbol` - the ASCII character used to represent the color on the pattern visually. This must be unique within all the `PatternColor` objects in the `patternColors` array

* `flossStrands` - an array of [`floss`](#floss-schema) objects defining all the strands of floss that make up the color

<hr/>
<br/>

### **Floss Schema:**

This represents floss of a single color and brand, and by default, a single strand. If more than one strand of the same floss is desired, strandCount can be increased.

```json
{
    "colorCode": "721",
    "colorName": "Orange Spice - Medium",
    "brandName": "DMC",
    "strandCount": 2,
    "hexCode": "0xf27842"
}
```


* `colorCode` - A string representing the unique brand code for the color. This is often a number, but can be a string like 'ecru' or 'blanc'.

* `colorName` the brand's name for the color
* `brandName` - The name of the brand. See a list of supported Brands [`here`](#supported-brandname-values).
* `strandCount` - an integer greater than zero, representing the number of times the strand should be used in the given color. If not given, this defaults to 1.

* `hexCode` - an optional string defining the color's hexadecimal valuef

<hr/>
<br/>

### **Full Stitch Schema:**

A full stitch covers a single square on the pattern in an 'X' shape. It is the combination of 2 opposing angle half stitches.

```json
{
    "colorId": "1",
    "x": 10,
    "y": 20
}
```

* `colorId` - the id of the desired [`pattern color`](#PatternColor-schema) of the stitch

* `x` - the x coordinate of the lower left corner of the stitch.

* `y` - the y coordinate of the lower left corner of stitch.

**Example:**

![full stitch](images/full-stitch.png)

```json
{
    "colorId": "1",
    "x": 1,
    "y": 1
}
```

<hr/>
<br/>

### **Three Quarter Stitch Schema:**

A three quarter stitch is simply a [quarter stitch](#quarter-stitch-schema) and a [half stitch](#half-stitch-schema) combined. Therefore, the half stitch angle and the quarter stitch placement must be given. For a 45 degree angle half stitch `top-right` and `bottom-left` are valid `quarterStitchPlacement` values. Conversely, for a 135 degree angle half stitch `top-left` and `bottom-right` are valid `quarterStitchPlacement` values.

```json
{
    "colorId": "1",
    "x": 10,
    "y": 20,
    "halfStitchAngle": 45,
    "quarterStitchPlacement": "top-right"
}
```

* `colorId` - the id of the desired [`pattern color`](#patterncolor-schema) of the stitch

* `x` - the x coordinate of the lower left corner of the space on the grid.

* `y` - the y coordinate of the lower left corner of space on the grid.

* `halfStitchAngle` - the angle of the half stitch which can be either `45` or `135`. See the [`half stitch`](#half-stitch-schema) schema for more information.

* `quarterStitchPlacement` - one of 4 values: `top-right`, `top-left`, `bottom-right`, `bottom-left` indicating the placement of the quarter stitch. See the [`quarter stitch`](#quarter-stitch-schema) schema for more information.

**Examples:**
    
**3/4 Stitch Top Right**

![3/4 stitch top right](images/three-quarter-top-right.png)

```json
{
    "colorId": "1",
    "x": 1,
    "y": 1,
    "halfStitchAngle": 45,
    "quarterStitchPlacement": "top-right"
}
``` 

<hr/>
<br/>

**3/4 Stitch Bottom Left**

![3/4 stitch bottom left](images/three-quarter-bottom-left.png)

```json
{
    "colorId": "1",
    "x": 1,
    "y": 1,
    "halfStitchAngle": 45,
    "quarterStitchPlacement": "bottom-left"
}
```

<hr/>
<br/>

**3/4 Stitch Top Left**

![3/4 stitch top left](images/three-quarter-top-left.png)

```json
{
    "colorId": "1",
    "x": 1,
    "y": 1,
    "halfStitchAngle": 135,
    "quarterStitchPlacement": "top-left"
}
```

<hr/>
<br/>

**3/4 Stitch Bottom Right**

![3/4 stitch bottom right](images/three-quarter-bottom-right.png)

```json
{
    "colorId": "1",
    "x": 1,
    "y": 1,
    "halfStitchAngle": 135,
    "quarterStitchPlacement": "bottom-right"
}
```

<hr/>
<br/>

### **Half Stitch Schema:**

Half stitches comes in two forms. The first form goes between the top left and bottom right corners of the space on the grid forming a 45 degree line. The other form goes between the top right and bottom left corners of the space on the grid forming a 135 degree line. This is why `45` and `135` are the only valid values for `stitchAngle`.

```json
{
    "colorId": "1",
    "x": 10,
    "y": 20,
    "stitchAngle": 45
}
```

* `colorId` - the id of the desired [`pattern color`](#patterncolor-schema) of the stitch

* `x` - the x coordinate of the lower left corner of the square on the grid.

* `y` - the y coordinate of the lower left corner of square on the grid.

* `stitchAngle` - the angle of the half stitch which can be either `45` or `135`.

**Examples:**

**1/2 Stitch 45 Degree**

![1/2 stitch 45](images/half-45.png)

```json
{
    "colorId": "1",
    "x": 1,
    "y": 1,
    "stitchAngle": 45
}
```

<hr/>
<br/>

**1/2 Stitch 135 Degree**

![1/2 stitch 135](images/half-135.png)

```json
{
    "colorId": "1",
    "x": 1,
    "y": 1,
    "stitchAngle": 135
}
```

<hr/>
<br/>

### **Quarter Stitch Schema:**

A quarter stitch spans a quarter of a space on the grid and can be located in either the `top-right`, `bottom-right`, `bottom-left`, or `top-left` quadrant of a grid space as indicated by the `placement` field. A quarter stitch is a half stitch cut in half vertically. Therefore, one end of the quarter stitch is always in the center of a grid space, while the other extends to the corner indicated by the `placement` value.

```json
{
    "colorId": "1",
    "x": 10,
    "y": 20,
    "placement": "top-right"
}
```

* `colorId` - the id of the desired [`pattern color`](#patterncolor-schema) of the stitch

* `x` - the x coordinate of the lower left corner of the square on the grid

* `y` - the y coordinate of the lower left corner of the square on the grid

* `placement` - the placement of the quarter stitch within the square on the grid

**Examples:**

**1/4 Stitch Top Right**

![1/4 stitch top right](images/quarter-top-right.png)

```json
{
    "colorId": "1",
    "x": 1,
    "y": 1,
    "placement": "top-right"
}
```

<hr/>
<br/>

**1/4 Stitch Bottom Right**

![1/4 stitch bottom right](images/quarter-bottom-right.png)

```json
{
    "colorId": "1",
    "x": 1,
    "y": 1,
    "placement": "bottom-right"
}
```

<hr/>
<br/>

**1/4 Stitch Bottom Left**

![1/4 stitch bottom left](images/quarter-bottom-left.png)

```json
{
    "colorId": "1",
    "x": 1,
    "y": 1,
    "placement": "bottom-left"
}
```

<hr/>
<br/>

**1/4 Stitch Top Left**

![1/4 stitch top left](images/quarter-top-left.png)

```json
{
    "colorId": "1",
    "x": 1,
    "y": 1,
    "placement": "top-left"
}
```

<hr/>
<br/>

### **Back Stitch Schema:**

Back stitches can go laterally, vertically, or diagonally. A back stitch typically moves a full space in any of the possible directions, but 1/2 space fractional amounts are supported for any of the 4 coordinate values. A single back stitch can move across at most 1 grid space in any supported direction. For example if a single back stitch segment spans 1.5 spaces, it must be defined as 2 back stitches, one moving a full space, and one moving a half space.

```json
{
    "colorId": "1",
    "x": 0,
    "y": 0,
    "x2": 1,
    "y2": 0
}
```

* `colorId` - the id of the desired [`pattern color`](#patterncolor-schema) of the stitch

* `x` - the x coordinate of the start of the stitch

* `y` - the y coordinate of the start of the stitch

* `x2` - the x2 coordinate of the end of the stitch

* `y2` - the y2 coordinate of the end of the stitch

**Examples:**

**Back Stitch Lateral**

![back stitch lateral](images/back-stitch-lateral.png)

Red:

```json
    {
    "colorId": "1",
    "x": 1,
    "y": 1,
    "x2": 2,
    "y2": 1
}
```

Green:

```json
{
    "colorId": "1",
    "x": 1,
    "y": 2,
    "x2": 1.5,
    "y2": 2
}
```

<hr/>
<br/>

**Back Stitch Vertical**

![back stitch vertical](images/back-stitch-vertical.png)

Red:

```json
{
    "colorId": "1",
    "x": 2,
    "y": 1,
    "x2": 2,
    "y2": 2
}
```

Green:

```json
{
    "colorId": "1",
    "x": 1,
    "y": 1,
    "x2": 1,
    "y2": 1.5
}
```

<hr/>
<br/>

**Back Stitch Diagonal**

![back stitch diagonal](images/back-stitch-diagonal.png)

Red:

```json
{
    "colorId": "1",
    "x": 1,
    "y": 2,
    "x2": 2,
    "y2": 1
}
```

Green:

```json
{
    "colorId": "1",
    "x": 0,
    "y": 1,
    "x2": 0.5,
    "y2": 1.5
}
```

<hr/>
<br/>

### **Long Stitch Schema:**

Long stitches are stitches that span more than 1 space. They can move laterally, vertically, or diagonally (just like back stitches). Long stitch coordinates also support 1/2 space fractional values.

```json
{
    "colorId": "1",
    "x": 0,
    "y": 0,
    "x2": 5,
    "y2": 2
}
```

* `colorId` - the id of the desired [`pattern color`](#patterncolor-schema) of the stitch

* `x` - the x coordinate of the start of the stitch

* `y` - the y coordinate of the start of the stitch

* `x2` - the x2 coordinate of the end of the stitch

* `y2` - the y2 coordinate of the end of the stitch

**Examples:**

![long stitch](images/long-stitch.png)

Red:

```json
{
    "colorId": "1",
    "x": 0,
    "y": 3,
    "x2": 2.5,
    "y2": 0
}
```

Green:

```json
{
    "colorId": "1",
    "x": 0,
    "y": 3,
    "x2": 3,
    "y2": 3
}
```

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
        "notes": "This is a tiny 3x3 contrived example 'pattern'. Enjoy!",
        "patternColors": [
            {
                "colorId": "0",
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
                "colorId": "1",
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
        ]
    },
    "fullStitches": [
        {
            "colorId": "0",
            "x": 0,
            "y": 1
        }
    ],
    "threeQuarterStitches": [
        {
            "colorId": "0",
            "x": 2,
            "y": 1,
            "halfStitchAngle": 135,
            "quarterStitchPlacement": "top-right"
        }
    ],
    "halfStitches": [
        {
            "colorId": "1",
            "x": 1,
            "y": 1,
            "stitchAngle": 135
        }
    ],
    "quarterStitches": [
        {
            "colorId": "1",
            "x": 2,
            "y": 0,
            "placement": "bottom-right"
        }
    ],
    "backStitches": 
    [
        {
            "colorId": "1",
            "x": 0,
            "y": 0,
            "x2": 1,
            "y2": 0
        }
    ],
    "longStitches": [
        {    
            "colorId": "1",
            "x": 0,
            "y": 3,
            "x2": 3,
            "y2": 2
        }
    ]
}
```
### **Supported BrandName Values:**
- Anchor,
- Appletons,
- Cosmo,
- DMC,
- J&P Coats,
- Kreinik,
- Madeira,
- Presenica,
- Sullivans,
- Unbranded
## Versions
View all versions of in the <a href="/CHANGELOG.md">CHANGELOG.md</a>

## License
This project is licensed under the MIT License - see the <a href="/LICENSE.md">LICENSE.md</a> file for details