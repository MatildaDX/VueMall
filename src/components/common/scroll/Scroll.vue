<template>
  <div class="wrapper" ref="wrapper">
    <div class="contet">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    scrollTop: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  methods: {
    getScrollTo(x, y, time) {
      this.scroll.scrollTo(x, y, time)
    },
    getFinishPullUp() {
      this.scroll.finishPullUp()
    },
    getRefresh() {
      this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType: this.scrollTop,
      pullUpLoad: this.pullUpLoad
    })
    // 绑定滚动事件
    this.scroll.on('scroll', (position) => {
      this.$emit('pScroll' ,position)
    })
    // 上滑获取更多
    this.scroll.on('pullingUp', () => {
      this.$emit('scrollTopData')
      this.scroll.finishPullUp()
    })
  }
}
</script>

<style scoped>
</style>