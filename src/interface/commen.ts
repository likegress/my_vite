//通用基类

//周期模型
export interface BatchNoModel {
  batchNo: string;
  goodNum: number;
  goodsSpec: string;
  goodsUnit: string;
  salesPrice: string;
}

//商品标签模型
export interface GoodsLabel {
    color: string;
    id: number;
    labelName:string;
    sort:string;
} 

//商品模型
export interface GoodModel {
    goodsId:number;
    goodsLogo?:string;
    goodsName?:string;
    goodsSn?:string;
    goodsUnit?:string;
    goodsSpec?:string;
    goodsNum :number;
    isFull?:number;
    lisPrice?:string;
    goodsPrice?:string;
    lowNum?:string;
    priceStockBatchVoList:BatchNoModel[];
    storeLabelList?:GoodsLabel[];
    gift?:boolean;
}
//分页模型
export interface Pagination {
  pageNum: number; //请求时会用
  pageSize: number; //请求时会用
  pages?: number; //数据响应时会用
  total?: number; //数据响应时会用
}