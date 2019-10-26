<template>
<div class="vlt-card ">
    <div class="tabs-content">
     <h3>基本信息管理</h3>
     <el-tabs tab-position="left" style="height: 800px;">
       <el-tab-pane label="类型管理">
        <search-bar class="search-bar-demo" @search="search" :options="typeInfoOptions" :total="typeTotalCount" labelWidth="80px"></search-bar>
        <control-bar :options="controlOptions" @select="addEquipment" position="left"></control-bar>
          <el-table :data="typeData" border style="width: 100%">
            <el-table-column prop="id" label="序号" type="index" width='80px'></el-table-column>
            <el-table-column prop="goodsType" label="物品类别"></el-table-column>
            <el-table-column prop="goodsName" label="物品名称"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <el-switch class="switchStyle" @change="changeState(scope.row.id,scope.row.status)" v-model="scope.row.status" active-color="#1890ff"
                  active-text="开" inactive-color="#c0c0c0" inactive-text="关" :active-value="1" :inactive-value='2'>
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="typeCheck(scope.row.id,scope.row.goodsType)" type="primary" v-prevent="2000" size="mini">查看</el-button>
                <el-button @click="typeAmend(scope.row.id)" type="primary" v-prevent="2000" size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <table-paging position="right" :total="typeTotalCount" :currentPage="typeCurrentPage" :pageSize="10" 
            @handleSizeChange="handleSizeChangeType" @handleCurrentChange="handleCurrentChangeType">
          </table-paging>
       </el-tab-pane>
       <el-tab-pane label="型号管理">
         <search-bar class="search-bar-demo" @search="search" :options="modelInfoOptions" :total="999" labelWidth="80px"></search-bar>
         <control-bar :options="controlOptions" @select="modelAdd" position="left"></control-bar>
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
                <el-button @click="modelCheck(scope.row.id)" type="primary" v-prevent="2000" size="mini">查看</el-button>
                <el-button @click="modelAmend(scope.row.id)" type="primary" v-prevent="2000" size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <table-paging position="right" :total="999" :currentPage="1" :pageSize="10" 
            @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
          </table-paging>
          <div class="vlt-edit-single">
            <el-dialog title="" :visible.sync="modelDialogFormVisible">
              <div class="vlt-edit-wrap">
                <el-form label-position="right" label-width="90px" :model="form" ref="form">
                  <base-form :formData="modelAmendData" labelWidth="140px" ref="baseForm" :rules="rules2" direction="right"
                  @change="modelChangeForm" ></base-form>
                  <el-form-item label="上传图片" class='upLoadImg'>
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      list-type="picture-card"
                      :data="upData"
                      :auto-upload="false"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :on-success="upFile"
                      :before-remove="beforeRemove"
                      :limit="3"
                      :on-exceed="handleExceed"
                      multiple
                      :file-list="fileList"
                      >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-form>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="modelDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
              </div>
            </el-dialog>
          </div>
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
   form:{},
   typeTotalCount:0,
   typeCurrentPage:1,
   
   typeDialogFormVisible: false,
   modelDialogFormVisible:false,
   dialogImageUrl: '',
   dialogVisible: false,
   params: {},
   typeInfoOptions:[
     {title:'物品类别',type:'select',prop:'goodsType',value:'',
     options:[{label:'设备',value:1},{label:'配件',value:2},{label:'耗材',value:3},{label:'设施',value:4}]},
     {title:'物品名称',type:'select',prop:'goodsId',value:'',options:[]},
     {title:'物品状态',type:'select',prop:'status',value:'',options:[{label:'开',value:1},{label:'关',value:2}]},
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
   typeData:[],
   modelData:[
     {id:1,goodsCategory:'设备',goodsName:'xxx',goodsModel:'xxx',state:''},
   ],

  modelAmendData:[
    {title:'物品类别',type:'select',prop:'goodsCategory',options:[{label:'设备',value:'1'},{label:'配件',value:'2'}]},
    {title:'设备名称',type:'select',prop:'equipmentName',options:[{label:'',value:''}]},
    {title:'设备型号',type:'input',prop:'equipmentModel', value:''},
    {title:'设备单价',type:'select',prop:'equipmentPrice',options:[{label:'',value:''},{label:'',value:''}]},
    {title:'供应商',type:'select',prop:'supplier',options:[{label:'',value:''},{label:'',value:''}]},
    {title:'预警上限',type:'input',prop:'upperLimit', value:''},
    {title:'预警下限',type:'input',prop:'lowerLimit', value:''},
    {title:'厂家信息',type:'input',prop:'factoryInfo', value:''},
    {title:'备注',type:'textarea',prop:'remark',value:''},
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
        isStandard: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        isRecycle: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        remark: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        equipmentPrice: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        upperLimit: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        lowerLimit: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
      },
    fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        // {
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // }
      ],
      requestData:{
        "page": 1,
        "pageSize": 10,
        "param": {
          "goodsId": 0,
          "goodsType": 0,
          "status": 0
        }
      },
      statusUpdate:{
        "id": "",
        "status": "",
        "updateBy": "",
        "updateTime": ""
      }
 }
 },
 components: {
 },
 computed:{
   // 这里定义上传文件时携带的参数，即表单数据
    upData: function() {
      return {
        body: this.form
      }
    }
 },
 created(){
   this.getTypeList(this.requestData)
   this.getSelectOption()
 },
 methods: {
   //类型管理
   //状态修改
   async changeState(id,state){
     console.log(id,state)
     let data = {
       "id":id,
       "status": state,
       "updateBy": "",
       "updateTime": ""
     }
     let res = await this.$api.statusUpdate({data})
     if(res.code == 0 ){
       this.$message({
         message:'状态修改成功',
         type:'success'
       })
     }
    },

   //获取类型管理列表
   async getTypeList(data){
     let obj= {
       1 :'设备',
       2 :'配件',
       3 :'耗材',
       4 :'设施'
     };
     let res = await this.$api.getGoosType({data})
     console.log(res)
     if(res && res.code == 0){
       this.typeData = res.data.records
       this.typeData.forEach(item=>{
         item.goodsType = obj[item.goodsType]
       })
       this.typeTotalCount = res.data.total
     }
   },
   //获取类型管理物品名称
   async getSelectOption(){
     let res =await this.$api.getModelTree({})
     if(res && res.code == 0){
        res.data.forEach(item =>{
        this.typeInfoOptions[1].options.push({label:item.goodsName,value:item.id})
       })
     }
   },
   //搜索
   search(data) {
    this.currentPage = 1
    this.requestData.param = Object.assign({
      page: this.currentPage,
      pageSize: 10,
      param: {}
    }, data)
    this.getTypeList(this.requestData)
  },
  //新增事件
  addEquipment(){
    this.$router.push({name:'addEquipment'})
  },
  //修改
  typeAmend(id){
    this.$router.push({
      name:'modification',
      query:{id}
    })
     console.log(id)
  },
  //设备查看
  typeCheck(id,goodsType){
    console.log(goodsType)
    switch(goodsType){
      case "设备":
        this.$router.push({
          path: 'equipmentCheck',
          query: {id}
        });
        break;
      case "设施":
        this.$router.push({
          path: 'facilityCheck',
          query: {id}
        });
        break;
      case "耗材":
        this.$router.push({
          path:'consumableCheck',
          query:{id}
        });
        break;
      case "配件":
        this.$router.push({
          path:'mountingsCheck',
          query:{id}
        });
        break;
    }
  },
  typeChangeForm(val) {
      Object.assign(this.params, val);
      console.log("派发出来的参数", this.params);
  },
  //类型管理分页
  handleCurrentChangeType(currentPage) {
    this.requestData.page = currentPage
    this.getTypeList(this.requestData)
  },
  handleSizeChangeType(pageSize) {
    this.requestData.pageSize = pageSize
    this.getTypeList(this.requestData)
  },
  //型号管理分页
  handleCurrentChange(currentPage){

  },
  handleSizeChange(pageSize){

  },
  //型号管理
  modelChangeForm(val) {
      Object.assign(this.params, val);
      console.log("派发出来的参数", this.params);
  },
  modelCheck(id){
    this.$router.push({name:'modelCheck',query:{id}})
  },
  //新增
  modelAdd(){
    this.$router.push({name:'modelAdd'})
  },
  //修改
  modelAmend(id){
    this.modelDialogFormVisible = true;
     console.log(id)
  },
  submit(form){
    this.modelDialogFormVisible = false
    // this.$refs[form].validate(async valid => {
    //     if (valid) {
    //     // 表单验证通过后使用组件自带的方法触发上传事件
    //       this.$refs.upload.submit()
    //     } else {
    //       return false;
    //     }
    //   });
  },
  // 成功上传文件
    upFile(res, file) {
      if (res.status == 200) {
        // 文件上传成功后的回调，比如一些提示信息或者页面跳转都写在这里
        this.$message.success(res.info);
      } else {
        this.$message.warning(res.info);
        let _this = this;
        setTimeout(function() {
          _this.$refs.upload.clearFiles();
        }, 1000);
      }
    },
    // 上传文件超出个数
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //  移除文件
    handleRemove(res, file, fileList) {
      this.$message.warning(`移除当前${res.name}证书，请重新选择证书上传！`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handlePreview(file) {
      console.log(file);  
    },
     handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
 }
}
</script>

<style lang="less">
h3{margin-bottom: 20px}
.tabs-content{
  .upLoadImg{
    .el-form-item__label{
      margin-left:52px;
    }
  }
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
