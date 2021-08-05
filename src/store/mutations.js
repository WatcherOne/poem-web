/*
*** 改变更新Vuex状态的唯一合法方法
*** 同步操作数据方式
*/

export const CHANGE_OPEN_ASIDE = (state, key) => {
  state.openKeys = key
}

export const CHANGE_ACTIVE_ASIDE = (state, key) => {
  state.activeKeys = key
}

export const TOGGLE_COLLAPSED = (state) => {
  state.openKeys = []
  state.collapsed = !state.collapsed
}
