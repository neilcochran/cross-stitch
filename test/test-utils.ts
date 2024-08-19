import {
    BackStitch,
    BrandName,
    CrossStitchPattern,
    Floss,
    FullStitch,
    HalfStitch,
    LongStitch,
    PatternColor,
    Properties,
    QuarterStitch,
    StitchPlacement,
    ThreeQuarterStitch
} from '../src/model';
import { StitchColorTotals } from '../src/model/StitchColorTotals';
import { PatternTotals } from '../src/model/PatternTotals';

export const VALID_NON_NEG_INTS = [0, 1, 9, 9999];
export const INVALID_INTS = [-1, -99, -9999];
export const VALID_NON_NEG_DECIMALS = [0.5, 1.5, 2.5, 9999.5];
export const INVALID_DECIMALS = [-0.5, 1.3, 9.9, 0.1];

export const TEST_PATTERN_COLORS: PatternColor[] = [
    new PatternColor(0, 'Dark Blue', '@', [new Floss('825', 'Dark Blue', BrandName.DMC, 2)]),
    new PatternColor(1, 'Orange Blend', '&', [
        new Floss('721', 'Orange Spice', BrandName.DMC, 1),
        new Floss('947', 'Burnt Orange', BrandName.DMC, 1)
    ])
];

export const TEST_PATTERN_TOTALS: PatternTotals = {
    totalFullStitches: 2,
    totalThreeQuarterStitches: 2,
    totalHalfStitches: 2,
    totalQuarterStitches: 2,
    totalBackStitches: 2,
    totalLongStitches: 2,
    stitchColorTotals: [new StitchColorTotals(0, 1, 1, 1, 1, 1, 1), new StitchColorTotals(1, 1, 1, 1, 1, 1, 1)]
};

export const TEST_PATTERN_PROPERTIES = new Properties(TEST_PATTERN_COLORS, TEST_PATTERN_TOTALS, 13, 20);

export const TEST_FULL_STITCHES: FullStitch[] = [new FullStitch(0, 0, 1), new FullStitch(1, 3, 4)];
export const TEST_THREE_QUARTER_STITCHES: ThreeQuarterStitch[] = [
    new ThreeQuarterStitch(0, 2, 1, 135, StitchPlacement.TOP_RIGHT),
    new ThreeQuarterStitch(1, 10, 7, 45, StitchPlacement.TOP_LEFT)
];
export const TEST_HALF_STITCHES: HalfStitch[] = [new HalfStitch(0, 1, 1, 135), new HalfStitch(1, 2, 2, 45)];
export const TEST_QUARTER_STITCHES: QuarterStitch[] = [
    new QuarterStitch(0, 12, 7, StitchPlacement.TOP_LEFT),
    new QuarterStitch(1, 2, 0, StitchPlacement.BOTTOM_RIGHT)
];

export const TEST_BACK_STITCHES: BackStitch[] = [new BackStitch(0, 1, 1, 0, 0), new BackStitch(1, 0, 0, 1, 0)];

export const TEST_LONG_STITCHES: LongStitch[] = [new LongStitch(0, 0, 3, 3, 2), new LongStitch(1, 10, 15, 12, 20)];

export const TEST_VALID_PATTERN: CrossStitchPattern = {
    properties: TEST_PATTERN_PROPERTIES,
    fullStitches: TEST_FULL_STITCHES,
    threeQuarterStitches: TEST_THREE_QUARTER_STITCHES,
    halfStitches: TEST_HALF_STITCHES,
    quarterStitches: TEST_QUARTER_STITCHES,
    backStitches: TEST_BACK_STITCHES,
    longStitches: TEST_LONG_STITCHES
};

export const INVALID_TOTALS_PATTERN: CrossStitchPattern = {
    properties: TEST_PATTERN_PROPERTIES,
    fullStitches: TEST_FULL_STITCHES,
    threeQuarterStitches: [], //wipe out 3/4 stitches so that the pattern total is no longer valid
    halfStitches: TEST_HALF_STITCHES,
    quarterStitches: TEST_QUARTER_STITCHES,
    backStitches: TEST_BACK_STITCHES,
    longStitches: TEST_LONG_STITCHES
};

export const INVALID_DIMENSIONS_PATTERN: CrossStitchPattern = {
    properties: TEST_PATTERN_PROPERTIES,
    fullStitches: TEST_FULL_STITCHES,
    threeQuarterStitches: TEST_THREE_QUARTER_STITCHES,
    halfStitches: TEST_HALF_STITCHES,
    quarterStitches: TEST_QUARTER_STITCHES,
    backStitches: TEST_BACK_STITCHES,
    longStitches: [] //removing the long stitches will invalidate the pattern dimensions
};

export const TEST_VALID_FULL_PATTERN_JSON = `
{
    "properties": {
        "stitchWidth": 12,
        "stitchHeight": 20,
        "notes": "This is a contrived example 'pattern'. Enjoy!",
        "patternTotals": {
            "totalFullStitches": 2,
            "totalThreeQuarterStitches": 2,
            "totalHalfStitches": 2,
            "totalQuarterStitches": 2,
            "totalBackStitches": 2,
            "totalLongStitches": 2,
            "stitchColorTotals": [
                {
                    "colorId": 0,
                    "totalFullStitches": 1,
                    "totalThreeQuarterStitches": 1,
                    "totalHalfStitches": 1,
                    "totalQuarterStitches": 1,
                    "totalBackStitches": 1,
                    "totalLongStitches": 1
                },
                {
                    "colorId": 1,
                    "totalFullStitches": 1,
                    "totalThreeQuarterStitches": 1,
                    "totalHalfStitches": 1,
                    "totalQuarterStitches": 1,
                    "totalBackStitches": 1,
                    "totalLongStitches": 1
                }
            ]
        },
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
        ]
    },
    "fullStitches": [
        {
            "colorId": 0,
            "x": 0,
            "y": 1
        },
        {
            "colorId": 1,
            "x": 3,
            "y": 4
        }
    ],
    "threeQuarterStitches": [
        {
            "colorId": 0,
            "x": 2,
            "y": 1,
            "halfStitchAngle": 135,
            "quarterStitchPlacement": "top-right"
        },
        {
            "colorId": 1,
            "x": 10,
            "y": 7,
            "halfStitchAngle": 45,
            "quarterStitchPlacement": "top-left"
        }
    ],
    "halfStitches": [
        {
            "colorId": 0,
            "x": 1,
            "y": 1,
            "stitchAngle": 135
        },
        {
            "colorId": 1,
            "x": 2,
            "y": 2,
            "stitchAngle": 45
        }
    ],
    "quarterStitches": [
        {
            "colorId": 0,
            "x": 12,
            "y": 7,
            "placement": "top-left"
        },
        {
            "colorId": 1,
            "x": 2,
            "y": 0,
            "placement": "bottom-right"
        }
    ],
    "backStitches": 
    [
        {
            "colorId": 0,
            "x": 1,
            "y": 1,
            "x2": 0,
            "y2": 0
        },
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
            "colorId": 0,
            "x": 0,
            "y": 3,
            "x2": 3,
            "y2": 2
        },
        {    
            "colorId": 1,
            "x": 10,
            "y": 15,
            "x2": 12,
            "y2": 20
        }
    ]
}`;

//invalid due to fullStitch referencing a non existent colorId
export const TEST_INVALID_FULL_PATTERN_JSON = `
{
    "properties": {
        "stitchWidth": 3,
        "stitchHeight": 3,
        "notes": "This is a contrived example 'pattern'. Enjoy!",
        "patternTotals": {
            "totalFullStitches": 1,
            "totalThreeQuarterStitches": 0,
            "totalHalfStitches": 0,
            "totalQuarterStitches": 0,
            "totalBackStitches": 0,
            "totalLongStitches": 0,
            "stitchColorTotals": [
                {
                    "colorId": 4,
                    "totalFullStitches": 1,
                    "totalThreeQuarterStitches": 0,
                    "totalHalfStitches": 0,
                    "totalQuarterStitches": 0,
                    "totalBackStitches": 0,
                    "totalLongStitches": 0
                }
            ]
        },
        "patternColors": [
            {
                "colorId": 4,
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
            }
        ]
    },
    "fullStitches": [
        {
            "colorId": 0,
            "x": 0,
            "y": 1
        }
    ]
}
`;
