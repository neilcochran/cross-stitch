# **cross-stitch**

This repository defines a json schema to represent cross stitch patterns and provides tools to work with them.

## Usage

To run this project, run the `build` script followed by the `start` script.
Using yarn:

```
yarn build
yarn start
```

Alternatively, run the `dev` to enable live loading (via tsc-watch)

```
yarn dev
```

<hr/>
<br/>

## **JSON Schemas**

### **Cross Stitch Pattern Schema:**

```json
{
    "properties": {
        "colors": [...],
        "stitchWidth": 30,
        "stitchHeight": 30
    },
    "fullStitches": [...],
    "threeQuarterStitches": [...],
    "halfStitches": [...],
    "quarterStitches": [...],
    "backStitches": [...],
    "longStitches": [...]
}
```

* `properties` - holds top level information about the cross stitch pattern, such as color and dimension information.

    * `colors` - an array of [`color`](#color-schema) objects defining all colors used in the pattern.

    * `stitchWidth` - a non negative integer representing the width, counted in stitches, of the pattern. This is not required.
    * `stitchHeight` - a non negative integer representing the height, counted in stitches, of the pattern. This is not required.

* `fullStitches` - an array of [`full stitch`](#full-stitch-schema) objects defining all the full stitches in the pattern.

* `threeQuarterStitches` - an array of [`three quarter stitch`](#three-quarter-stitch-schema) objects defining all the three quarter stitches in the pattern.

* `halfStitches` - an array of [`half stitch`](#half-stitch-schema) objects defining all the half stitches in the pattern.

* `quarterStitches` - an array of [`quarter stitch`](#quarter-stitch-schema) objects defining all the quarter stitches in the pattern.

* `backStitches` - an array of [`back stitch`](#back-stitch-schema) objects defining all the back stitches in the pattern.

* `longStitches` - an array of [`long stitch`](#long-stitch-schema) objects defining all the long stitches in the pattern.

<hr/>
<br/>

### **Color Schema:**

```json
{
    "colorId": 1,
    "strands": [],
    "colorName": "Burnt Orange",
    "patternSymbol": "@",
    "totalFullStitches": 75,
    "totalThreeQuarterStitches": 0,
    "totalHalfStitches": 0,
    "totalQuarterStitches": 0,
    "totalBackStitches": 0,
    "totalLongStitches": 0
}
```

* `colorId` - a non negative integer identifier. Each color within the pattern must have a unique `colorId`

* `strands` - an array of [`strand`](#strand-schema) objects defining all the strands of thread that make up the color

* `colorName` - a name for the overall color (since it could be a blend)

* `patternSymbol` - the ASCII character used to represent the color on the pattern visually. This must be unique within all the `color` objects in the `colors` array

* `totalFullStitches` - the count of full stitches that use this color in the pattern. This is not required.
* `totalThreeQuarterStitches` - the count of three quarter stitches that use this color in the pattern. This is not required.

* `totalHalfStitches` - the count of half stitches that use this color in the pattern. This is not required.

* `totalQuarterStitches` - the count of quarter stitches that use this color in the pattern. This is not required.

* `totalBackStitches` - the count of back stitches that use this color in the pattern. This is not required.

* `totalLongStitches` - the count of long stitches that use this color in the pattern. This is not required.

<hr/>
<br/>

### **Strand Schema:**

```json
{
    "colorName": "Orange Spice",
    "dmcThreadCode": "721",
    "fullStitchStrandCount": 2,
    "backStitchStrandCount": 1,
    "longStitchStrandCount": 2
}
```

* `colorName` - by convention this is the DMC name of the thread color. This is not required.

* `dmcThreadCode` - the DMC color code. This is typically numeric string like `'721'` or `3746` but there are a few alpha color codes like `'blanc'` and `'ecru'`.

* `fullStitchStrandCount` - The number of strands of to be used in the parent `color` for full stitches. This is only required if full stitches are used in the pattern.

* `backStitchStrandCount` - The number of strands of to be used in the parent `color` for back stitches. This is only required if back stitches are used in the pattern.

* `longStitchStrandCount` - The number of strands of to be used in the parent `color` for long stitches. This is only required if long stitches are used in the pattern.

<hr/>
<br/>

### **Full Stitch Schema:**

```json
{
    "colorId": 1,
    "x": 10,
    "y": 20
}
```

A full stitch covers an entire square on the grid in an 'X' shape. It is the combination of 2 opposite angle half stitches.

<hr/>
<br/>

### **Three Quarter Stitch Schema:**

```json
{
    "colorId": 1,
    "x": 10,
    "y": 20,
    "halfStitchAngle": 45,
    "quarterStitchPlacement": "top-right"
}
```

A three quarter stitch is simply a quarter stitch and a half stitch combined. Therefore, the half stitch angle and the quarter stitch placement must be given. For a 45 degree angle half stitch `top-right` and `bottom-left` are valid `quarterStitchPlacement` values. Conversely, for a 135 degree angle half stitch `top-left` and `bottom-right` are valid `quarterStitchPlacement` values.

**Examples:**
    
**3/4 Stitch Top Right**

![3/4 stitch top right](images/three-quarter-top-right.png)

```json
{
    ...
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
    ...
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
    ...
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
    ...
    "halfStitchAngle": 135,
    "quarterStitchPlacement": "bottom-right"
}
```

<hr/>
<br/>

### **Half Stitch Schema:**

```json
{
    "colorId": 1,
    "x": 10,
    "y": 20,
    "stitchAngle": 45
}
```

Half stitches comes in two forms, one going between the top left and bottom right forming a 45 degree line. The other goes between the top right and bottom left forming a 135 degree line. Thus `45` and `135` are the only valid values for `stitchAngle`.

**Examples:**

**1/2 Stitch 45 Degree**

![1/2 stitch 45](images/half-45.png)

```json
{
    ...
    "stitchAngle": 45
}
```

<hr/>
<br/>

**1/2 Stitch 135 Degree**

![1/2 stitch 135](images/half-135.png)

```json
{
    ...
    "stitchAngle": 135
}
```

<hr/>
<br/>

### **Quarter Stitch Schema:**

```json
{
    "colorId": 1,
    "x": 10,
    "y": 20,
    "placement": "top-right"
}
```

A quarter stitch can be located in either the `top-right`, `bottom-right`, `bottom-left`, or `top-left` as indicated by the `placement` field.

**Examples:**

**1/4 Stitch Top Right**

![1/4 stitch top right](images/quarter-top-right.png)

```json
{
    ...
    "placement": "top-right"
}
```

<hr/>
<br/>

**1/4 Stitch Bottom Right**

![1/4 stitch bottom right](images/quarter-bottom-right.png)

```json
{
    ...
    "placement": "bottom-right"
}
```

<hr/>
<br/>

**1/4 Stitch Bottom Left**

![1/4 stitch bottom left](images/quarter-bottom-left.png)

```json
{
    ...
    "placement": "bottom-left"
}
```

<hr/>
<br/>

**1/4 Stitch Top Left**

![1/4 stitch top left](images/quarter-top-left.png)

```json
{
    ...
    "placement": "top-left"
}
```

<hr/>
<br/>

### **Back Stitch Schema:**

```json
{
    "colorId": 1,
    "x1": 0,
    "y1": 0,
    "x2": 1,
    "y2": 0
}
```

Back stitches can go laterally, vertically, or diagonally. A back stitch typically moves a full space in any of the possible directions, but 1/2 space fractional amounts are supported for any of the 4 coordinate values. A single back stitch can move across at most 1 grid space in any supported direction. For example if a single back stitch segment spans 1.5 spaces, it must be defined as 2 back stitches, one moving a full space, and one moving a half space.

**Examples:**

**Back Stitch Lateral**

![back stitch lateral](images/back-stitch-lateral.png)

Red:

```json
    {
    ...
    "x1": 1,
    "y1": 1,
    "x2": 2,
    "y2": 1
}
```

Green:

```json
{
    ...
    "x1": 1,
    "y1": 2,
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
    ...
    "x1": 2,
    "y1": 1,
    "x2": 2,
    "y2": 2
}
```

Green:

```json
{
    ...
    "x1": 1,
    "y1": 1,
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
    ...
    "x1": 1,
    "y1": 2,
    "x2": 2,
    "y2": 1
}
```

Green:

```json
{
    ...
    "x1": 0,
    "y1": 1,
    "x2": 0.5,
    "y2": 1.5
}
```

<hr/>
<br/>

### **Long Stitch Schema:**

```json
{
    ...
    "x1": 0,
    "y1": 0,
    "x2": 5,
    "y2": 2
}
```
Long stitches are stitches that span more than 1 space. They can move laterally, vertically, or diagonally (just like back stitches). Long stitch coordinates also support 1/2 space fractional values.

**Examples:**

![long stitch](images/long-stitch.png)

Red:

```json
{
    ...
    "x1": 0,
    "y1": 3,
    "x2": 2.5,
    "y2": 0
}
```

Green:

```json
{
    ...
    "x1": 0,
    "y1": 3,
    "x2": 3,
    "y2": 3
}
```

<hr/>
<br/>

### **Full Schema Example:**

TODO ADD!

```
"Burnt Orange - 947"
"Orange Spice - 721"
"Dark Blue - 825"
```

## Versions
View all versions of in the <a href="/CHANGELOG.md">CHANGELOG.md</a>

## License
This project is licensed under the MIT License - see the <a href="/LICENSE.md">LICENSE.md</a> file for details