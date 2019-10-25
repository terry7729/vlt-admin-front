<template>
 <div class="vlt-card alreadyPut-detail"> 
    <panel-static title="基本信息" style="margin-bottom:10px;">
      <base-info :infoList="infoList"></base-info>
    </panel-static>
    <panel-static title="物品列表">
      <el-table :data="goodsListData" border style="width: 100%">
        <el-table-column prop="id" label="序号" type="index" width='80'></el-table-column>
          <el-table-column prop="goodsName" label="物品名称"></el-table-column>
          <el-table-column prop="goodsType" label="物品型号"></el-table-column>
          <el-table-column prop="goodsCode" label="物品编号"></el-table-column>
          <el-table-column prop="miniNum" label="数量"></el-table-column>
          <el-table-column prop="money" label="单价（元）"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </panel-static>
    <div class="inp-total">
      <span>合计金额：<el-input v-model="totalMoney" placeholder="请输入总金额"></el-input></span>
    </div>
    <el-row class="putStore">
      <el-button type="primary" class="mainBtn" @click="putStoreClick">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-row>
 </div>
</template>

<script type="text/javascript">
export default {
 name: "alreadyPutDetail",
 data() {
 return {
   totalMoney:'',
   infoList: [
        { title: "单据编号", value: "", prop: "billCode" },
        { title: "单据主题", value: "", prop: "billTitle" },
        { title: "申请人员", value: "", prop: "applyPerson" },
        { title: "申请日期", value: "", prop: "applyDate" },
        { title: "出库仓库", value: "", prop: "outStore" },
        { title: "入库仓库", value: "", prop: "putStore" },
        { title: "备注", value: "", prop: "remark" },
    ],
  goodsListData:[
    {id:1,goodsName:'投注终端',goodsType:'xxxxx',goodsCode:'xxxxx',miniNum:'xxxx',money:'xxxx',remark:''}
  ]

 }
 },
 components: {
 },
 methods: {
   putStoreClick(){
     console.log(32123)
   },
   cancel(){
     this.$router.back();
   }
 },
}
</script>

<style lang="less">
.alreadyPut-detail{
  .inp-total{
  margin-top: 20px;
  margin-left: 20px;
  .el-input{
    width:500px
  }
}
.putStore{
  .el-button{
    margin:10px;
  }
  .mainBtn{
    margin-top:80px;
    margin-left: 1350px;
    margin-bottom: 150px
  }
}

}

</style>
