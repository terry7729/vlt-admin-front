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
  getMenu: (options = {}) => ajax.post('/module/queryModuleTree/VLT_BMS', options),
  //菜单详情
  getDestils: (options = {}) => ajax.post(`/module/queryModuleDetail`, options),
  //新增菜单
  addMenu:(options = {}) => ajax.post('/module/saveModule',options),
  //批量删除
  delectMenu:(options = {}) => ajax.post('/module/deleteModule',options),
  //更改信息
  UpdateModule:(options = {}) => ajax.post('/module/updateModule',options),

  //组织架构
  //架构树菜单
  OrganizationMenu:(options = {}) => ajax.post('/ins/queryInsTree',options),
  //查询机构详情
  OrganizationDestils:(options = {}) => ajax.post(`/ins/queryInsInfo`,options),
  //添加机构
  OrganizationAdd:(options = {}) => ajax.post('/ins/addInsInfo',options),
  //修改机构信息
  ModficMenu:(options = {}) => ajax.post('/ins/updateInsInfo',options),
  //更新机构状态
  UpdateInsInfoStatus:(options = {}) => ajax.post('ins/updateInsInfoStatus',options),
  //添加部门
  DepartmentAdd:(options = {}) => ajax.post('/dept/addDeptInfo',options),
  //更新部门信息
  ModficDepartment:(options = {}) => ajax.post('dept/updateDeptInfo',options),
  //部门分页查询
  DepartmentPage:(options = {}) => ajax.post('/dept/queryDeptInfoPage',options),
  //区域树查询
  RegionalTree:(options = {}) => ajax.post('/region/findRegionTreeRoots',options),
  //部门树查询
  FindDeptTreeRoots:(options = {}) =>ajax.post(`/dept/findDeptTreeRoots`,options),



  //角色管理
  //角色信息分页查询接口
  QueryRoleInfoPage:(options = {}) =>ajax.post('/role/queryRoleInfoPage',options),
  //查询全部有交角色接口
  QueryAllRole:(options = {}) =>ajax.post('/role/queryAllRole',options),
  //查询角色详情
  QueryRoleInfoDetail:(options = {}) =>ajax.post(`/role/queryRoleInfoDetail`,options),
  //保存角色信息
  SaveRoleInfo:(options = {}) =>ajax.post('/role/saveRoleInfo',options),
  //修改角色信息
  UpdateRoleInfo:(options ={}) =>ajax.post('/role/updateRoleInfo',options)

}