<template>
  <div class="content-right">
    <scroll class="scroll">
      <div class="top-content">
        <div class="tc" v-for="(item, index) in showSubcategorys" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt />
            <div class="text">{{item.title}}</div>
          </a>
        </div>
      </div>
      <div class="bottom-content">
        <tab-control class="tab-control" :titles="['综合', '新品', '销量']" @tabClick="tabClick"/>
        <goods-list :goods="showGoods()"/>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabControl/TabControl";
import goodsList from "components/content/goods/goodsList";

export default {
  components: {
    Scroll,
    TabControl,
    goodsList
  },

  data() {
    return {
      currentType: 'pop'
    }
  },

  props: {
    showSubcategorys: {
      type: Array,
      default() {
        return [];
      }
    },
    showCategoryDetail: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }      
    },

    showGoods() {
      return this.showCategoryDetail[this.currentType]
    }
  }
};
</script>

<style scoped>
.content-right {
  color: #666666;
}
.scroll {
  height: 100%;
}
.top-content {
  display: grid;
  grid-template-columns: 33% 33% 33%;
}
.tc {
  font-size: 12px;
  text-align: center;
  margin-top: 20px;
}
.top-content img {
  height: 65px;
}
.text {
  margin-top: 17px;
}
.tab-control {
  margin-top: 25px;
}
</style>