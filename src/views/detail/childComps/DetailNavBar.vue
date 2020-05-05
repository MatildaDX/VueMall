<template>
  <div id="DetailNavBar">
    <nav-bar class="navBar">
      <!-- left -->
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <!-- center -->
      <div slot="center" class="titles">
         <div v-for="(item, index) in titles" :key="index" class="title-item">
          <span :class="{itemActive: currenterIndex === index}" 
                @click="itemClick(index)">
            {{item}}
          </span>
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script scoped>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品', '详情', '评论'],
      currenterIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currenterIndex = index
      this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.back()
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
  .left img {
    margin: 23% 0 0 30%;
  }

  .titles {
    display: flex;
    height: 100%;
    line-height: 50px;
  }

  .title-item { 
    flex: 1;
  }

  .itemActive {
    color: var(--color-tint);
  }

  .navBar {
    background-color: #fff;
  }

</style>
