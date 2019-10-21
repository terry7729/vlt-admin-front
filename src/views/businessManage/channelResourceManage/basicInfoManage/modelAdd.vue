<template>
 <div class="vlt-card modelAdd-page">
   <div class="vlt-edit-single">
     <div class="vlt-edit-wrap">
       <span class="goods-cate">物品类别</span>
        <el-form class="goods">
          <el-form-item>
            <el-select v-model="selectValue" placeholder="请选择" @change="changeOption">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
       <el-form v-if="selectValue === 1" label-position="right" label-width="90px" :model="form1" ref="form1">
          <base-form :formData="equipmentData" labelWidth="140px" ref="baseForm1" :rules="rules2" direction="right"
          @change="changeForm" ></base-form>
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

       <el-form v-else label-position="right" label-width="90px" :model="form2" ref="form2">
         <base-form :formData="fittingsData" labelWidth="140px" ref="baseForm2" :rules="rules2" direction="right"
          @change="changeForm" ></base-form>
          <span class="goods-cate">可用机型</span>
         <el-form-item class="typeSelect">
           <el-select v-model="value" placeholder="请选择设备名称">
            <el-option
              v-for="(item,index) in nameOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择设备型号">
            <el-option
              v-for="(item,index) in modelOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
         </el-form-item>
       </el-form>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit('form')">提交并保存</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </el-row>
     </div>
   </div>
 </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
 name: "modelAdd",
 data() {
 return {
   selectValue:1,
   value:'',
   options:[
     {value:1,label:'设备'},
     {value:2,label:'配件'}
   ],
   //可用机型选择框
   nameOptions:[
     {label:'',value:'1'},
     {label:'',value:'2'},
   ],
   modelOptions:[
     {label:'',value:'3'},
     {label:'',value:'4'},
   ],
   params:'',
   form1:{},
   form2:{},
   dialogImageUrl: '',
   dialogVisible: false,
   equipmentData:[
    // {title:'物品类别',type:'select',prop:'goodsCategory',options:[{label:'',value:''},{label:'',value:''}]},
    {title:'设备名称',type:'select',prop:'equipmentName',options:[{label:'',value:''},{label:'',value:''}]},
    {title:'设备型号',type:'input',prop:'equipmentModel', value:''},
    {title:'设备单价',type:'select',prop:'equipmentPrice',options:[{label:'',value:''},{label:'',value:''}]},
    {title:'供应商',type:'select',prop:'supplier',options:[{label:'',value:''},{label:'',value:''}]},
    {title:'预警上限',type:'input',prop:'upperLimit', value:''},
    {title:'预警下限',type:'input',prop:'lowerLimit', value:''},
    {title:'厂家信息',type:'input',prop:'factoryInfo', value:''},
    {title:'备注',type:'textarea',prop:'remark',value:''},
   ],
   fittingsData:[
     {title:'配件名称',type:'select',prop:'fittingsName',options:[{label:'',value:''},{label:'',value:''}]},
     {title:'配件型号',type:'input',prop:'fittingsModel',value:''},
     {title:'配件单价',type:'select',prop:'fittingsPrice',options:[{label:'',value:''},{label:'',value:''}]},
     {title:'供应商',type:'select',prop:'supplier',options:[{label:'',value:''},{label:'',value:''}]},
   ],
   rules2: {
        goodsCategory: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        equipmentName: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
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
 methods: {
   changeForm(val) {
      Object.assign(this.params, val);
      console.log("派发出来的参数", this.params);
    },
    changeOption() {
      console.log(this.selectValue);
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    //  移除文件
    handleRemove(res, file, fileList) {
      this.$message.warning(`移除当前${res.name}证书，请重新选择证书上传！`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
    //提交保存
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
    cancel(){
     this.$router.back()
   },
 },
}
</script>

<style lang="less">
.modelAdd-page{
  .upLoadImg{
    .el-form-item__label{
      margin-left:52px;
    }
  }
  .goods {
    margin-left: 14px;
    display: inline-block;
  }
  span {
    font-size: 12px;
  }
  .goods-cate {
    margin-left: 78px;
    margin-top: 20px;
  }
  .typeSelect{
    margin-left: 52px;
    margin-top: -16px;
  }
}
</style>
