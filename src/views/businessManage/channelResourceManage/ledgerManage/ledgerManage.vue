<template>
 <div class="vlt-card">
   <div class="content-block">
     <search-bar class="search-bar-demo" @search="search" :options="searchOptions" :total="999" labelWidth="80px">
      <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
    </search-bar>
    <!-- <el-table :data="tableData" border>
        <el-table-column fixed label="序号"  type="index" width="60px"></el-table-column>
        <el-table-column label="订单编号" prop="payOrder" min-width="300px"></el-table-column>
        <el-table-column label="账户名称" prop="userName" min-width="120px"></el-table-column>
        <el-table-column label="账户余额(元)" prop="afterBalance" min-width="140px">
    </!--> -->
   </div>
   
 </div>
</template>

<script type="text/javascript">
export default {
 name: "ledgerManage",
 data() {
 return {
   searchOptions: [
      { title: "仓库名称", type: "input", prop: "storeName", value: "" },
      { title: "仓库类型", type: "select", prop: "storeType", options:[{label:'',value:'1'},{label:'',value:''}]},
      { title: "物品类型", type: "select", prop: "goodsType", options:[{label:'',value:'1'},{label:'',value:''}]},
      { title: "物品名称", type: "input", prop: "goodsName", value: "" },
      { title: "物品型号", type: "select", prop: "goodsModel", options:[{label:'',value:'1'},{label:'',value:''}]},
   ],
   controlOptions: [
      { name: "打印当前", type: "primary", icon: "printer" },
      { name: "导出", type: "danger", icon: "download" },
    ]
 }
 },
 components: {
 },
 methods: {
   search(form) {
      console.log("search", form);
    },
   selectBtn(val) {
      console.log(val);
    },

 },
}
</script>

<style lang="less" scoped>
</style>
