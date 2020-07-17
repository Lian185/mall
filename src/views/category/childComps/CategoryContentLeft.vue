<template>
  <div class="content-left">
    <scroll class="scroll">
      <ul class="list">
        <li :class="{active: index === currentIndex}" @click="clickLi(index)" v-for="(item, index) in categoryList" :key="index">{{item.title}}</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

export default {
  components: {
    Scroll
  },

  data() {
    return {
      currentIndex: 0
    }
  },

  props: {
    categoryList: {
      trpe: Array,
      default() {
        return []
      }
    }
  },

  methods: {
    clickLi(index) {
      this.currentIndex = index
      
      // 向父组件传递index值
      this.$emit('clickLi', index)
    }
  }
};
</script>

<style scoped>
.content-left {
  background-color: #f6f6f6;
}
.scroll {
  height: 100%;
}
.list {
  background-color: f6f6f6;
  color: #666666;
  font-size: 14px;
}
.list li {
  text-align: center;
  height: 45px;
  line-height: 45px;
}
.active {
  color: #ff5777;
  background-color: #ffffff;
  border-left: 3px solid #ff5777;
  font-weight: bold;
}
</style>