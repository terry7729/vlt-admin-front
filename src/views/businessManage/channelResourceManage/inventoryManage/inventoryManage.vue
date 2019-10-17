<template>
 <div class="vlt-card">
   <div class="tabs-content">
    <h3>库存管理</h3>
    <el-tabs tab-position="left" style="height: 800px;">
        <el-tab-pane label="库存查询">
          <search-bar class="search-bar-demo" @search="search" :options="inventoryOptions" :total="999" labelWidth="80px"></search-bar>
          <!-- <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions" position="left"></control-bar> -->
          <control-bar :options="controlOptions" position="left"></control-bar>

          <el-tabs v-model="activeName" @tab-click="handleClick" class="tables-content">
            <el-tab-pane label="设备" name="equipment">
              <el-table :data="equipmentData" border style="width: 100%">
                <el-table-column prop="id" label="序号" type="index"></el-table-column>
                <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
                <el-table-column prop="equipmentType" label="设备型号"></el-table-column>
                <el-table-column prop="equipmentCode" label="设备编码"></el-table-column>
                <el-table-column prop="depositLocation" label="存放位置"></el-table-column>
                <el-table-column prop="useState" label="使用状态"></el-table-column>
                <el-table-column prop="equipmentState" label="设备状态"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="equipmentDetail(scope.row.id)" type="primary" v-prevent="2000" size="mini">查看</el-button>
                    <!-- <el-button size="mini" v-prevent="2000" @click.native="equipmentEdit(scope.row.id)">履历</el-button> -->
                    <el-button type="mini" v-prevent="2000" @click="dialogFormVisible = true">履历</el-button>

                      <el-dialog title="履历" :visible.sync="dialogFormVisible">
                        <el-steps direction="vertical" :active="1">
                          <el-step title="步骤 1"></el-step>
                          <el-step title="步骤 2"></el-step>
                          <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
                        </el-steps>
                        <div slot="footer" class="dialog-footer">
                          <el-button @click="dialogFormVisible = false">取 消</el-button>
                          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                        </div>
                      </el-dialog>

                  </template>
                </el-table-column>
              </el-table>
              <!-- <table-paging :total='total' :currentPage="currentPage" :pageSize="pageSize"></table-paging> -->
              <table-paging position="right" :total="999" :currentPage="1" :pageSize="10" 
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
                </table-paging>
            </el-tab-pane>
            <el-tab-pane label="设施" name="facility">
              <el-table :data="facilityData" border style="width: 100%">
                <el-table-column prop="id" label="序号" type="index"></el-table-column>
                <el-table-column prop="facilityName" label="设施名称"></el-table-column>
                <el-table-column prop="facilityUnit" label="设施单位"></el-table-column>
                <el-table-column prop="inventoryNum" label="库存数量"></el-table-column>
                <el-table-column prop="depositLocation" label="存放位置"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="facilityDetail(scope.row.id)" type="primary" v-prevent="2000" size="mini">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- <table-paging :total='facilityTotal' :currentPage="facilityCurrentPage" :pageSize="facilityPageSize"></table-paging> -->
              <table-paging position="right" :total="999" :currentPage="1" :pageSize="10" 
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
                </table-paging>
            </el-tab-pane>
            <el-tab-pane label="耗材" name="consumable">
              <el-table :data="consumableData" border style="width: 100%">
                <el-table-column prop="id" label="序号" type="index"></el-table-column>
                <el-table-column prop="consumableName" label="耗材名称"></el-table-column>
                <el-table-column prop="consumableUnit" label="耗材单位"></el-table-column>
                <el-table-column prop="consumableNum" label="数量"></el-table-column>
                <el-table-column prop="depositLocation" label="存放位置"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="consumableDetail(scope.row.id)" type="primary" v-prevent="2000" size="mini">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- <table-paging :total='facilityTotal' :currentPage="facilityCurrentPage" :pageSize="facilityPageSize"></table-paging> -->
              <table-paging position="right" :total="999" :currentPage="1" :pageSize="10" 
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
                </table-paging>
            </el-tab-pane>
            <el-tab-pane label="配件" name="mountings">
              <el-table :data="mountingsData" border style="width: 100%">
                <el-table-column prop="id" label="序号" type="index"></el-table-column>
                <el-table-column prop="mountingsName" label="配件名称"></el-table-column>
                <el-table-column prop="mountingsType" label="配件型号"></el-table-column>
                <el-table-column prop="mountingsCode" label="配件编码"></el-table-column>
                <el-table-column prop="depositLocation" label="存放位置"></el-table-column>
                <el-table-column prop="operationState" label="运行状态"></el-table-column>
                <el-table-column prop="mountingsState" label="配件状态"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="equipmentDetail(scope.row.id)" type="primary" v-prevent="2000" size="mini">查看</el-button>
                    <el-button size="mini" v-prevent="2000" @click.native="equipmentEdit(scope.row.id)">履历</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- <table-paging :total='facilityTotal' :currentPage="facilityCurrentPage" :pageSize="facilityPageSize"></table-paging> -->
              <table-paging position="right" :total="999" :currentPage="1" :pageSize="10" 
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
                </table-paging>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="盘点管理">
          <search-bar class="search-bar-demo" @search="search" :options="configOptions" :total="999" labelWidth="80px"></search-bar>
          <control-bar :options="controlOptions" position="left"></control-bar>
          <el-table :data="checkData" border style="width: 100%">
                <el-table-column prop="id" label="序号" type="index"></el-table-column>
                <el-table-column prop="storeName" label="仓库名称"></el-table-column>
                <el-table-column prop="storeType" label="仓库类型"></el-table-column>
                <el-table-column prop="equipmentNum" label="设备数量"></el-table-column>
                <el-table-column prop="facilityNum" label="设施数量"></el-table-column>
                <el-table-column prop="consumableNum" label="耗材数量"></el-table-column>
                <el-table-column prop="mountingsNum" label="配件数量"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="checkBtn(scope.row.id)" type="primary" v-prevent="2000" size="mini">盘点统计</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <table-paging position="right" :total="999" :currentPage="1" :pageSize="10" 
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
              </table-paging>
        </el-tab-pane>
      </el-tabs>
    </div>
 </div>
</template>

<script type="text/javascript">
export default {
 name: "inventoryManage",
 data() {
 return {
  //  total:100,
  //  currentPage:5,
  //  pageSize:10,

  //  facilityTotal:400,
  //  facilityCurrentPage:1,
  //  facilityPageSize:20,
   activeName: 'equipment',
   inventoryOptions: [
        { title: "物品名称", type: "input", prop: "goodsName", value: "" },
        {
          title: "存放位置",
          type: "select",
          prop: "depositLocation",
          value: "",
          options: [
            {
              label: "广东省",
              value: 1
            },
            {
              label: "北京市",
              value: 2
            }
          ]
        },
    ],
    configOptions:[
      {title:'仓库名称',type:'input',prop:'storeName',value:''},
      {title: "仓库类型",type: "select",prop: "storeType",value: "",
      options: [
        {
          label: "中彩仓库",
          value: 1
        },
        {
          label: "广东省仓库",
          value: 2
        }
      ]
    },
  ],
    controlOptions: [
        { name: "导出", type: "danger", icon: "download" },
        { name: "打印当前", type: "primary", icon: "printer" },
      ],
    equipmentData: [
      {
        id: '01',
        equipmentName: '投注机',
        equipmentType:'F01',
        equipmentCode: '008',
        depositLocation:'广东省',
        useState: '在库',
        equipmentState: '正常',
      }
    ],
    facilityData:[
      {
        id:'01',
        facilityName:'投注机',
        facilityUnit:'个',
        inventoryNum:10000,
        depositLocation:'广东省',
      }
    ],
    consumableData:[
      {
        id:'01',
        consumableName:'投注机',
        consumableUnit:'台',
        consumableNum:21000,
        depositLocation:'广东省'
      }
    ],
    mountingsData:[
      {
        id:'01',
        mountingsName:'电视机',
        mountingsType:'F01',
        mountingsCode:'008',
        depositLocation:'广东省',
        operationState:'运行中',
        mountingsState:'正常'
      }
    ],
    checkData:[
      {
        id:1,
        storeName:'中彩仓库',
        storeType:'中彩仓库',
        equipmentNum:1000,
        facilityNum:1000,
        consumableNum:1000,
        mountingsNum:1000,
      }
    ],
    dialogFormVisible: false,
 }
 },
 components: {
 },
 methods: {
   handleClick(tab, event) {
      console.log(tab, event);
  },
  search(form) {
      console.log("search", form);
  },
  selectBtn(val) {
      console.log(val);
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
     
  //设备查看页面跳转
  equipmentDetail (id) {
    this.$router.push({
      name: 'equipmentDetail',
      query: {id}
    })
  },
  //设备编辑页面跳转
  equipmentEdit (id) {        
    this.$router.push({
      name: 'storeEdit',
      query: {id}
    })
  },
  //设施查看
  facilityDetail(id){
    console.log()
  },
  consumableDetail(id){
    consoel.log()
  },
  //履历弹框
  
  //盘点统计
  checkBtn(id){
    this.$router.push({
      name: 'inventoryStatistics',
      query: {id}
    })
  }
 }
}

</script>

<style lang="less">
h3{margin-bottom: 20px}
.tabs-content{
  padding: 16px 30px;
  
  .el-tabs__nav{
    margin-right: 100px;
  }
  .el-tabs__item.is-active{
    background: rgb(230, 247, 255);
  }
  .el-tabs--left .el-tabs__active-bar.is-left, .el-tabs--left .el-tabs__nav-wrap.is-left::after{
    left:194px;
    margin-right: 10px;
  }
  .el-tabs--left .el-tabs__nav-wrap.is-left{
    margin-right: -60px;
  }
  .el-tabs__item{
    padding: 0 70px;
  }
  .tables-content .el-tabs__item.is-active{
    background: none;
  }
}

</style>
