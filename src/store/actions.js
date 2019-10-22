import * as types from './mutation-types'

// 入口导航跳转
export function setEntry({commit}, data){
  commit(types.SET_ENTRY, data);
}

// 用户登录
export function setLogin({commit}, data) {
  commit(types.SET_LOGININFO, data);
}

// 添加路由标签
export function setRouterTags({commit}, data) {
  commit(types.SET_ROUTERTAGS, data);
}
// 移除路由标签
export function removeRouterTags({commit}, data) {
  commit(types.REMOVE_ROUTERTAGS, data);
}
// 清空路由标签
export function clearRouterTags({commit}, data) {
  commit(types.CLEAR_ROUTERTAGS, data);
}
