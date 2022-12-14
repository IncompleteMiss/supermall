import {debounce} from '@/common/util'
import BackTop from '@/components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // this.$refs.scroll.refresh对这个函数进行防抖操作
    const refresh = debounce(this.$refs.scroll.refresh, 200)

    this.itemImgListener = () => {
      this.$refs.scroll && refresh()
    }

    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('我是混入mounted()的内容')
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    }
  }
}
