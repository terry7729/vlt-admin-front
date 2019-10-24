<template>
  <div class="vlt-card" ref="main">
    <el-steps :active="active" align-center class="step-wrap">
      <el-step title="基础信息" icon="el-icon-edit"></el-step>
      <el-step title="上传游戏包" icon="el-icon-upload"></el-step>
      <el-step title="上传附件" icon="el-icon-paperclip"></el-step>
    </el-steps>
    <div class="vlt-edit-single" v-show="active==0">
      <div class="vlt-edit-wrap">
        <base-form :formData="baseData" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        <el-row class="vlt-edit-btn">
          <el-button size="medium" @click="back" class="cancel">返 回</el-button>
          <el-button type="primary" v-prevent="1000" size="medium" @click="next">下一步</el-button>
        </el-row>
      </div>
    </div>
    <div class="vlt-edit-single" v-show="active==1">
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
        <el-row class="vlt-edit-btn">
          <el-button size="medium" @click="prev" class="cancel">上一步</el-button>
          <el-button type="primary" v-prevent="1000" size="medium" @click="next">下一步</el-button>
        </el-row>
      </div>
    </div>
    <div class="vlt-edit-single" v-show="active==2">
      <div class="vlt-edit-wrap">
        <base-form :formData="appendixData" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        <el-row class="vlt-edit-btn">
          <el-button size="medium" @click="prev" class="cancel">上一步</el-button>
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提 交</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from '@/utils/rules.js';

export default {
  name: "gameCreate",
  data() {
    return {
      form: {},
      baseData: [
        {title: '游戏名称', type: 'input',  prop: 'gameName', value: '游戏名称'},
        {title: '游戏类型', type: 'select',  prop: 'gameType', value: '', options:[{label: '概率型',value: '0'},{label: '奖组型',value: '1'},]},
        {title: '游戏奖池', type: 'select',  prop: 'jackpotType', value: '', options:[{label: '无奖池',value: '0'},{label: '单奖池',value: '1'},{label: '多奖池',value: '2'}]},
        {title: '游戏简介', type: 'textarea',  prop: 'gameDesc', value: '游戏简介'},
        {title: '版权归属', type: 'input',  prop: 'gameGenlot', value: '版权归属'},
        {title: '开发商名称', type: 'input',  prop: 'developerName', value: '开发商名称'},
        {title: '联系人', type: 'input',  prop: 'person', value: '小李'},
        {title: '手机号码', type: 'input',  prop: 'cellPhone', value: '1300000000'},
        {title: '电子邮箱', type: 'input',  prop: 'email', value: '1011@qq.com'},
        {title: '传真电话', type: 'input',  prop: 'faxPhone', value: '0797-342324'},
        {title: '联系地址', type: 'input',prop: 'address', value: '天安数码城'},
      ],
      softData: [
        {title: '软件名称', type: 'input',  prop: 'softwareName', value: '软件名称', placeholder:'apk填写软件包名'},
        {title: '版本名称', type: 'input',  prop: 'versionName', value: '版本名称', placeholder:'字符串版本（示例：V1.0.0）'},
        {title: '版本号', type: 'input',  prop: 'versionNumber', value: '版本号', placeholder:'版本整型（示例：100）'},
        {title: '软件大小', type: 'input',  prop: 'softwareSize', value: '1.2'},
        {title: '软件描述', type: 'textarea',  prop: 'softwareDesc', value: '描述'},
        {title: '新版特性', type: 'textarea',  prop: 'newFeatures', value: '新版特性'},
      ],
      appendixData: [
        {title: '其他附件', type: 'upload-drag',  prop: 'fileIds', value: '1,2'},
      ],
      rules: {
        test: [{ required: true, validator: rules.checkEmail, trigger: 'blur' }],
        status: [{ required: true, validator: rules.checkEmpty, trigger: 'blur' }],
        all: [{ required: true, validator: rules.checkEmail, trigger: 'blur' }]
      },
      active: 0,
      fileList: [],
      imageUrl: '',
      params: {}
    }
  },
  methods: {
    createGameStore(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.createGameStore({data})
				if(res && res.code == 0) {
         console.log(res)
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    beforeAvatarUpload() {},
    handleAvatarSuccess() {},
    handleExceed() {},
    beforeRemove() {},
    handleRemove() {},
    handlePreview() {},
    back() {
      this.$router.back()
    },
    prev() {
      this.$refs.main.scrollTop = 0;
      if (this.active-- < 1) this.active = 0;
    },
    next() {
      this.$refs.main.scrollTop = 0;
      if (this.active++ > 2) this.active = 0;
    },
    changeForm(val) {
      this.params =Object.assign(this.params, val)
      console.log('表单的参数', val)
    },
    submit(){
      const self = this;
      console.log('提交的参数', this.params)
      this.$refs.baseForm.validate((val)=>{
        console.log(val)
        self.createGameStore(this.params)
      });
    }
  },
}
</script>

<style lang="less" scoped>
.vlt-edit-wrap{
  width: 580px;
  margin: 30px auto;
}
.vlt-edit-btn{
  text-align: center;
  margin: 60px 0 30px;
  .el-button{
    width: 120px;
  }
  .cancel{
    margin: 0 50px 0 0px;
  }
}
</style>
