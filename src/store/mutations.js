import {
  ADD_COUNTER,
  ADD_TO_CART
} from '@/store/mutations-types'

export default {
  // mutations中的每个方法尽可能完成的事情比较单一一点
  [ADD_COUNTER](state, payload) {
    payload.count = payload.count + 1
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
