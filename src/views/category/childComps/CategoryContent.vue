<template>
  <div class="content">
    <category-content-left class="l-content" :categoryList="categoryList" @clickLi="clickLiIndex"/>
    <category-content-right class="r-content" :showSubcategorys="showSubcategorys" :showCategoryDetail="showCategoryDetail"/>
  </div>
</template>

<script>
import CategoryContentLeft from './CategoryContentLeft'
import CategoryContentRight from './CategoryContentRight'

export default {
  components: {
    CategoryContentLeft,
    CategoryContentRight
  },

  props: {
    categoryList: {
      trpe: Array,
      default() {
        return []
      }
    },
    showSubcategorys: {
      trpe: Array,
      default() {
        return []
      }
    },
    showCategoryDetail: {
      trpe: Object,
      default() {
        return {}
      }
    }
  },

  methods: {
    clickLiIndex(index) {
      // 向父组件传递由子组件传过来的index值
      this.$emit('clickLiIndex', index)      
    }
  }
}
</script>

<style scoped>
  .content {
    display: flex;
    margin-top: 44px;
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
  }
  .l-content {
    flex: 0.25;
    overflow: hidden;
  }
  .r-content {
    flex: 0.75;
    overflow: hidden;
  }
</style>