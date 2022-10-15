import Vue from 'vue'
import Vuex from 'vuex'

import mutations from '@/store/mutations'
import actions from '@/store/actions'
import getters from '@/store/getters'

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  getters,
  mutations: mutations,
  //{
    // mutations唯一的目的就是修改state中的状态
    // padLoad: 形参名，用来接收commit里传来的参数
    // addCart(state, payload) {
      /*
      // 方法一：
      // payload新添加的商品
      let oldProduct = null
      for (let item of state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item
        }
      }

      // 2.判断oldProduct
      if (oldProduct) {
        oldProduct.count += 1
      } else {
        payload.count = 1
        state.cartList.push(payload)
      }
      */

      /*
      // 方法二
      let index = state.cartList.indexOf(payload)
      if (index !== -1) {
        let oldProduct = state.cartList[index]
        oldProduct.count += 1
      } else {
        payload.count = 1
        state.cartList.push(payload)
      }
      */
    //}
  // },
  actions,
  modules: {
  }
})

// 3.挂载到Vue实例上
export default store
