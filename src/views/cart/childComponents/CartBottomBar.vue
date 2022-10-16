<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-all" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算：{{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from '@/components/content/checkButton/checkButton'

  import { mapGetters } from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((preLength, item) => {
          return preLength + item.count
        }, 0)
      },
      isSelectAll() {
        if (this.cartList.length === 0) {
          return false
        }
        // item => !item.checked: 查找不选中的
        return !this.cartList.find(item => !item.checked)
        // return !this.cartList.filter(item => !item.checked).length

        /*
        for (let item of this.cartList) {
          if (!item.checked) {
            return false
          }
        }
        return true
        */
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {   // 全部选中
          this.cartList.forEach(item => item.checked = false)
        } else { // 部分或全部不选中
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if (this.checkLength === 0) {
          this.$toast.show('请选择要购买的商品', 1500)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-all {
    width: 20px;
    height: 20px;
    margin-right: 6px;
    border-radius: 50%;
  }

  .price {
    margin-left: 30px;
    flex: 1;
  }

  .calculate {
    width: 100px;
    text-align: center;
    background-color: #eb4868;
    color: #fff;
  }
</style>
