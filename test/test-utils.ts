import { BackStitch, BrandName, Floss, FullStitch, HalfStitch, LongStitch, PatternColor, Properties, QuarterStitch, StitchPlacement, ThreeQuarterStitch } from '../src/model';
import { StitchColorTotals } from '../src/model/StitchColorTotals';
import { PatternTotals } from '../src/model/PatternTotals';

export const TEST_PATTERN_COLORS: PatternColor[] = [
    new PatternColor(0, 'Dark Blue', '@', [new Floss('825', 'Dark Blue', BrandName.DMC, 2)]),
    new PatternColor(1, 'Orange Blend', '&', [new Floss('721', 'Orange Spice', BrandName.DMC, 1), new Floss('947', 'Burnt Orange', BrandName.DMC, 1)])
];

export const TEST_PATTERN_TOTALS: PatternTotals = {
    //TODO
    totalFullStitches: 1,
    totalThreeQuarterStitches: 1,
    totalHalfStitches: 1,
    totalQuarterStitches: 1,
    totalBackStitches: 1,
    totalLongStitches: 1,
    stitchColorTotals: [
        new StitchColorTotals(0, 1, 1, 1, 0, 0, 0),
        new StitchColorTotals(1, 0, 0, 0, 1, 1, 1)
    ]
};

export const TEST_PATTERN_PROPERTIES = new Properties(TEST_PATTERN_COLORS, TEST_PATTERN_TOTALS, 10, 10);

export const TEST_FULL_STITCHES: FullStitch[] = [
    new FullStitch(0, 0, 1)
];
export const TEST_THREE_QUARTER_STITCHES: ThreeQuarterStitch[] = [
    new ThreeQuarterStitch(0, 2, 1, 135, StitchPlacement.TOP_RIGHT)
];
export const TEST_HALF_STITCHES: HalfStitch[] = [
    new HalfStitch(0, 1, 1, 135)
];
export const TEST_QUARTER_STITCHES: QuarterStitch[] = [
    new QuarterStitch(1, 2, 0, StitchPlacement.BOTTOM_RIGHT)
];

export const TEST_BACK_STITCHES: BackStitch[] = [
    new BackStitch(1, 0, 0, 1, 0)
];

export const TEST_LONG_STITCHES: LongStitch[] = [
    new LongStitch(1, 0, 3, 3, 2)
];

export const TEST_VALID_FULL_PATTERN_JSON = `
{
    "properties": {
        "stitchWidth": 3,
        "stitchHeight": 3,
        "notes": "This is a tiny 3x3 contrived example 'pattern'. Enjoy!",
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
                    "totalHalfStitches": 1,
                    "totalQuarterStitches": 0,
                    "totalBackStitches": 0,
                    "totalLongStitches": 0
                },
                {
                    "colorId": 1,
                    "totalFullStitches": 0,
                    "totalThreeQuarterStitches": 0,
                    "totalHalfStitches": 0,
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
            "colorId": 0,
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
    "backStitches": 
    [
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
}`;

//invalid due to fullStitch referencing a non existent colorId
export const TEST_INVALID_FULL_PATTERN_JSON = `
{
    "properties": {
        "stitchWidth": 3,
        "stitchHeight": 3,
        "notes": "This is a tiny 3x3 contrived example 'pattern'. Enjoy!",
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