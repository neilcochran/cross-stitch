import { Color } from "./Color";

export class Properties {

    constructor(
        public colors: Color[], 
        public stitchWidth?: number,
        public stitchHeight?: number,
        public notes?: string
    ){}
}