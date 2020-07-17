<template>
  <div class="tab-bar-item" @click="btnClick">
    <div v-if="!isActive">
      <slot name="img"></slot>
    </div>
    <div v-else>
      <slot name="active-img"></slot>
    </div>
    <div :style="isStyle">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // isActive: true
    };
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      defaul: "red"
    }
  },
  methods: {
    btnClick() {
      // console.log(111);
      this.$router.push(this.path)
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    isStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }

  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 12px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 6px;
  margin-bottom: 2px;
  vertical-align: middle;
}
</style>