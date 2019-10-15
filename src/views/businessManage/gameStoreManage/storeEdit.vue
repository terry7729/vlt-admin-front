<template>
    <div class="vlt-card store-edit">
      <div class="vlt-edit-single">
        <h2 class="title">基础信息</h2>
        <div class="vlt-edit-wrap">
          <el-form label-position="right" label-width="90px" :model="form" ref="form">
            <base-form :formData="basicsInfo" ref="baseForm" :rules="rules1" direction="right" @change="changeForm"></base-form>
          </el-form>
        </div>
      </div>
      <div class="vlt-edit-single">
        <h2 class="title">上传游戏包</h2>
        <div class="vlt-edit-wrap">
          <el-form label-position="right" label-width="90px" :model="form" ref="form">
            <el-form-item label="上传游戏包：">
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
                  <el-button size="small" type="primary"><i class="el-icon-upload"></i>上传游戏包</el-button>
                  </el-upload>
            </el-form-item>
            <el-form-item label="上传游戏图标 ：">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <base-form :formData="uploading" ref="baseForm" :rules="rules1" direction="right" @change="changeForm"></base-form>
          </el-form>
          <el-row class="vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
            <el-button size="medium" @click="cancel">取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
</template>

<script>
import rules from '@/utils/rules.js';

export default {
    name:"storeEdit",
    data(){
        return{
            basicsInfo:[
              {type: 'input', title: '游戏名称', prop: 'name'},
              {type: 'select', title: '游戏类型', prop: 'type', option:[{label: '概率型',value: '0'},{label: '奖组型',value: '1'},]},
              {type: 'select', title: '游戏状态', prop: 'status', option:[{label: '储备',value: '0'},{label: '试玩',value: '1'},]},
              {type: 'textarea', title: '游戏简介', prop: 'desc'},
              {type: 'input', title: '开发商名称', prop: 'developersName'},
              {type: 'input', title: '联系人', prop: 'linkMan'},
              {type: 'input', title: '手机号码', prop: 'phoneNumber'},
              {type: 'input', title: '电子邮箱', prop: 'email'},
              {type: 'input', title: '传真电话', prop: 'faxaphone'},
              {type: 'cascader',prop: 'address',value: '', title: '联系地址',placehold:'请选择',
                options:[
                {value:"guangdong",label:'广东省',
                  children:[
                    {value:'shenzhen',label:'深圳市 ',
                      children:[{
                        value:'nanshna',label:'南山区'
                      }]
                    }
                  ]
                },
              ],
            },
            {type: 'input', title: '详细地址', prop: 'detailAddress'},
            ],
            uploading:[
              {type: 'input',title: '软件名称',prop:'softwareName'},
              {type: 'input',title: '版本名称',prop:'versionName'},
              {type: 'input',title: '软件号',prop:'versionNumber'},
              {type: 'input',title: '软件大小',prop:'softwareSize'},
              {type: 'input',title: '新版特性',prop:'newCharacter'}

            ],
            rules1: {
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
            form: {
                name: '',
                type: '',
                state:'',
                pond:'',
                desc: '',
                developersName:'',
                linkMan:'',
                phoneNumber:'',
                email:'',
                faxaphone:'',
                address:'',

                softwareName:'',
                versionName:'',
                versionNumber:'',
                softwareSize:'',
                softwareDesc:'',
                newCharacter:''
            },
            options:[
              {value:"guangdong",label:'广东省',
                children:[
                  {value:'shenzhen',label:'深圳市 ',
                    children:[{
                      value:'nanshna',label:'南山区'
                    }]
                  }
                ]
              },
            ],
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

      // 新增提示框
      // openConfirm() {
      //   this.$confirm(`确认新增渠道 "${this.form.channelName}"，新增渠道后请设置游戏信息！`, '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     this.save();
      //   }).catch(() => {
      //     // 取消         
      // });
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
      //保存
      // save(formName){
      //   const self = this;
      //   self.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       if (self.editData && !self.editData.isAdd) {
      //         self.save(self.editData.id);
      //       } else {
      //         self.openConfirm();
      //       }
      //     } else {
      //       return false;
      //     }
      //   });
      // }
      
    }
}
</script>

<style lang="less" scoped>
h3{
    border-bottom: 1px solid rgb(167, 164, 164);
    padding-bottom: 8px;
    margin: 10px 0 40px 30px;
}
.address{
  margin-top: 15px;
}
</style>