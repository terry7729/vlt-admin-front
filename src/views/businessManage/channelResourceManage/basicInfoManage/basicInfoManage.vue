<template>
 <div class="vlt-card">
   <div class="tabs-content">
     <h3>基本信息管理</h3>
     <el-tabs tab-position="left" style="height: 800px;">
       <el-tab-pane label="类型管理">
        <search-bar class="search-bar-demo" @search="search" :options="typeInfoOptions" :total="999" labelWidth="80px"></search-bar>
        <control-bar :options="controlOptions" @select="addEquipment" position="left"></control-bar>
          <el-table :data="typeData" border style="width: 100%">
            <el-table-column prop="id" label="序号" type="index" width='80px'></el-table-column>
            <el-table-column prop="goodsCategory" label="物品类别"></el-table-column>
            <el-table-column prop="goodsName" label="物品名称"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="state" label="状态">
              <template slot-scope="scope">
                <el-switch class="switchStyle" @change="changeState($event,scope.row,scope.$index)" v-model="scope.row.state" active-color="#1890ff"
                  active-text="开" inactive-color="#c0c0c0" inactive-text="关" :active-value="1" :inactive-value='0'>
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="typeCheck(scope.row.id)" type="primary" v-prevent="2000" size="mini">查看</el-button>
                <el-button @click="infoAmend(scope.row.id)" type="primary" v-prevent="2000" size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <table-paging position="right" :total="999" :currentPage="1" :pageSize="10" 
            @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
          </table-paging>
          <div class="vlt-edit-single">
            <el-dialog title="基本信息" :visible.sync="dialogFormVisible">
              <base-form :formData="typeAmendData" labelWidth="140px" ref="baseForm" :rules="rules2" direction="right" @change="typeChangeForm" ></base-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
              </div>
            </el-dialog>
          </div>
       </el-tab-pane>
       <el-tab-pane label="型号管理">
         <search-bar class="search-bar-demo" @search="search" :options="modelInfoOptions" :total="999" labelWidth="80px"></search-bar>
         <control-bar :options="controlOptions" @select="addEquipment" position="left"></control-bar>
         <el-table :data="modelData" border style="width: 100%">
            <el-table-column prop="id" label="序号" type="index" width='80px'></el-table-column>
            <el-table-column prop="goodsCategory" label="物品类别"></el-table-column>
            <el-table-column prop="goodsName" label="物品名称"></el-table-column>
            <el-table-column prop="goodsModel" label="物品型号"></el-table-column>
            <el-table-column prop="state" label="状态">
              <template slot-scope="scope">
                <el-switch class="switchStyle" @change="changeState($event,scope.row,scope.$index)" v-model="scope.row.state" active-color="#1890ff"
                  active-text="开" inactive-color="#c0c0c0" inactive-text="关" :active-value="1" :inactive-value='0'>
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="typeCheck(scope.row.id)" type="primary" v-prevent="2000" size="mini">查看</el-button>
                <el-button @click="infoAmend(scope.row.id)" type="primary" v-prevent="2000" size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <table-paging position="right" :total="999" :currentPage="1" :pageSize="10" 
            @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
          </table-paging>
          <!-- <div class="vlt-edit-single">
            <el-dialog title="基本信息" :visible.sync="dialogFormVisible">
              <base-form :formData="modelAmendData" labelWidth="140px" ref="baseForm" :rules="rules2" direction="right" @change="modelChangeForm" ></base-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
              </div>
            </el-dialog>
          </div> -->
       </el-tab-pane>
     </el-tabs>
   </div>
 </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
 name: "basicInfoManage",
 data() {
 return {
   total:400,
   currentPage:6,
   pageSize:20,
   
   dialogFormVisible: false,
   params: {},
   typeInfoOptions:[
     {title:'物品类别',type:'select',prop:'goodsCategory',value:'',options:[{label:'设备',value:'sb'},{label:'设施',value:'ss'}]},
     {title:'物品名称',type:'select',prop:'goodsName',value:'',options:[{label:'xxx',value:'1'},{label:'xxxx',value:'2'}]},
     {title:'物品状态',type:'select',prop:'goodsStates',value:'',options:[{label:'开',value:'1'},{label:'关',value:'0'}]},
   ],
   modelInfoOptions:[
     {title:'物品类别',type:'select',prop:'goodsCategory',value:'',options:[{label:'设备',value:'sb'},{label:'设施',value:'ss'}]},
     {title:'物品名称',type:'select',prop:'goodsName',value:'',options:[{label:'xxx',value:'1'},{label:'xxxx',value:'2'}]},
     {title:'物品状态',type:'select',prop:'goodsStates',value:'',options:[{label:'开',value:'1'},{label:'关',value:'0'}]},
     {title:'物品型号',type:'select',prop:'goodsModel',value:'',options:[{label:'xxxx',value:'1'},{label:'xxxx',value:'0'}]},
   ],
   controlOptions:[
      { name: "新增", type: "primary", icon: "plus" }
   ],
   typeData:[
     {id:1,goodsCategory:'设备',goodsName:'xxx',remark:'',state:''},
   ],
   modelData:[
     {id:1,goodsCategory:'设备',goodsName:'xxx',goodsModel:'xxx',state:''},
   ],
   //修改
  typeAmendData:[
    {title:'物品类别',type:'select',prop:'goodsCategory',options:[{label:'设备',value:'sb'},{label:'设施',value:'ss'}]},
    {title:'设备名称',type:'input',prop:'equipmentName', value:''},
    {title:'设备单位',type:'input',prop:'equipmentUnit',options:[{label:'台',value:'0'},{label:'个',value:''}]},
    {title:'是否标配',type:'radio',prop:'isStandard',value:'',options:[{key:1,value:'是'},{key:2,value:'否'}]},
    {title:'是否回收',type:'radio',prop:'isRecycle',value:'',options:[{key:1,value:'是'},{key:2,value:'否'}]},
    {title:'备注',type:'textarea',prop:'remark',value:''},
  ],
  modelAmendData:[
    {}
  ],
  rules2: {
        goodsCategory: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        equipmentName: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        equipmentUnit: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        standard: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        recycle: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        remark: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
      },
 }
 },
 components: {
 },
 methods: {
   //类型管理
   //状态改变
   changeState($event,state,index){
     console.log(state)
   },
   
   search(form) {
    console.log("search", form);
  },
  //新增事件
  addEquipment(){
    this.$router.push({name:'addEquipment'})
  },
  //修改
  infoAmend(id){
    this.dialogFormVisible = true;
     console.log(id)
  },
  //查看
  typeCheck(id){
    this.$router.push({
      name: 'typeCheck',
      query: {id}
    })
  },
  typeChangeForm(val) {
      Object.assign(this.params, val);
      console.log("派发出来的参数", this.params);
  },
  //分页事件
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
  //型号管理
  modelChangeForm(val) {
      Object.assign(this.params, val);
      console.log("派发出来的参数", this.params);
  },

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
  .switchStyle .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
  }
  .switchStyle .el-switch__label--left {
    z-index: 9;
    left: 6px;
  }
  .switchStyle .el-switch__label--right {
    z-index: 9;
    left: -14px;
  }
  .switchStyle .el-switch__label.is-active {
    display: block;
  }
  .switchStyle.el-switch .el-switch__core,
  .el-switch .el-switch__label {
    width: 50px !important;
  }
}

</style>
