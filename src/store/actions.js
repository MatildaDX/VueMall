import {
  ADD_COUNTER,
  ADD_PLAYLOAD
} from './mutations-types'

export default {
  addToCart(context, playload) {
    return new Promise ((resolve, reject) => {
      // 判断cartList中是否有该商品 find()函数
      let oldGoods = context.state.cartList.find(item => item.iid === playload.iid)
      // 如果存在goods
      if (oldGoods) {
        context.commit(ADD_COUNTER, oldGoods)
        resolve('商品数量+1')
      } else { // 如果不存在
        context.commit(ADD_PLAYLOAD, playload)
        resolve('加入购物车成功')
      }
      reject('shibai')
    })
  }
}