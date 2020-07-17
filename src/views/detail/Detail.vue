<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" @titleClick="titleClick" ref="navBar" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <div>
        <detail-swiper :top-images="topImages" />
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shop" />
        <detail-goods-info :detail-info="detailInfo" @loadImage="loadImage" />
        <detail-param-info :param-info="paramInfo" class="param-info" ref="param" />
        <detail-comment-info :comment-info="commentInfo" class="comment-info" ref="comment" />
        <goods-list :goods="recommendList" class="goods-list" ref="goodsList" />
      </div>
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/goodsList";

import { itemListenerMixin, backTopMixin } from "common/mixin.js";
import { debounce } from "common/utils.js";

import { mapActions } from 'vuex'

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail.js";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      itemImgListener: null,
      scrollYs: [],
      getScrollYs: null,
      currentIndex: 0,
    };
  },

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },

  mixins: [itemListenerMixin, backTopMixin],

  methods: {
    ...mapActions(['addCart']),

    // 监听图片加载
    loadImage() {
      // 刷新scroll
      this.refresh();
      // 获取offsetTop
      this.getScrollYs();
    },

    // 监听点击detail-nav-bar滚动到对应位置
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.scrollYs[index], 200);
    },

    // 监听scroll滚动设置联动普通方法
    // contentScroll(position) {
    //   const positionY = -position.y;
    //   const length = this.scrollYs.length;
    //   for (let i = 0; i < length; i++) {
    //     if (
    //       this.currentIndex !== i &&
    //       ((i < length - 1 &&
    //         positionY >= this.scrollYs[i] &&
    //         positionY < this.scrollYs[i + 1]) ||
    //         (i === length - 1 && positionY >= this.scrollYs[i]))
    //     ) {
    //       this.currentIndex = i;
    //       this.$refs.navBar.currentIndex = this.currentIndex;
    //     }
    //   }
    // }

    // 监听scroll滚动设置联动hack方法 :往数组push Number.MAX_VALUE
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;

      const positionY = -position.y;
      const length = this.scrollYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.scrollYs[i] &&
          positionY < this.scrollYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.navBar.currentIndex = this.currentIndex;
        }
      }
    },

    // 监听点击购物车
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      this.addCart(product).then(res => {
        this.$toast.show(res)
      })
    }
  },

  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid;

    // 请求数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      // 获得轮播图数据
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 获取店家信息
      this.shop = new Shop(data.shopInfo);

      // 获取详情图等信息
      this.detailInfo = data.detailInfo;

      // 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 获取评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }

      // 获取所有数据后执行此方法
      this.$nextTick(() => {
        // 通过防抖函数获取元素的offsetTop
        this.getScrollYs = debounce(() => {
          this.scrollYs.push(0);
          this.scrollYs.push(this.$refs.param.$el.offsetTop - 44);
          this.scrollYs.push(this.$refs.comment.$el.offsetTop - 44);
          this.scrollYs.push(this.$refs.goodsList.$el.offsetTop - 44);
          this.scrollYs.push(Number.MAX_VALUE);
        }, 200);
      });
    });

    // 请求推荐数据
    getRecommend().then(res => {
      this.recommendList = res.data.list;
    });
  },

  mounted() {},

  destroyed() {
    // 离开时取消监听图片加载
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.nav-bar {
  background: #fff;
  position: relative;
  z-index: 1;
}
.content {
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
.param-info {
  position: relative;
  z-index: 9;
}
.comment-info,
.goods-list {
  background-color: #fff;
}
</style>