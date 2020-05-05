<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key="index" :goodsList="item">
      {{item}}
    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

// import BScroll from 'better-scroll'

export default {
  name: 'GoodsList',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  },
  mounted () {
    // this.scroll = new BScroll(document.querySelector('.content'), {
    //   probeType: 2,
    //   pullUpLoad: true
    // })
    // this.scroll.on('scroll', (option) => {
    //   console.log(option)
    // })
  }
}
</script>

<style>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 8px;
  }
</style>
