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
                :file-list="gameBagPath"
                :show-file-list="true"
                :on-remove="gameBagRemove"
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
                :on-remove="imgRemove"
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
              :on-remove="otherRemove"
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
        gameInfoVo: '',
        developerInfoVo: '',
        softwareInfoVo: '',
      },
      gameId: this.$route.query.gameId,
      imageUrl: '',
      gameBagPath: [], // 游戏包上传id
      imgPath: [], // 图标上传id
      gameOtherPath: [], // 附件上传id
      fileList: [],
      developerId: '',
      softwareId: '',
    }
  },
  created() {
    this.getGameStoreInfo()
  },
  methods:{
    // 游戏包上传
    async uploadFile(files) {
      let formData = new FormData();
      console.log('files', files.file.size/1024)
      this.softData[3].value = `${(files.file.size/1024).toFixed(1)}`
      formData.append('file', files.file);
      formData.append('refId', this.gameId);
      formData.append('flag', true);
      formData.append('busType', 9);
      const res = await this.$api.testUpload({
        data: formData,
        onUploadProgress(evt) {
          console.log('上传进度事件:', evt)
        }
      })
      console.log('uploadFile', res);
      if(res&&res.code==0) {
        this.$message.success('上传成功')
        this.gameBagPath.push(res.data.filePath);
      }
    },
    // 图标上传
    async uploadFileImg(files) {
      let formData = new FormData();
      formData.append('file', files.file);
      formData.append('refId', this.gameId); //业务关联id（游戏id，渠道id，试玩id 上市id 变更id）新增的时候 可不填 编辑 必填
      formData.append('flag', true); //是否修改文件 true 是 false否  必填
      formData.append('busType', 9); //业务类型 (1-游戏储备 2-游戏试玩 3-上市 4-变更 5-退市 6-物品类型 7-物品型号 8-) 必填
      const res = await this.$api.testUpload({
        data: formData,
        onUploadProgress(evt) {
          console.log('上传进度事件:', evt)
        }
      })
      console.log('uploadFile', res);
      if(res&&res.code==0) {
        this.imgPath.push(res.data.filePath);
        this.imageUrl = res.data.filePath;
      }
    },
    // 附件上传
    async uploadFileOther(files) {
      let formData = new FormData();
      console.log('files', files.file.size/1024)
      // this.softData[3].value = `${(files.file.size/1024).toFixed()}`
      formData.append('file', files.file);
      formData.append('refId', this.gameId);
      formData.append('flag', true);
      formData.append('busType', 9);
      const res = await this.$api.testUpload({
        data: formData,
        onUploadProgress(evt) {
          console.log('上传进度事件:', evt)
        }
      })
      if(res&&res.code==0) {
        this.$message.success('上传成功')
        this.gameOtherPath.push(res.data.filePath);
      }
    },
    gameBagRemove(file) {
      this.gameBagPath.forEach((item,index)=>{
        if(item.indexOf(file.name)>-1) {
          this.gameBagPath.splice(index, 1);
        }
      })
    },
    imgRemove(file) {
      this.imgPath.forEach((item,index)=>{
        if(item.indexOf(file.name)>-1) {
          this.imgPath.splice(index, 1);
        }
      })
    },
    otherRemove(file) {
      this.gameOtherPath.forEach((item,index)=>{
        if(item.indexOf(file.name)>-1) {
          this.gameOtherPath.splice(index, 1);
        }
      })
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
            self.developerId = res.data.developerInfo.id
          })
          self.softData.forEach((item)=>{
            item.value = res.data.softwareInfo[item.prop]
            self.softwareId = res.data.softwareInfo.id
          })
          let fileArray = res.data.gameInfoVo.filePath.split(',')
          this.imageUrl = fileArray[1];
          let array = []
          fileArray.forEach((item)=>{
            let obj = {};
            obj.name = item.split('/')[item.split('/').length-1];
            obj.url = item;
            array.push(obj)
          })
          this.gameBagPath = array.slice(0,1);
          this.imgPath = array.slice(1,1);
          this.gameOtherPath = array.slice(2);
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
          self.$message.success('提交成功')
          self.$router.push({path:'./gameList'})
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
      this.params.gameInfoVo.filePath = this.gameBagPath.concat(this.imgPath, this.gameOtherPath).join(',');
      console.log('提交的参数', this.params)
      this.params.gameInfoVo.id = this.gameId;
      this.params.developerInfoVo.id = this.developerId;
      this.params.softwareInfoVo.id = this.softwareId;
      this.$refs.baseForm.validate((val)=>{
        console.log(val)
        self.editGameStore(this.params)
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