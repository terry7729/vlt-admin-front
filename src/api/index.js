// index.js
import httpMock from "@/utils/httpMock.js" // 本地环境mock请求，必要时请注释
import ajax from '@/utils/ajax.js'
export default {
  // 例
  getTest: (options = {}) => ajax.post('/test', options),
  getMenu: (options = {}) => ajax.post('/menu', options),
  getLoginOut: (options = {}) => ajax.post('/logout', options),
}