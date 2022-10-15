import {
  ADD_COUNTER,
  ADD_TO_CART
} from '@/store/mutations-types'

export default {
  // mutations中的每个方法尽可能完成的事情比较单一一点
  [ADD_COUNTER](state, payload) {
    payload.count ++
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  }
}
