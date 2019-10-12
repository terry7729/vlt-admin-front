import * as types from './mutation-types'
import storage from '@/utils/storage'

// 入口导航跳转
export function setEntry({commit}, data){
  storage.set('entry', data);
  commit(types.SET_ENTRY, data);
}

// 用户登录
export function setLogin({commit}, data) {
  commit(types.SET_LOGININFO, data);
}
