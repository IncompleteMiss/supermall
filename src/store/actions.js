import {
  ADD_COUNTER,
  ADD_TO_CART
} from '@/store/mutations-types'

export default {
  addCart(context, payload) {
    // 1.查找之前数组中是否有该商品
    // find: 内部函数为true，则将当前的item返回
    let oldProduct = context.state.cartList.find(item => {
      item.iid = payload.iid
    })

    // 2.判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}
