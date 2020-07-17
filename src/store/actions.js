import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  addCart(context, payload) {

    return new Promise((resolve, reject) => {
      // find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined
      // 1.查找之前数组中是否有该商品
      const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.判断oldProduct
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('购物车商品+1')
      } else {
        context.commit(ADD_TO_CART, payload)
        resolve('添加购物车成功')
      }
    })
  }
}