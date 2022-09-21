import { BatchNoModel, GoodModel } from './../interface/commen';

export interface CartModel {
  brandName: string;
  count: number;
  CartDetailDTO: CartDetailModel[]
}
export interface CartDetailModel extends GoodModel{
  batchNo: string;
  brandId: number;
  cartId: number;
  goodsAvgPrice: number;
  promBuyCount: number;
  promId: number;
  promType: number;
  isFull?: number;
  lisPrice?: string;
  lowNum?: string;  gift?: boolean;
}

