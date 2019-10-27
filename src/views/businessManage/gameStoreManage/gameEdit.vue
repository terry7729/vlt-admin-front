<template>
  <div class="vlt-card">
    <panel title="基本信息" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-single">
        <div class="vlt-edit-wrap">
          <base-form :formData="baseData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeBaseForm"></base-form>
          <base-form :formData="developData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeDevelopForm"></base-form>
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
                accept=".png,.jpg,jpeg"
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
        </div>
      </div>
    </panel>
    <panel title="其他附件" :show="false" style="margin-bottom:15px">
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
      <!-- <base-form :formData="appendixData" ref="baseForm" :rules="rules" direction="right" @change="changeForm" class="appendix-wrap"></base-form> -->
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
        {title: '游戏名称', type: 'input',  prop: 'gameName', value: ''},
        {title: '游戏编码', type: 'input',  prop: 'gameCode', value: ''},
        {title: '游戏类型', type: 'select',  prop: 'gameType', value: '', options:[{label: '概率型',value: 1},{label: '奖组型',value: 2},]},
        {title: '游戏奖池', type: 'select',  prop: 'jackpotType', value: '', options:[{label: '无奖池',value: 1},{label: '单奖池',value: 3},{label: '多奖池',value: 2}]},
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
      params: {
        fileIds: '',
        gameInfoVo: '',
        developerInfoVo: '',
        softwareInfoVo: '',
      },
      imageUrl: '',
      gameBagId: '', // 游戏包上传id
      imgId: '', // 图标上传id
      gameOtherId: '', // 附件上传id
      fileList: [],
    }
  },
  created() {
    this.getGameStoreInfo()
  },
  methods:{
    handleRemove() {

    },
    // 游戏包上传
    async uploadFile(files) {
      let formData = new FormData();
      console.log('files', files.file.size/1024)
      this.softData[3].value = `${(files.file.size/1024).toFixed(1)}`
      formData.append('file', files.file);
      formData.append('refId', 1);
      formData.append('flag', true);
      formData.append('busType', 9);
      const res = await this.$api.testUpload({
        data: formData,
        onUploadProgress(evt) {
          console.log('上传进度事件:', evt)
        }
      })
      console.log('uploadFile', res);
      this.gameBagId = res.data.fileId;
    },
    // 图标上传
    async uploadFileImg(files) {
      let formData = new FormData();
      formData.append('file', files.file);
      formData.append('refId', 1);
      formData.append('flag', true);
      formData.append('busType', 9);
      const res = await this.$api.testUpload({
        data: formData,
        onUploadProgress(evt) {
          console.log('上传进度事件:', evt)
        }
      })
      console.log('uploadFile', res);
      this.imgId = res.data.fileId;
      let imgUrl = res.data.filePath;
    },
    // 附件上传
    async uploadFileOther(files) {
      let formData = new FormData();
      console.log('files', files.file.size/1024)
      // this.softData[3].value = `${(files.file.size/1024).toFixed()}`
      formData.append('file', files.file);
      formData.append('refId', 1);
      formData.append('flag', true);
      formData.append('busType', 9);
      const res = await this.$api.testUpload({
        data: formData,
        onUploadProgress(evt) {
          console.log('上传进度事件:', evt)
        }
      })
      console.log('uploadFile', res);
      this.gameOtherId = res.data.fileId;
    },
    // 获取游戏详情
    getGameStoreInfo() {
      const self = this;
      const data = {
        id: this.$route.query.gameId
      };
      (async (data)=>{
				let res = await self.$api.getGameStoreInfo({data})
				if(res && res.code == 0) {
          // 基本信息
          self.baseData.forEach((item)=>{
            item.value = res.data.gameInfoVo[item.prop]
          })
          self.developData.forEach((item)=>{
            item.value = res.data.developerInfo[item.prop]
          })
          self.softData.forEach((item)=>{
            item.value = res.data.tSoftwareInfo[item.prop]
          })
          self.fileList = res.data.fileList
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    // 编辑游戏数据
    editGameStore(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.editGameStore({data})
				if(res && res.code == 0) {
          
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
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
      this.params.fileIds = `${this.gameBagId},${this.imgId},${this.gameOtherId}`;
      console.log('提交的参数', this.params)
      this.$refs.baseForm.validate((val)=>{
        console.log(val)
        self.createGameStore(this.params)
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
.soft-form{
  padding: 20px 10px;
}
</style>