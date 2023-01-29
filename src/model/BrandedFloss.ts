import { BrandName } from './BrandName';

export interface BrandedFloss {
    brandName: BrandName;
    colorCode: string;
    colorName: string;
    otherBrandEquivalents?: BrandedFloss[]
}