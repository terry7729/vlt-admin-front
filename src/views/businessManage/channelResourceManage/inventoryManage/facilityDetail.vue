<template>
 <div class="vlt-card">
   <div class="facility-detail">
     <search-bar class="search-bar-demo" @search="search" :options="searchOptions" :total="999" labelWidth="80px"></search-bar>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="序号" type="index" width="80px"></el-table-column>
      <el-table-column prop="facilityName" label="设施名称" width="250px"></el-table-column>
      <el-table-column prop="facilityUnit" label="设施单位"></el-table-column>
      <el-table-column prop="depositLocation" label="存放位置"></el-table-column>
      <el-table-column prop="outStore" label="出库仓库"></el-table-column>
      <el-table-column prop="putStoreTime" label="入库时间"></el-table-column>
      <el-table-column prop="putStoreNum" label="入库数量"></el-table-column>
      <el-table-column prop="residueInventory" label="剩余库存"></el-table-column>
    </el-table>
    <table-paging position="left" :total="total" :currentPage="1" :pageSize="10"
     @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
    </table-paging>
   </div>
 </div>
</template>

<script type="text/javascript">
export default {
 name: "facilityDetail",
 data() {
 return {
   total:100,
   tableData:[
     {
        facilityName:'投注机',
        facilityUnit:'个',
        depositLocation:'广东省',
        outStore:'广东省',
        outStore:'广东省',
        putStoreTime:'2018-08-09',
        putStoreNum:1000,
        residueInventory:1000
      }
   ],
   searchOptions:[
      { title: "入库时间", type: "datepicker", prop: "putStoreTime", value: "" },
      {
          title: "出库仓库",
          type: "select",
          prop: "outStore",
          value: "",
          options: [
            {
              label: "选项1",
              value: 1
            },
            {
              label: "选项2",
              value: 2
            }
          ]
        }
   ]

 }
 },
 components: {
 },
 methods: {
   search(form) {
      console.log("search", form);
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage)
    }
 },
}
</script>

<style lang="less" scoped>
</style>
