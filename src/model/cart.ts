import { BatchNoModel, GoodModel } from './../interface/commen';

export interface CartModel {
  brandName: string;
  count: number;
  CartDetailDTO: CartDetailModel[];
  checked: boolean; //全选
  isIndeterminate:boolean; //不确定的,半选
}
export interface CartDetailModel extends GoodModel{
  cartDetailDTO: any;
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

  //额外扩展属性
  checked:boolean;
}

