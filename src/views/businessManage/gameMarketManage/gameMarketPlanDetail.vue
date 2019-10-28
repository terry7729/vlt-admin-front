<template>
  <div class="vlt-card">
    <panel title="上市计划" :show="true">
      <base-info :infoList="planData"></base-info>
    </panel>
    <panel title="游戏信息" :show="true">
      <base-info :infoList="gameData"></base-info>
    </panel>
    <panel title="游戏开发商" :show="true">
      <base-info :infoList="developerInfo"></base-info>
    </panel>
    <panel title="版本信息" :show="true">
      <base-info :infoList="softwareInfo">
        <!-- 这是 具名插槽  需要填写链接信息 -->
        <ul slot="msg-content" class="info-list">
          <li class="info-item">
            <span class="title">版本记录：</span>
            <p  class="content"><el-link type="primary" :underline="false" tag="p" style="font-size: 12px;" @click="toVersion">查看</el-link></p>
          </li>
        </ul>
      </base-info>
    </panel>
    <!-- fileList -->
    <panel title="附件信息" :show="fileList.lenght > 0">
      <base-info :infoList="fileList">
        <ul class="info-list" slot="msg-content">
          <li class="info-item" v-for="(item, index) in fileList" :key="index">
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
    <!-- <panel title="自定义配置" :show="true">
      <base-info :infoList="customData"></base-info>
    </panel>-->
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
            <el-button type="primary" size="mini" v-prevent="2000" @click.native="detail(scope.row.id)">查看问卷统计</el-button>          </template>
        </el-table-column>
      </el-table>
    </panel>-->
    <!-- <panel title="上市信息发布" :show="true">
      <base-info :infoList="publishData"></base-info>
    </panel>-->
  </div>
</template>
<script type="text/javascript">
export default {
  name: "gameMarketPlanDetail",
  data() {
    return {
      planData: [
        { title: "计划名称", value: "", prop: "gameListName" },
        { title: "上市计划编号", value: "", prop: "gameListCode" },
        { title: "销售区域", value: "", prop: "gameSaleArea" },
        { title: "上市时间", value: "", prop: "gameListTime" },
        { title: "上市游戏", value: "", prop: "gameName" },
        { title: "销售渠道", value: "", prop: "gameSaleChannel" },
        { title: "上市计划说明", value: "", prop: "gameSaleDesc" },
        { title: "计划状态", value: "", prop: "gameListStatus" },
        { title: "销售终端", value: "", prop: "gameSaleTerminal" },
        { title: "创建人", value: "", prop: "createBy" },
        { title: "创建时间", value: "", prop: "createTime" }
      ],
      gameData: [
        { title: "游戏ID", value: "", prop: "id" },
        { title: "游戏名称", value: "", prop: "gameName" },
        { title: "游戏类型", value: "", prop: "gameType" },
        { title: "游戏状态", value: "", prop: "gameStatus" },
        { title: "游戏版权", value: "", prop: "gameGenlot" },
        { title: "游戏奖池", value: "", prop: "jackpotType" },
        { title: "游戏简介", value: "", prop: "gameDesc" },
        { title: "创建人", value: "", prop: "createUser" },
        { title: "创建时间", value: "", prop: "createTime" },
        { title: "更新人", value: "", prop: "updateUser" },
        { title: "更新时间", value: "", prop: "updateTime" }
      ],
      developerInfo: [
        { title: "开发商名称", value: "", prop: "developerName" },
        { title: "电子邮箱：", value: "", prop: "email" },
        { title: "传真电话：", value: "", prop: "faxPhone" },
        { title: "联系人：", value: "", prop: "person" },
        { title: "联系地址：", value: "", prop: "address" },
        { title: "手机号码：", value: "", prop: "cellPhone" }
      ],
      softwareInfo: [
        { title: "软件名称", value: "", prop: "softwareName" },
        { title: "软件大小", value: "", prop: "softwareSize" },
        { title: "新版特性", value: "", prop: "newFeatures" },
        { title: "软件版本", value: "", prop: "versionName" },
        { title: "软件描述", value: "", prop: "softwareDesc" },
        { title: "版本号", value: "", prop: "versionNumber" },
      ],
      fileList:[
        { title: "文档一.doc", value: "下载", prop: "newCharacter" }
      ],
      ruleData: [
        { title: "游戏状态", value: "", prop: "miniMoney" },
        { title: "游戏兑换比例", value: "", prop: "miniNumber" },
        { title: "消费模式", value: "", prop: "conPattern" },
        { title: "防沉迷", value: "", prop: "indulgeSwitch" },
        { title: "奖池类型", value: "", prop: "rewardPoolRate" },
        { title: "Jackpot比率", value: "", prop: "jackpotRate" },
        { title: "奖池比率", value: "", prop: "miniNumber" },
        { title: "单次时长", value: "", prop: "dayLimitTime" },
        { title: "单日限额", value: "", prop: "dayLimitPrize" },
        { title: "游戏规则介绍", value: "", prop: "ruleDesc" }
      ],
      betData: [
        { title: "单注最小金额", value: "", prop: "minAmount" },
        { title: "最小注数", value: "", prop: "minBets" },
        { title: "单注加注金额", value: "", prop: "minAddBets" },
        { title: "单注最大金额", value: "", prop: "maxAmount" },
        { title: "最大投注数", value: "", prop: "maxBets" }
      ],
      fundsData: [
        { title: "总发行经费占比", value: "", prop: "totalPublishRate" },
        { title: "中福彩发行费占比", value: "", prop: "zhcPublishRate" },
        { title: "省福彩发行费占比", value: "", prop: "proPublishRate" },
        { title: "市福彩发行费占比", value: "", prop: "cityPublishRate" },
        { title: "销售厅发行费占比", value: "", prop: "marketPublishRate" },
        { title: "总公益金占比", value: "", prop: "totalWelfareRate" },
        { title: "中福彩公益金占比", value: "", prop: "zhcWelfareRate" },
        { title: "省福彩公益金占比", value: "", prop: "proWelfareRate" },
        { title: "市福彩公益金占比", value: "", prop: "cityWelfareRate" },
        { title: "销售厅公益金占比", value: "", prop: "marketPublishRate" }
      ],
      riskData: [
        { title: "最低中奖金额", value: "", prop: "minBonus" },
        { title: "最低返奖率", value: "", prop: "minReturnRate" },
        { title: "最低奖池金额", value: "", prop: "minPoolAmount" },
        { title: "最高中奖金额", value: "", prop: "maxBonus" },
        { title: "最高返奖率", value: "", prop: "maxReturnRate" },
        { title: "最高奖池金额", value: "", prop: "maxPoolAmount" },
        { title: "最低销量", value: "", prop: "minSale" },
        { title: "最低开机率", value: "", prop: "minStartRate" },
        { title: "最低在线数量", value: "", prop: "minOnlineNum" },
        { title: "最高销量", value: "", prop: "maxSale" }
      ]
      // customData:[
      //   {title:'奖级设置',value:'',prop:'serveAddress'}
      // ],
      // tableData: [
      //   {id: 'a',name:'b',type:'c',pond: 'd',time:'2019-09-12 09:00:00'}
      // ],
      // publishData: [
      //   {title:'发布标题',value:'',prop:'awardSetting'},
      //   {title:'发布机构',value:'',prop:'awardSetting'},
      //   {title:'发布时间',value:'',prop:'awardSetting'},
      //   {title:'发布内容',value:'',prop:'playingMethod'},
      // ]
    };
  },
  created() {
    const routerQuery = this.$route.query;
    if (routerQuery && routerQuery.id && routerQuery.gameId) {
      const data = {
        gameId: routerQuery.gameId,
        id: routerQuery.id
      };
      this.getGameStoreInfo(data);
    }
  },
  methods: {
    getGameStoreInfo(data) {
      const self = this;
      (async data => {
        let res = await self.$api.getMarketPlanDetail({ data });
        console.log(res);
        if (res && res.code == 0) {
          if (res.data.gameInfoVo != null) {
            this.eachList(this.planData, res.data.gameListPlanVo);
            this.eachList(this.gameData, res.data.gameInfoVo);
            this.eachList(this.developerInfo, res.data.developerInfo);
            this.eachList(this.ruleData, res.data.gameRuleVo);
            this.eachList(this.betData, res.data.gameBettingRuleVo);
            this.eachList(this.fundsData, res.data.gameFundRuleVo);
            this.eachList(this.riskData, res.data.gameRiskRuleVo);
            this.eachList(this.softwareInfo, res.data.softwareInfo);
             this.fileList = res.data.fileList
          } else {
            self.$message.warning(res.data.msg);
          }
        } else {
          self.$message.warning(res.msg);
        }
      })(data);
    },
    handleSelectionChange() {},
    eachList(arr, obj) {
      arr.forEach(item => {
        item.value = obj[item.prop];
        if (item.prop == "jackpotType") {
          // item.value = this.formatJackpotType(obj[item.prop])
        }
      });
    },
    toVersion () {
      console.log('跳转到版本记录');
    }
  }
};
</script>

<style lang="less" scoped>
.plan-check {
  background: white;
  margin: 20px 20px;
  border-radius: 8px;
  padding: 25px;
}

.panel {
  margin-bottom: 20px;
}
</style>
