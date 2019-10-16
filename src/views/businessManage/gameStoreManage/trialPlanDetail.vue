<template>
 <div class="vlt-card plan-check">
  <panel title="试玩计划" :show="true">
    <base-info :infoList="planList"></base-info>
  </panel>

  <panel title="游戏信息" :show="true">
    <base-info :infoList="gameInfoList"></base-info>
  </panel>

  <panel title="游戏规则" :show="true">
    <base-info :infoList="gameRuleList"></base-info>
  </panel>

  <panel title="资金规则" :show="true">
    <base-info :infoList="moneyRuleList"></base-info>
  </panel>

  <panel title="风控规则" :show="true">
    <base-info :infoList="riskRuleList"></base-info>
  </panel>

  <panel title="自定义规则（可选）" :show="true">
    <base-info :infoList="customRuleList"></base-info>
  </panel>

  <panel title="试玩环境地址" :show="true">
    <base-info :infoList="addressList"></base-info>
  </panel>
 
 </div>
</template>
<script type="text/javascript">
export default {
 name: "planCheck",
 data() {
 return { 
   planList:[
     {title:'计划名称',value:'',prop:'planName'},
     {title:'计划编号',value:'',prop:'planCode'},
     {title:'计划状态',value:'',prop:'planState'},
     {title:'试玩开始时间',value:'',prop:'startTime'},
     {title:'试玩范围',value:'',prop:'rang'},
     {title:'试玩区域',value:'',prop:'area'},
     {title:'试玩结束时间',value:'',prop:'endTime'},
     {title:'试玩渠道',value:'',prop:'channel'},
     {title:'试玩终端',value:'',prop:'terminal'},
     {title:'试玩计划说明',value:'',prop:'planExplain '}
   ],
   gameInfoList:[
     {title:'游戏ID',value:'',prop:'gameID'},
     {title:'游戏名称',value:'',prop:'gameName'},
     {title:'游戏类型',value:'',prop:'gameType'},
   ],
   gameRuleList:[
     {title:'单注最小金额',value:'',prop:'miniMoney'},
     {title:'最小注数',value:'',prop:'miniNumber'},
     {title:'单注加注金额',value:'',prop:'addMoney'},

   ],
   moneyRuleList:[
     {title:'总发行经费占比',value:'',prop:'totalIssueMoney'},
     {title:'总公益金占比',value:'',prop:'totalBenefitMoney'},
     {title:'返奖率',value:'',prop:'MoneyReturnRate'},

   ],
   riskRuleList:[
     {title:'最低中奖金额',value:'',prop:'miniWinningMoney'},
     {title:'最低返奖率',value:'',prop:'miniReturnRate'},
     {title:'最低奖池金额',value:'',prop:'miniPondMoney'},

   ],
   customRuleList:[
     {title:'奖级设置',value:'',prop:'awardSetting'},
     {title:'游戏玩法',value:'',prop:'playingMethod'},

   ],
   addressList:[
     {title:'试玩服务器地址',value:'',prop:'serveAddress'}
   ]
 }
 },
 components: {
 },
 methods: {
   
 },
}
</script>

<style lang="less" scoped>
.plan-check{
  background: white;
  margin:20px 20px;
  border-radius: 8px;
  padding: 25px
}

.panel{
    margin-bottom: 20px;
}

</style>
