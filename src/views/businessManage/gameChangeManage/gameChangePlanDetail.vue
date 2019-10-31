<template>
  <div class="vlt-card">
    <panel title="变更计划" :show="true">
      <base-info :infoList="planData"></base-info>
    </panel>
    <panel title="基本信息" :show="true">
      <base-info :infoList="gameData"></base-info>
    </panel>
    <panel title="游戏开发商" :show="true">
      <base-info :infoList="developerData"></base-info>
    </panel>
    <panel title="版本信息" :show="true">
      <base-info :infoList="versionData"></base-info>
    </panel>
    <!-- <panel title="附件信息" :show="true">
      <base-info :infoList="appendixInfo"></base-info>
    </panel> -->
    <panel title="附件信息" :show="appendixInfo.lenght > 0">
      <base-info :infoList="appendixInfo">
        <ul class="info-list" slot="msg-content">
          <li class="info-item" v-for="(item, index) in appendixInfo" :key="index">
              <span class="title">{{item.fileName}}：</span>
              <el-link :href="item.filePath" type="primary" target="_blank">下载</el-link>
          </li>
        </ul>
      </base-info>
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
    <panel title="游戏等级设置" :show="true">
      <base-info :infoList="gameExchangeSetVoList"></base-info>
    </panel>  
    <panel title="自定义配置" :show="true">
      <base-info :infoList="customData"></base-info>
    </panel>
    <panel title="变更信息发布" :show="true">
      <base-info :infoList="changeInfo"></base-info>
    </panel>      
    <!-- <panel title="问卷调查" :show="true">
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
          </template>
        </el-table-column>
      </el-table>
    </panel> -->
  </div>
</template>
<script type="text/javascript">
export default {
  name: "gameMarketPlanDetail",
  data() {
    return { 
      planData:[
        {title:'计划名称',value:'',prop:'changePlanName'},
        {title:'计划编号',value:'',prop:'changePlanCode'},
        {title:'创建人',value:'',prop:'createBy'},
        {title:'生效时间',value:'',prop:'changePlanTime'},
        {title:'变更游戏',value:'',prop:'gameName'},
        {title:'创建时间',value:'',prop:'createTime'},
        {title:'计划说明',value:'',prop:'changePlanDesc'},
        {title:'计划状态',value:'',prop:'changePlanStatus'}
      ],
      gameData:[
        {title:'游戏ID',value:'',prop:'developerId'},
        {title:'游戏名称',value:'',prop:'gameName'},
        {title:'游戏类型',value:'',prop:'gameType'},
        {title:'游戏状态',value:'',prop:'gameStatus'},
        {title:'游戏版权',value:'',prop:'gameGenlot'},
        {title:'游戏奖池',value:'',prop:'jackpotType'},
        {title:'游戏简介',value:'',prop:'gameDesc'},
        {title:'创建人',value:'',prop:'createUser'},
        {title:'创建时间',value:'',prop:'createTime'},
        {title:'更新人',value:'',prop:'updateUser'},
        {title:'更新时间',value:'',prop:'updateTime'}
      ],
      developerData: [
        {title:'开发商名称',value:'',prop:'developerName'},
        {title:'联系人',value:'',prop:'person'},
        {title:'手机号码',value:'',prop:'cellPhone'},
        {title:'电子邮箱',value:'',prop:'email'},
        {title:'传真电话',value:'',prop:'faxPhone'},
        {title:'联系地址',value:'',prop:'address'}
      ],
      versionData: [
        {title:'软件名称',value:'',prop:'versionName'},
        {title:'软件版本',value:'',prop:'versionName'},
        {title:'版本号',value:'',prop:'versionNumber'},
        {title:'软件大小',value:'',prop:'softwareSize'},
        {title:'新版特性',value:'',prop:'newFeatures'},
        {title:'软件描述',value:'',prop:'softwareDesc'},
        // {title:'版本记录',value:'',prop:'gameID'}
      ],
      appendixInfo: [],
      ruleData:[
          {title:'游戏状态',value:'',prop:'gameStatus'},
          {title:'游戏兑换比例',value:'',prop:'returnPrizeRate'},
          {title:'消费模式',value:'',prop:'conPattern'},
          {title:'防沉迷',value:'',prop:'indulgeSwitch'},
          {title:'奖池类型',value:'',prop:'jackpotType'},
          {title:'Jackpot比率',value:'',prop:'jackpotRate'},
          {title:'单次时长',value:'',prop:'dayLimitTime'},
          {title:'奖池比率',value:'',prop:'rewardPoolRate'},
          {title:'单日限额',value:'',prop:'dayLimitPrize'},
          {title:'游戏规则介绍',value:'',prop:'ruleDesc'},
      ],
      betData:[
        {title:'单注最小金额',value:'',prop:'minAmount'},
        {title:'最小注数',value:'',prop:'minBets'},
        {title:'单注加注金额',value:'',prop:'minAddBets'},
        {title:'单注最大金额',value:'',prop:'maxAmount'},
        {title:'最大投注数',value:'',prop:'maxBets'}
      ],
      fundsData:[ // 资金参数
        {title:'总发行经费占比',value:'',prop:'totalPublishRate'},
        {title:'总公益金占比',value:'',prop:'totalWelfareRate'},
        {title:'返奖率',value:'',prop:'returnPrizeRate'},
        {title:'中福彩发行费占比',value:'',prop:'zhcPublishRate'},
        {title:'中福彩公益金占比',value:'',prop:'zhcWelfareRate'},
        {title:'调节基金比率',value:'',prop:'reFundRate'},
        {title:'省福彩发行费占比',value:'',prop:'proPublishRate'},
        {title:'省福彩公益金占比',value:'',prop:'proWelfareRate'},
        {title:'Jackpot比率',value:'',prop:'jackpotRate'},
        {title:'市福彩发行费占比',value:'',prop:'cityPublishRate'},
        {title:'市福彩公益金占比',value:'',prop:'cityWelfareRate'},
        {title:'销售厅发行费占比',value:'',prop:'marketPublishRate'},
        {title:'销售厅公益金占比',value:'',prop:'marketWelfareRate'}
      ],
      riskData:[
        {title:'最低中奖金额',value:'',prop:'minBonus'},
        {title:'最低返奖率',value:'',prop:'minReturnRate'},
        {title:'最低奖池金额',value:'',prop:'minPoolAmount'},
        {title:'最高中奖金额',value:'',prop:'maxBonus'},
        {title:'最高返奖率',value:'',prop:'maxReturnRate'},
        {title:'最高奖池金额',value:'',prop:'maxPoolAmount'},
        {title:'最低销量',value:'',prop:'minSale'},
        {title:'最低开机率',value:'',prop:'minStartRate'},
        {title:'最低在线数量',value:'',prop:'minOnlineNum'},
        {title:'最高销量',value:'',prop:'maxSale'}
      ],
      gameExchangeSetVoList:[
         {title:'版本记录',value:'',prop:'gameID'},
          {title:'版本记录',value:'',prop:'gameID'}
      ],
      changeInfo: [
        {title:'发布标题',value:'',prop:'playingMethod'},
        {title:'发布机构',value:'',prop:'playingMethod'},
        {title:'发布时间',value:'',prop:'playingMethod'},
        {title:'发布内容',value:'',prop:'playingMethod'}
      ],
      customData:[
        {title:'奖级设置',value:'',prop:'serveAddress'}
      ],
      tableData: [
        {id: 'a',name:'b',type:'c',pond: 'd',time:'2019-09-12 09:00:00'}
      ],
      formatObj: {
        formatGameStatus:['存储', '试玩', '上市', '变更', '退市'],
        formatGameType: ['概率型','奖组型'],
        formatPoolRate:['无奖池','单奖池', '多奖池'],
        formatPlanStatus: ['审批中', '审批拒绝','待生效','已生效'],
        formatConPattern: ['测试账户', '试玩积分'],
        formatIndulgeSwitch: ['启用','禁用']
      },
      responseData: {}
    }
  },
  created () {
    const queryData  = this.$route.query;
    if (queryData.id && queryData.gameId && queryData.listPlanId) {
      this.getChangePlanDetail(queryData);
    }
  },
  methods: {
    getChangePlanDetail(data) {
      const self = this;
      (async (data)=>{
        let res = await self.$api.getChangePlanDetail({data})
				if(res && res.code == 0) {
          this.responseData = res.data;
          // console.log(res);
          this.eachList(this.planData,this.responseData.changePlanVo);
          this.eachList(this.gameData,this.responseData.gameInfoVo);
          this.eachList(this.developerData,this.responseData.developerInfo);
          this.eachList(this.versionData,this.responseData.softwareInfo);
          this.eachList(this.betData,this.responseData.gameBettingRuleVo);
          this.eachList(this.fundsData,this.responseData.gameFundRuleVo);
          this.eachList(this.riskData,this.responseData.gameRiskRuleVo);
          this.eachList(this.ruleData,this.responseData.gameRuleVo);
          self.fileList = res.data.fileList;
          console.log('this.responseData.gameFundRuleVo',this.responseData.gameFundRuleVo);

          this.insetData (self.ruleData, '游戏状态', res.data.gameInfoVo, 'gameStatus');
          this.insetData(self.ruleData, '游戏兑换比例', res.data.gameFundRuleVo, 'returnPrizeRate')
          this.insetData(self.ruleData, '奖池类型', res.data.gameInfoVo, 'jackpotType')
          this.insetData(self.fundsData, 'Jackpot比率',res.data.gameRuleVo, 'jackpotRate')
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    handleSelectionChange () {
    },
    eachList(arr, obj) {
      const _this = this;
      if (obj != null) {
        arr.forEach(item => {
          item.value = obj[item.prop];
          if (item.prop == "gameStatus") {
            item.value = _this.formatObj.formatGameStatus[parseInt(obj[item.prop]) - 1]
          }else if (item.prop == 'gameType') {
            item.value = _this.formatObj.formatGameType[parseInt(obj[item.prop]) - 1];
          } else if (item.prop == 'jackpotType') {
            item.value = _this.formatObj.formatPoolRate[parseInt(obj[item.prop]) - 1];
          } else if (item.prop == 'changePlanStatus') {
            item.value = _this.formatObj.formatPlanStatus[parseInt(obj[item.prop]) - 1];
          } else if (item.prop == 'conPattern') {
            item.value = _this.formatObj.formatConPattern[parseInt(obj[item.prop]) - 1];
          } else if (item.prop == 'indulgeSwitch') {
            item.value = _this.formatObj.formatIndulgeSwitch[parseInt(obj[item.prop]) - 1];
          }
        });
      }
    },
    insetData (list, str, dataObj, getData) {
      let key = Object.keys(dataObj)
      list.forEach(item => {
        if (item.title == str) {
          item.value = dataObj[getData]
        } 
        if (item.prop == getData && dataObj[getData]!= null) {
          if (item.prop == "gameStatus" ) {
            console.log(item.prop, dataObj[getData]);
            item.value = this.formatObj.formatGameStatus[parseInt(dataObj[getData]) - 1 ]
          } else if (item.prop == "jackpotType") {
            item.value = this.formatObj.formatPoolRate[parseInt(dataObj[getData]) - 1 ]
          }
        }
      }) 

       
    }
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
