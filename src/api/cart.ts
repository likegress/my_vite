import { CartModel } from './../model/cart';
import { getAction } from "../utils/http"

/**
 * 获取购物车
 * @params page页码
 * @params page_num 单页数据量
*/
const cartList = async (page:number,page_num:number):Promise<CartModel[]>=>{
    const res = await getAction("/shop/mall-cart-list", {
      page,
      page_num,
    });
    return res.data as CartModel[];
}
export {cartList}