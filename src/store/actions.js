import {
  ADD_COUNTER,
  ADD_TO_CART
} from '@/store/mutations-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找之前数组中是否有该商品
      // find: 内部函数为true，则将当前的item返回
      let oldProduct = context.state.cartList.find(item => {
          return item.iid === payload.iid
        }
      )

      // 2.判断oldProduct
      if (oldProduct) {
        // 商品数量加一
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量加一')
      } else {
        // 添加新的商品
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加新商品成功')
      }
    })
  }
}
