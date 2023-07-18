import { BrandName, FullStitch, HalfStitch, PatternColor, Properties, QuarterStitch, ThreeQuarterStitch } from '../src/model';
export const TEST_PATTERN_COLORS: PatternColor[] = [
    {
        colorId: '0',
        colorName: 'Dark Blue',
        patternSymbol: '@',
        flossStrands: [
            {
                colorCode: '825',
                colorName: 'Dark Blue',
                brandName: BrandName.DMC,
                strandCount: 2
            }
        ]
    },
    {
        colorId: '1',
        colorName: 'Orange Blend',
        patternSymbol: '&',
        flossStrands: [
            {
                colorCode: '721',
                colorName: 'Orange Spice',
                brandName: BrandName.DMC,
                strandCount: 1
            },
            {
                colorCode: '947',
                colorName: 'Burnt Orange',
                brandName: BrandName.DMC,
                strandCount: 1
            }
        ]
    },
    {
        colorId: 'abc',
        colorName: 'Black',
        patternSymbol: '%',
        flossStrands: [
            {
                colorCode: '310',
                colorName: 'Black',
                brandName: BrandName.DMC,
                strandCount: 1,
                hexCode: 0x0
            }
        ]
    },
];

export const TEST_PATTERN_PROPERTIES = new Properties(TEST_PATTERN_COLORS, 10, 10);
export const TEST_FULL_STITCHES: FullStitch[] = [
    new FullStitch('0', 0, 1),
];
export const TEST_THREE_QUARTER_STITCHES: ThreeQuarterStitch[] = [];
export const TEST_HALF_STITCHES: HalfStitch[] = [];
export const TEST_QUARTER_STITCHES: QuarterStitch[] = [];

export const TEST_VALID_FULL_PATTERN_JSON = `
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
            "colorId": "0",
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
}`;

//invalid due to fullStitch referencing a non existent colorId
export const TEST_INVALID_FULL_PATTERN_JSON = `
{
    "properties": {
        "stitchWidth": 3,
        "stitchHeight": 3,
        "notes": "This is a tiny 3x3 contrived example 'pattern'. Enjoy!",
        "patternColors": [
            {
                "colorId": "XYZ",
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
            "colorId": "ABC",
            "x": 0,
            "y": 1
        }
    ]
}
`;