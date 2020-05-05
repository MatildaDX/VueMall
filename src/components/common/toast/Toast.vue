<template>
  <div id="toast" v-show="isShow">
    <span>{{message}}</span>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: [String],
    isShow: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>

<style>
  #toast {
    position: fixed;
    top: 50%;
    left: 50%;
    color: #FFF;
    background-color: rgba(0, 0, 0, .6);
    padding: 8px 10px;
    z-index: 9999;
    transform: translate(-50%, -50%);
  }
</style>
