<template>
  <div class="home">
    <!-- 头部导航栏 -->
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class=""
                :titles= "['流行', '新款', '精选']"
                @tabClick="tabClick"
                ref="tabControl1"
                v-show="isTabFixed" />
    <!-- better-scroll 滚动 -->
    <scroll class="content" 
            ref="scroll" 
            :scroll-top="3" 
            @pScroll="pScroll" 
            @scrollTopData="scrollTopData" 
            :pull-up-load="true">
      <!-- 轮播图 -->
      <home-swiper class="home-swiper" :banners= "banners" @imgHomeSwiper="imgHomeSwiper" />
      <!-- 好物 -->
      <feature-view :recommends= "recommends" />
      <!-- 流行 -->
      <recommend-view/>
      <!-- 数据切换 -->
      <tab-control class="tab-Control"
                  :titles= "['流行', '新款', '精选']"
                  @tabClick="tabClick"
                  ref="tabControl2"
                  :class="{tabFixed: isTabFixed}" />
      <!-- 数据展示 -->
      <goods-list :goods="Goods[currteType].list" />
    </scroll>
    <!-- TOP -->
    <back-top @click.native="backTop" v-show="isScrollShow"/>
  </div>
</template>

<script>
import HomeSwiper from './childComprs/HomeSwiper'
import FeatureView from './childComprs/FeatureView'
import RecommendView from './childComprs/RecommendView'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import { getHomeMultidata, getHomeGoods } from 'network/home'

export default {
  name: 'Home',
  data () {
    return {
      banners: [],
      recommends: [],
      Goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      tabOffsetTop: null,
      currteType: 'pop',
      scroll: null,
      isScrollShow: false,
      isTabFixed: false,
      saveY: 0
    }
  },
  created () {
    // 执行请求
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    // 监听 GoodsListItem 发送的图片监听事件 
    // 解决 better-scroll 图片加载视图BUG
    this.$bus.$on('itemImgLoad', () => {
      this.debounce(this.$refs.scroll.getRefresh(), 200)
    })
  },
  activated () {
    this.$refs.scroll.getScrollTo(0, this.saveY, 0)
    this.$refs.scroll.getRefresh()
  },
  deactivated () {
    // 离开时记录当前 scroll y轴位置
    this.saveY = this.$refs.scroll.getScrollY()
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    debounce(func, delay) { // 防抖函数
      let timer = null
      return function (...args) {
        if (timer) clearTimeout (timer)
        timer = setTimeout (() => {
          func.apply(this, args)
        }, delay)
      } 
    },
    scrollTopData() {
      this.getHomeGoods(this.currteType)
    },
    pScroll(position) {
       // 1. 判断BackTop是否显示
      this.isScrollShow = (-position.y) > 1000
      
      // setTimeout 处理 tabOffsetTop 赋值问题
      setTimeout(() => {
        // 2. 判断TabControl是否吸附
        this.isTabFixed = (-position.y) > this.tabOffsetTop + 50
      }, 1)
    },
    // 点击回到顶部
    backTop() {
      this.$refs.scroll.getScrollTo(0, 0, 500)
    },
    // 切换 TabControl
    tabClick(index) {
      switch(index) {
        case 0:
          this.currteType = 'pop'
          break
        case 1:
          this.currteType = 'new'
          break
        case 2: 
          this.currteType = 'sell'
          break
      }
      this.$refs.tabControl1.isActive = index
      this.$refs.tabControl2.isActive = index
    },
    // 当图片加载完成时, 获取tab的高度
    imgHomeSwiper() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.Goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.Goods[type].list.push(...res.data.list)
        this.Goods[type].page += 1
      })
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    FeatureView,
    RecommendView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
}
</script>

<style scoped>
  .home {
    position: relative;
    height: 100vh;
  }

  .home-bar {
    background: var(--color-tint);
    font-size: var(--font-size); 
    color: #FFF;
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0; */
    z-index: 99;
  }

  .tab-Control {
    background-color: #FFF;
    /* position: sticky;
    top: 44px; */
  }

  .content {
    height: calc(100% - 58px);
    overflow: hidden;
    padding-top: 44px;
  }

  .isShowTabControl {
    display: none;
  }

  .tabFixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }
</style>
