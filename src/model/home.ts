export interface HomeAdsAndGoodsModel {
  unreadMsg: number;
  ads: AdsModel[];
  plateGoodsVOList: [];
}

export interface AdsModel {
  cateId: number;
  cateIds: number[];
  createTime: string;
  getType: number;
  goodsId: number;
  goodsIds: number[];
  id: number;
  outUrl: string;
  promType: number;
  sort: number;
  type: number;
  url: string;
  videoUrl:string;
}