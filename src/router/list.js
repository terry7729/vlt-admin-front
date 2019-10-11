const home = () => import('@/views/home/home')
const login = () => import('@/views/login/login')
const entry = () => import('@/views/entry/entry')
import children from './modules/entry'

export default [
  {
    path: '/',
    redirect: {
      path: '/entry'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children,
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/entry',
    name: 'entry',
    component: entry
  }
]
