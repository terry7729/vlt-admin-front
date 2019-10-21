import storage from '@/utils/storage';
export const loginInfo = state => state.loginInfo || storage.get('loginInfo') || null
export const entry = state => state.entry || storage.get('entry') || null
export const routerTags = state => state.routerTags || storage.session.get('routerTags') || []
