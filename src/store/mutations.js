// mutations 唯一的目的就是修改state中状态
// mutations 中的每个方法尽可能完成的事件比较单一一点
// 如果有一些判断逻辑,最好是放入actions中
import {
  ADD_COUNTER,
  ADD_PLAYLOAD
} from './mutations-types'

export default {
  [ADD_COUNTER] (state, playload) {
    playload.count += 1
    state.cartList.shift(playload)
    state.cartList.push(playload)
  },
  [ADD_PLAYLOAD] (state, playload) {
    playload.count = 1
    state.cartList.push(playload)
  }
}