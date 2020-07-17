import { debounce } from "common/utils.js"
import BackTop from "components/content/backTop/BackTop"

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },

  mounted() {
    /*
     *  通过事件总线$bus接受子组件goodsListItem.vue发送过来的事件,
     *  监听子组件中img图片加载完成
     *  并通过refresh()刷新以修复scroll滚动的BUG
     */
    this.refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => this.refresh()
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },

  components: {
    BackTop
  },

  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
}