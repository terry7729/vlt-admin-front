<template>
  <div class="vlt-card" ref="main">
    <el-steps :active="active" align-center class="step-wrap">
      <el-step title="基础信息" icon="el-icon-edit"></el-step>
      <el-step title="上传游戏包" icon="el-icon-upload"></el-step>
      <el-step title="上传附件" icon="el-icon-paperclip"></el-step>
    </el-steps>
    <div class="vlt-edit-single" v-show="active==0">
      <div class="vlt-edit-wrap">
        <base-form :formData="baseData" ref="baseForm" :rules="rules" direction="right" @change="changeBaseForm"></base-form>
        <base-form :formData="developData" ref="baseForm" :rules="rules" direction="right" @change="changeDevelopForm"></base-form>
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
              action=""
              :limit="1"
              :show-file-list="true"
              :on-remove="handleRemove"
              :http-request="uploadFile">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="游戏图标">
            <el-upload
              class="gameIcon-uploader"
              action=""
              :limit="1"
              accept=".png,.jpg,.jpeg"
              :show-file-list="false"
              :on-remove="handleRemove"
              :http-request="uploadFileImg">
              <img v-if="imageUrl" :src="imageUrl" class="gameIcon">
              <i v-else class="el-icon-plus gameIcon-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <base-form :formData="softData" ref="baseForm" :rules="rules" direction="right" @change="changeSoftForm"></base-form>
        </el-form>
        <el-row class="vlt-edit-btn">
          <el-button size="medium" @click="prev" class="cancel">上一步</el-button>
          <el-button type="primary" v-prevent="1000" size="medium" @click="next">下一步</el-button>
        </el-row>
      </div>
    </div>
    <div class="vlt-edit-single" v-show="active==2">
      <div class="vlt-edit-wrap">
        <el-form label-position="right" 
          label-width="90px" 
          ref="form"
          class="soft-form">
          <el-form-item label="上传附件">
            <el-upload
              class="upload-demo"
              drag
              multiple
              action=""
              :limit="10"
              :show-file-list="true"
              :on-remove="handleRemove"
              :http-request="uploadFileOther">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
        </el-form>
        <!-- <base-form :formData="appendixData" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form> -->
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
        {title: '游戏名称', type: 'input',  prop: 'gameName', value: ''},
        {title: '游戏编码', type: 'input',  prop: 'gameCode', value: ''},
        {title: '游戏类型', type: 'select',  prop: 'gameType', value: '', options:[{label: '概率型',value: 1},{label: '奖组型',value: 2},]},
        {title: '游戏奖池', type: 'select',  prop: 'jackpotType', value: '', options:[{label: '无奖池',value: 1},{label: '单奖池',value: 2},{label: '多奖池',value: 3}]},
        {title: '游戏简介', type: 'textarea',  prop: 'gameDesc', value: ''},
        {title: '版权归属', type: 'input',  prop: 'gameGenlot', value: ''},
      ],
      developData: [
        {title: '开发商名称', type: 'input',  prop: 'developerName', value: ''},
        {title: '联系人', type: 'input',  prop: 'person', value: ''},
        {title: '手机号码', type: 'input',  prop: 'cellPhone', value: ''},
        {title: '电子邮箱', type: 'input',  prop: 'email', value: ''},
        {title: '传真电话', type: 'input',  prop: 'faxPhone', value: ''},
        {title: '联系地址', type: 'input',prop: 'address', value: ''},
      ],
      softData: [
        {title: '软件名称', type: 'input',  prop: 'softwareName', value: '', placeholder:'apk填写软件包名'},
        {title: '版本名称', type: 'input',  prop: 'versionName', value: '', placeholder:'字符串版本（示例：V1.0.0）'},
        {title: '版本号', type: 'input',  prop: 'versionNumber', value: '', placeholder:'版本整型（示例：100）'},
        {title: '软件大小', type: 'input',  prop: 'softwareSize', value: '', disabled: true, placeholder: '单位（KB）'},
        {title: '软件描述', type: 'textarea',  prop: 'softwareDesc', value: ''},
        {title: '新版特性', type: 'textarea',  prop: 'newFeatures', value: ''},
      ],
      appendixData: [
        {title: '其他附件', type: 'upload-drag',  prop: 'fileIds', value: ''},
      ],
      rules: {
        test: [{ required: true, validator: rules.checkEmail, trigger: 'blur' }],
        status: [{ required: true, validator: rules.checkEmpty, trigger: 'blur' }],
        all: [{ required: true, validator: rules.checkEmail, trigger: 'blur' }]
      },
      active: 0,
      fileIds: [],
      gameBagId: [], // 游戏包上传id
      imgId: [], // 图标上传id
      gameOtherId: [], // 附件上传id
      imageUrl: '',
      params: {
        softwareInfoVo: '',
        developerInfoVo: '',
        gameInfoVo: {},
      }
    }
  },
  methods: {
    // 游戏包上传
    async uploadFile(files) {
      let formData = new FormData();
      console.log('files', files.file.size/1024)
      this.softData[3].value = `${(files.file.size/1024).toFixed(1)}`
      formData.append('file', files.file);
      const res = await this.$api.testUpload({
        data: formData,
        onUploadProgress(evt) {
          console.log('上传进度事件:', evt)
        }
      })
      console.log('uploadFile', res);
      this.gameBagId.push(res.data.filePath);
    },
    // 图标上传
    async uploadFileImg(files) {
      let formData = new FormData();
      formData.append('file', files.file);
      const res = await this.$api.testUpload({
        data: formData,
        onUploadProgress(evt) {
          console.log('上传进度事件:', evt)
        }
      })
      console.log('uploadFile', res);
      this.imgId.push(res.data.filePath);
      let imgUrl = res.data.filePath;
    },
    // 附件上传
    async uploadFileOther(files) {
      let formData = new FormData();
      console.log('files', files.file.size/1024)
      // this.softData[3].value = `${(files.file.size/1024).toFixed()}`
      formData.append('file', files.file);
      const res = await this.$api.testUpload({
        data: formData,
        onUploadProgress(evt) {
          console.log('上传进度事件:', evt)
        }
      })
      console.log('uploadFile', res);
      this.gameOtherId.push(res.data.filePath);
    },
    createGameStore(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.createGameStore({data})
				if(res && res.code == 0) {
          self.$message.success('提交成功')
          setTimeout(()=>{
            self.$router.push({path:'./gameList'})
          },700)
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
    changeDevelopForm(val) {
      this.params.developerInfoVo = val
      console.log('表单的参数', val)
    },
    changeBaseForm(val) {
      this.params.gameInfoVo = val
      console.log('表单的参数', val)
    },
    changeSoftForm(val) {
      this.params.softwareInfoVo = val
      console.log('表单的参数', val)
    },
    submit(){
      const self = this;
      this.params.gameInfoVo.filePath = this.gameBagId.concat(this.imgId,this.gameOtherId).join(',');
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
.el-upload__tip{
  margin-top: 0;
  line-height: 1;
}
</style>
