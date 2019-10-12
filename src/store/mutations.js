import * as types from './mutation-types'

export default  {
  [types.SET_LOGININFO] (state, data) {
    state.loginInfo = data;
  },
  [types.SET_ENTRY] (state, data) {
    state.entry = data;
  }
}