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
    LongStitch,
    BrandName
} from './model';

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

    const patternColors: PatternColor[] = [];
    for(const patternColor of jsonData.properties.patternColors) {
        const flossStrands: Floss[] = [];
        for(const flossStrand of patternColor.flossStrands) {
            flossStrands.push(new Floss(
                flossStrand.colorCode,
                flossStrand.colorName,
                flossStrand.brandName as BrandName, //todo type check this
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

    const properties = new Properties(patternColors, jsonData.properties?.stitchWidth, jsonData.properties?.stitchHeight, jsonData.properties?.notes);
    const fullStitches: FullStitch[] = [];
    const threeQuarterStitches: ThreeQuarterStitch[] = [];
    const halfStitches: HalfStitch[] = [];
    const quarterStitches: QuarterStitch[] = [];
    const backStitches: BackStitch[] = [];
    const longStitches: LongStitch[] = [];
    if(jsonData.fullStitches){
        for(const fullStitch of jsonData.fullStitches) {
            fullStitches.push(new FullStitch(fullStitch.colorId, fullStitch.x, fullStitch.y));
        }
    }

    if(jsonData.threeQuarterStitches) {
        for(const threeQuarterStitch of jsonData.threeQuarterStitches) {
            threeQuarterStitches.push(new ThreeQuarterStitch(
                threeQuarterStitch.colorId,
                threeQuarterStitch.x,
                threeQuarterStitch.y,
                threeQuarterStitch.halfStitchAngle,
                threeQuarterStitch.quarterStitchPlacement
            ));
        }
    }

    if(jsonData.halfStitches) {
        for(const halfStitch of jsonData.halfStitches) {
            halfStitches.push(new HalfStitch(halfStitch.colorId, halfStitch.x, halfStitch.y, halfStitch.stitchAngle));
        }
    }

    if(jsonData.quarterStitches) {
        for(const quarterStitch of jsonData.quarterStitches) {
            quarterStitches.push(new QuarterStitch(quarterStitch.colorId, quarterStitch.x, quarterStitch.y, quarterStitch.placement));
        }
    }

    if(jsonData.backStitches) {
        for(const backStitch of jsonData.backStitches) {
            backStitches.push(new BackStitch(backStitch.colorId, backStitch.x, backStitch.y, backStitch.x2, backStitch.y2));
        }
    }

    if(jsonData.longStitches) {
        for(const longStitch of jsonData.longStitches) {
            longStitches.push(new LongStitch(longStitch.colorId, longStitch.x, longStitch.y, longStitch.x2, longStitch.y2));
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
 * DMC Branded Floss objects (575 colors)
 */

export const DMC_E5200 = new Floss('Metallic - White','E5200', BrandName.DMC);
export const DMC_ECRU = new Floss('Ecru', 'Ecru/off-white', BrandName.DMC);
export const DMC_BLANC = new Floss('Blanc', 'White', BrandName.DMC);
export const DMC_WHITE = new Floss('White', 'White', BrandName.DMC);
export const DMC_B5200 = new Floss('B5200', 'Snow White', BrandName.DMC);
export const DMC_1 = new Floss('1', 'White Tin', BrandName.DMC);
export const DMC_2 = new Floss('2', 'Tin', BrandName.DMC);
export const DMC_3 = new Floss('3', 'Tin - Medium', BrandName.DMC);
export const DMC_4 = new Floss('4', 'Tin - Dark', BrandName.DMC);
export const DMC_5 = new Floss('5', 'Driftwood - Light', BrandName.DMC);
export const DMC_6 = new Floss('6', 'Driftwood - Medium Light', BrandName.DMC);
export const DMC_7 = new Floss('7', 'Driftwood', BrandName.DMC);
export const DMC_8 = new Floss('8', 'Driftwood - Dark', BrandName.DMC);
export const DMC_9 = new Floss('9', 'Cocoa - Very Dark', BrandName.DMC);
export const DMC_10 = new Floss('10', 'Tender Green - Very Light', BrandName.DMC);
export const DMC_11 = new Floss('11', 'Tender Green - Light', BrandName.DMC);
export const DMC_12 = new Floss('12', 'Tender Green', BrandName.DMC);
export const DMC_13 = new Floss('13', 'Nile Green - Medium Light', BrandName.DMC);
export const DMC_14 = new Floss('14', 'Apple Green - Pale', BrandName.DMC);
export const DMC_15 = new Floss('15', 'Apple Green', BrandName.DMC);
export const DMC_16 = new Floss('16', 'Chartreuse - Light', BrandName.DMC);
export const DMC_17 = new Floss('17', 'Yellow Plum - Light', BrandName.DMC);
export const DMC_18 = new Floss('18', 'Yellow Plum', BrandName.DMC);
export const DMC_19 = new Floss('19', 'Autumn Gold - Medium Light', BrandName.DMC);
export const DMC_20 = new Floss('20', 'Shrimp', BrandName.DMC);
export const DMC_21 = new Floss('21', 'Alizarian - Light', BrandName.DMC);
export const DMC_22 = new Floss('22', 'Alizarian', BrandName.DMC);
export const DMC_23 = new Floss('23', 'Apple Blossom', BrandName.DMC);
export const DMC_24 = new Floss('24', 'White Lavender', BrandName.DMC);
export const DMC_25 = new Floss('25', 'Lavender - Ultra Light', BrandName.DMC);
export const DMC_26 = new Floss('26', 'Lavender - Pale', BrandName.DMC);
export const DMC_27 = new Floss('27', 'White Violet', BrandName.DMC);
export const DMC_28 = new Floss('28', 'Eggplant - Medium Light', BrandName.DMC);
export const DMC_29 = new Floss('29', 'Eggplant', BrandName.DMC);
export const DMC_30 = new Floss('30', 'Blueberry - Medium Light', BrandName.DMC);
export const DMC_31 = new Floss('31', 'Blueberry', BrandName.DMC);
export const DMC_32 = new Floss('32', 'Blueberry - Dark', BrandName.DMC);
export const DMC_33 = new Floss('33', 'Fuchsia', BrandName.DMC);
export const DMC_34 = new Floss('34', 'Fuchsia - Dark', BrandName.DMC);
export const DMC_35 = new Floss('35', 'Fuchsia - Very Dark', BrandName.DMC);
export const DMC_48 = new Floss('48', 'Variegated - Baby Pink', BrandName.DMC);
export const DMC_51 = new Floss('51', 'Variegated - Burnt Orange', BrandName.DMC);
export const DMC_52 = new Floss('52', 'Variegated - Violet', BrandName.DMC);
export const DMC_53 = new Floss('53', 'Variegated - Steel Grey', BrandName.DMC);
export const DMC_67 = new Floss('67', 'Variegated - Baby Blue', BrandName.DMC);
export const DMC_69 = new Floss('69', 'Variegated - Terra Cotta', BrandName.DMC);
export const DMC_90 = new Floss('90', 'Variegated - Yellow', BrandName.DMC);
export const DMC_92 = new Floss('92', 'Variegated - Avocado', BrandName.DMC);
export const DMC_93 = new Floss('93', 'Variegated - Blue Haze', BrandName.DMC);
export const DMC_94 = new Floss('94', 'Variegated - Khaki Green', BrandName.DMC);
export const DMC_99 = new Floss('99', 'Variegated - Mauve', BrandName.DMC);
export const DMC_105 = new Floss('105', 'Variegated - Tan/Brown', BrandName.DMC);
export const DMC_106 = new Floss('106', 'Variegated - Coral', BrandName.DMC);
export const DMC_107 = new Floss('107', 'Variegated - Carnation', BrandName.DMC);
export const DMC_111 = new Floss('111', 'Variegated - Mustard', BrandName.DMC);
export const DMC_115 = new Floss('115', 'Variegated - Garnet', BrandName.DMC);
export const DMC_121 = new Floss('121', 'Discontinued Variegated - Delft Blue', BrandName.DMC);
export const DMC_125 = new Floss('125', 'Variegated - Seafoam Green', BrandName.DMC);
export const DMC_E130 = new Floss('E130', 'Metallic - Gemstones', BrandName.DMC);
export const DMC_E135 = new Floss('E135', 'Metallic - Golden Dawn', BrandName.DMC);
export const DMC_150 = new Floss('150', 'Red - Bright', BrandName.DMC, 0xab0249);
export const DMC_151 = new Floss('151', 'Pink', BrandName.DMC, 0xf0ced4);
export const DMC_152 = new Floss('152', 'Tawny - Dark', BrandName.DMC, 0xe2a099);
export const DMC_153 = new Floss('153', 'Lilac', BrandName.DMC, 0xe6ccd9);
export const DMC_154 = new Floss('154', 'Red - Very Dark', BrandName.DMC, 0x572433);
export const DMC_155 = new Floss('155', 'Forget-me-not Blue', BrandName.DMC, 0x9891b6);
export const DMC_E155 = new Floss('E155', 'Metallic - Amethyst', BrandName.DMC);
export const DMC_156 = new Floss('156', 'Blue - Medium', BrandName.DMC, 0xa3aed1);
export const DMC_157 = new Floss('157', 'Blue - Light', BrandName.DMC, 0xbbc3d9);
export const DMC_158 = new Floss('158', 'Blue - Dark', BrandName.DMC, 0x4c526e);
export const DMC_159 = new Floss('159', 'Petrol Blue - Light', BrandName.DMC, 0xc7cad7);
export const DMC_160 = new Floss('160', 'Petrol Blue - Medium', BrandName.DMC, 0x999fb7);
export const DMC_161 = new Floss('161', 'Petrol Blue - Dark', BrandName.DMC, 0x7880a4);
export const DMC_162 = new Floss('162', 'Baby Blue - Light', BrandName.DMC, 0xdbecf5);
export const DMC_163 = new Floss('163', 'Green', BrandName.DMC, 0x4d8361);
export const DMC_164 = new Floss('164', 'Green - Light', BrandName.DMC, 0xc8d8b8);
export const DMC_165 = new Floss('165', 'Green - Bright', BrandName.DMC, 0xeff4a4);
export const DMC_166 = new Floss('166', 'Lime Green', BrandName.DMC, 0xc0c840);
export const DMC_167 = new Floss('167', 'Khaki Brown', BrandName.DMC, 0xa77c49);
export const DMC_168 = new Floss('168', 'Silver Gray', BrandName.DMC);
export const DMC_E168 = new Floss('E168', 'Metallic - Silver', BrandName.DMC);
export const DMC_169 = new Floss('169', 'Pewter Gray', BrandName.DMC);
export const DMC_208 = new Floss('208', 'Lavender - Very Dark', BrandName.DMC, 0x835b8b);
export const DMC_209 = new Floss('209', 'Lavender - Dark', BrandName.DMC, 0xa37ba7);
export const DMC_210 = new Floss('210', 'Lavender - Medium', BrandName.DMC, 0xc39fc3);
export const DMC_211 = new Floss('211', 'Lavender - Light', BrandName.DMC, 0xe3cbe3);
export const DMC_E211 = new Floss('E211', 'Metallic - Lilac', BrandName.DMC);
export const DMC_221 = new Floss('221', 'Shell Pink - Very Dark', BrandName.DMC, 0x883e43);
export const DMC_223 = new Floss('223', 'Shell Pink - Light', BrandName.DMC, 0xcc847c);
export const DMC_224 = new Floss('224', 'Shell Pink - Very Light', BrandName.DMC, 0xebb7af);
export const DMC_225 = new Floss('225', 'Shell Pink - Ultra Very Light', BrandName.DMC, 0xffdfd5);
export const DMC_300 = new Floss('300', 'Mahogany - Very Dark', BrandName.DMC, 0x6f2f00);
export const DMC_301 = new Floss('301', 'Mahogany - Medium', BrandName.DMC, 0xb35f2b);
export const DMC_E301 = new Floss('E301', 'Metallic - Copper', BrandName.DMC);
export const DMC_304 = new Floss('304', 'Red - Medium', BrandName.DMC, 0xb71f33);
export const DMC_307 = new Floss('307', 'Lemon', BrandName.DMC, 0xfded54);
export const DMC_309 = new Floss('309', 'Rose - Dark', BrandName.DMC, 0xd62b5b);
export const DMC_310 = new Floss('310', 'Black', BrandName.DMC);
export const DMC_E310 = new Floss('E310', 'Metallic - Ebony', BrandName.DMC);
export const DMC_311 = new Floss('311', 'Blue - Medium', BrandName.DMC, 0x1c5066);
export const DMC_312 = new Floss('312', 'Baby Blue - Very Dark', BrandName.DMC, 0x35668b);
export const DMC_315 = new Floss('315', 'Antique Mauve - Medium Dark', BrandName.DMC, 0x814952);
export const DMC_316 = new Floss('316', 'Antique Mauve - Medium', BrandName.DMC, 0xb7737f);
export const DMC_E316 = new Floss('E316', 'Metallic - Pink Amethyst', BrandName.DMC);
export const DMC_317 = new Floss('317', 'Pewter Gray', BrandName.DMC);
export const DMC_E317 = new Floss('E317', 'Metallic - Titanium', BrandName.DMC);
export const DMC_318 = new Floss('318', 'Steel Gray - Light', BrandName.DMC);
export const DMC_319 = new Floss('319', 'Pistachio Green - Very Dark', BrandName.DMC, 0x205f2e);
export const DMC_320 = new Floss('320', 'Pistachio Green - Medium', BrandName.DMC, 0x69885a);
export const DMC_321 = new Floss('321', 'Red', BrandName.DMC, 0xc72b3b);
export const DMC_E321 = new Floss('E321', 'Metallic - Red Ruby', BrandName.DMC);
export const DMC_322 = new Floss('322', 'Baby Blue', BrandName.DMC, 0x5a8fb8);
export const DMC_326 = new Floss('326', 'Rose - Very Dark', BrandName.DMC, 0xb33b4b);
export const DMC_327 = new Floss('327', 'Violet', BrandName.DMC, 0x633666);
export const DMC_333 = new Floss('333', 'Blue Violet - Very Dark', BrandName.DMC, 0x5c5478);
export const DMC_334 = new Floss('334', 'Baby Blue - Medium', BrandName.DMC, 0x739fc1);
export const DMC_E334 = new Floss('E334', 'Metallic - Blue Topaz', BrandName.DMC);
export const DMC_335 = new Floss('335', 'Rose', BrandName.DMC, 0xee546e);
export const DMC_336 = new Floss('336', 'Blue', BrandName.DMC, 0x253b73);
export const DMC_340 = new Floss('340', 'Blue Violet - Medium', BrandName.DMC, 0xada7c7);
export const DMC_341 = new Floss('341', 'Blue Violet - Light', BrandName.DMC, 0xb7bfdd);
export const DMC_347 = new Floss('347', 'Salmon - Very Dark', BrandName.DMC, 0xbf2d2d);
export const DMC_349 = new Floss('349', 'Coral - Dark', BrandName.DMC, 0xd21035);
export const DMC_350 = new Floss('350', 'Coral - Medium', BrandName.DMC, 0xe04848);
export const DMC_351 = new Floss('351', 'Coral', BrandName.DMC, 0xe96a67);
export const DMC_352 = new Floss('352', 'Coral - Light', BrandName.DMC, 0xfd9c97);
export const DMC_353 = new Floss('353', 'Peach', BrandName.DMC, 0xfed7cc);
export const DMC_355 = new Floss('355', 'Terra Cotta - Dark', BrandName.DMC, 0x984436);
export const DMC_356 = new Floss('356', 'Terra Cotta - Medium', BrandName.DMC, 0xc56a5b);
export const DMC_367 = new Floss('367', 'Pistachio Green - Dark', BrandName.DMC, 0x617a52);
export const DMC_368 = new Floss('368', 'Pistachio Green - Light', BrandName.DMC, 0xa6c298);
export const DMC_369 = new Floss('369', 'Pistachio Green - Very Light', BrandName.DMC, 0xd7edcc);
export const DMC_370 = new Floss('370', 'Mustard - Medium', BrandName.DMC, 0xb89d64);
export const DMC_371 = new Floss('371', 'Mustard', BrandName.DMC, 0xbfa671);
export const DMC_372 = new Floss('372', 'Mustard - Light', BrandName.DMC, 0xccb784);
export const DMC_400 = new Floss('400', 'Mahogany - Dark', BrandName.DMC, 0x8f430f);
export const DMC_402 = new Floss('402', 'Mahogany - Very Light', BrandName.DMC, 0xf7a777);
export const DMC_407 = new Floss('407', 'Desert Sand - Dark', BrandName.DMC);
export const DMC_413 = new Floss('413', 'Pewter Gray - Dark', BrandName.DMC);
export const DMC_414 = new Floss('414', 'Steel Gray - Dark', BrandName.DMC);
export const DMC_415 = new Floss('415', 'Pearl Gray', BrandName.DMC);
export const DMC_E415 = new Floss('E415', 'Metallic - Pewter', BrandName.DMC);
export const DMC_420 = new Floss('420', 'Hazelnut Brown - Dark', BrandName.DMC, 0xa07042);
export const DMC_422 = new Floss('422', 'Hazelnut Brown - Light', BrandName.DMC, 0xc69f7b);
export const DMC_433 = new Floss('433', 'Brown - Medium', BrandName.DMC);
export const DMC_434 = new Floss('434', 'Brown - Light', BrandName.DMC);
export const DMC_435 = new Floss('435', 'Brown - Very Light', BrandName.DMC);
export const DMC_436 = new Floss('436', 'Tan', BrandName.DMC);
export const DMC_E436 = new Floss('E436', 'Metallic - Golden Oak', BrandName.DMC);
export const DMC_437 = new Floss('437', 'Tan - Light', BrandName.DMC);
export const DMC_444 = new Floss('444', 'Lemon - Dark', BrandName.DMC, 0xffd600);
export const DMC_445 = new Floss('445', 'Lemon - Light', BrandName.DMC, 0xfffb8b);
export const DMC_451 = new Floss('451', 'Shell Gray - Dark', BrandName.DMC);
export const DMC_452 = new Floss('452', 'Shell Gray - Medium', BrandName.DMC);
export const DMC_453 = new Floss('453', 'Shell Gray - Light', BrandName.DMC);
export const DMC_469 = new Floss('469', 'Avocado Green', BrandName.DMC, 0x72843c);
export const DMC_470 = new Floss('470', 'Avocado Green - Light', BrandName.DMC, 0x94ab4f);
export const DMC_471 = new Floss('471', 'Avocado Green - Very Light', BrandName.DMC, 0xaebf79);
export const DMC_472 = new Floss('472', 'Avocado Green - Ultra Light', BrandName.DMC, 0xd8e498);
export const DMC_498 = new Floss('498', 'Red - Dark', BrandName.DMC, 0xa7132b);
export const DMC_500 = new Floss('500', 'Blue Green - Very Dark', BrandName.DMC, 0x044d33);
export const DMC_501 = new Floss('501', 'Blue Green - Dark', BrandName.DMC, 0x396f52);
export const DMC_502 = new Floss('502', 'Blue Green', BrandName.DMC, 0x5b9071);
export const DMC_503 = new Floss('503', 'Blue Green - Medium', BrandName.DMC, 0x7bac94);
export const DMC_505 = new Floss('505', 'Grass Green - Dark', BrandName.DMC, 0x338362);
export const DMC_517 = new Floss('517', 'Wedgewood - Dark', BrandName.DMC, 0x3b768f);
export const DMC_518 = new Floss('518', 'Wedgewood - Light', BrandName.DMC, 0x4f93a7);
export const DMC_519 = new Floss('519', 'Sky Blue', BrandName.DMC, 0x7eb1c8);
export const DMC_520 = new Floss('520', 'Fern Green - Dark', BrandName.DMC, 0x666d4f);
export const DMC_522 = new Floss('522', 'Fern Green', BrandName.DMC, 0x969e7e);
export const DMC_523 = new Floss('523', 'Fern Green - Light', BrandName.DMC, 0xabb197);
export const DMC_524 = new Floss('524', 'Fern Green - Very Light', BrandName.DMC, 0xc4cdac);
export const DMC_535 = new Floss('535', 'Ash Gray - Very Light', BrandName.DMC);
export const DMC_543 = new Floss('543', 'Beige Brown - Ultra Very Light', BrandName.DMC);
export const DMC_550 = new Floss('550', 'Violet - Very Dark', BrandName.DMC, 0x5c184e);
export const DMC_552 = new Floss('552', 'Violet - Medium', BrandName.DMC, 0x803a6b);
export const DMC_553 = new Floss('553', 'Violet', BrandName.DMC, 0xa3638b);
export const DMC_554 = new Floss('554', 'Violet - Light', BrandName.DMC, 0xdbb3cb);
export const DMC_561 = new Floss('561', 'Jade - Very Dark', BrandName.DMC, 0x2c6a45);
export const DMC_562 = new Floss('562', 'Jade - Medium', BrandName.DMC, 0x53976a);
export const DMC_563 = new Floss('563', 'Jade - Light', BrandName.DMC, 0x8fc098);
export const DMC_564 = new Floss('564', 'Jade - Very Light', BrandName.DMC, 0xa7cdaf);
export const DMC_580 = new Floss('580', 'Moss Green - Dark', BrandName.DMC, 0x888d33);
export const DMC_581 = new Floss('581', 'Moss Green', BrandName.DMC, 0xa7ae38);
export const DMC_597 = new Floss('597', 'Turquoise', BrandName.DMC, 0x5ba3b3);
export const DMC_598 = new Floss('598', 'Turquoise - Light', BrandName.DMC, 0x90c3cc);
export const DMC_600 = new Floss('600', 'Cranberry - Very Dark', BrandName.DMC, 0xcd2f63);
export const DMC_601 = new Floss('601', 'Cranberry - Dark', BrandName.DMC, 0xd1286a);
export const DMC_602 = new Floss('602', 'Cranberry - Medium', BrandName.DMC, 0xe24874);
export const DMC_603 = new Floss('603', 'Cranberry - Light Medium', BrandName.DMC, 0xffa4be);
export const DMC_604 = new Floss('604', 'Cranberry - Light', BrandName.DMC, 0xffb0be);
export const DMC_605 = new Floss('605', 'Cranberry - Very Light', BrandName.DMC, 0xffc0cd);
export const DMC_606 = new Floss('606', 'Orange-red - Bright', BrandName.DMC, 0xfa3203);
export const DMC_608 = new Floss('608', 'Orange - Bright', BrandName.DMC, 0xfd5d35);
export const DMC_610 = new Floss('610', 'Drab Brown - Dark', BrandName.DMC, 0x796047);
export const DMC_611 = new Floss('611', 'Drab Brown', BrandName.DMC, 0x967656);
export const DMC_612 = new Floss('612', 'Drab Brown - Light', BrandName.DMC, 0xbc9a78);
export const DMC_613 = new Floss('613', 'Drab Brown - Very Light', BrandName.DMC, 0xdcc4aa);
export const DMC_632 = new Floss('632', 'Desert Sand - Ultra Very Dark', BrandName.DMC);
export const DMC_640 = new Floss('640', 'Beige Gray - Very Dark', BrandName.DMC);
export const DMC_642 = new Floss('642', 'Beige Gray - Dark', BrandName.DMC);
export const DMC_644 = new Floss('644', 'Beige Gray - Medium', BrandName.DMC);
export const DMC_645 = new Floss('645', 'Beaver Gray - Very Dark', BrandName.DMC);
export const DMC_646 = new Floss('646', 'Beaver Gray - Dark', BrandName.DMC);
export const DMC_647 = new Floss('647', 'Beaver Gray - Medium', BrandName.DMC);
export const DMC_648 = new Floss('648', 'Beaver Gray - Light', BrandName.DMC);
export const DMC_666 = new Floss('666', 'Red - Bright', BrandName.DMC, 0xe31d42);
export const DMC_676 = new Floss('676', 'Old Gold - Light', BrandName.DMC, 0xe5ce97);
export const DMC_677 = new Floss('677', 'Old Gold - Very Light', BrandName.DMC, 0xf5eccb);
export const DMC_E677 = new Floss('E677', 'Metallic - White Gold', BrandName.DMC);
export const DMC_680 = new Floss('680', 'Old Gold - Dark', BrandName.DMC, 0xbc8d0e);
export const DMC_699 = new Floss('699', 'Green', BrandName.DMC, 0x056517);
export const DMC_E699 = new Floss('E699', 'Metallic - Green Emerald', BrandName.DMC);
export const DMC_700 = new Floss('700', 'Green - Bright', BrandName.DMC, 0x07731b);
export const DMC_701 = new Floss('701', 'Green - Light', BrandName.DMC, 0x3f8f29);
export const DMC_702 = new Floss('702', 'Kelly Green', BrandName.DMC, 0x47a72f);
export const DMC_703 = new Floss('703', 'Chartreuse', BrandName.DMC, 0x7bb547);
export const DMC_E703 = new Floss('E703', 'Metallic - Light Green Emerald', BrandName.DMC);
export const DMC_704 = new Floss('704', 'Chartreuse - Bright', BrandName.DMC, 0x9ecf34);
export const DMC_712 = new Floss('712', 'Cream', BrandName.DMC);
export const DMC_718 = new Floss('718', 'Plum', BrandName.DMC, 0x9c2462);
export const DMC_E718 = new Floss('E718', 'Metallic - Pink Garnet', BrandName.DMC);
export const DMC_720 = new Floss('720', 'Orange Spice - Dark', BrandName.DMC, 0xe55c1f);
export const DMC_721 = new Floss('721', 'Orange Spice - Medium', BrandName.DMC, 0xf27842);
export const DMC_722 = new Floss('722', 'Orange Spice - Light', BrandName.DMC, 0xf7976f);
export const DMC_725 = new Floss('725', 'Topaz', BrandName.DMC, 0xffc840);
export const DMC_726 = new Floss('726', 'Topaz - Light', BrandName.DMC, 0xfdd755);
export const DMC_727 = new Floss('727', 'Topaz - Very Light', BrandName.DMC, 0xfff1af);
export const DMC_728 = new Floss('728', 'Golden Yellow', BrandName.DMC, 0xe4b468);
export const DMC_729 = new Floss('729', 'Old Gold - Medium', BrandName.DMC, 0xd0a53e);
export const DMC_730 = new Floss('730', 'Olive Green - Very Dark', BrandName.DMC, 0x827b30);
export const DMC_732 = new Floss('732', 'Olive Green', BrandName.DMC, 0x948c36);
export const DMC_733 = new Floss('733', 'Olive Green - Medium', BrandName.DMC, 0xbcb34c);
export const DMC_734 = new Floss('734', 'Olive Green - Light', BrandName.DMC, 0xc7c077);
export const DMC_738 = new Floss('738', 'Tan - Very Light', BrandName.DMC);
export const DMC_739 = new Floss('739', 'Tan - Ultra Very Light', BrandName.DMC);
export const DMC_740 = new Floss('740', 'Tangerine', BrandName.DMC, 0xff8b00);
export const DMC_741 = new Floss('741', 'Tangerine - Medium', BrandName.DMC, 0xffa32b);
export const DMC_742 = new Floss('742', 'Tangerine - Light', BrandName.DMC, 0xffbf57);
export const DMC_743 = new Floss('743', 'Yellow - Medium', BrandName.DMC, 0xfed376);
export const DMC_744 = new Floss('744', 'Yellow - Pale', BrandName.DMC, 0xffe793);
export const DMC_745 = new Floss('745', 'Yellow - Light Pale', BrandName.DMC, 0xffe9ad);
export const DMC_746 = new Floss('746', 'Off White', BrandName.DMC, 0xfcfcee);
export const DMC_E746 = new Floss('E746', 'Metallic - Cream', BrandName.DMC);
export const DMC_747 = new Floss('747', 'Sky Blue - Very Light', BrandName.DMC, 0xe5fcfd);
export const DMC_E747 = new Floss('E747', 'Metallic - Baby Blue', BrandName.DMC);
export const DMC_754 = new Floss('754', 'Peach - Light', BrandName.DMC, 0xf7cbbf);
export const DMC_758 = new Floss('758', 'Terra Cotta - Very Light', BrandName.DMC, 0xeeaa9b);
export const DMC_760 = new Floss('760', 'Salmon', BrandName.DMC, 0xf5adad);
export const DMC_761 = new Floss('761', 'Salmon - Light', BrandName.DMC, 0xffc9c9);
export const DMC_762 = new Floss('762', 'Pearl Gray - Very Light', BrandName.DMC);
export const DMC_772 = new Floss('772', 'Yellow Green - Very Light', BrandName.DMC, 0xe4ecd4);
export const DMC_775 = new Floss('775', 'Baby Blue - Very Light', BrandName.DMC, 0xd9ebf1);
export const DMC_777 = new Floss('777', 'Red - Deep', BrandName.DMC, 0x913546);
export const DMC_778 = new Floss('778', 'Antique Mauve - Very Light', BrandName.DMC, 0xdfb3bb);
export const DMC_779 = new Floss('779', 'Brown', BrandName.DMC);
export const DMC_780 = new Floss('780', 'Topaz - Ultra Very Dark', BrandName.DMC, 0x94631a);
export const DMC_782 = new Floss('782', 'Topaz - Dark', BrandName.DMC, 0xae7720);
export const DMC_783 = new Floss('783', 'Topaz - Medium', BrandName.DMC, 0xce9124);
export const DMC_791 = new Floss('791', 'Cornflower Blue - Very Dark', BrandName.DMC, 0x464563);
export const DMC_792 = new Floss('792', 'Cornflower Blue - Dark', BrandName.DMC, 0x555b7b);
export const DMC_793 = new Floss('793', 'Cornflower Blue - Medium', BrandName.DMC, 0x707da2);
export const DMC_794 = new Floss('794', 'Cornflower Blue - Light', BrandName.DMC, 0x8f9cc1);
export const DMC_796 = new Floss('796', 'Royal Blue - Dark', BrandName.DMC, 0x11416d);
export const DMC_797 = new Floss('797', 'Royal Blue', BrandName.DMC, 0x13477d);
export const DMC_798 = new Floss('798', 'Delft Blue - Dark', BrandName.DMC, 0x466a8e);
export const DMC_799 = new Floss('799', 'Delft Blue - Medium', BrandName.DMC, 0x748eb6);
export const DMC_800 = new Floss('800', 'Delft Blue - Pale', BrandName.DMC, 0xc0ccde);
export const DMC_801 = new Floss('801', 'Coffee Brown - Dark', BrandName.DMC);
export const DMC_803 = new Floss('803', 'Blue - Deep', BrandName.DMC, 0x2c597c);
export const DMC_807 = new Floss('807', 'Peacock Blue', BrandName.DMC, 0x64abba);
export const DMC_809 = new Floss('809', 'Delft Blue', BrandName.DMC, 0x94a8c6);
export const DMC_813 = new Floss('813', 'Blue - Light', BrandName.DMC, 0xa1c2d7);
export const DMC_814 = new Floss('814', 'Garnet - Dark', BrandName.DMC, 0x7b001b);
export const DMC_815 = new Floss('815', 'Garnet - Medium', BrandName.DMC, 0x87071f);
export const DMC_E815 = new Floss('E815', 'Metallic - Dark Red Ruby', BrandName.DMC);
export const DMC_816 = new Floss('816', 'Garnet', BrandName.DMC, 0x970b23);
export const DMC_817 = new Floss('817', 'Coral Red - Very Dark', BrandName.DMC, 0xbb051f);
export const DMC_818 = new Floss('818', 'Baby Pink', BrandName.DMC, 0xffdfd9);
export const DMC_E818 = new Floss('E818', 'Metallic - Soft Pink', BrandName.DMC);
export const DMC_819 = new Floss('819', 'Baby Pink - Light', BrandName.DMC, 0xffeeeb);
export const DMC_820 = new Floss('820', 'Royal Blue - Very Dark', BrandName.DMC, 0x0e365c);
export const DMC_822 = new Floss('822', 'Beige Gray - Light', BrandName.DMC);
export const DMC_823 = new Floss('823', 'Blue - Dark', BrandName.DMC, 0x213063);
export const DMC_824 = new Floss('824', 'Blue - Very Dark', BrandName.DMC, 0x396987);
export const DMC_825 = new Floss('825', 'Blue - Dark', BrandName.DMC, 0x4781a5);
export const DMC_E825 = new Floss('E825', 'Metallic - Blue Sapphire', BrandName.DMC);
export const DMC_826 = new Floss('826', 'Blue - Medium', BrandName.DMC, 0x6b9ebf);
export const DMC_827 = new Floss('827', 'Blue - Very Light', BrandName.DMC, 0xbddded);
export const DMC_828 = new Floss('828', 'Blue - Ultra Very Light', BrandName.DMC, 0xc5e8ed);
export const DMC_829 = new Floss('829', 'Golden Olive - Very Dark', BrandName.DMC, 0x7e6b42);
export const DMC_830 = new Floss('830', 'Golden Olive - Dark', BrandName.DMC, 0x8d784b);
export const DMC_831 = new Floss('831', 'Golden Olive - Medium', BrandName.DMC, 0xaa8f56);
export const DMC_832 = new Floss('832', 'Golden Olive', BrandName.DMC, 0xbd9b51);
export const DMC_833 = new Floss('833', 'Golden Olive - Light', BrandName.DMC, 0xc8ab6c);
export const DMC_834 = new Floss('834', 'Golden Olive - Very Light', BrandName.DMC, 0xdbbe7f);
export const DMC_838 = new Floss('838', 'Beige Brown - Very Dark', BrandName.DMC);
export const DMC_839 = new Floss('839', 'Beige Brown - Dark', BrandName.DMC);
export const DMC_840 = new Floss('840', 'Beige Brown - Medium', BrandName.DMC);
export const DMC_841 = new Floss('841', 'Beige Brown - Light', BrandName.DMC);
export const DMC_842 = new Floss('842', 'Beige Brown - Very Light', BrandName.DMC);
export const DMC_844 = new Floss('844', 'Beaver Gray - Ultra Dark', BrandName.DMC);
export const DMC_869 = new Floss('869', 'Hazelnut Brown - Very Dark', BrandName.DMC, 0x835e39);
export const DMC_890 = new Floss('890', 'Pistachio Green - Ultra Dark', BrandName.DMC, 0x174923);
export const DMC_891 = new Floss('891', 'Carnation - Dark', BrandName.DMC, 0xff5773);
export const DMC_892 = new Floss('892', 'Carnation - Medium', BrandName.DMC, 0xff798c);
export const DMC_893 = new Floss('893', 'Carnation - Light', BrandName.DMC, 0xfc90a2);
export const DMC_894 = new Floss('894', 'Carnation - Very Light', BrandName.DMC, 0xffb2bb);
export const DMC_895 = new Floss('895', 'Hunter Green - Very Dark', BrandName.DMC, 0x1b5300);
export const DMC_898 = new Floss('898', 'Coffee Brown - Very Dark', BrandName.DMC);
export const DMC_E898 = new Floss('E898', 'Metallic - Dark Oak', BrandName.DMC);
export const DMC_899 = new Floss('899', 'Rose - Medium', BrandName.DMC, 0xf27688);
export const DMC_900 = new Floss('900', 'Burnt Orange - Dark', BrandName.DMC, 0xd15807);
export const DMC_902 = new Floss('902', 'Garnet - Very Dark', BrandName.DMC, 0x822637);
export const DMC_904 = new Floss('904', 'Parrot Green - Very Dark', BrandName.DMC, 0x557822);
export const DMC_905 = new Floss('905', 'Parrot Green - Dark', BrandName.DMC, 0x628a28);
export const DMC_906 = new Floss('906', 'Parrot Green - Medium', BrandName.DMC, 0x7fb335);
export const DMC_907 = new Floss('907', 'Parrot Green - Light', BrandName.DMC, 0xc7e666);
export const DMC_909 = new Floss('909', 'Emerald Green - Very Dark', BrandName.DMC, 0x156f49);
export const DMC_910 = new Floss('910', 'Emerald Green - Dark', BrandName.DMC, 0x187e56);
export const DMC_911 = new Floss('911', 'Emerald Green - Medium', BrandName.DMC, 0x189065);
export const DMC_912 = new Floss('912', 'Emerald Green - Light', BrandName.DMC, 0x1b9d6b);
export const DMC_913 = new Floss('913', 'Nile Green - Medium', BrandName.DMC, 0x6dab77);
export const DMC_915 = new Floss('915', 'Plum - Dark', BrandName.DMC, 0x820043);
export const DMC_917 = new Floss('917', 'Plum - Medium', BrandName.DMC, 0x9b1359);
export const DMC_918 = new Floss('918', 'Red Copper - Dark', BrandName.DMC, 0x82340a);
export const DMC_919 = new Floss('919', 'Red Copper', BrandName.DMC, 0xa64510);
export const DMC_920 = new Floss('920', 'Copper - Medium', BrandName.DMC, 0xac5414);
export const DMC_921 = new Floss('921', 'Copper', BrandName.DMC, 0xc66218);
export const DMC_922 = new Floss('922', 'Copper - Light', BrandName.DMC, 0xe27323);
export const DMC_924 = new Floss('924', 'Gray Green - Very Dark', BrandName.DMC, 0x566a6a);
export const DMC_926 = new Floss('926', 'Gray Green - Medium', BrandName.DMC, 0x98aeae);
export const DMC_927 = new Floss('927', 'Gray Green - Light', BrandName.DMC, 0xbdcbcb);
export const DMC_928 = new Floss('928', 'Gray Green - Very Light', BrandName.DMC, 0xdde3e3);
export const DMC_930 = new Floss('930', 'Antique Blue - Dark', BrandName.DMC, 0x455c71);
export const DMC_931 = new Floss('931', 'Antique Blue - Medium', BrandName.DMC, 0x6a859e);
export const DMC_932 = new Floss('932', 'Antique Blue - Light', BrandName.DMC, 0xa2b5c6);
export const DMC_934 = new Floss('934', 'Avocado Green - BLACK', BrandName.DMC, 0x313919);
export const DMC_935 = new Floss('935', 'Avocado Green - Dark', BrandName.DMC, 0x424d21);
export const DMC_936 = new Floss('936', 'Avocado Green - Very Dark', BrandName.DMC, 0x4c5826);
export const DMC_937 = new Floss('937', 'Avocado Green - Medium', BrandName.DMC, 0x627133);
export const DMC_938 = new Floss('938', 'Coffee Brown - Ultra Dark', BrandName.DMC);
export const DMC_939 = new Floss('939', 'Blue - Very Dark', BrandName.DMC, 0x1b2853);
export const DMC_E940 = new Floss('E940', 'Glow-In-The-Dark', BrandName.DMC);
export const DMC_943 = new Floss('943', 'Aquamarine - Medium', BrandName.DMC, 0x3d9384);
export const DMC_945 = new Floss('945', 'Tawny', BrandName.DMC, 0xfbd5bb);
export const DMC_946 = new Floss('946', 'Burnt Orange - Medium', BrandName.DMC, 0xeb6307);
export const DMC_947 = new Floss('947', 'Burnt Orange', BrandName.DMC, 0xff7b4d);
export const DMC_948 = new Floss('948', 'Peach - Very Light', BrandName.DMC, 0xfee7da);
export const DMC_950 = new Floss('950', 'Desert Sand - Light', BrandName.DMC);
export const DMC_951 = new Floss('951', 'Tawny - Light', BrandName.DMC, 0xffe2cf);
export const DMC_954 = new Floss('954', 'Nile Green', BrandName.DMC, 0x88ba91);
export const DMC_955 = new Floss('955', 'Nile Green - Light', BrandName.DMC, 0xa2d6ad);
export const DMC_956 = new Floss('956', 'Geranium', BrandName.DMC, 0xff9191);
export const DMC_957 = new Floss('957', 'Geranium - Pale', BrandName.DMC, 0xfdb5b5);
export const DMC_958 = new Floss('958', 'Seagreen - Dark', BrandName.DMC, 0x3eb6a1);
export const DMC_959 = new Floss('959', 'Seagreen - Medium', BrandName.DMC, 0x59c7b4);
export const DMC_961 = new Floss('961', 'Dusty Rose - Dark', BrandName.DMC, 0xcf7373);
export const DMC_962 = new Floss('962', 'Dusty Rose - Medium', BrandName.DMC, 0xe68a8a);
export const DMC_963 = new Floss('963', 'Dusty Rose - Ultra Very Light', BrandName.DMC, 0xffd7d7);
export const DMC_964 = new Floss('964', 'Seagreen - Light', BrandName.DMC, 0xa9e2d8);
export const DMC_966 = new Floss('966', 'Baby Green - Medium', BrandName.DMC, 0xb9d7c0);
export const DMC_E966 = new Floss('E966', 'Metallic - Lime', BrandName.DMC);
export const DMC_967 = new Floss('967', 'Peach - Light', BrandName.DMC, 0xffded5);
export const DMC_E967 = new Floss('E967', 'Metallic - Soft Peach', BrandName.DMC);
export const DMC_970 = new Floss('970', 'Pumpkin - Light', BrandName.DMC, 0xf78b13);
export const DMC_972 = new Floss('972', 'Canary - Deep', BrandName.DMC, 0xffb515);
export const DMC_973 = new Floss('973', 'Canary - Bright', BrandName.DMC, 0xffe300);
export const DMC_975 = new Floss('975', 'Golden Brown - Dark', BrandName.DMC, 0x914f12);
export const DMC_976 = new Floss('976', 'Golden Brown - Medium', BrandName.DMC, 0xc28142);
export const DMC_977 = new Floss('977', 'Golden Brown - Light', BrandName.DMC, 0xdc9c56);
export const DMC_E980 = new Floss('E980', 'Neon - Neon Yellow', BrandName.DMC);
export const DMC_986 = new Floss('986', 'Forest Green - Very Dark', BrandName.DMC, 0x405230);
export const DMC_987 = new Floss('987', 'Forest Green - Dark', BrandName.DMC, 0x587141);
export const DMC_988 = new Floss('988', 'Forest Green - Medium', BrandName.DMC, 0x738b5b);
export const DMC_989 = new Floss('989', 'Forest Green', BrandName.DMC, 0x8da675);
export const DMC_E990 = new Floss('E990', 'Neon - Neon Green', BrandName.DMC);
export const DMC_991 = new Floss('991', 'Aquamarine - Dark', BrandName.DMC, 0x477b6e);
export const DMC_992 = new Floss('992', 'Aquamarine - Light', BrandName.DMC, 0x6fae9f);
export const DMC_993 = new Floss('993', 'Aquamarine - Very Light', BrandName.DMC, 0x90c0b4);
export const DMC_995 = new Floss('995', 'Electric Blue - Dark', BrandName.DMC, 0x2696b6);
export const DMC_996 = new Floss('996', 'Electric Blue - Medium', BrandName.DMC, 0x30c2ec);
export const DMC_3011 = new Floss('3011', 'Khaki Green - Dark', BrandName.DMC, 0x898a58);
export const DMC_3012 = new Floss('3012', 'Khaki Green - Medium', BrandName.DMC, 0xa6a75d);
export const DMC_3013 = new Floss('3013', 'Khaki Green - Light', BrandName.DMC, 0xb9b982);
export const DMC_3021 = new Floss('3021', 'Brown Gray - Very Dark', BrandName.DMC);
export const DMC_3022 = new Floss('3022', 'Brown Gray - Medium', BrandName.DMC);
export const DMC_3023 = new Floss('3023', 'Brown Gray - Light', BrandName.DMC);
export const DMC_3024 = new Floss('3024', 'Brown Gray - Very Light', BrandName.DMC);
export const DMC_3031 = new Floss('3031', 'Mocha Brown - Very Dark', BrandName.DMC);
export const DMC_3032 = new Floss('3032', 'Mocha Brown - Medium', BrandName.DMC);
export const DMC_3033 = new Floss('3033', 'Mocha Brown - Very Light', BrandName.DMC);
export const DMC_3041 = new Floss('3041', 'Antique Violet - Medium', BrandName.DMC, 0x956f7c);
export const DMC_3042 = new Floss('3042', 'Antique Violet - Light', BrandName.DMC, 0xb79da7);
export const DMC_3045 = new Floss('3045', 'Yellow Beige - Dark', BrandName.DMC, 0xbc966a);
export const DMC_3046 = new Floss('3046', 'Yellow Beige - Medium', BrandName.DMC, 0xd8bc9a);
export const DMC_3047 = new Floss('3047', 'Yellow Beige - Light', BrandName.DMC, 0xe7d6c1);
export const DMC_3051 = new Floss('3051', 'Green Gray - Dark', BrandName.DMC, 0x5f6648);
export const DMC_3052 = new Floss('3052', 'Green Gray - Medium', BrandName.DMC, 0x889268);
export const DMC_3053 = new Floss('3053', 'Green Gray', BrandName.DMC, 0x9ca482);
export const DMC_3064 = new Floss('3064', 'Desert Sand', BrandName.DMC);
export const DMC_3072 = new Floss('3072', 'Beaver Gray - Very Light', BrandName.DMC);
export const DMC_3078 = new Floss('3078', 'Golden Yellow - Very Light', BrandName.DMC, 0xfdf9cd);
export const DMC_3325 = new Floss('3325', 'Baby Blue - Light', BrandName.DMC, 0xb8d2e6);
export const DMC_3326 = new Floss('3326', 'Rose - Light', BrandName.DMC, 0xfbadb4);
export const DMC_3328 = new Floss('3328', 'Salmon - Dark', BrandName.DMC, 0xe36d6d);
export const DMC_3340 = new Floss('3340', 'Apricot - Medium', BrandName.DMC, 0xff836f);
export const DMC_3341 = new Floss('3341', 'Apricot', BrandName.DMC, 0xfcab98);
export const DMC_3345 = new Floss('3345', 'Hunter Green - Dark', BrandName.DMC, 0x1b5915);
export const DMC_3346 = new Floss('3346', 'Hunter Green', BrandName.DMC, 0x406a3a);
export const DMC_3347 = new Floss('3347', 'Yellow Green - Medium', BrandName.DMC, 0x71935c);
export const DMC_3348 = new Floss('3348', 'Yellow Green - Light', BrandName.DMC, 0xccd9b1);
export const DMC_3350 = new Floss('3350', 'Dusty Rose - Ultra Dark', BrandName.DMC, 0xbc4365);
export const DMC_3354 = new Floss('3354', 'Dusty Rose - Light', BrandName.DMC, 0xe4a6ac);
export const DMC_3362 = new Floss('3362', 'Pine Green - Dark', BrandName.DMC, 0x5e6b47);
export const DMC_3363 = new Floss('3363', 'Pine Green - Medium', BrandName.DMC, 0x728256);
export const DMC_3364 = new Floss('3364', 'Pine Green', BrandName.DMC, 0x83975f);
export const DMC_3371 = new Floss('3371', 'Black Brown', BrandName.DMC);
export const DMC_3607 = new Floss('3607', 'Plum - Light', BrandName.DMC, 0xc54989);
export const DMC_3608 = new Floss('3608', 'Plum - Very Light', BrandName.DMC, 0xea9cc4);
export const DMC_3609 = new Floss('3609', 'Plum - Ultra Light', BrandName.DMC, 0xf4aed5);
export const DMC_3685 = new Floss('3685', 'Mauve - Very Dark', BrandName.DMC, 0x881531);
export const DMC_E3685 = new Floss('E3685', 'Metallic - Rosewood', BrandName.DMC);
export const DMC_3687 = new Floss('3687', 'Mauve', BrandName.DMC, 0xc96b70);
export const DMC_3688 = new Floss('3688', 'Mauve - Medium', BrandName.DMC, 0xe7a9ac);
export const DMC_3689 = new Floss('3689', 'Mauve - Light', BrandName.DMC, 0xfbbfc2);
export const DMC_3705 = new Floss('3705', 'Melon - Dark', BrandName.DMC, 0xff7992);
export const DMC_3706 = new Floss('3706', 'Melon - Medium', BrandName.DMC, 0xffadbc);
export const DMC_3708 = new Floss('3708', 'Melon - Light', BrandName.DMC, 0xffcbd5);
export const DMC_3712 = new Floss('3712', 'Salmon - Medium', BrandName.DMC, 0xf18787);
export const DMC_3713 = new Floss('3713', 'Salmon - Very Light', BrandName.DMC);
export const DMC_3716 = new Floss('3716', 'Dusty Rose - Very Light', BrandName.DMC, 0xffbdbd);
export const DMC_3721 = new Floss('3721', 'Shell Pink - Dark', BrandName.DMC, 0xa14b51);
export const DMC_3722 = new Floss('3722', 'Shell Pink - Medium', BrandName.DMC, 0xbc6c64);
export const DMC_3726 = new Floss('3726', 'Antique Mauve - Dark', BrandName.DMC, 0x9b5b66);
export const DMC_3727 = new Floss('3727', 'Antique Mauve - Light', BrandName.DMC, 0xdba9b2);
export const DMC_3731 = new Floss('3731', 'Dusty Rose - Very Dark', BrandName.DMC, 0xda6783);
export const DMC_3733 = new Floss('3733', 'Dusty Rose', BrandName.DMC, 0xe8879b);
export const DMC_3740 = new Floss('3740', 'Antique Violet - Dark', BrandName.DMC, 0x785762);
export const DMC_3743 = new Floss('3743', 'Antique Violet - Very Light', BrandName.DMC, 0xd7cbd3);
export const DMC_3746 = new Floss('3746', 'Blue Violet - Dark', BrandName.DMC, 0x776b98);
export const DMC_3747 = new Floss('3747', 'Blue Violet - Very Light', BrandName.DMC, 0xd3d7ed);
export const DMC_E3747 = new Floss('E3747', 'Metallic - Sky Blue', BrandName.DMC);
export const DMC_3750 = new Floss('3750', 'Antique Blue - Very Dark', BrandName.DMC, 0x384c5e);
export const DMC_3752 = new Floss('3752', 'Antique Blue - Very Light', BrandName.DMC, 0xc7d1db);
export const DMC_3753 = new Floss('3753', 'Antique Blue - Ultra Very Light', BrandName.DMC, 0xdbe2e9);
export const DMC_3755 = new Floss('3755', 'Baby Blue', BrandName.DMC, 0x93b4ce);
export const DMC_3756 = new Floss('3756', 'Baby Blue - Light', BrandName.DMC, 0xeefcfc);
export const DMC_3760 = new Floss('3760', 'Wedgewood - Medium', BrandName.DMC, 0x3e85a2);
export const DMC_3761 = new Floss('3761', 'Sky Blue - Light', BrandName.DMC, 0xacd8e2);
export const DMC_3765 = new Floss('3765', 'Peacock Blue - Very Dark', BrandName.DMC, 0x347f8c);
export const DMC_3766 = new Floss('3766', 'Peacock Blue - Light', BrandName.DMC, 0x99cfd9);
export const DMC_3768 = new Floss('3768', 'Gray Green - Dark', BrandName.DMC, 0x657f7f);
export const DMC_3770 = new Floss('3770', 'Tawny - Very Light', BrandName.DMC, 0xffeee3);
export const DMC_3771 = new Floss('3771', 'Peach - Dark', BrandName.DMC, 0xf4bba9);
export const DMC_3772 = new Floss('3772', 'Desert Sand - Very Dark', BrandName.DMC);
export const DMC_3774 = new Floss('3774', 'Desert Sand - Very Light', BrandName.DMC);
export const DMC_3776 = new Floss('3776', 'Mahogany - Light', BrandName.DMC, 0xcf7939);
export const DMC_3777 = new Floss('3777', 'Terra Cotta - Very Dark', BrandName.DMC, 0x863022);
export const DMC_3778 = new Floss('3778', 'Terra Cotta - Light', BrandName.DMC, 0xd98978);
export const DMC_3779 = new Floss('3779', 'Terra Cotta - Ultra Very Light', BrandName.DMC, 0xf8cac8);
export const DMC_3781 = new Floss('3781', 'Mocha Brown - Dark', BrandName.DMC);
export const DMC_3782 = new Floss('3782', 'Mocha Brown - Light', BrandName.DMC);
export const DMC_3787 = new Floss('3787', 'Brown Gray - Dark', BrandName.DMC);
export const DMC_3790 = new Floss('3790', 'Beige Gray - Ultra Dark', BrandName.DMC);
export const DMC_3799 = new Floss('3799', 'Pewter Gray - Very Dark', BrandName.DMC);
export const DMC_3801 = new Floss('3801', 'Melon - Very Dark', BrandName.DMC, 0xe74967);
export const DMC_3802 = new Floss('3802', 'Antique Mauve - Very Dark', BrandName.DMC, 0x714149);
export const DMC_3803 = new Floss('3803', 'Mauve - Dark', BrandName.DMC, 0xab3357);
export const DMC_3804 = new Floss('3804', 'Cyclamen Pink - Dark', BrandName.DMC, 0xe02876);
export const DMC_3805 = new Floss('3805', 'Cyclamen Pink', BrandName.DMC, 0xf3478b);
export const DMC_3806 = new Floss('3806', 'Cyclamen Pink - Light', BrandName.DMC, 0xff8cae);
export const DMC_3807 = new Floss('3807', 'Cornflower Blue', BrandName.DMC, 0x60678c);
export const DMC_3808 = new Floss('3808', 'Turquoise - Ultra Very Dark', BrandName.DMC, 0x366970);
export const DMC_3809 = new Floss('3809', 'Turquoise - Very Dark', BrandName.DMC, 0x3f7c85);
export const DMC_3810 = new Floss('3810', 'Turquoise - Dark', BrandName.DMC, 0x488e9a);
export const DMC_3811 = new Floss('3811', 'Turquoise - Very Light', BrandName.DMC, 0xbce3e6);
export const DMC_3812 = new Floss('3812', 'Seagreen - Very Dark', BrandName.DMC, 0x2f8c84);
export const DMC_3813 = new Floss('3813', 'Blue Green - Light', BrandName.DMC, 0xb2d4bd);
export const DMC_3814 = new Floss('3814', 'Aquamarine', BrandName.DMC, 0x508b7d);
export const DMC_3815 = new Floss('3815', 'Celadon Green - Dark', BrandName.DMC, 0x477759);
export const DMC_3816 = new Floss('3816', 'Celadon Green', BrandName.DMC, 0x65a57d);
export const DMC_3817 = new Floss('3817', 'Celadon Green - Light', BrandName.DMC, 0x99c3aa);
export const DMC_3818 = new Floss('3818', 'Emerald Green - Ultra Very Dark', BrandName.DMC, 0x115a3b);
export const DMC_3819 = new Floss('3819', 'Moss Green - Light', BrandName.DMC, 0xe0e868);
export const DMC_3820 = new Floss('3820', 'Straw - Dark', BrandName.DMC, 0xdfb65f);
export const DMC_3821 = new Floss('3821', 'Straw', BrandName.DMC, 0xf3ce75);
export const DMC_E3821 = new Floss('E3821', 'Metallic - Light Gold', BrandName.DMC);
export const DMC_3822 = new Floss('3822', 'Straw - Light', BrandName.DMC, 0xf6dc98);
export const DMC_3823 = new Floss('3823', 'Yellow - Ultra Pale', BrandName.DMC, 0xfffde3);
export const DMC_3824 = new Floss('3824', 'Apricot - Light', BrandName.DMC, 0xfecdc2);
export const DMC_3825 = new Floss('3825', 'Pumpkin - Pale', BrandName.DMC, 0xfdbd96);
export const DMC_3826 = new Floss('3826', 'Golden Brown', BrandName.DMC, 0xad7239);
export const DMC_3827 = new Floss('3827', 'Golden Brown - Pale', BrandName.DMC, 0xf7bb77);
export const DMC_3828 = new Floss('3828', 'Hazelnut Brown', BrandName.DMC, 0xb78b61);
export const DMC_3829 = new Floss('3829', 'Old Gold - Very Dark', BrandName.DMC, 0xa98204);
export const DMC_3830 = new Floss('3830', 'Terra Cotta', BrandName.DMC, 0xb95544);
export const DMC_3831 = new Floss('3831', 'Raspberry - Dark', BrandName.DMC, 0xb32f48);
export const DMC_3832 = new Floss('3832', 'Raspberry - Medium', BrandName.DMC, 0xdb556e);
export const DMC_3833 = new Floss('3833', 'Raspberry - Light', BrandName.DMC, 0xea8699);
export const DMC_3834 = new Floss('3834', 'Grape - Dark', BrandName.DMC, 0x72375d);
export const DMC_3835 = new Floss('3835', 'Grape - Medium', BrandName.DMC, 0x946083);
export const DMC_3836 = new Floss('3836', 'Grape - Light', BrandName.DMC, 0xba91aa);
export const DMC_3837 = new Floss('3837', 'Lavender - Ultra Dark', BrandName.DMC, 0x6c3a6e);
export const DMC_E3837 = new Floss('E3837', 'Metallic - Purple Ruby', BrandName.DMC);
export const DMC_3838 = new Floss('3838', 'Lavender Blue - Dark', BrandName.DMC, 0x5c7294);
export const DMC_3839 = new Floss('3839', 'Lavender Blue - Medium', BrandName.DMC, 0x7b8eab);
export const DMC_3840 = new Floss('3840', 'Lavender Blue - Light', BrandName.DMC, 0xb0c0da);
export const DMC_3841 = new Floss('3841', 'Baby Blue - Pale', BrandName.DMC, 0xcddfed);
export const DMC_3842 = new Floss('3842', 'Wedgewood - Dark', BrandName.DMC, 0x32667c);
export const DMC_3843 = new Floss('3843', 'Electric Blue', BrandName.DMC, 0x14aad0);
export const DMC_E3843 = new Floss('E3843', 'Metallic - Light Blue Sapphire', BrandName.DMC);
export const DMC_3844 = new Floss('3844', 'Bright Turquoise - Dark', BrandName.DMC, 0x12aeba);
export const DMC_3845 = new Floss('3845', 'Bright Turquoise - Medium', BrandName.DMC, 0x04c4ca);
export const DMC_3846 = new Floss('3846', 'Bright Turquoise - Light', BrandName.DMC, 0x06e3e6);
export const DMC_3847 = new Floss('3847', 'Teal Green - Dark', BrandName.DMC, 0x347d75);
export const DMC_3848 = new Floss('3848', 'Teal Green - Medium', BrandName.DMC, 0x559392);
export const DMC_3849 = new Floss('3849', 'Teal Green - Light', BrandName.DMC, 0x52b3a4);
export const DMC_E3849 = new Floss('E3849', 'Metallic - Aquamarine Blue', BrandName.DMC);
export const DMC_3850 = new Floss('3850', 'Bright Green - Dark', BrandName.DMC, 0x378477);
export const DMC_3851 = new Floss('3851', 'Bright Green - Light', BrandName.DMC, 0x49b3a1);
export const DMC_3852 = new Floss('3852', 'Straw - Very Dark', BrandName.DMC, 0xcd9d37);
export const DMC_E3852 = new Floss('E3852', 'Metallic - Dark Gold', BrandName.DMC);
export const DMC_3853 = new Floss('3853', 'Autumn Gold - Dark', BrandName.DMC, 0xf29746);
export const DMC_3854 = new Floss('3854', 'Autumn Gold - Medium', BrandName.DMC, 0xf2af68);
export const DMC_3855 = new Floss('3855', 'Autumn Gold - Light', BrandName.DMC, 0xfad396);
export const DMC_3856 = new Floss('3856', 'Mahogany - Ultra Very Light', BrandName.DMC, 0xffd3b5);
export const DMC_3857 = new Floss('3857', 'Rosewood - Dark', BrandName.DMC);
export const DMC_3858 = new Floss('3858', 'Rosewood - Medium', BrandName.DMC, 0x964a3f);
export const DMC_3859 = new Floss('3859', 'Rosewood - Light', BrandName.DMC, 0xba8b7c);
export const DMC_3860 = new Floss('3860', 'Cocoa', BrandName.DMC);
export const DMC_3861 = new Floss('3861', 'Cocoa - Light', BrandName.DMC);
export const DMC_3862 = new Floss('3862', 'Mocha Beige - Dark', BrandName.DMC);
export const DMC_3863 = new Floss('3863', 'Mocha Beige - Medium', BrandName.DMC);
export const DMC_3864 = new Floss('3864', 'Mocha Beige - Light', BrandName.DMC);
export const DMC_3865 = new Floss('3865', 'Winter White', BrandName.DMC);
export const DMC_3866 = new Floss('3866', 'Mocha Brown - Ultra Very Light', BrandName.DMC);
export const DMC_4010 = new Floss('4010', 'Variations - Winter Sky', BrandName.DMC);
export const DMC_4015 = new Floss('4015', 'Variations - Stormy Skies', BrandName.DMC);
export const DMC_4020 = new Floss('4020', 'Variations - Tropical Waters', BrandName.DMC);
export const DMC_4025 = new Floss('4025', 'Variations - Caribbean Bay', BrandName.DMC);
export const DMC_4030 = new Floss('4030', 'Variations - Monet\'s Garden', BrandName.DMC);
export const DMC_4040 = new Floss('4040', 'Variations - Water Lillies', BrandName.DMC);
export const DMC_4045 = new Floss('4045', 'Variations - Evergreen Forest', BrandName.DMC);
export const DMC_4050 = new Floss('4050', 'Variations - Roaming Pastures', BrandName.DMC);
export const DMC_4060 = new Floss('4060', 'Variations - Weeping Willow', BrandName.DMC);
export const DMC_4065 = new Floss('4065', 'Variations - Morning Meadow', BrandName.DMC);
export const DMC_4070 = new Floss('4070', 'Variations - Autumn Leaves', BrandName.DMC);
export const DMC_4075 = new Floss('4075', 'Variations - Wheat Fields', BrandName.DMC);
export const DMC_4077 = new Floss('4077', 'Variations - Morning Sunshine', BrandName.DMC);
export const DMC_4080 = new Floss('4080', 'Variations - Daffodil Fields', BrandName.DMC);
export const DMC_4090 = new Floss('4090', 'Variations - Golden Oasis', BrandName.DMC);
export const DMC_4100 = new Floss('4100', 'Variations - Summer Breeze', BrandName.DMC);
export const DMC_4110 = new Floss('4110', 'Variations - Sunrise', BrandName.DMC);
export const DMC_4120 = new Floss('4120', 'Variations - Tropical Sunset', BrandName.DMC);
export const DMC_4124 = new Floss('4124', 'Variations - Bonfire', BrandName.DMC);
export const DMC_4126 = new Floss('4126', 'Variations - Desert Canyon', BrandName.DMC);
export const DMC_4128 = new Floss('4128', 'Variations - Gold Coast', BrandName.DMC);
export const DMC_4130 = new Floss('4130', 'Variations - Chilean Sunset', BrandName.DMC);
export const DMC_4140 = new Floss('4140', 'Variations - Driftwood', BrandName.DMC);
export const DMC_4145 = new Floss('4145', 'Variations - Sandune', BrandName.DMC);
export const DMC_4150 = new Floss('4150', 'Variations - Desert Sand', BrandName.DMC);
export const DMC_4160 = new Floss('4160', 'Variations - Glistening Pearl', BrandName.DMC);
export const DMC_4170 = new Floss('4170', 'Variations - Whispering Wind', BrandName.DMC);
export const DMC_4180 = new Floss('4180', 'Variations - Rose Petals', BrandName.DMC);
export const DMC_4190 = new Floss('4190', 'Variations - Ocean Coral', BrandName.DMC);
export const DMC_4200 = new Floss('4200', 'Variations - Wild Fire', BrandName.DMC);
export const DMC_4210 = new Floss('4210', 'Variations - Radiant Ruby', BrandName.DMC);
export const DMC_4215 = new Floss('4215', 'Variations - Northern Lights', BrandName.DMC);
export const DMC_4220 = new Floss('4220', 'Variations - Lavender Fields', BrandName.DMC);
export const DMC_4230 = new Floss('4230', 'Variations - Crystal Water', BrandName.DMC);
export const DMC_4235 = new Floss('4235', 'Variations - Arctic Sea', BrandName.DMC);
export const DMC_4240 = new Floss('4240', 'Variations - Mid Summer Night', BrandName.DMC);
export const DMC_5282 = new Floss('5282', 'Metallic Pearl - Gold', BrandName.DMC);
export const DMC_5283 = new Floss('5283', 'Metallic Pearl - Silver', BrandName.DMC);