<template>
 <div class="vlt-card">
   <div class="content-block">
     <search-bar class="search-bar-demo" @search="search" :options="searchOptions" :total="totalCount" labelWidth="80px"></search-bar>
     <control-bar slot="extend-bar" @select="addBtn" :options="controlOptions" position="left"></control-bar>
     <el-table :data="tableData" border>
        <el-table-column fixed label="序号" type="index" width="90px"></el-table-column>
        <el-table-column label="仓库名称" prop="nameX" min-width="120px"></el-table-column>
        <el-table-column label="所属机构" prop="organName"></el-table-column>
        <el-table-column label="仓库类型" prop="typeX"></el-table-column>
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
     {title:'仓库名称',type:'input',prop:'nameX',value:''},
     {title:'仓库类型',type:'select',prop:'typeX',value:'',options:[{label:'中彩仓库',value:1},{label:'省中心仓库',value:2},
     {label:'城市仓库',value:3},{label:'销售大厅',value:4}]},
     {title:'仓库管理员',type:'select',prop:'adminName',value:'',options:[{label:'张三',value:14},{label:'花花q',value:4}]},
     {title:'所属机构',type:'select',prop:'organId',value:'',options:[{label:'上海',value:10},{label:'大鹏',value:2}]},
   ],
   controlOptions:[{ name: "新建仓库", type: "primary", icon: "plus" }],
   tableData:[],
   requestData:{
      page: 1,
      pageSize: 10,//每页显示数据调试
      param: {
        "nameX": "",
        "typeX": "",
        "adminName": '',
        "organId":''
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
   this.getStoreList(this.requestData)
 },
 methods: {
   search(data) {
     this.currentPage = 1
    this.requestData.param = Object.assign({
      page:this.currentPage,
      pageSize:10,
      param:{}
    }, data)
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
      3 : '地方仓库',
      4 : '销售大厅'
    };
    (async (data)=>{
      let res = await this.$api.getStoreList({data})
      console.log(res)
      if (res && res.code == 0){
        this.tableData = res.data.records
        this.tableData.forEach((item)=>{
          item.typeX = obj[item.typeX]
        })
        // console.log(this.tableData)
        this.totalCount = res.data.total
      }
    })(data)
  }
  
 },
}
</script>

<style lang="less" scoped>
</style>
