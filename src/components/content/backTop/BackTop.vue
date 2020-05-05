<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  methods: {
  }
}
</script>

<style scoped>
  .back-top {
    width: 10%;
    height: 40px;
    position: fixed;
    right: 16px;
    bottom: 10%;
    z-index: 99;
  }

  .back-top img {
    width: 100%;
    height: 100%;
  }
</style>