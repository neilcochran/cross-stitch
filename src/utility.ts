import {
    CrossStitchPattern,
    Color,
    Strand,
    Properties,
    FullStitch,
    ThreeQuarterStitch,
    HalfStitch,
    QuarterStitch,
    BackStitch,
    LongStitch
} from './model';
import { BrandedFloss } from './model/BrandedFloss';
import { BrandName } from './model/BrandName';


/**
 * Parse JSON implementing the cross stitch pattern schema into the corresponding typescript objects. Constructor validation will enforce validity.
 * Note that if resulting type information and object validation is not desired, the builtin JSON.parse() will of course work just fine.
 *
 * @param json - The json string to be parsed into a CrossStitchPattern model object.
 *
 * @returns A CrossStitchPattern object.
 *
 * @throws {@link Error} if the JSON is malformed or does properly follow the schema specifications.
 */
export function jsonToModel(json: string): CrossStitchPattern {
    const jsonData = JSON.parse(json);

    const colors: Color[] = [];
    for(const color of jsonData.properties.colors) {
        const strands: Strand[] = [];
        for(const strand of color.strands) {
            const brandedFloss: BrandedFloss = {
                brandName: strand.brandedFloss.brandName as BrandName, //todo type check this
                colorCode: strand.brandedFloss.colorCode,
                colorName: strand.brandedFloss.colorName,
                otherBrandEquivalents: undefined
            };

            if(strand.brandedFloss.otherBrandEquivalents) {
                brandedFloss.otherBrandEquivalents = [];
                for(const brandEquiv of strand.brandedFloss.otherBrandEquivalents) {
                    const brandEquivalent: BrandedFloss = {
                        brandName: brandEquiv.brandedFloss.brandName as BrandName, //todo type check this
                        colorCode: brandEquiv.brandedFloss.colorCode,
                        colorName: brandEquiv.brandedFloss.colorName,
                    };
                    brandedFloss.otherBrandEquivalents.push(brandEquivalent);
                }
            }
            strands.push(new Strand(brandedFloss, strand.strandCount));
        }
        colors.push(new Color(
            color.colorId,
            color.colorName.trim(),
            color.patternSymbol.trim(),
            strands,
            color.totalFullStitches,
            color.threeQuarterStitches,
            color.totalHalfStitches,
            color.totalQuarterStitches,
            color.totalBackStitches,
            color.totalLongStitches
        ));
    }

    const properties = new Properties(colors, jsonData.properties?.stitchWidth, jsonData.properties?.stitchHeight, jsonData.properties?.notes);
    const fullStitches: FullStitch[] = [];
    const threeQuarterStitches: ThreeQuarterStitch[] = [];
    const halfStitches: HalfStitch[] = [];
    const quarterStitches: QuarterStitch[] = [];
    const backStitches: BackStitch[] = [];
    const longStitches: LongStitch[] = [];

    for(const fullStitch of jsonData.fullStitches) {
        fullStitches.push(new FullStitch(fullStitch.colorId, fullStitch.x, fullStitch.y));
    }

    for(const threeQuarterStitch of jsonData.threeQuarterStitches) {
        threeQuarterStitches.push(new ThreeQuarterStitch(
            threeQuarterStitch.colorId,
            threeQuarterStitch.x,
            threeQuarterStitch.y,
            threeQuarterStitch.halfStitchAngle,
            threeQuarterStitch.quarterStitchPlacement
        ));
    }

    for(const halfStitch of jsonData.halfStitches) {
        halfStitches.push(new HalfStitch(halfStitch.colorId, halfStitch.x, halfStitch.y, halfStitch.stitchAngle));
    }

    for(const quarterStitch of jsonData.quarterStitches) {
        quarterStitches.push(new QuarterStitch(quarterStitch.colorId, quarterStitch.x, quarterStitch.y, quarterStitch.placement));
    }

    for(const backStitch of jsonData.backStitches) {
        backStitches.push(new BackStitch(backStitch.colorId, backStitch.x, backStitch.y, backStitch.x2, backStitch.y2));
    }

    for(const longStitch of jsonData.longStitches) {
        longStitches.push(new LongStitch(longStitch.colorId, longStitch.x, longStitch.y, longStitch.x2, longStitch.y2));
    }

    return {
        properties,
        fullStitches,
        threeQuarterStitches,
        halfStitches,
        quarterStitches,
        backStitches,
        longStitches
    };
}