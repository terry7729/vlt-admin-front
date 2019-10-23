// 业务管理
import ajax from '@/utils/ajax.js'
export default {
  /*
  *@param {json} options: {} || {data: json}
  */
  /* 请务必注释每个接口所属名称 */
  // 例
  getTest: (options = {}) => ajax.post('/test', options),
  getChannelTerminalMenu: (options = {}) => ajax.post('/getChannelTerminalMenu', options),

  // 投注卡生成
  createCardGeneration: (options = {}) => ajax.post('/bettingCardGeneration/create', options),
  //  投注卡生成注销
  deleteCardGeneration: (options = {}) => ajax.post('/bettingCardGeneration/delete', options),
  // 投注卡生成详情查询
  cardGenerationDetail: (options = {}) => ajax.post('/bettingCardGeneration/detail', options),
  // 投注卡生成列表分页查询
  cardGenerationList: (options = {}) => ajax.post('/bettingCardGeneration/list', options),
  // 投注卡管理
  getBettingRulesList: (options = {}) => ajax.post('/bettingCardRechargeRules/list', options),
  // 新增投注卡规则
  createBettingRulesList: (options = {}) => ajax.post('/bettingCardRechargeRules/create', options),
  // 更新修改账户
  updateAccount: (options = {}) => ajax.post(`/tChannelFund/update/${id}`, options),
  // 删除投注卡规则
  deleteBettingCard: (options = {}) => ajax.post(`/bettingCardRechargeRules/delete`, options),
  // 修改投注卡规则
  updateBettingRules: (options = {}) => ajax.post('/bettingCardRechargeRules/update', options),
}