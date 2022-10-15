<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar"  @titleClick="titleClick" ref="detailNavBar"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!-- 属性：topImage 传入值：top-images -->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <good-list ref="commend" :goods="recommends"/>
    </scroll>
    <BackTop @click.native="backTop" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from '@/views/detail/childComponents/DetailNavBar'
  import DetailSwiper from '@/views/detail/childComponents/DetailSwiper'
  import DetailBaseInfo from '@/views/detail/childComponents/DetailBaseInfo'
  import DetailShopInfo from '@/views/detail/childComponents/DetailShopInfo'
  import DetailGoodsInfo from '@/views/detail/childComponents/DetailGoodsInfo'
  import DetailParamInfo from '@/views/detail/childComponents/DetailParamInfo'
  import DetailCommentInfo from '@/views/detail/childComponents/DetailCommentInfo'
  import DetailBottomBar from '@/views/detail/childComponents/DetailBottomBar'

  import Scroll from '@/components/common/scroll/Scroll'
  import GoodList from '@/components/content/goods/GoodList'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from '@/network/detail'
  import {backTopMixin, itemListenerMixin} from '@/common/mixin'
  import {debounce} from '@/common/util'

  export default {
    name: "Detail",
    components: {
      DetailBottomBar,
      DetailShopInfo,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodList
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        isShowBackTop: false
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        console.log(res)
        const data = res.result
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.取出评论的信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        // 在这里获取offsetTop值不对的原因：this.$refs.params.$el压根没有渲染

        /*
        this.$nextTick(() => {
          this.themeTopYs = []

          // 在这里获取offsetTop值不对的原因：图片没有计算在内
          // $el指向当前组件template模板中的根标签
          /!* 根据最新的数据，对应的DOM是已经被渲染出来，但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片) *!/
          // offsetTop值不对的时候，都是因为图片的原因
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
          this.themeTopYs.push(this.$refs.commend.$el.offsetTop - 44)

          console.log(this.themeTopYs)
        })
        */
      })

      // 3.请求详情数据
      getRecommend().then(res => {
        console.log(res)
        this.recommends = res.data.list
      })

      // 给getThemeTopY赋值(给this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []

        // 在这里获取offsetTop值不对的原因：图片没有计算在内
        // $el指向当前组件template模板中的根标签
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44 || this.$refs.commend.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.commend.$el.offsetTop - 44)
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 200)
    },
    mounted() {
    },
    // 页面未做缓存，无法调用deactivated()
    destroyed() {
      // 取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()

        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index)
        let y = this.themeTopYs[index]
        this.$refs.scroll.scrollTo(0, -y, 200)
      },
      contentScroll(position) {
        // 1.获取y值
        const positionY = Math.abs(position.y)

        // 2.positionY和主题中值对比
        // 使index值随之改变
        // for in 遍历对象返回key，数组返回下标
        let length = this.themeTopYs.length
        /*
        for (let i = 0; i < length; i++) {
          /!*
          if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
            console.log(i)
          }
          *!/
         /!*
         if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
              || (i === length - 1 & positionY >= this.themeTopYs[i]))) {
            this.currentIndex = i
            console.log(this.currentIndex)
            // $el是DOM元素，$refs是访问子组件
            this.$refs.detailNavBar.currentIndex = this.currentIndex
          }
        *!/
        }
        */
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i
            console.log(this.currentIndex)
            // $el是DOM元素，$refs是访问子组件
            this.$refs.detailNavBar.currentIndex = this.currentIndex
          }
        }
        // 判断BackTop是否显示
        this.isShowBackTop = Math.abs(position.y) > 1000
      },
      addToCart() {
        // 1.获取购物车需要展示的商品信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        // 2.将商品添加到购物车里
        // this.$store.commit('addCart', product)   // mutations
        this.$store.dispatch('addCart', product)   // actions
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    /* 如果不设置背景颜色，某些地方为透明色，无法完全盖住tabbar */
    background-color: #fff;
    height: 100vh;
  }

  .detail-navbar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
