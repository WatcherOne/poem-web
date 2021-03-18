/*
*** 注册事件处理函数, 数据异步操作
*** 通过传递参数给mutation进行vuex的改变
*/

export const changeOpenAside = ({ commit }, key) => commit('CHANGE_OPEN_ASIDE', key)
export const changeActiveAside = ({ commit }, key) => commit('CHANGE_ACTIVE_ASIDE', key)
export const toggleCollapsed = ({ commit }) => commit('TOGGLE_COLLAPSED')
