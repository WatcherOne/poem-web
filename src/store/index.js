import { createStore } from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'

// 维护的共有状态
const state = {
  // 菜单列表收缩
  collapsed: false,
  // 菜单列表的展开tab
  openKeys: [],
  // 菜单列表的激活菜单
  activeKeys: []
}

export default createStore({
  state,
  actions,
  mutations,
  modules: {}
})
