<template>
  <div class="goods-list" @click="tabClink">
    <!-- @load 监听图片加载事件 -->
    <img v-lazy="showImages" alt="" @load="itemImgLoad">
    <div class="goods-info">
      <p>{{ goodsList.title }}</p>
      <span class="price">{{ goodsList.price }}</span>
      <span class="collect">{{ goodsList.cfav }}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GoodsListItem',
  props: {
    goodsList: {
      type: Object,
      default() {
        return []
      }
    }
  },
  computed: {
    showImages () {
      return this.goodsList.image || this.goodsList.show.img
    }
  },
  methods: {
    // 点击跳转到详情页
    tabClink() {
      this.$router.push('/detail/' + this.goodsList.iid)
    },
    itemImgLoad() {
      // 发送图片加载完成事件
      this.$bus.$emit('itemImgLoad')
    }
  }
}
</script>

<style>
  .goods-list {
    width: 48%;
    padding-bottom: 40px;
    position: relative;
  }
  .goods-list img {
    width: 100%;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
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
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>