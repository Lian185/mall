<template>
  <div id="recommend">
    <div class="recommend-item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  #recommend {
    display: flex;
  }
  .recommend-item {
    flex: 1;
    text-align: center;
    font-size: 12px;
    padding: 15px 0 15px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item img {
    width: 85%;
    margin-bottom: 10px;
  }
</style>