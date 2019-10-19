// 系统管理
import ajax from '@/utils/ajax.js'
export default {
  /*
  *@param {json} options: {} || {data: json}
  */
  /* 请务必注释每个接口所属名称 */
  // 例
  //菜单树查询
  getMenu: (options = {}) => ajax.post('/module/queryModuleTree', options),
  //菜单详情
  getDestils: (options = {}) => ajax.post('/module/queryModuleDetail', options),
  //新增菜单
  addMenu:(options = {}) => ajax.post('/module/saveModule',options),
  //批量删除
  delectMenu:(options = {}) => ajax.post('/module/deleteModul',options),
}