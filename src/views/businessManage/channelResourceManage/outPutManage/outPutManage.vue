<template>
 <div class="vlt-card">
   <div class="tabs-content"> 
     <h3>出入库管理</h3>
     <el-tabs tab-position="left" style="height: 800px;" @tab-click="sideTab" v-model="activeName">
       <el-tab-pane :label="supItem.label" :name="supItem.name" v-for="(supItem, supIndex) in tabConfigs" :key="supIndex">
        <div v-for="(childItem,index) in supItem.tabConfigs" :key="index">
          <search-bar
            @search="putSearch" 
            :options="supItem.options" 
            :total="childItem.totalCount" 
            labelWidth="80px"
            v-show="supItem.activeName === childItem.name"
          >
          </search-bar>
          <control-bar 
            :options="controlOptions" 
            position="left" 
            @select="selectBtn"
            v-show="supItem.activeName === childItem.name"
          >
          </control-bar>
        </div>
        <el-tabs @tab-click="puthandleClick" class="tables-content" v-model="supItem.activeName" :data-sup-active-index="supIndex">
          <el-tab-pane :label="childItem.label" :name="childItem.name" v-for="childItem in supItem.tabConfigs" :key="childItem.name">
            <el-table :data="childItem.tableData" border style="width: 100%">
              <el-table-column prop="id" label="序号" type="index"></el-table-column>
              <el-table-column prop="documentNumber" label="单据编号"></el-table-column>
              <el-table-column prop="documentToppic" label="申请标题"></el-table-column>
              <el-table-column prop="oplTypeName" label="操作类型"></el-table-column>
              <el-table-column prop="createTime" label="申请时间" v-if="childItem.label == '待入库' || childItem.label == '待出库'"></el-table-column>
              <el-table-column prop="userName" label="申请人员" v-if="childItem.label == '待入库' || childItem.label == '待出库'"></el-table-column>
              <el-table-column prop="entryWarehouseTime" label="入库时间" v-if="childItem.label == '已入库'"></el-table-column>
              <el-table-column prop="entryWarehouseBy" label="入库人员" v-if="childItem.label == '已入库'"></el-table-column>
              <el-table-column prop="outWarehouseTime" label="出库时间" v-if="childItem.label == '已出库'"></el-table-column>
              <el-table-column prop="outWarehouseBy" label="出库人员" v-if="childItem.label == '已出库'"></el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="putStore(scope.row.documentNumber)" type="primary" v-prevent="2000" size="mini" v-if="childItem.label == '待入库'">入库</el-button>
                  <el-button @click="outStore(scope.row.documentNumber)" type="primary" v-prevent="2000" size="mini" v-if="childItem.label == '待出库'">出库</el-button>
                  <el-button @click="alreadyPutDetail(scope.row.documentNumber)" type="primary" v-prevent="2000" size="mini"  v-if="childItem.label == '已入库'">详情</el-button>
                  <el-button @click="alreadyOutDetail(scope.row.documentNumber)" type="primary" v-prevent="2000" size="mini"  v-if="childItem.label == '已出库'">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <table-paging position="right" :total="childItem.totalCount" :currentPage="childItem.currentPage" :pageSize="childItem.pageSize" 
            @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
            </table-paging>
          </el-tab-pane>
        </el-tabs>
       </el-tab-pane>
     </el-tabs>
   </div>
 </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "outPutManage",
  data() {
    return { 
      activeName: 'put',
      tabConfigs: [
        {
          label: '入库管理',
          name: 'put',
          activeName: 'waiting',
          options:[
            {title:'单据编号',type:'input',prop:'documentNumber',value:''},
            {title:'申请标题',type:'input',prop:'documentToppic',value:''}
          ],
          tabConfigs: [
            {
              label: '待入库',
              name: 'waiting',
              statusCode: 2,
              tableData: [],
              totalCount: 0,
              currentPage: 1,
              pageSize: 10,
            },
            {
              label: '已入库',
              name: 'already',
              statusCode: 3,
              tableData: [],
              totalCount: 0,
              currentPage: 1,
              pageSize: 10,
            },
          ]
        },
        {
          label: '出库管理',
          name: 'out',
          activeName: 'waiting',
          options:[
            {title:'单据编号',type:'input',prop:'documentNumber',value:''},
            {title:'申请标题',type:'input',prop:'documentToppic',value:''}
          ],
          tabConfigs: [
            {
              label: '待出库',
              name: 'waiting',
              statusCode: 1,
              tableData: [],
              totalCount: 0,
              currentPage: 1,
              pageSize: 10,
            },
            {
              label: '已出库',
              name: 'already',
              statusCode: 2,
              tableData: [],
              totalCount: 0,
              currentPage: 1,
              pageSize: 10,
            },
          ]
        }
      ],
  
      
    controlOptions:[
      { name: "导出", type: "danger", icon: "download" },
      { name: "打印当前", type: "primary", icon: "printer" },
    ],
    requestData:{
      "page": 1,
      "pageSize": 10,
      "param": {
        "all": false,
        "documentNumber": "",
        "documentToppic": "",
        "status": 1
      }
    },
    // state:{
    //   1: '待出库',
    //   2: '已出库,待入库',
    //   3: "已入库"
    // }
  }
 },
 components: {
 },
 created(){
   this.puthandleClick({
    supActiveIndex: 0,
    index: 0
  })
 },
 methods: {
  async getOutPutList(data){
    Object.assign(this.requestData, data);
    const param = data.param || {};
    let res = await this.$api.getOutPutList({
      data: {
        ...this.requestData,
        param: {
          ...param,
          status: this.currentTab.statusCode
        }
      }
    })
    if(res && res.code == 0){
      this.currentTab.totalCount = res.data.total
      this.currentTab.tableData = res.data.records;
    }
  },
  puthandleClick(tab) {
    const supActiveIndex = 'supActiveIndex' in tab ? tab.supActiveIndex : 
    tab.$parent.$el.dataset.supActiveIndex;
    const currentTab = this.tabConfigs[supActiveIndex].tabConfigs[tab.index];
    this.currentTab = currentTab;
    this.getOutPutList({
      "page": currentTab.currentPage,
      "pageSize": currentTab.pageSize,
      param: this.requestData.param
      
    })
  },
  sideTab(tab) {
    this.puthandleClick({
      supActiveIndex: tab.index,
      index: 0
    })
  },
  putSearch(form) {
    this.getOutPutList({
      param: form
    })
    this.currentTab.currentPage = 1;
    this.currentTab.pageSize = 10;
    console.log("search", form);
  },
  handleCurrentChange(currentPage) {
    console.log(currentPage)
    this.getOutPutList({
      "page": currentPage,
      "pageSize": this.currentTab.pageSize,
      param: this.requestData.param
    })
    this.currentTab.currentPage = currentPage;
  },
  handleSizeChange(pageSize) {
     this.getOutPutList({
      "pageSize": pageSize,
      param: this.requestData.param
    })
    this.currentTab.pageSize = pageSize;
    console.log(pageSize)
  },
  changeForm(val) {
      Object.assign(this.params, val);
      console.log("派发出来的参数", this.params);
  },
  // 导出
 selectBtn(val){
   console.log(val)
 },

 //入库跳转
 putStore(documentNumber){
    this.$router.push({
      path: 'putStore',
      query: {documentNumber}
    })
  },
 //出库跳转
 outStore(documentNumber){
   this.$router.push({
      path: 'outStore',
      query: {documentNumber}
  })
 },
//  入库详情
  alreadyPutDetail(documentNumber){
    this.$router.push({
        path: 'alreadyPutDetail',
        query: {documentNumber}
      })
  },
//出库详情
  alreadyOutDetail(documentNumber){
    this.$router.push({
        path: 'alreadyOutDetail',
        query: {documentNumber}
      })
  }
 }
}
</script>
<style lang="less">
h3 {
  margin-bottom: 20px;
}
.tabs-content {
  padding: 16px 30px;
  .el-tabs__nav {
    margin-right: 100px;
  }
  .el-tabs__item.is-active {
    background: rgb(230, 247, 255);
  }
  .el-tabs--left .el-tabs__active-bar.is-left,
  .el-tabs--left .el-tabs__nav-wrap.is-left::after {
    left: 194px;
    margin-right: 10px;
  }
  .el-tabs--left .el-tabs__nav-wrap.is-left {
    margin-right: -60px;
  }
  .el-tabs__item {
    padding: 0 70px;
  }
  .tables-content .el-tabs__item.is-active {
    background: none;
  }
}
</style>
