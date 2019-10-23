// 业务运营
import ajax from '@/utils/ajax.js'
export default {
  /*
   *@param {json} options: {} || {data: json}
   */
  /* 请务必注释每个接口所属名称 */
  // 例
  //角色管理
  //角色查询分页接口
  getRole: (options = {}) => ajax.post('/tChannelRoleInfo/list', options),
  //角色新增接口
  roleAdd: (options = {}) => ajax.post('/tChannelRoleInfo/create', options),
  //渠道权限接口
  channelLimit: (options = {}) => ajax.post('/tChannelModuleInfo', options),




  //账户管理页面
  //查询账户
  getAccount: (options = {}) => ajax.post('/tChannelFund/list', options),
  //新增账户
  addAccount: (options = {}) => ajax.post('/bms/api/tChannelFund/create', options),
  //账户详情
  accountDetail: (options = {}) => ajax.post('/bms/api/tChannelFund/detail', options),
  //账户修改
  updateAccount: (options = {}) => ajax.post('/bms/api/tChannelFund/update', options),

}