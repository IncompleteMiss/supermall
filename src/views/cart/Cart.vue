<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list />

    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
  import CartList from '@/views/cart/childComponents/CartList'
  import CartBottomBar from '@/views/cart/childComponents/CartBottomBar'

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // mapGetters 辅助函数仅仅是将store中的getter映射到局部计算属性
      // 两种用法 将getters中的方法转成计算属性
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        // 修改名称，映射
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 600;
  }
</style>
