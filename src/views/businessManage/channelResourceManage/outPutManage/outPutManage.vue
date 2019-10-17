<template>
 <div class="vlt-card">
   <div class="tabs-content"> 
     <h3>出入库管理</h3>
     <el-tabs tab-position="left" style="height: 800px;">
       <!-- <search-bar class="search-bar-demo" @search="search" :options="outPutOptions" :total="999" labelWidth="80px"></search-bar>
       <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions" position="left"></control-bar>
       <control-bar :options="controlOptions" position="left" @select="selectBtn"></control-bar> -->

       <el-tab-pane label="入库管理">
        <search-bar class="search-bar-demo" @search="putSearch" :options="PutOptions" :total="999" labelWidth="80px"></search-bar>
        <control-bar :options="controlOptions" position="left" @select="putSelectBtn"></control-bar>
          <el-tabs v-model="putActiveName" @tab-click="puthandleClick" class="tables-content">
            <el-tab-pane label="待入库" name="stayPut">
              <el-table :data="stayPutData" border style="width: 100%">
                <el-table-column prop="id" label="序号" type="index"></el-table-column>
                <el-table-column prop="billCode" label="单据编号"></el-table-column>
                <el-table-column prop="applyTitle" label="申请标题"></el-table-column>
                <el-table-column prop="operationType" label="操作类型"></el-table-column>
                <el-table-column prop="applyTime" label="申请时间"></el-table-column>
                <el-table-column prop="applyPerson" label="申请人员"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="putStore(scope.row.id)" type="primary" v-prevent="2000" size="mini">入库</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <table-paging position="right" :total="999" :currentPage="1" :pageSize="10" 
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
                </table-paging>
            </el-tab-pane>
            <el-tab-pane label="已入库" name="alreadyPut">
              <el-table :data="alreadyPutData" border style="width: 100%">
                <el-table-column prop="id" label="序号" type="index"></el-table-column>
                <el-table-column prop="billCode" label="单据编号"></el-table-column>
                <el-table-column prop="applyTitle" label="申请标题"></el-table-column>
                <el-table-column prop="operationType" label="操作类型"></el-table-column>
                <el-table-column prop="putTime" label="入库时间"></el-table-column>
                <el-table-column prop="putPerson" label="入库人员"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="putDetail(scope.row.id)" type="primary" v-prevent="2000" size="mini">详情</el-button>
                    <!-- <el-dialog title="基本信息" :visible.sync="dialogFormVisible">
                      <div class="vlt-edit-single">
                        <base-form :formData="data2" labelWidth="140px" ref="baseForm" :rules="rules2" direction="right" @change="changeForm" ></base-form>
                      </div>
                      <div slot="footer" class="dialog-footer">
                          <el-button @click="dialogFormVisible = false">取 消</el-button>
                          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                      </div>
                    </el-dialog> -->
                  </template>
                </el-table-column>
              </el-table>
              <table-paging position="right" :total="999" :currentPage="1" :pageSize="10" 
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
              </table-paging>
            </el-tab-pane>
          </el-tabs>
       </el-tab-pane>
       <el-tab-pane label="出库管理">
        <search-bar class="search-bar-demo" @search="outSearch" :options="outOptions" :total="999" labelWidth="80px"></search-bar>
        <control-bar :options="controlOptions" position="left" @select="outSelectBtn"></control-bar>
         <el-tabs v-model="outActiveName" @tab-click="outhandleClick" class="tables-content">
            <el-tab-pane label="待出库" name="stayOut">
              <el-table :data="stayOutData" border style="width: 100%">
                <el-table-column prop="id" label="序号" type="index"></el-table-column>
                <el-table-column prop="billCode" label="单据编号"></el-table-column>
                <el-table-column prop="applyTitle" label="申请标题"></el-table-column>
                <el-table-column prop="operationType" label="操作类型"></el-table-column>
                <el-table-column prop="applyTime" label="申请时间"></el-table-column>
                <el-table-column prop="applyPerson" label="申请人员"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="outStore(scope.row.id)" type="primary" v-prevent="2000" size="mini">出库</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <table-paging position="right" :total="999" :currentPage="1" :pageSize="10" 
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
                </table-paging>
            </el-tab-pane>
            <el-tab-pane label="已出库" name="alreadyOut">
              <el-table :data="alreadyOutData" border style="width: 100%">
                <el-table-column prop="id" label="序号" type="index"></el-table-column>
                <el-table-column prop="billCode" label="单据编号"></el-table-column>
                <el-table-column prop="applyTitle" label="申请标题"></el-table-column>
                <el-table-column prop="operationType" label="操作类型"></el-table-column>
                <el-table-column prop="putTime" label="入库时间"></el-table-column>
                <el-table-column prop="putPerson" label="入库人员"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="outDetail(scope.row.id)" type="primary" v-prevent="2000" size="mini">详情</el-button>
                    <!-- <el-dialog title="基本信息" :visible.sync="dialogFormVisible">
                      <div class="vlt-edit-single">
                        <base-form :formData="data2" labelWidth="140px" ref="baseForm" :rules="rules2" direction="right" @change="changeForm" ></base-form>
                      </div>
                      <div slot="footer" class="dialog-footer">
                          <el-button @click="dialogFormVisible = false">取 消</el-button>
                          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                      </div>
                    </el-dialog> -->
                  </template>
                </el-table-column>
              </el-table>
              <table-paging position="right" :total="999" :currentPage="1" :pageSize="10" 
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
   total:400,
   currentPage:6,
   pageSize:20,

   putActiveName:'stayPut',
   outActiveName:'stayOut',
  //  dialogFormVisible: false,
   params: {},
   //入库
   PutOptions:[
     {title:'单据编号',type:'input',prop:'billCode',value:''},
     {title:'申请标题',type:'input',prop:'applyTitle',value:''}
   ],
   //出库
   outOptions:[
     {title:'单据编号',type:'input',prop:'billCode',value:''},
     {title:'申请标题',type:'input',prop:'applyTitle',value:''}
   ],
   controlOptions:[
      { name: "导出", type: "danger", icon: "download" },
      { name: "打印当前", type: "primary", icon: "printer" },
   ],
   stayPutData:[
     {id:1,billCode:'1188',applyTitle:'xxxxx',operationType:'采购入库',applyTime:'2019-03-15',applyPerson:'张三',remark:''}
   ],
  alreadyPutData:[
    {id:1,billCode:'1188',applyTitle:'xxxxx',operationType:'采购入库',putTime:'2019-03-15',putPerson:'张三',remark:''}
  ],
  stayOutData:[
    {}
  ],
  alreadyOutData:[
    {}
  ],
  // data2:[
  //   {title:'课程名称',type:'input',prop:'courseName',value:''},
  //   {title:'课程类型',type:'select',prop:'courseType',options:[{label:'福彩规章制度',value:'1'},{label:'福彩规章制度',value:'2'}]},
  //   {title:'课件类型',type:'input',prop:'coursewareName',options:[{label:'音频文件',value:'1'},{label:'视频文件',value:'2'}]},
  //   {title:'发布范围',type:'input',prop:'releaseRange',options:[{}]},
  //   {title:'培训课件',type:'input',prop:'trainCourseware',value:''},
  //   {title:'考试题目',type:'input',prop:'examQuestion',value:''},
  //   {title:'添加标签',type:'tag',prop:'examQuestion',value:''},
  //   {title:'课程简介',type:'textarea',prop:'courseBrief',value:''},
  // ],
  // rules2: {
  //       courseName: [
  //         { required: true, validator: rules.checkEmpty, trigger: "blur" }
  //       ],
  //       courseType: [
  //         { required: true, validator: rules.checkEmpty, trigger: "blur" }
  //       ],
  //       coursewareName: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
  //       ],
  //       releaseRange: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
  //       ],
  //       trainCourseware: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
  //       ],
  //       examQuestion: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
  //       ],
  //       examQuestion: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
  //       ]
  //     },
 }
 },
 components: {
 },
 methods: {
   puthandleClick(tab, event) {
      console.log(tab, event);
  },
   putSearch(form) {
    console.log("search", form);
  },
  putSelectBtn(val) {
      console.log(val);
    },
  putDetail(id){
    this.$router.push({name:'alreadyPutDetail',query:{id}})
    console.log(id)
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
  putStore(id){
    this.$router.push({
      name: 'putStore',
      query: {id}
    })
  },
  changeForm(val) {
      Object.assign(this.params, val);
      console.log("派发出来的参数", this.params);
  },
  //出库管理
 outSearch(form){
   console.log("search", form);
 },
 outSelectBtn(val){
   console.log(val)
 },
 outhandleClick(tab,event){
   console.log(tab,event)
 },
 //出库跳转
 outStore(id){
   this.$router.push({
      name: 'outStore',
      query: {id}
    })
 },
//  出库详情
 outDetail(id){
   this.$router.push({
      name: 'outStore',
      query: {id}
    })
 }
 },
 
  
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
