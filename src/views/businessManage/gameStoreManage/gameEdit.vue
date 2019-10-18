<template>
  <div class="vlt-card">
    <panel title="基本信息" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-single">
        <div class="vlt-edit-wrap">
          <base-form :formData="baseData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="上传游戏包" :show="false" style="margin-bottom:15px">
      <div class="vlt-edit-single">
        <div class="vlt-edit-wrap">
          <el-form label-position="right" 
            label-width="90px" 
            ref="form"
            class="soft-form">
            <el-form-item label="上传游戏包">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="游戏图标">
              <el-upload
                class="gameIcon-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="gameIcon">
                <i v-else class="el-icon-plus gameIcon-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <base-form :formData="softData" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
          </el-form>
        </div>
      </div>
    </panel>
    <panel title="其他附件" :show="false" style="margin-bottom:15px">
      <base-form :formData="appendixData" ref="baseForm" :rules="rules" direction="right" @change="changeForm" class="appendix-wrap"></base-form>
    </panel>
    <div class="submit-wrap">
      <el-row class="vlt-edit-btn">
        <el-button type="primary" size="medium" @click="submit">提交并保存</el-button>
        <el-button size="medium" @click="editShow = !editShow">取消</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import rules from '@/utils/rules.js';

export default {
  name:"gameEdit",
  data(){
    return{
      baseData: [
        {title: '游戏名称', type: 'input',  prop: 'name', value: ''},
        {title: '游戏类型', type: 'select',  prop: 'type', value: '', options:[{label: '概率型',value: '0'},{label: '奖组型',value: '1'},]},
        {title: '游戏奖池', type: 'select',  prop: 'status', value: '', options:[{label: '无奖池',value: '0'},{label: '单奖池',value: '1'},{label: '多奖池',value: '2'}]},
        {title: '游戏简介', type: 'textarea',  prop: 'desc', value: ''},
        {title: '版权归属', type: 'input',  prop: 'name', value: ''},
        {title: '开发商名称', type: 'select',  prop: 'developersName', value: '', options:[{label: '网易',value: '0'},{label: '腾讯',value: '1'},{label: '盛大',value: '2'}]},
        {title: '联系人', type: 'input',  prop: 'linkMan', value: ''},
        {title: '手机号码', type: 'input',  prop: 'phoneNumber', value: ''},
        {title: '电子邮箱', type: 'input',  prop: 'email', value: ''},
        {title: '传真电话', type: 'input',  prop: 'faxaphone', value: ''},
        {title: '联系地址', type: 'address',prop: 'address', value: ''},
      ],
      softData: [
        {title: '软件名称', type: 'input',  prop: 'name', value: '', placeholder:'apk填写软件包名'},
        {title: '版本名称', type: 'input',  prop: 'name', value: '', placeholder:'字符串版本（示例：V1.0.0）'},
        {title: '版本号', type: 'input',  prop: 'email', value: '', placeholder:'版本整型（示例：100）'},
        {title: '软件大小', type: 'input',  prop: 'phoneNumber', value: ''},
        {title: '软件描述', type: 'textarea',  prop: 'desc', value: ''},
        {title: '新版特性', type: 'textarea',  prop: 'desc', value: ''},
      ],
      appendixData: [
        {title: '附件上传', type: 'upload-drag',  prop: 'appendix', value: ''},
      ],
      rules: {
        name: [
          { required: true, validator: rules.checkEmpty, trigger: 'blur' }
        ],
        developersName: [
          { required: true, validator: rules.checkEmail, trigger: 'blur' }
        ],
        
        email: [
          { required: true, validator: rules.checkEmail, trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, validator: rules.checkPhone, trigger: 'blur' }
        ],
        linkMan: [
          { required: true, validator: rules.checkEmpty, trigger: 'blur' }
        ]
      },
      params: {},
      form: {},
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]

    }
  },
  methods:{
    onSubmit(){
        console.log(this.form)
    },
    //上传文件
    handlePreview(file) {
    console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    changeForm(val) {
      Object.assign(this.params, val)
      console.log('派发出来的参数', this.params)
    },
    submit(formName){
      const self = this;
      this.$refs.baseForm.validate((val)=>{
        console.log(val)
      });
    },
    cancel() {
      console.log('取消')
    },
  }
}
</script>

<style lang="less" scoped>
.appendix-wrap{
  padding: 16px;
}
.submit-wrap{
  text-align: right;
  padding: 10px 0;
}
</style>