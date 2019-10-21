// 系统管理
import ajax from '@/utils/ajax.js'
export default {
  /*
  *@param {json} options: {} || {data: json}
  */
  /* 请务必注释每个接口所属名称 */
  // 例
  //菜单管理页面
  //菜单树查询
  getMenu: (options = {}) => ajax.post('/module/queryModuleTree', options),
  //菜单详情
  getDestils: (options = {}) => ajax.post('/module/queryModuleDetail', options),
  //新增菜单
  addMenu:(options = {}) => ajax.post('/module/saveModule',options),
  //批量删除
  delectMenu:(options = {}) => ajax.post('/module/deleteModule',options),
  //更改信息
  ModficMenu:(options = {}) => ajax.post('/module/updateModule',options),

  //组织架构
  //架构树菜单
  OrganizationMenu:(options = {}) => ajax.post('/ins/queryInsTree',options),
  //查询机构详情
  OrganizationDestils:(options = {}) => ajax.post('/ins/queryInsInfo',options),
  //添加机构
  OrganizationAdd:(options = {}) => ajax.post('/ins/addInsInfo',options),
  //修改机构信息
  ModficMenu:(options = {}) => ajax.post('/ins/updateInsInfo',options),
  //添加部门
  DepartmentAdd:(options = {}) => ajax.post('/dept/addDeptInfo',options),
  //更新部门信息
  ModficDepartment:(options = {}) => ajax.post('dept/updateDeptInfo',options),
  //部门分页查询
  DepartmentPage:(options = {}) => ajax.post('/dept/queryInsInfo',options),
  //区域树查询
  RegionalTree:(options = {}) => ajax.post('/region/findRegionTreeRoots',options)
  //
}