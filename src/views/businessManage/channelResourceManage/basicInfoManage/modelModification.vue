<template>
<!-- 型号管理修改页面 -->
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
          <base-form :formData="equipmentData" labelWidth="140px" ref="baseForm" :rules="rules2" direction="right"
          @change="changeForm" ></base-form>
          <el-form-item label="上传图片" class='upLoadImg'>
            <el-upload
              class="gameIcon-uploader"
              action=""
              :limit="3"
              accept=".png,.jpg,.jpeg"
              :show-file-list="false"
              :on-remove="handleRemove"
              :http-request="uploadFileImg">
              <img v-if="imageUrl" :src="imageUrl" class="gameIcon">
              <i v-else class="el-icon-plus gameIcon-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过500kb</div>
            </el-upload>
            <!-- <el-upload
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
            </el-dialog> -->
          </el-form-item>
      </el-form>

      <el-form v-else label-position="right" label-width="90px" :model="form2" ref="form2">
        <base-form :formData="mountingsData" labelWidth="140px" ref="baseForm" :rules="rules2" direction="right"
          @change="changeForm" >
        </base-form>
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
name: "modelModification",
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
    {title:'设备名称',type:'select',prop:'goodsName',options:[{label:'',value:''},{label:'',value:''}]},
    {title:'设备型号',type:'input',prop:'deviceModel', value:''},
    {title:'设备单价',type:'input',prop:'unitPrice',value:''},
    {title:'供应商',type:'select',prop:'providerId',options:[{label:'',value:''},{label:'',value:''}]},
    {title:'预警上限',type:'input',prop:'upperLimit', value:''},
    {title:'预警下限',type:'input',prop:'lowerLimit', value:''},
    {title:'厂家信息',type:'input',prop:'manufactorInfo', value:''},
    {title:'备注',type:'textarea',prop:'remark',value:''},
  ],
  mountingsData:[
    {title:'配件名称',type:'select',prop:'fittingsName',options:[{label:'',value:''},{label:'',value:''}]},
    {title:'配件型号',type:'input',prop:'fittingsModel',value:''},
    {title:'配件单价',type:'input',prop:'fittingsPrice',value:''},
    {title:'供应商',type:'select',prop:'supplier',options:[{label:'',value:''},{label:'',value:''}]},
  ],
  rules2: {
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
    ],
    imageUrl: '',
    imgUrl: '',
 }
 },
 components: {
 },
 computed:{
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

      },
    //  移除文件
    handleRemove(res, file, fileList) {

    },
    beforeRemove(file, fileList) {
;
    },
    // 图标上传
    async uploadFileImg(files) {
      let formData = new FormData();
      formData.append('file', files.file);
      // formData.append('refId', '');
      // formData.append('flag', true);
      // formData.append('busType', 6);
      const res = await this.$api.uploadGoodsType({
        data: formData,
        onUploadProgress(evt) {
          console.log('上传进度事件:', evt)
        }
      })
      console.log('uploadFile', res);
      
      this.imgUrl = res.data.filePath;
    },

    // 上传文件超出个数
    handleExceed(files, fileList) {
      
    },
    //提交保存
    submit(form){
      this.$refs['baseForm'].validate(async valid=>{
        if(valid === 'true') {
          let data = this.params;
          data.files = this.imgUrl.join(',');
          let res = await this.$api.modelCreate({data})
          console.log(res)
          if(res || res.code == 0){
            this.$message({
              message:'新增成功',
              type:'success'
            })
            this.$router.push({path: 'basicInfoManage'})
          }
        }
      })
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
