<template>
  <div class="vlt-card">
    <panel title="试玩计划" :show="true">
      <base-info :infoList="planData"></base-info>
    </panel>
    <panel title="游戏信息" :show="true">
      <base-info :infoList="gameData"></base-info>
    </panel>
    <panel title="游戏规则" :show="true">
      <base-info :infoList="ruleData"></base-info>
    </panel>
    <panel title="投注规则" :show="true">
      <base-info :infoList="betData"></base-info>
    </panel>
    <panel title="资金规则" :show="true">
      <base-info :infoList="fundsData"></base-info>
    </panel>
    <panel title="风控规则" :show="true">
      <base-info :infoList="riskData"></base-info>
    </panel>
    <panel title="自定义配置" :show="true">
      <base-info :infoList="customData"></base-info>
    </panel>
    <panel title="问卷调查" :show="true">
      <el-table
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column prop="id" label="问卷标题" ></el-table-column>
        <el-table-column prop="name" label="题目分类"></el-table-column>
        <el-table-column prop="type" label="问卷说明"></el-table-column>
        <el-table-column prop="pond" label="调查对象"></el-table-column>
        <el-table-column prop="time" label="生效时间"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" v-prevent="2000" @click.native="detail(scope.row.id)">查看问卷统计</el-button>
            <!-- <el-button  size="mini" v-prevent="2000" @click.native="edit(scope.row.id)">去除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </panel>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "gameMarketPlanDetail",
  data() {
    return { 
      planData:[
        {title:'计划名称',value:'',prop:'planName'},
        {title:'计划编号',value:'',prop:'planCode'},
        {title:'计划状态',value:'',prop:'planState'},
        {title:'试玩时间',value:'',prop:'startTime'},
        {title:'试玩群体',value:'',prop:'rang'},
        {title:'试玩范围',value:'',prop:'rang'},
        {title:'试玩区域',value:'',prop:'area'},
        {title:'试玩渠道',value:'',prop:'channel'},
        {title:'试玩终端',value:'',prop:'terminal'},
        {title:'计划简介',value:'',prop:'planExplain'},
        {title:'创建人',value:'',prop:'planExplain'},
        {title:'创建时间',value:'',prop:'planExplain'}
      ],
      gameData:[
        {title:'游戏ID',value:'',prop:'gameID'},
        {title:'游戏名称',value:'',prop:'gameName'},
        {title:'游戏类型',value:'',prop:'gameType'},
        {title:'游戏状态',value:'',prop:'gameID'},
        {title:'游戏奖池',value:'',prop:'gameName'},
        {title:'游戏版权',value:'',prop:'gameType'},
        {title:'游戏简介',value:'',prop:'gameID'},
        {title:'软件名称',value:'',prop:'gameName'},
        {title:'软件大小',value:'',prop:'gameType'},
        {title:'软件版本',value:'',prop:'gameID'},
        {title:'版本号',value:'',prop:'gameName'},
        {title:'上传时间',value:'',prop:'gameType'},
        {title:'软件描述',value:'',prop:'gameType'},
        {title:'新版特性',value:'',prop:'gameType'},
      ],
      ruleData:[
          {title:'游戏兑换比例',value:'',prop:'miniMoney'},
          {title:'消费模式',value:'',prop:'miniNumber'},
          {title:'奖池比率',value:'',prop:'addMoney'},
          {title:'Jackpot比率',value:'',prop:'miniMoney'},
          {title:'返奖率',value:'',prop:'miniNumber'},
          {title:'调节基金比率',value:'',prop:'addMoney'},
          {title:'防沉迷',value:'',prop:'addMoney'},
          {title:'单日限额',value:'',prop:'miniMoney'},
          {title:'单次时长',value:'',prop:'miniNumber'},
          {title:'游戏规则介绍',value:'',prop:'addMoney'},
      ],
      betData:[
        {title:'单注最小金额',value:'',prop:'miniMoney'},
        {title:'最小注数',value:'',prop:'miniNumber'},
        {title:'单注加注金额',value:'',prop:'addMoney'},
        {title:'单注最大金额',value:'',prop:'totalIssueMoney'},
        {title:'最大投注数',value:'',prop:'totalBenefitMoney'}
      ],
      fundsData:[
        {title:'总发行经费占比',value:'',prop:'miniWinningMoney'},
        {title:'中福彩发行费占比',value:'',prop:'miniReturnRate'},
        {title:'省福彩发行费占比',value:'',prop:'miniPondMoney'},
        {title:'市福彩发行费占比',value:'',prop:'miniReturnRate'},
        {title:'销售厅发行费占比',value:'',prop:'miniPondMoney'},
        {title:'总公益金占比',value:'',prop:'miniWinningMoney'},
        {title:'中福彩公益金占比',value:'',prop:'miniReturnRate'},
        {title:'省福彩公益金占比',value:'',prop:'miniPondMoney'},
        {title:'市福彩公益金占比',value:'',prop:'miniReturnRate'},
        {title:'销售厅公益金占比',value:'',prop:'miniPondMoney'},
      ],
      riskData:[
        {title:'最低中奖金额',value:'',prop:'awardSetting'},
        {title:'最低返奖率',value:'',prop:'awardSetting'},
        {title:'最低奖池金额',value:'',prop:'awardSetting'},
        {title:'最高中奖金额',value:'',prop:'playingMethod'},
        {title:'最高返奖率',value:'',prop:'awardSetting'},
        {title:'最高奖池金额',value:'',prop:'playingMethod'},
        {title:'最低销量',value:'',prop:'awardSetting'},
        {title:'最低开机率',value:'',prop:'playingMethod'},
        {title:'最低在线数量',value:'',prop:'awardSetting'},
        {title:'最高销量',value:'',prop:'playingMethod'},
      ],
      customData:[
        {title:'奖级设置',value:'',prop:'serveAddress'}
      ],
      tableData: [
        {id: 'a',name:'b',type:'c',pond: 'd',time:'2019-09-12 09:00:00'}
      ],
    }
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
