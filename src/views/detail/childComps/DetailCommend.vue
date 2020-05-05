<template>
  <div class="feature">
    <div v-for="(item, index) in recommend.list" :key="index" class="feature-item">
       <a :href="item.link">
        <img :src="item.image" :alt="item.title">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailCommend',
  props: {
    recommend: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .feature {
    display: flex;
     flex-wrap: wrap;
    justify-content: space-around;
  }

  .feature-item {
    flex: 1;
    text-align: center;
  }

  .feature img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>