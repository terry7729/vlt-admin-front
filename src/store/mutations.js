import * as types from './mutation-types'
import storage from '@/utils/storage'

export default  {
  [types.SET_LOGININFO] (state, data) {
    state.loginInfo = data;
  },
  [types.SET_ENTRY] (state, data) {
    state.entry = data;
    storage.set('entry', data);
  },
  [types.SET_ROUTERTAGS] (state, data) {
    let isRepeat = false;
    state.routerTags.forEach(item => {
      if (item.routerName === data.routerName) {
        isRepeat = true;
      }
    })
    if (!isRepeat) {
      state.routerTags.push(data);
    }
    storage.session.set('routerTags', state.routerTags);
  },
  [types.REMOVE_ROUTERTAGS] (state, data) {
    state.routerTags.forEach((item, i) => {
      if (state.routerTags[i].routerName === data.routerName) {
        state.routerTags.splice(i, 1);
      }
    })
    storage.session.set('routerTags', state.routerTags);
  },
  [types.CLEAR_ROUTERTAGS] (state) {
    state.routerTags = [];
    storage.session.remove('routerTags');
  },
  
}