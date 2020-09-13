import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from "components/common/toast"

// 解决移动端 300 毫秒延迟
// npm install fastclick --save   
FastClick.attach(document.body)

// 使用懒加载插件
// npm install vue-lazyload --save
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.jpg')
})

Vue.use(toast)

Vue.config.productionTip = false

// vue 实例可以做事件总线 $bus
Vue.prototype.$bus = new Vue()

new Vue({ 
  router,
  store,
  render: h => h(App),
}).$mount('#app')
