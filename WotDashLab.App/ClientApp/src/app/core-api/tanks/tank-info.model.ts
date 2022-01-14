export interface ITankImageModel {
  smallIcon: string;
  contourIcon: string;
  bigIcon: string;
}

export interface ITankInfoModel {
  id: number;
  name: string;
  shortName: string;
  nation: string;
  tier: number;
  type: string;
  description: string;
  isPremium: boolean;
  images: ITankImageModel;
}
