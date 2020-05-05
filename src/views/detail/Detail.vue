<template>
  <div class="detail">
    <detail-nav-bar  @titleClick='titleClick'/>
    <scroll class="content" ref="scroll" :scroll-top="3" @pScroll="pScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="conment"/>
    </scroll>
    <detail-bottom-bar @addToClick='addToClick'/>
    <toast :message="message" :isShow="isShow"/>
  </div>
</template>

<script scoped>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Toast from 'components/common/toast/Toast'
import Scroll from 'components/common/scroll/Scroll'

// 映射 actions 
import {mapActions} from 'vuex'

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam
} from 'network/detail'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      paramInfo: {},
      commentInfo: {},
      recommend: {},
      currmentIndex: 0,
      themTopYs: [],
      message: '',
      isShow: false
    }
  },
  updated () {
    this.themTopYs.push(0)
    this.themTopYs.push(this.$refs.params.$el.offsetTop)
    this.themTopYs.push(this.$refs.conment.$el.offsetTop)
  },
  methods: {
    // 点击添加购物车
    ...mapActions(['addToCart']),
    addToClick () {
      var goods = []
      goods.images = this.topImages[0]
      goods.iid = this.iid
      goods.title = this.goods.title
      goods.desc = this.goods.desc
      goods.price = this.goods.oldPrice
      this.addToCart(goods).then(res => {
        this.message = res
        this.isShow = true
        setTimeout(() => {
          this.isShow = false
        }, 1000)
      })
    },
    titleClick (index) {
      this.currmentIndex = index
      this.$refs.scroll.getScrollTo(0, -this.themTopYs[index], 500)
    },
    pScroll() {
      // 获取y轴
      // const positionY = position.y
      // 0  835 2303
      // 当y轴小于835的时候  index = 0
      // 当y轴等于835小于2303的时候  index = 1
      // 当y轴大于等于 2303 的时候 index = 2
      // const length = this.themTopYs.length
      // for (let i = 0; i < length; i++) {
      //   if (this.currmentIndex !== i && (positionY < this.themTopYs[i + 1]) || (positionY > this.themTopYs[length - 1] && positionY > this.themTopYs[i + 1])) {
      //     console.log(i)
      //   }
      // }
    }
  },
  created () {
    // 获取当前 id
    this.iid = this.$route.params.iid
    // 根据 id 查询数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // 获取主页轮播图数据
      this.topImages = data.itemInfo.topImages
      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // 获取商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 保存评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    })
    // 获取swiper的y值
    // this.swiper = this.$refs.swiper.$el.offsetTop
    // console.log(this.swiper)
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Toast,
    Scroll
  }
}
</script>

<style scoped>

  .detail {
    position: relative;
    height: 100%;
    background-color: #fff;
    z-index: 999;
  }

  .content {
    position: absolute;
    height: calc(100vh - 108px);
    overflow: hidden;
    top: 50px;
    bottom: 60px;
    z-index: 9;
    background-color: #fff;
    margin-bottom: 0px;
  }
</style>
