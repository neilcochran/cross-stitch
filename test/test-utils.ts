import { BrandName, PatternColor, Properties } from '../src/model';

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

export const TEST_VALID_PATTERN_PROPERTIES = new Properties(TEST_PATTERN_COLORS, 10, 10);