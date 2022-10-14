<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"/>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"/>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon collect"/>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addToCart() {

      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    /*position: relative;*/
    /*height: 49px;*/
    position: fixed;
    height: 49px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    display: flex;
    text-align: center;
    overflow: hidden;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  /* A>B 表示选择A元素的所有子B元素（只选择第一代） */
  .bar-item>div {
    flex: 1;
  }

  .bar-left .text {
    font-size: 13px;
  }

  .bar-left .icon {
    display: block;
    width: 20px;
    height: 20px;
    margin: 6px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position: 0 -47px;
  }

  .bar-left .shop {
    background-position: 0 -88px;
  }

  .bar-left .collect {
    background-position: 0 2px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
    text-align: center;
  }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy {
    background-color: #f69;
  }
</style>
