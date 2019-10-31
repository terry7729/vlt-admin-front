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
  QueryModuleTree: (options = {}) => ajax.post('/module/queryModuleTree', options),
  //菜单详情
  QueryModuleDetail: (options = {}) => ajax.post('/module/queryModuleDetail', options),
  //新增菜单
  SaveModule: (options = {}) => ajax.post('/module/saveModule', options),
  //批量删除
  DeleteModule: (options = {}) => ajax.post('/module/deleteModule', options),
  //更改信息
  UpdateModule: (options = {}) => ajax.post('/module/updateModule', options),

  //组织架构
  //机构树菜单
  QueryInsTree: (options = {}) => ajax.post('/ins/queryInsTree', options),
  //查询机构详情
  QueryInsInfo: (options = {}) => ajax.post('/ins/queryInsInfo', options),
  //添加机构
  AddInsInfo: (options = {}) => ajax.post('/ins/addInsInfo', options),
  //修改机构信息
  UpdateInsInfo: (options = {}) => ajax.post('/ins/updateInsInfo', options),
  //更新机构状态
  UpdateInsInfoStatus: (options = {}) => ajax.post('ins/updateInsInfoStatus', options),
  //添加部门
  AddDeptInfo: (options = {}) => ajax.post('/dept/addDeptInfo', options),
  //更新部门信息
  UpdateDeptInfo: (options = {}) => ajax.post('dept/updateDeptInfo', options),
  //部门分页查询
  QueryDeptInfoPage: (options = {}) => ajax.post('/dept/queryDeptInfoPage', options),
  //区域树查询
  FindRegionTreeRoots: (options = {}) => ajax.post('/region/findRegionTreeRoots', options),
  //部门树查询
  FindDeptTreeRoots: (options = {}) => ajax.post('/dept/findDeptTreeRoots', options),



  //角色管理
  //角色信息分页查询接口
  QueryRoleInfoPage: (options = {}) => ajax.post('/role/queryRoleInfoPage', options),
  //查询全部有效角色接口
  QueryAllRole: (options = {}) => ajax.post('/role/queryAllRole', options),
  //查询角色详情
  QueryRoleInfoDetail: (options = {}) => ajax.post(`/role/queryRoleInfoDetail`, options),
  //保存角色信息
  SaveRoleInfo: (options = {}) => ajax.post('/role/saveRoleInfo', options),
  //修改角色信息
  UpdateRoleInfo: (options = {}) => ajax.post('/role/updateRoleInfo', options),
  //更改角色状态
  UpdateRoleStatusInfo: (options = {}) => ajax.post('/role/updateRoleStatusInfo', options),

  //用户管理
  //用户新增
  userRegist: (options = {}) => ajax.post('/vlt/user/regist', options),
  //用户搜索
  userPage: (options = {}) => ajax.post('/vlt/user/query/page', options),
  //用户详情
  getUserDestils: (options = {}) => ajax.get("/vlt/user/query", options),
  //密码重置
  restPassWord: (options = {}) => ajax.post("/vlt/user/resetPass", options),
  //所有用户信息
  getUserAll: (options = {}) => ajax.post('/vlt/user/getAllUser', options),
  //用户状态
  userStatus:(options = {}) => ajax.post('/vlt/user/status',options),
  //用户删除
  delByIds:(options = {}) => ajax.delete('/vlt/user/delByIds',options),
  //用户编缉
  userEdit:(options = {}) => ajax.post('/vlt/user/edit',options),




  //数据字典
  //字典数据保存接口
  add: (options = {}) => ajax.post('/dictData/add/', options),
  //编辑接口
  edit: (options = {}) => ajax.post('/dictData/edit', options),
  //数据字典启用接口
  enable: (options = {}) => ajax.post('/dictData/enable/{id}', options),
  //数据字典禁用接口
  disable: (options = {}) => ajax.post('/dictData/disable/{id}', options),
  //获取全部数据
  getAll: (options = {}) => ajax.post('/dictData/getAll', options),
  //通过keyCode查询
  find: (options = {}) => ajax.get('/dictData/find/{keyCode}', options),
  //数据字典条件搜索
  getByCondition: (options = {}) => ajax.post('/dictData/getByCondition', options),


  //系统设置
  //系统参数设置
  config: (options = {}) => ajax.post('/sysConfig/config/set', options),
  //系统短信参数设置
  sms: (options = {}) => ajax.post('/sysConfig/sms/set', options),
  //系统邮件参数设置
  email: (options = {}) => ajax.post('/sysConfig/email/set', options),

  //假日参数
  //假日分页接口
  queryHolInfoPage: (options = {}) => ajax.post('/hol/queryHolInfoPage', options),
  //获取假日名称列表数据
  getHolidayList: (options = {}) => ajax.post('/hol/queryHolNameAll', options),
  //添加假日接口
  addHolInfo: (options = {}) => ajax.post('/hol/addHolInfo', options),
  //修改夏日状态接口
  updateHolStatus: (options = {}) => ajax.post('/hol/updateHolStatus', options),

  // 用户设置
  // 修改密码
  updateUserPassword: (options = {}) => ajax.post('/updateUserPassword', options),
}