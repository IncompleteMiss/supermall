<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imgLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">￥{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      goodsItem: Object
    },
  computed: {
    showImage() {
      // 顺序不可换：当一个对象的属性为undefined时，去读取这个属性的属性不会报undefined而是会报错
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imgLoad() {
      //可以在home页面中，单独$off掉home的那个事件。
      this.$bus.$emit("goodsImgLoadEvent");
    },
    itemClick() {
      if (this.goodsItem.iid) {
        return  this.$router.push("/detail/" + this.goodsItem.iid);
      }
      // 点击推荐商品图片，未获取到商品id，直接使用某个某个商品id代替全部点击
      return this.$router.push("/detail/" + "1m70y5k").catch(err => {err});
    }
  },
};
</script>

<style scoped>
.goods-item {
  position: relative;
  padding-bottom: 40px;
  width: calc(50% - 10px);

  margin: 3px 5px 0;
}

.goods-item img {
  width: 100%;
  border-radius: 6px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
  padding-top: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
}

</style>
