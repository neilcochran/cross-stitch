import { validateNonNegativeInteger, validateStitchAngle, validateStitchPlacement } from '../validation';
import { Stitch } from './Stitch';
import { StitchAngle } from './StitchAngle';
import { StitchPlacement } from './StitchPlacement';

/**
 * Model class representing a single three quarter stitch in the pattern.
 *
 * A three quarter stitch is simply a quarter stitch and a half stitch combined. Therefore, the half stitch angle
 * and the quarter stitch placement must be given. For a 45 degree angle half stitch top-left and bottom-right are
 * valid quarterStitchPlacement values. Conversely, for a 135 degree angle half stitch top-right and bottom-right
 * are valid quarterStitchPlacement values.
 */
export class ThreeQuarterStitch extends Stitch {
    private _halfStitchAngle!: StitchAngle;
    private _quarterStitchPlacement!: StitchPlacement;

    /**
     * @param colorId - The id of the desired color of the stitch.
     * @param x - The x coordinate of the lower left corner of the square on the grid.
     * @param y - The y coordinate of the lower left corner of square on the grid.
     * @param halfStitchAngle - The angle of the half stitch which can be either `45` or `135`.
     * @param quarterStitchPlacement - The placement of the quarter stitch within the square on the grid.
     *
     * @throws {@link Error} if any invalid parameters are provided.
     */
    constructor(
        colorId: number,
        x: number,
        y: number,
        halfStitchAngle: StitchAngle,
        quarterStitchPlacement: StitchPlacement
    ){
        super(colorId, x, y);
        this.halfStitchAngle = halfStitchAngle;
        this.quarterStitchPlacement = quarterStitchPlacement;
    }

    get halfStitchAngle(): StitchAngle {
        return this._halfStitchAngle;
    }

    set halfStitchAngle(halfStitchAngle: StitchAngle) {
        if(!validateStitchAngle(halfStitchAngle)) {
            throw new Error(`Invalid half stitch angle: ${halfStitchAngle}`);
        }
        this._halfStitchAngle = halfStitchAngle;
    }

    get quarterStitchPlacement(): StitchPlacement {
        return this._quarterStitchPlacement;
    }

    set quarterStitchPlacement(quarterStitchPlacement: StitchPlacement) {
        if(!validateStitchPlacement(quarterStitchPlacement)) {
            throw new Error(`Invalid quarter stitch placement: ${quarterStitchPlacement}`);
        }
        //when using a 45 degree half stitch, only BOTTOM_RIGHT and TOP_LEFT are valid quarter stitch placements
        if(45 === this.halfStitchAngle && (StitchPlacement.BOTTOM_LEFT === quarterStitchPlacement || StitchPlacement.TOP_RIGHT === quarterStitchPlacement)) {
            throw new Error('Using a 45 degree StitchAngle only BOTTOM_RIGHT and TOP_LEFT are valid quarter stitch placements');
        }
        //when using a 135 degree half stitch, only BOTTOM_LEFT and TOP_RIGHT are valid quarter stitch placements
        if(135 === this.halfStitchAngle && (StitchPlacement.BOTTOM_RIGHT === quarterStitchPlacement || StitchPlacement.TOP_LEFT === quarterStitchPlacement)) {
            throw new Error('Using a 135 degree StitchAngle only BOTTOM_LEFT and TOP_RIGHT are valid quarter stitch placements');
        }
        this._quarterStitchPlacement = quarterStitchPlacement;
    }
}