<template>
 <div class="vlt-card check-page">
   <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="参数内容" name="first">
      <div class="basic-info">
        <div class="basic-title">
          <h3>基础信息</h3>
          <span @click='toEdit'>编辑</span>
        </div>
        <base-info :infoList="basicInfoList"></base-info>
      </div>
      <div class="fund-info basic-info">
        <div class="basic-title">
          <h3>返奖率-调节基金</h3>
        </div>
        <base-info :infoList="fundInfoList" class="column"></base-info>
      </div>
      <div class="issue-info basic-info fund-info">
        <div class="basic-title">
          <h3>发行经费</h3>
        </div>
        <base-info :infoList="issueInfoList"></base-info>
      </div>
      <div class="public-fund basic-info fund-info">
        <div class="basic-title">
          <h3>公益金</h3>
        </div>
        <base-info :infoList="publicInfoList"></base-info>
      </div>
      <div class="pay-taxes basic-info fund-info">
        <div class="basic-title">
          <h3>投注卡资金处理</h3>
        </div>
        <base-info :infoList="payTaxesInfoList"></base-info>
      </div>
    </el-tab-pane>
    <el-tab-pane label="审核流程" name="second">
      审核流程
    </el-tab-pane>
  </el-tabs>
 </div>
</template>

<script type="text/javascript">
export default {
 name: "globalParameter",
 data() {
 return {
    activeName: 'first',
    basicInfoList: [
        {title:'游戏编号',value:'',prop:'gameCode'},
        {title:'游戏名称',value:'',prop:'gameName'},
        { title: "生效时间", value: "2132132", prop: "takeEffectTime" },
        { title: "游戏兑换比例", value: "", prop: "gameConversionRation" },
        { title: "代销费率", value: "", prop: "sellRate" },
        { title: "状态", value: "", prop: "state" },
        { title: "创建人", value: "", prop: "creator" },
        { title: "创建时间", value: "", prop: "createTime" }
      ],
      fundInfoList:[
        {title:'返奖率',value:'',prop:'slipperRate'},
        {title:'调节基金',value:'',prop:'regulationFund'}
      ],
      issueInfoList:[
        {title:'发行经费占比',value:'',prop:'offeringFunds'},
        {title:'中福彩中心',value:'',prop:'lotteryCenter'},
        {title:'省级福彩中心',value:'',prop:'provincialLottery'},
        {title:'市级福彩中心',value:'',prop:'cityLottery'},
        {title:'销售厅',value:'',prop:'salesHall'},
      ],
      publicInfoList:[
        {title:'公益金占比',value:'',prop:'publicFund'},
        {title:'中福彩中心',value:'',prop:'lotteryCenter'},
        {title:'省级福彩中心',value:'',prop:'provincialLottery'},
        {title:'市级福彩中心',value:'',prop:'cityLottery'},
        {title:'销售厅',value:'',prop:'salesHall'},
      ],
      payTaxesInfoList:[
        {title:'特殊资金时间',value:'',prop:'specialFundTime'},
      ]
 }
 },
 components: {
 },
 methods: {
   handleClick(tab, event) {
        console.log(tab, event);
      },
    //跳转编辑页面
    toEdit(){
      let query = this.$route.query
      // console.log('query', query.hasOwnProperty('id'));
      if (query.hasOwnProperty('id')) {
        this.$router.push({
          name: 'fundParameterEdit',
          query:{
            id:  query.id
          }
        })
      }
    }
 },
}
</script>

<style lang="less">
.check-page{
  .el-tabs__item{font-size: 16px;font-weight: 600}
  padding: 30px;
  .basic-title{
    position: relative;
    border-bottom: 1px solid rgb(228, 231, 237);
    margin-top: 20px;
    padding-left: 16px;
    padding-bottom: 16px;
    margin-left: 28px;
    margin-right: 28px;
    h3{
      font-weight:500;
      display: inline-block;
    }
    span{
      cursor: pointer;
      color: rgb(59, 59, 255);
      font-size: 16px;
      position: absolute;
      top: 0px;right:22px;
    }
  }
  .basic-info{
    .base-info{
      padding: 0;
      padding-left: 162px;
      .title{
        font-size: 16px;
      }
      .info-item{
        width: 50%;
        padding: 16px 5px;
      }
      .content{font-size: 16px}
    }
  }
  .fund-info{
    .base-info{
      .info-item{
        width: 100%
    }
    }
  }
  
    
}
</style>
