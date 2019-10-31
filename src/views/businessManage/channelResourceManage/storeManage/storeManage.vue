<template>
<div class="vlt-card">
  <div class="content-block">
    <search-bar class="search-bar-demo" @search="search" :options="searchOptions" :total="totalCount" labelWidth="80px"></search-bar>
    <control-bar slot="extend-bar" @select="addBtn" :options="controlOptions" position="left"></control-bar>
    <el-table :data="tableData" border>
        <el-table-column fixed label="序号" type="index" width="90px"></el-table-column>
        <el-table-column label="仓库名称" prop="warName" min-width="120px"></el-table-column>
        <el-table-column label="所属机构" prop="insName"></el-table-column>
        <el-table-column label="仓库类型" prop="warType"></el-table-column>
        <el-table-column label="仓库管理员" prop="adminName"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" v-prevent="2000" @click="storeDetail(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
    </el-table>
    <table-paging
        position="right"
        :total="totalCount"
        :currentPage="currentPage"
        :pageSize="10"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
      </table-paging>
  </div>
</div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
import { async } from 'q';
export default {
name: "storeManage",
data() {
return {
  totalCount:0,
  currentPage:1,
  params:{},
  dialogAddFormVisible:false,
  dialogFormVisible: false,
  searchOptions:[
    {title:'仓库名称',type:'input',prop:'warName',value:''},
    {title:'仓库类型',type:'select',prop:'warType',value:'',options:[{label:'中彩仓库',value:1},{label:'省中心仓库',value:2},
    {label:'地市仓库',value:3},{label:'销售大厅',value:4}]},
    {title:'仓库管理员',type:'input',prop:'adminName',value:''},
    {
      title: "所属机构",
      type: "cascader",
      prop: "insId",
      value: "",
      options: [],
      setProps: {
        label: "text",
        value: "id",
        children: "children",
        // multiple: true, // 多选
        checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
      }
    }
  ],
  controlOptions:[{ name: "新建仓库", type: "primary", icon: "plus" }],
  tableData:[],
  requestData:{
      page: 1,
      pageSize: 10,//每页显示数据调试
      param: {
        "warName": "",
        "warType": "",
        "adminName": '',
        "insId":  ''
      }
  },
  //  basicInfo:[
  //    {title:'仓库名称',type:'input',prop:'storeName',value:''},
  //    {title:'所属机构',type:'select',prop:'organization',options:[{label:'深圳市',value:'sz'},{label:'广东市',value:'gd'}]},
  //    {title:'仓库类型',type:'select',prop:'storeType',options:[{label:'中彩仓库',value:'zc'},{label:'省中心仓库',value:'szx'}]},
  //    {title:'仓库管理员',type:'select',prop:'storeAdmin',options:[{label:'admin',value:'1'},{label:'xxxx',value:'2'}]},
  //    {title:'备注',type:'textarea',prop:'remark',value:''},
  //  ],
  //  rules2: {
  //       storeName: [
  //         { required: true, validator: rules.checkEmpty, trigger: "blur" }
  //       ],
  //       organization: [
  //         { required: true, validator: rules.checkEmpty, trigger: "blur" }
  //       ],
  //       storeType: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
  //       ],
  //       storeAdmin: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
  //       ],
  //       remark: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
  //       ],
  //     },
}
},
components: {
},
created(){
  this.getStoreList(this.requestData);
  this.getInsData();
},
methods: {
   // 获取所属机构列表
    getInsData() {
      const data = {};
      const self = this;
      (async data => {
        let res = await self.$api.getInsList({ data });
        if (res && res.code == 0) {
          self.$set(self.searchOptions[3], "options", res.data);
        }
      })(data);
    },
  search(data) {
    data.insId = data.insId&&data.insId.reverse()[0]
    this.currentPage = 1
    this.requestData.param = data
    this.getStoreList(this.requestData)
  },
  //新建仓库跳转
  addBtn(val) {
      this.$router.push({name:'addStore'});
  },
    //查看
  storeDetail (id) {
    this.$router.push({path:'detail', query:{id}})
  },
    //编辑
  //  storeEdit(id){
  //    this.dialogFormVisible = true;
  //    console.log(id)
  //  },
  //  changeForm(val) {
  //     Object.assign(this.params, val);
  //     console.log("派发出来的参数", this.params);
  // },
  //切换分页条数
  handleSizeChange(pageSize) {
      this.requestData.pageSize = pageSize
      this.getStoreList(this.requestData)
    },
  //点击分页
  handleCurrentChange(currentPage) {
      this.requestData.page = currentPage
      this.getStoreList(this.requestData)
  },
  getStoreList(data){
    let obj = {
      1 : '中彩仓库',
      2 : '省中心仓库',
      3 : '地市仓库',
      4 : '销售大厅'
    };
    (async (data)=>{
      let res = await this.$api.getStoreList({data})
      console.log(res)
      if (res && res.code == 0){
        this.tableData = res.data.records
        this.tableData.forEach((item)=>{
          item.warType = obj[item.warType]
        })
        this.totalCount = res.data.total
      }
    })(data)
  }
  
 },
}
</script>

<style lang="less" scoped>
</style>
