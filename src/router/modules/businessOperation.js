// 业务运营系统路由配置
// 渠道账户列表
const accountList = () => import('@/views/businessOperation/channelAccount/account')
//渠道账户列表详情
const accountListDetail = () => import('@/views/businessOperation/channelAccount/accountListDetail')
//拥有渠道列表详情(带编辑详情)
const haveListDetail = () => import('@/views/businessOperation/channelAccount/haveListDetail')
//拥有渠道列表详情(副本单详情)
const haveListDetailTwo = () => import('@/views/businessOperation/channelAccount/haveListDetailTwo')
// 账户资金管理
const accountMoneyManage = () => import('@/views/businessOperation/channelAccount/accountMoneyManage')
//银行
const bank = () => import('@/views/businessOperation/channelAccount/bank')

//账户资金管理银行新增
const bankadd = () => import('@/views/businessOperation/channelAccount/bankadd')
//账户资金管理银行修改
const bankrevise = () => import('@/views/businessOperation/channelAccount/bankrevise')
//账户资金管理银行余额
const bankbalance = () => import('@/views/businessOperation/channelAccount/bankbalance')
//账户资金管理银行明细
const bankdetail = () => import('@/views/businessOperation/channelAccount/bankdetail')
//第三方支付
const external = () => import('@/views/businessOperation/channelAccount/external')
//账户资金管理第三方支付新增
const externaladd = () => import('@/views/businessOperation/channelAccount/externaladd')
//账户资金管理第三方支付修改
const externalrevise = () => import('@/views/businessOperation/channelAccount/externalrevise')
//账户资金管理第三方支付余额
const externalbalance = () => import('@/views/businessOperation/channelAccount/externalbalance')
//账户资金管理第三方支付明细
const externaldetail = () => import('@/views/businessOperation/channelAccount/externaldetail')

//角色管理
const roleManage = () => import('@/views/businessOperation/PermissionMaintain/roleManage')
//角色管理新增
const roleManageAdd = () => import('@/views/businessOperation/PermissionMaintain/roleManageAdd')
//角色管理查看
const roleManageExamine = () => import('@/views/businessOperation/PermissionMaintain/roleManageExamine')
//账户管理
const operationAccountManage = () => import('@/views/businessOperation/PermissionMaintain/operationAccountManage')
//账户管理新增
const operationAccountAdd = () => import('@/views/businessOperation/PermissionMaintain/operationAccountAdd')
//账户管理查看
const operationAccountExamine = () => import('@/views/businessOperation/PermissionMaintain/operationAccountExamine')

//彩票兑奖
const lotteryTicket = () => import('@/views/businessOperation/LotteryManagement/lotteryTicket')
//彩票兑奖详情
const lotteryTicketDetail = () => import('@/views/businessOperation/LotteryManagement/lotteryTicketDetail')
//彩票兑奖打印
const lotteryTicketPrint = () => import('@/views/businessOperation/LotteryManagement/lotteryTicketPrint')
//彩票兑奖补打
const lotteryTicketReprint = () => import('@/views/businessOperation/LotteryManagement/lotteryTicketReprint')
//兑奖设置
const expirySetting = () => import('@/views/businessOperation/LotteryManagement/expirySetting')
//兑奖处管理
const ticketOfficeManage = () => import('@/views/businessOperation/LotteryManagement/ticketOfficeManage')
//中奖查询
const winningCheck = () => import('@/views/businessOperation/LotteryManagement/winningCheck')

//会员等级管理
const MemberGradeManagement = () => import('@/views/businessOperation/MemberManagement/MemberGradeManagement')
//会员权益管理
const MemberEquityManagement = () => import('@/views/businessOperation/MemberManagement/MemberEquityManagement')
//会员权益管理新增
const MemberEquityManagementAdd = () => import('@/views/businessOperation/MemberManagement/MemberEquityManagementAdd')
//会员权益管理详情
const MemberEquityManagementDetail = () => import('@/views/businessOperation/MemberManagement/MemberEquityManagementDetail')
//会员积分管理
const MemberIntegralManagement = () => import('@/views/businessOperation/MemberManagement/MemberIntegralManagement')
//会员积分管理新建
const MemberIntegralManagementAdd = () => import('@/views/businessOperation/MemberManagement/MemberIntegralManagementAdd')
//会员积分管理详情
const MemberIntegralManagementDetail = () => import('@/views/businessOperation/MemberManagement/MemberIntegralManagementDetail')


//资金日结算报表
const financialStatementDaySettle = () => import('@/views/businessOperation/financialStatement/financialStatementDaySettle')
//资金日结算报表打印
const PrintDaySettle = () => import('@/views/businessOperation/financialStatement/PrintDaySettle')

//资金日分配报表
const financialStatementDayAllocation = () => import('@/views/businessOperation/financialStatement/financialStatementDayAllocation')
//资金日分配报表打印
const PrintDayAllocation = () => import('@/views/businessOperation/financialStatement/PrintDayAllocation')

//资金日流向报表
const financialStatementDayFlow = () => import('@/views/businessOperation/financialStatement/financialStatementDayFlow')
//资金日流向报表打印
const PrintDayFlow = () => import('@/views/businessOperation/financialStatement/PrintDayFlow')

//资金月结算报表
const financialStatementMonthSettle = () => import('@/views/businessOperation/financialStatement/financialStatementMonthSettle')
//资金月结算报表打印
const PrintMonthSettle = () => import('@/views/businessOperation/financialStatement/PrintMonthSettle')

//资金月分配报表
const financialStatementMonthAllocation = () => import('@/views/businessOperation/financialStatement/financialStatementMonthAllocation')
//资金月分配报表打印
const PrintMonthAllocation = () => import('@/views/businessOperation/financialStatement/PrintMonthAllocation')

//资金月流向报表
const financialStatementMonthFlow = () => import('@/views/businessOperation/financialStatement/financialStatementMonthFlow')
//资金月流向报表打印
const PrintMonthFlow = () => import('@/views/businessOperation/financialStatement/PrintMonthFlow')

//资金年结算报表
const financialStatementYearSettle = () => import('@/views/businessOperation/financialStatement/financialStatementYearSettle')
//资金年结算报表打印
const PrintYearSettle = () => import('@/views/businessOperation/financialStatement/PrintYearSettle')

//资金年结算报表
const financialStatementYearAllocation = () => import('@/views/businessOperation/financialStatement/financialStatementYearAllocation')
//资金年结算报表打印
const PrintYearAllocation = () => import('@/views/businessOperation/financialStatement/PrintYearAllocation')

//资金年流向报表
const financialStatementYearFlow = () => import('@/views/businessOperation/financialStatement/financialStatementYearFlow')
//资金年流向报表打印
const PrintYearFlow = () => import('@/views/businessOperation/financialStatement/PrintYearFlow')

//品牌营销推广
//活动计划模板
const planTemplate = () => import('@/views/businessOperation/brandMarketing/planTemplate')
//模板预览
const previewTemplate = () => import('@/views/businessOperation/brandMarketing/previewTemplate')
//活动计划管理
const planManage = () => import('@/views/businessOperation/brandMarketing/planManage')
//新建活动计划
const activityPlan = () => import('@/views/businessOperation/brandMarketing/activityPlan')
//新建活动
const createActivity = () => import('@/views/businessOperation/brandMarketing/createActivity')
//计划详情
const planDetail = () => import('@/views/businessOperation/brandMarketing/planDetail')

//活动执行管理
const executionManage = () => import('@/views/businessOperation/brandMarketing/executionManage')
//活动执行详情
const activityDetail = () => import('@/views/businessOperation/brandMarketing/activityDetail')
//分配任务
const allotTask = () => import('@/views/businessOperation/brandMarketing/allotTask')
//活动效果评估
const activityResult = () => import('@/views/businessOperation/brandMarketing/activityResult')
//开始评估
const resultAssess = () => import('@/views/businessOperation/brandMarketing/resultAssess')

//客户账户
//客户账户列表
const customerAccount = () => import('@/views/businessOperation/customerAccount/customerAccount')
//客户账户详情
const accountDetail = () => import('@/views/businessOperation/customerAccount/accountDetail')
//投注卡详情
const betcardDetail = () => import('@/views/businessOperation/customerAccount/betcardDetail')
//会员权益详情
const equityDetail = () => import('@/views/businessOperation/customerAccount/equityDetail')


//账户记录
//充值记录列表
const rechargeRecord = () => import('@/views/businessOperation/accountRecord/rechargeRecord')
//充值记录详情
const rechargeDetail = () => import('@/views/businessOperation/accountRecord/rechargeDetail')
//投注记录列表
const bettingRecord = () => import('@/views/businessOperation/accountRecord/bettingRecord')
//投注记录详情
const betDetail = () => import('@/views/businessOperation/accountRecord/betDetail')
//兑奖记录列表
const cashRecord = () => import('@/views/businessOperation/accountRecord/cashRecord')
//兑奖记录详情
const cashDetail = () => import('@/views/businessOperation/accountRecord/cashDetail')
//提现记录列表
const withdrawalRecord = () => import('@/views/businessOperation/accountRecord/withdrawalRecord')
//提现记录详情
const withdrawalDetail = () => import('@/views/businessOperation/accountRecord/withdrawalDetail')
//积分账户列表
const integralRecord = () => import('@/views/businessOperation/accountRecord/integralRecord')
//积分账户详情
const integralDetail = () => import('@/views/businessOperation/accountRecord/integralDetail')
//资金流水列表
const fundsStatement = () => import('@/views/businessOperation/accountRecord/fundsStatement')
//资金流水详情
const fundsDetail = () => import('@/views/businessOperation/accountRecord/fundsDetail')

//责任彩票
//责任彩票列表
const dutyLottery = () => import('@/views/businessOperation/dutyLottery/dutyLottery')
//规则设置
const ruleSet = () => import('@/views/businessOperation/dutyLottery/ruleSet')

//公告信息发布
//素材管理 
const materialManage = () => import('@/views/businessOperation/noticeInfo/materialManage')
//公告信息发布列表
const bulletinList = () => import('@/views/businessOperation/noticeInfo/bulletinList')
//公告信息详情
const bulletinDetail = () => import('@/views/businessOperation/noticeInfo/bulletinDetail')
//公告模板
const bulletinTemplate = () => import('@/views/businessOperation/noticeInfo/bulletinTemplate')
//模板详情 
const templateDetail = () => import('@/views/businessOperation/noticeInfo/templateDetail')
//新建模板
const createTemplate = () => import('@/views/businessOperation/noticeInfo/createTemplate')
//消息推送
const infoPush = () => import('@/views/businessOperation/noticeInfo/infoPush')
//消息推送编辑
const infoEdit = () => import('@/views/businessOperation/noticeInfo/infoEdit')


export default [
  // {
  //   path: 'demo',
  //   name: 'demo',
  //   component: demo,
  //   meta: {
  //     parentName: '', // 当左侧菜单匹配不到当前路由时(菜单无对应激活状态),请设置该属性值(菜单可激活的父级路由名称)
  //     title: '路由说明'
  //   }
  // },
  //渠道账户列表

  //渠道账户
  {
    path: 'businessOperation/accountList',
    name: 'accountList',
    meta: {
      title: '渠道账户列表',
    },
    component: accountList
  },
  {
    path: 'businessOperation/accountList/accountListDetail',
    name: 'accountListDetail',
    meta: {
      title: '渠道账户列表详情',
    },
    component: accountListDetail
  },
  {
    path: 'businessOperation/accountList/haveListDetail',
    name: 'haveListDetail',
    meta: {
      title: '拥有渠道列表详情',
    },
    component: haveListDetail
  },
  {
    path: 'businessOperation/accountList/haveListDetailTwo',
    name: 'haveListDetailTwo',
    meta: {
      title: '拥有渠道列表详情单详情',
    },
    component: haveListDetailTwo
  },




  {
    path: 'businessOperation/accountMoneyManage',
    name: 'accountMoneyManage',
    meta: {
      title: '账户资金管理',
    },
    component: accountMoneyManage,
    children: [{
        path: '',
        redirect: {
          name: 'bank'
        },
        component: bank,
      },
      {
        path: 'bank',
        name: 'bank',
        meta: {
          title: '银行',
        },
        component: bank
      },

      {
        path: 'external',
        name: 'external',
        meta: {
          title: '第三方支付',
        },
        component: external
      },

    ]
  },

  {
    path: 'businessOperation/accountMoneyManage/bankadd',
    name: 'bankadd',
    meta: {
      title: '银行新增',
    },
    component: bankadd
  },
  {
    path: 'businessOperation/accountMoneyManage/bankrevise',
    name: 'bankrevise',
    meta: {
      title: '银行修改',
    },
    component: bankrevise
  },

  {
    path: 'businessOperation/accountMoneyManage/bankbalance',
    name: 'bankbalance',
    meta: {
      title: '银行余额',
    },
    component: bankbalance
  },
  {
    path: 'businessOperation/accountMoneyManage/bankdetail',
    name: 'bankdetail',
    meta: {
      title: '银行明细',
    },
    component: bankdetail
  },


  {
    path: 'businessOperation/accountMoneyManage/externaladd',
    name: 'externaladd',
    meta: {
      title: '第三方支付新增',
    },
    component: externaladd
  },
  {
    path: 'businessOperation/accountMoneyManage/externalrevise',
    name: 'externalrevise',
    meta: {
      title: '第三方支付修改',
    },
    component: externalrevise
  },
  {
    path: 'businessOperation/accountMoneyManage/externalbalance',
    name: 'externalbalance',
    meta: {
      title: '第三方支付余额',
    },
    component: externalbalance
  },
  {
    path: 'businessOperation/accountMoneyManage/externaldetail',
    name: 'externaldetail',
    meta: {
      title: '第三方支付明细',
    },
    component: externaldetail
  },

  {
    path: 'businessOperation/roleManage',
    name: 'roleManage',
    meta: {
      title: '角色管理',
    },
    component: roleManage
  },
  {
    path: 'businessOperation/roleManageAdd',
    name: 'roleManageAdd',
    meta: {
      title: '角色管理新增',
    },
    component: roleManageAdd
  },

  {
    path: 'businessOperation/roleManageExamine',
    name: 'roleManageExamine',
    meta: {
      title: '角色管理查看',
    },
    component: roleManageExamine
  },

  {
    path: 'businessOperation/operationAccountManage',
    name: 'operationAccountManage',
    meta: {
      title: '账户管理',
    },
    component: operationAccountManage
  },
  {
    path: 'businessOperation/operationAccountAdd',
    name: 'operationAccountAdd',
    meta: {
      title: '账户管理新增',
    },
    component: operationAccountAdd
  },
  {
    path: 'businessOperation/operationAccountExamine',
    name: 'operationAccountExamine',
    meta: {
      title: '账户管理查看',
    },
    component: operationAccountExamine
  },
  {
    path: 'businessOperation/lotteryTicket',
    name: 'lotteryTicket',
    meta: {
      title: '彩票兑奖',
    },
    component: lotteryTicket
  },
  {
    path: 'businessOperation/lotteryTicketDetail',
    name: 'lotteryTicketDetail',
    meta: {
      title: '彩票兑奖详情',
    },
    component: lotteryTicketDetail
  },
  {
    path: 'businessOperation/lotteryTicketPrint',
    name: 'lotteryTicketPrint',
    meta: {
      title: '彩票兑奖打印',
    },
    component: lotteryTicketPrint
  },
  {
    path: 'businessOperation/lotteryTicketReprint',
    name: 'lotteryTicketReprint',
    meta: {
      title: '彩票兑奖打印',
    },
    component: lotteryTicketReprint
  },

  {
    path: 'businessOperation/expirySetting',
    name: 'expirySetting',
    meta: {
      title: '兑奖设置',
    },
    component: expirySetting
  },
  {
    path: 'businessOperation/ticketOfficeManage',
    name: 'ticketOfficeManage',
    meta: {
      title: '中奖处管理',
    },
    component: ticketOfficeManage
  },
  {
    path: 'businessOperation/winningCheck',
    name: 'winningCheck',
    meta: {
      title: '中奖查询',
    },
    component: winningCheck
  },
  {
    path: 'businessOperation/MemberGradeManagement',
    name: 'MemberGradeManagement',
    meta: {
      title: '会员等级管理',
    },
    component: MemberGradeManagement
  },
  {
    path: 'businessOperation/MemberEquityManagement',
    name: 'MemberEquityManagement',
    meta: {
      title: '会员权益管理',
    },
    component: MemberEquityManagement
  },
  {
    path: 'businessOperation/MemberEquityManagementAdd',
    name: 'MemberEquityManagementAdd',
    meta: {
      title: '会员权益管理新增',
    },
    component: MemberEquityManagementAdd
  },
  {
    path: 'businessOperation/MemberEquityManagementDetail',
    name: 'MemberEquityManagementDetail',
    meta: {
      title: '会员权益管理详情',
    },
    component: MemberEquityManagementDetail
  },

  {
    path: 'businessOperation/MemberIntegralManagement',
    name: 'MemberIntegralManagement',
    meta: {
      title: '会员积分管理',
    },
    component: MemberIntegralManagement
  },
  {
    path: 'businessOperation/MemberIntegralManagementAdd',
    name: 'MemberIntegralManagementAdd',
    meta: {
      title: '会员积分管理新建',
    },
    component: MemberIntegralManagementAdd
  },
  {
    path: 'businessOperation/MemberIntegralManagementDetail',
    name: 'MemberIntegralManagementDetail',
    meta: {
      title: '会员积分管理详情',
    },
    component: MemberIntegralManagementDetail
  },

  {
    path: 'businessOperation/financialStatementDaySettle',
    name: 'financialStatementDaySettle',
    meta: {
      title: '资金日结算报表',
    },
    component: financialStatementDaySettle
  },
  {
    path: 'businessOperation/PrintDaySettle',
    name: 'PrintDaySettle',
    meta: {
      title: '资金日结算报表打印',
    },
    component: PrintDaySettle
  },


  {
    path: 'businessOperation/financialStatementDayAllocation',
    name: 'financialStatementDayAllocation',
    meta: {
      title: '资金日分配报表',
    },
    component: financialStatementDayAllocation
  },
  {
    path: 'businessOperation/PrintDayAllocation',
    name: 'PrintDayAllocation',
    meta: {
      title: '资金日分配报表打印',
    },
    component: PrintDayAllocation
  },

  {
    path: 'businessOperation/financialStatementDayFlow',
    name: 'financialStatementDayFlow',
    meta: {
      title: '资金日流向报表',
    },
    component: financialStatementDayFlow
  },
  {
    path: 'businessOperation/PrintDayFlow',
    name: 'PrintDayFlow',
    meta: {
      title: '资金日流向报表打印',
    },
    component: PrintDayFlow
  },

  {
    path: 'businessOperation/financialStatementMonthSettle',
    name: 'financialStatementMonthSettle',
    meta: {
      title: '资金月结算报表',
    },
    component: financialStatementMonthSettle
  },
  {
    path: 'businessOperation/PrintMonthSettle',
    name: 'PrintMonthSettle',
    meta: {
      title: '资金月结算报表打印',
    },
    component: PrintMonthSettle
  },

  {
    path: 'businessOperation/financialStatementMonthAllocation',
    name: 'financialStatementMonthAllocation',
    meta: {
      title: '资金月分配报表',
    },
    component: financialStatementMonthAllocation
  },
  {
    path: 'businessOperation/PrintMonthAllocation',
    name: 'PrintMonthAllocation',
    meta: {
      title: '资金月分配报表打印',
    },
    component: PrintMonthAllocation
  },

  {
    path: 'businessOperation/financialStatementMonthFlow',
    name: 'financialStatementMonthFlow',
    meta: {
      title: '资金月流向报表',
    },
    component: financialStatementMonthFlow
  },
  {
    path: 'businessOperation/PrintMonthFlow',
    name: 'PrintMonthFlow',
    meta: {
      title: '资金月流向报表打印',
    },
    component: PrintMonthFlow
  },

  {
    path: 'businessOperation/financialStatementYearSettle',
    name: 'financialStatementYearSettle',
    meta: {
      title: '资金年结算报表',
    },
    component: financialStatementYearSettle
  },
  {
    path: 'businessOperation/PrintYearSettle',
    name: 'PrintYearSettle',
    meta: {
      title: '资金年结算报表打印',
    },
    component: PrintYearSettle
  },

  {
    path: 'businessOperation/financialStatementYearAllocation',
    name: 'financialStatementYearAllocation',
    meta: {
      title: '资金年分配报表',
    },
    component: financialStatementYearAllocation
  },
  {
    path: 'businessOperation/PrintYearAllocation',
    name: 'PrintYearAllocation',
    meta: {
      title: '资金年分配报表打印',
    },
    component: PrintYearAllocation
  },

  {
    path: 'businessOperation/financialStatementYearFlow',
    name: 'financialStatementYearFlow',
    meta: {
      title: '资金年流向报表',
    },
    component: financialStatementYearFlow
  },
  {
    path: 'businessOperation/PrintYearFlow',
    name: 'PrintYearFlow',
    meta: {
      title: '资金年流向报表打印',
    },
    component: PrintYearFlow
  },



  //品牌与营销推广
  {
    path: 'brandMarketing/planTemplate',
    name: 'planTemplate',
    meta: {
      title: '活动计划模板',
    },
    component: planTemplate,
  },
  {
    path: 'brandMarketing/planManage',
    name: 'planManage',
    meta: {
      title: '活动计划管理',
    },
    component: planManage
  },
  {
    path: 'brandMarketing/executionManage',
    name: 'executionManage',
    meta: {
      title: '活动执行管理',
    },
    component: executionManage
  },
  {
    path: 'brandMarketing/activityResult',
    name: 'activityResult',
    meta: {
      title: '活动效果评估',
    },
    component: activityResult
  },
  {
    path: 'brandMarketing/previewTemplate',
    name: 'previewTemplate',
    meta: {
      title: '预览模板',
    },
    component: previewTemplate,
  },
  {
    path: 'brandMarketing/activityDetail',
    name: 'activityDetail',
    meta: {
      title: '活动执行详情',
    },
    component: activityDetail,
  },
  {
    path: 'brandMarketing/planDetail',
    name: 'planDetail',
    meta: {
      title: '计划详情',
    },
    component: planDetail,
  },
  {
    path: 'brandMarketing/activityPlan',
    name: 'activityPlan',
    meta: {
      title: '新建活动计划',
    },
    component: activityPlan,
  },
  {
    path: 'brandMarketing/createActivity',
    name: 'createActivity',
    meta: {
      title: '新建活动',
    },
    component: createActivity,
  },
  {
    path: 'brandMarketing/allotTask',
    name: 'allotTask',
    meta: {
      title: '分配任务',
    },
    component: allotTask,
  },
  {
    path: 'brandMarketing/resultAssess',
    name: 'resultAssess',
    meta: {
      title: '效果评估',
    },
    component: resultAssess,
  },

  //账户记录
  {
    path: 'accountRecord/rechargeRecord',
    name: 'rechargeRecord',
    meta: {
      title: '充值记录',
    },
    component: rechargeRecord,
  },
  {
    path: 'accountRecord/rechargeDetail',
    name: 'rechargeDetail',
    meta: {
      title: '充值记录详情',
    },
    component: rechargeDetail,
  },
  {
    path: 'accountRecord/bettingRecord',
    name: 'BettingRecord',
    meta: {
      title: '投注记录',
    },
    component: bettingRecord,
  },
  {
    path: 'accountRecord/betDetail',
    name: 'betDetail',
    meta: {
      title: '投注记录详情',
    },
    component: betDetail,
  },
  {
    path: 'accountRecord/cashRecord',
    name: 'cashRecord',
    meta: {
      title: '兑奖记录',
    },
    component: cashRecord,
  },
  {
    path: 'accountRecord/cashDetail',
    name: 'cashDetail',
    meta: {
      title: '兑奖记录详情',
    },
    component: cashDetail,
  },
  {
    path: 'accountRecord/withdrawalRecord',
    name: 'withdrawalRecord',
    meta: {
      title: '提现记录',
    },
    component: withdrawalRecord,
  },
  {
    path: 'accountRecord/withdrawalDetail',
    name: 'withdrawalDetail',
    meta: {
      title: '提现记录详情',
    },
    component: withdrawalDetail,
  },
  {
    path: 'accountRecord/integralRecord',
    name: 'integralRecord',
    meta: {
      title: '积分账户',
    },
    component: integralRecord,
  },
  {
    path: 'accountRecord/integralDetail',
    name: 'integralDetail',
    meta: {
      title: '积分账户详情',
    },
    component: integralDetail,
  },
  {
    path: 'accountRecord/fundsStatement',
    name: 'fundsStatement',
    meta: {
      title: '资金流水',
    },
    component: fundsStatement,
  },
  {
    path: 'accountRecord/fundsDetail',
    name: 'fundsDetail',
    meta: {
      title: '资金流水详情',
    },
    component: fundsDetail,
  },

  //客户账户
  {
    path: 'customerAccount/customerAccount',
    name: 'customerAccount',
    meta: {
      title: '客户账户列表',
    },
    component: customerAccount,
  },
  {
    path: 'customerAccount/accountDetail',
    name: 'accountDetail',
    meta: {
      title: '客户账户详情',
    },
    component: accountDetail,
  },
  {
    path: 'customerAccount/betcardDetail',
    name: 'betcardDetail',
    meta: {
      title: '投注卡详情',
    },
    component: betcardDetail,
  },
  {
    path: 'customerAccount/equityDetail',
    name: 'equityDetail',
    meta: {
      title: '会员权益详情',
    },
    component: equityDetail,
  },

  //责任彩票
  {
    path: 'dutyLottery/dutyLottery',
    name: 'dutyLottery',
    meta: {
      title: '责任彩票列表',
    },
    component: dutyLottery,
  },
  {
    path: 'dutyLottery/ruleSet',
    name: 'ruleSet',
    meta: {
      title: '规则设置',
    },
    component: ruleSet,
  },

  //公告信息发布
  {
    path: 'noticeInfo/materialManage',
    name: 'materialManage',
    meta: {
      title: '素材管理',
    },
    component: materialManage,
  },
  {
    path: 'noticeInfo/bulletinList',
    name: 'bulletinList',
    meta: {
      title: '公告信息发布列表',
    },
    component: bulletinList,
  },
  {
    path: 'noticeInfo/bulletinDetail',
    name: 'bulletinDetail',
    meta: {
      title: '公告信息详情',
    },
    component: bulletinDetail,
  },
  {
    path: 'noticeInfo/bulletinTemplate',
    name: 'bulletinTemplate',
    meta: {
      title: '公告模板',
    },
    component: bulletinTemplate,
  },
  {
    path: 'noticeInfo/createTemplate',
    name: 'createTemplate',
    meta: {
      title: '新建模板',
    },
    component: createTemplate,
  },
  {
    path: 'noticeInfo/templateDetail',
    name: 'templateDetail',
    meta: {
      title: '模板详情',
    },
    component: templateDetail,
  },
  {
    path: 'noticeInfo/infoPush',
    name: 'infoPush',
    meta: {
      title: '消息推送',
    },
    component: infoPush,
  },
  {
    path: 'noticeInfo/infoEdit',
    name: 'infoEdit',
    meta: {
      title: '消息推送',
    },
    component: infoEdit,
  },


]