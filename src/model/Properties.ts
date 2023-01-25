import { validateNonNegativeInteger } from '../validation';
import { Color } from './Color';

/**
 * Model class representing a pattern's properties.
 */
export class Properties {
    private colors!: Color[];
    private stitchWidth?: number;
    private stitchHeight?: number;

    /**
     * @param colors - The list of colors that are used in the pattern.
     * @param stitchWidth - The width, in stitches, of the pattern.
     * @param stitchHeight - The height, in stitches, of the pattern.
     * @param notes - Any notes or comments about the pattern.
     */
    constructor(
        colors: Color[],
        stitchWidth?: number,
        stitchHeight?: number,
        public notes?: string
    ){
        if(!this.setColors(colors)) {
            throw new Error('colors cannot be empty, at least one color must be defined');
        }
        if(stitchWidth && !this.setStitchWidth(stitchWidth)){
            throw new Error(`invalid stitchWidth provided: ${stitchWidth}`);
        }

        if(stitchHeight && !this.setStitchHeight(stitchHeight)){
            throw new Error(`invalid stitchHeight provided: ${stitchHeight}`);
        }
    }

    public setColors(colors: Color[]): boolean {
        if(colors.length > 0) {
            this.colors = colors;
            return true;
        }

        return false;
    }

    public getColors(): Color[] {
        return this.colors;
    }

    public setStitchWidth(stitchWidth: number): boolean {
        if(validateNonNegativeInteger(stitchWidth)){
            this.stitchWidth = stitchWidth;
            return true;
        }

        return false;
    }

    public getStitchWidth(): number | undefined {
        return this.stitchWidth;
    }

    public setStitchHeight(stitchHeight: number): boolean {
        if(validateNonNegativeInteger(stitchHeight)){
            this.stitchHeight = stitchHeight;
            return true;
        }

        return false;
    }

    public getStitchHeight(): number | undefined {
        return this.stitchHeight;
    }
}