import { HomeAdsAndGoodsModel } from "../model/home";
import { getAction } from "../utils/http"

/**
 * 首页轮播图和商品板块
 * @returns 数据列表
*/
 const homeGoodList = async ():Promise<HomeAdsAndGoodsModel>=>{
    const res = await getAction("/shop/index-list",{});
    return res.data as HomeAdsAndGoodsModel;
}
export { homeGoodList };

