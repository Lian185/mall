<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div class="title"  slot="center">
        <div class="title-item" v-for="(item, index) in titles" :key="index" :class="{active: index == currentIndex}" @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },

  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },

    backClick() {
      this.$router.back()
    }
  },

  components: {
    NavBar
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 12px;
}
.title-item {
  flex: 1;
}
.back img {
  margin: 11px 10px 0 0;
}
.active {
  color: var(--color-high-text);
}
</style>