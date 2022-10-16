import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from '@/components/common/toast'

Vue.config.productionTip = false

// 添加事件中线对象
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

// 解决移动端的300ms延迟
FastClick.attach(document.body)

// 使用懒加载的插件
Vue.use(VueLazyload, {
  // 加载时显示此图片
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
