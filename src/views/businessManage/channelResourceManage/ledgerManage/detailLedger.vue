<template>
 <div class="vlt-card">
   <div class="content-block">
     <search-bar class="search-bar-demo" @search="search" :options="searchOptions" :total="999" labelWidth="80px"></search-bar>
     <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions" position="left"></control-bar>
     <el-table :data="tableData" border>
        <el-table-column fixed label="序号" type="index" width="60px"></el-table-column>
        <el-table-column label="物品名称" prop="goodsName" min-width="120px"></el-table-column>
        <el-table-column label="物品型号" prop="goodsModel"></el-table-column>
        <el-table-column label="物品编码" prop="goodsCode"></el-table-column>
        <el-table-column label="业务类型" prop="businessType"></el-table-column>
        <el-table-column label="变更类型" prop="changeType"></el-table-column>
        <el-table-column label="数量" prop="number"></el-table-column>
        <el-table-column label="操作时间" prop="operationTime"></el-table-column>
        <el-table-column label="发放位置" prop="issuePlace"></el-table-column>
        <el-table-column label="剩余库存" prop="residueInventory"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="toDetailFlow(scope.row.id)">相关流程</el-button>
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
 name: "detailLedger",
 data() {
 return {
   searchOptions:[
     {title:'变更类型',type:'select',prop:'changeType',value:'',options:[{label:'出库',value:'1'},{label:'入库',value:''}]},
     {title:'选择日期',type: "datetime-range", prop: "date", value: ""}
   ],
   controlOptions:[
    { name: "打印当前", type: "primary", icon: "printer" },
    { name: "导出", type: "danger", icon: "download" },
   ],
   tableData:[
     {id:1,goodsName:'xxxx',goodsModel:'xxxx',goodsCode:'xxx',businessType:'采购入库',changeType:'出库',
     number:1000,operationTime:'2019-3-25',issuePlace:'广东',residueInventory:'1000'},
     {id:2,goodsName:'xxxx',goodsModel:'xxxx',goodsCode:'xxx',businessType:'采购入库',changeType:'出库',
     number:1000,operationTime:'2019-3-25',issuePlace:'广东',residueInventory:'1000'},
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
    toDetailFlow(id) {
      this.$router.push({name: 'detailFlow', query:{id}})
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
