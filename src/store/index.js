import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

// 安装插件
Vue.use(Vuex)

const state = {
  cartList: [],
}

// 创建实例
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 导出实例
export default store