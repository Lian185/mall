<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <category-content :categoryList="categoryList" @clickLiIndex="clickLiIndex" :showSubcategorys="showSubcategorys" :showCategoryDetail="showCategoryDetail"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CategoryContent from "./childComps/CategoryContent";

import {
  getCategory,
  getSubcategory,
  getSubcategoryDetail
} from "network/category";

export default {
  data() {
    return {
      categoryList: [],
      categoryData: {},
      currentIndex: -1
    };
  },

  components: {
    NavBar,
    CategoryContent
  },

  computed: {
    showSubcategorys() {
      if(this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].subcategorys
    },

    showCategoryDetail() {
      if(this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].categoryDetail
    }
  },

  methods: {
    // 监听事件点击响应并请求数据
    clickLiIndex(index) {
      this._getSubcategory(index);
    },

    // 请求分类的数据的方法
    _getCategory() {
      getCategory().then(res => {
        this.categoryList = res.data.category.list;

        // 初始化子分类
        for (let i = 0; i < this.categoryList.length; i++) {
          this.categoryData[i] = {
            subcategorys: [],
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          };
        }
        // 请求子分类第一个数据
        this._getSubcategory(0);
      });
    },

    // 请求子分类数据的方法
    _getSubcategory(index) {
      // 保存index值
      this.currentIndex = index;

      const maitKey = this.categoryList[index].maitKey;

      getSubcategory(maitKey).then(res => {
        // 把请求到的数据添加到初始化的子分类对象中
        this.categoryData[index].subcategorys = res.data.list;
        this.categoryData = { ...this.categoryData };

        // 请求详情列表数据
        this._getSubcategoryDetail("pop");
        this._getSubcategoryDetail("new");
        this._getSubcategoryDetail("sell");
      });
    },

    // 请求详情列表数据的方法
    _getSubcategoryDetail(type) {
      const miniWallkey = this.categoryList[this.currentIndex].miniWallkey;

      getSubcategoryDetail(miniWallkey, type).then(res => {
        // 把请求到的数据添加到初始化的子分类对象中
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    }
  },

  created() {
    // 调用请求分类数据方法
    this._getCategory();
  }
};
</script>

<style scoped>
.category {
  color: #fff;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}
</style>