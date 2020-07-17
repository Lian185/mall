<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt @load="imageLoad" />
    <div class="goods-info">
      <p>{{item.title}}</p>
      <span class="price">{{item.price}}</span>
      <span class="collect">{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  computed: {
    showImage() {
      return this.item.image || this.item.img || this.item.show.img
    }
  },

  methods: {
    // 通过事件总线$bus向Home.vue发送一个事件
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },

    itemClick() {
      this.$router.push('/detail/' + this.item.iid)
    },
  }
};
</script>

<style scoped>
.goods-item {
  width: 48%;
  padding-bottom: 40px;
  position: relative;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  bottom: 5px;
  overflow: hidden;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url(~assets/img/common/collect.svg) 0 0/14px 14px;
}
</style>