<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车( {{ length }} )</div>
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            :scroll-top="3">
      <cart-list/>
    </scroll>
  </div>
</template>

<script>
import CartList from './childComps/CartList'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import {mapGetters} from 'vuex'

export default {
  name: 'Cart',
  data () {
    return {
    }
  },
  activated () {
    this.$refs.scroll.getRefresh()
  },
  computed: {
    // vuex 知识点  mapGetters
    ...mapGetters({
      length: 'cartLength',
      cart: 'cartList'
    })
  },
  components: {
    CartList,
    NavBar,
    Scroll
  }
}
</script>

<style scoped>
  .cart {
    position: relative;
  }

  .nav-bar {
    background-color: var(--color-high-text);
    color: var(--color-background);
    font-weight: bold;
  }

  .content {
    height: calc(100vh - 58px - 44px);
    overflow: hidden;
  }
</style>
