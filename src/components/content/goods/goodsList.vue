<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key="index" :item="item"/>
  </div>
</template>

<script>
import goodsListItem from './goodsListItem'

export default {
  components: {
    goodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>