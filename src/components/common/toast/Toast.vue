<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      isShow: false
    }
  },

  methods: {
    show(message='我是提示信息', duration=2000) {
      this.message = message
      this.isShow = true

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration);
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    padding: 8px 10px;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, .6);
    color: #fff;
    border-radius: 5px;
  }
</style>