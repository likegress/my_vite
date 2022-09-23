import { CartModel } from './../model/cart';
import { delAction, getAction } from "../utils/http"

/**
 * 获取购物车
 * @params page页码
 * @params page_num 单页数据量
*/

// 获取购物车
const cartList = async (page:number,page_num:number):Promise<CartModel[]>=>{
    const res = await getAction("/shop/mall-cart-list", {
      page,
      page_num,
    });
    return res.data as CartModel[];
}
//删除购物车
/**
 * @params cartIds  购物车商品的id集合   格式为逗号拼接的ID,如1,2,3,4
 * @returns
*/
const cartRemove = async (cartIds:string):Promise<boolean>=>{
  const res = await delAction("/shop/mall-cart-del", {},{ cartIds });
  return res.code == 0;
}

export { cartList, cartRemove };