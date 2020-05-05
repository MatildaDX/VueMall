import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import vueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 创建一个 $bus 事件总线
Vue.prototype.$bus = new Vue()

Vue.use(vueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png') //设置懒加载时的图片
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
