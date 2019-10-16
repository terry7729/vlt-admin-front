<template>
 <div class="vlt-card">
   <div class="content-block">
     <search-bar class="search-bar-demo" @search="search" :options="searchOptions" :total="999" labelWidth="80px">
      <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions" position="left"></control-bar>
    </search-bar>
    <el-table :data="tableData" border>
        <el-table-column fixed label="序号"  type="index" width="60px"></el-table-column>
        <el-table-column label="仓库名称" prop="storeName" min-width="120px"></el-table-column>
        <el-table-column label="仓库类型" prop="storeType"></el-table-column>
        <el-table-column label="物品名称" prop="goodsName"></el-table-column>
        <el-table-column label="物品型号" prop="goodsModel" min-width="100px"></el-table-column>
        <el-table-column label="库存数量" prop="repertoryNum"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="toDetailLedger(scope.row.storeName, scope.row.goodsName)">查看台账明细</el-button>
          </template>
        </el-table-column>
    </el-table>
   </div>
   <table-paging position="right" :total="999" :currentPage="1" :pageSize="10" 
   @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
   </table-paging>
   
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
    ],
    tableData:[
      {id:1,storeName:'xxxx',storeType:'中彩仓库',goodsName:'投注机',goodsModel:'xxxx',repertoryNum:1000,},
      {id:2,storeName:'xxxx',storeType:'中彩仓库',goodsName:'投注机',goodsModel:'xxxx',repertoryNum:1000,},
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
  toDetailLedger(storeName, goodsName) {
      this.$router.push({name: 'detailLedger', query:{storeName, goodsName}})
  },
  handleCurrentChange(currentPage) {
        // this.confirmSearch.page = val
        // this.query()
        console.log(currentPage)
      },
  handleSizeChange(pageSize) {
    // this.pageSize = val
    // this.confirmSearch.limit = val
    // this.confirmSearch.page = 1
    // this.currentPage = 1
    // this.query()
    console.log(pageSize)
  },
 },
}
</script>

<style lang="less" scoped>
</style>
