<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  #tab-bar{
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f6f6f6;
    box-shadow: 0 -2px 2px 1px rgba(100, 100, 100, .1);
  }
</style>