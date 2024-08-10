import {
    CrossStitchPattern,
    PatternColor,
    Floss,
    Properties,
    FullStitch,
    ThreeQuarterStitch,
    HalfStitch,
    QuarterStitch,
    BackStitch,
    LongStitch
} from './model';
import { PatternTotals } from './model/PatternTotals';
import { validateBackStitch, validateFullStitch, validateHalfStitch, validateLongStitch, validateQuarterStitch, validateThreeQuarterStitch } from './validation';

/**
 * Parse JSON implementing the cross stitch pattern schema into the corresponding typescript objects. Constructor validation will enforce validity.
 *
 * @param json - The json string to be parsed into a CrossStitchPattern model object.
 *
 * @returns A CrossStitchPattern object.
 *
 * @throws {@link Error} if the JSON is malformed or does properly follow the schema specifications.
 */
export function jsonToModel(json: string): CrossStitchPattern {
    const jsonData = JSON.parse(json);
    //MUST parse PatternColors first so we can ensure each stitch references an existing PatternColor
    const patternColors: PatternColor[] = [];
    for(const patternColor of jsonData.properties.patternColors) {
        const flossStrands: Floss[] = [];
        for(const flossStrand of patternColor.flossStrands) {
            flossStrands.push(new Floss(
                flossStrand.colorCode,
                flossStrand.colorName,
                flossStrand.brandName,
                flossStrand.strandCount ? flossStrand.strandCount : 1,
                flossStrand.hexCode
            ));
        }
        patternColors.push(new PatternColor(
            patternColor.colorId,
            patternColor.colorName.trim(),
            patternColor.patternSymbol.trim(),
            flossStrands
        ));
    }
    const patternTotals = new PatternTotals(
        jsonData.properties?.patternTotals?.totalFullStitches ?? 0,
        jsonData.properties?.patternTotals?.totalThreeQuarterStitches ?? 0,
        jsonData.properties?.patternTotals?.totalHalfStitches ?? 0,
        jsonData.properties?.patternTotals?.totalQuarterStitches ?? 0,
        jsonData.properties?.patternTotals?.totalBackStitches ?? 0,
        jsonData.properties?.patternTotals?.totalLongStitches ?? 0,
        jsonData.properties?.patternTotals?.stitchColorTotals ?? []
    );

    const properties = new Properties(patternColors, patternTotals, jsonData.properties?.stitchWidth, jsonData.properties?.stitchHeight, jsonData.properties?.notes);
    const fullStitches: FullStitch[] = [];
    const threeQuarterStitches: ThreeQuarterStitch[] = [];
    const halfStitches: HalfStitch[] = [];
    const quarterStitches: QuarterStitch[] = [];
    const backStitches: BackStitch[] = [];
    const longStitches: LongStitch[] = [];

    if(jsonData.fullStitches){
        for(const fullStitch of jsonData.fullStitches) {
            const newFullStitch = new FullStitch(fullStitch.colorId, fullStitch.x, fullStitch.y);
            if(!validateFullStitch(newFullStitch, properties)) {
                throw new Error(`invalid full stitch encountered: ${JSON.stringify(newFullStitch)}`);
            }
            fullStitches.push(newFullStitch);
        }
    }

    if(jsonData.threeQuarterStitches) {
        for(const threeQuarterStitch of jsonData.threeQuarterStitches) {
            const newThreeQuarterStitch = new ThreeQuarterStitch(
                threeQuarterStitch.colorId,
                threeQuarterStitch.x,
                threeQuarterStitch.y,
                threeQuarterStitch.halfStitchAngle,
                threeQuarterStitch.quarterStitchPlacement
            );
            if(!validateThreeQuarterStitch(newThreeQuarterStitch, properties)) {
                throw new Error(`invalid three quarter stitch encountered: ${JSON.stringify(newThreeQuarterStitch)}`);
            }
            threeQuarterStitches.push();
        }
    }

    if(jsonData.halfStitches) {
        for(const halfStitch of jsonData.halfStitches) {
            const newHalfStitch = new HalfStitch(halfStitch.colorId, halfStitch.x, halfStitch.y, halfStitch.stitchAngle);
            if(!validateHalfStitch(newHalfStitch, properties)) {
                throw new Error(`invalid half stitch encountered: ${JSON.stringify(halfStitch)}`);
            }
            halfStitches.push(newHalfStitch);
        }
    }

    if(jsonData.quarterStitches) {
        for(const quarterStitch of jsonData.quarterStitches) {
            const newQuarterStitch = new QuarterStitch(quarterStitch.colorId, quarterStitch.x, quarterStitch.y, quarterStitch.placement);
            if(!validateQuarterStitch(newQuarterStitch, properties)) {
                throw new Error(`invalid quarter stitch encountered: ${JSON.stringify(newQuarterStitch)}`);
            }
            quarterStitches.push(newQuarterStitch);
        }
    }

    if(jsonData.backStitches) {
        for(const backStitch of jsonData.backStitches) {
            const newBackStitch = new BackStitch(backStitch.colorId, backStitch.x, backStitch.y, backStitch.x2, backStitch.y2);
            if(!validateBackStitch(newBackStitch, properties)) {
                throw new Error(`invalid back stitch encountered: ${JSON.stringify(newBackStitch)}`);
            }
            backStitches.push(newBackStitch);
        }
    }

    if(jsonData.longStitches) {
        for(const longStitch of jsonData.longStitches) {
            const newLongStitch = new LongStitch(longStitch.colorId, longStitch.x, longStitch.y, longStitch.x2, longStitch.y2);
            if(!validateLongStitch(newLongStitch, properties)) {
                throw new Error(`invalid long stitch encountered: ${JSON.stringify(newLongStitch)}`);
            }
            longStitches.push(newLongStitch);
        }
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

/**
 * TODO JSDoc!!
 *
 * @param crossStitchPattern - TODO
 *
 * @returns A PatternTotals object.
 *
 * @throws {@link Error} if the CrossStitchPattern parameter is not defined
 */
export function calculatePatternTotals(crossStitchPattern: CrossStitchPattern): void { //PatternTotals {
    if(!crossStitchPattern) {
        throw new Error('The CrossStitchPattern passed to calculatePatternTotals must be defined');
    }
    const stitchTypes = ['Full', 'ThreeQuarter', 'Half', 'Quarter', 'Back', 'Long'];
    const stitchCount = 0;
    for(const stitchType of stitchTypes) {
        switch(stitchType) {
            case 'Full':
                break;
            case 'ThreeQuarter':
                break;
            case 'Half':
                break;
            case 'Quarter':
                break;
            case 'Back':
                break;
            case 'Long':
                break;
        }
    }
}