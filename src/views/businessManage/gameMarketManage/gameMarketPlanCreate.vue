<template>
  <div class="vlt-card">
    <el-steps :active="active" align-center class="step-wrap">
      <el-step title="基础信息" icon="el-icon-edit"></el-step>
      <el-step title="游戏配置" icon="el-icon-setting"></el-step>
      <el-step title="上传附件" icon="el-icon-paperclip"></el-step>
    </el-steps>
    <div class="vlt-edit-single" v-show="active==1">
      <base-info @next="next"></base-info>
    </div>
    <div v-show="active==2">
      <game-set @next="next" @prev="prev"></game-set>
    </div>
    <div class="vlt-edit-single appendix" v-show="active==3">
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
import BaseInfo from './gameMarketPlanCreateBase'
import GameSet from './gameMarketPlanCreateControl'

export default {
  name: "",
  components: {
    BaseInfo,
    GameSet,
  },
  data() {
    return {
      appendixData: [
        {title: '其他附件', type: 'upload-drag',  prop: 'appendix', value: ''},
      ],
      active: 1,
      rules: {},
      param: {},
      filesId: '',
    }
  },
  methods: {
     // 附件上传
    async uploadFileOther(files) {
      let formData = new FormData();
      console.log('files', files.file.size/1024)
      // this.softData[3].value = `${(files.file.size/1024).toFixed()}`
      formData.append('file', files.file);
      formData.append('refId', 1);
      formData.append('flag', true);
      formData.append('busType', 1);
      const res = await this.$api.testUpload({
        data: formData,
        onUploadProgress(evt) {
          console.log('上传进度事件:', evt)
        }
      })
      console.log('uploadFile', res);
      this.filesId = res.data.fileId;
    },
    createMarketPlan(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.createMarketPlan({data})
				if(res && res.code == 0) {
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    prev() {
      // this.$refs.main.scrollTop = 0;
      if (this.active-- < 1) this.active = 0;
    },
    next(val) {
      console.log('当前参数', val)
      this.param = Object.assign(this.param, val)
      
      // this.$refs.main.scrollTop = 0;
      if (this.active++ > 3) this.active = 0;
    },
    changeForm() {

    },
    submit() {
      console.log('提交的参数', this.param)
      let data = this.param;
      data.filesId = this.filesId;
      data.gameRuleVo.gameId = data.gameListPlanVo.gameId;
      data.gameBettingRuleVo.gameId = data.gameListPlanVo.gameId;
      data.gameFundRuleVo.gameId = data.gameListPlanVo.gameId;
      data.gameRiskRuleVo.gameId = data.gameListPlanVo.gameId;
      // publishParams: this.publishParams,
      data.gameExchangeSetVoList.gameId= data.gameListPlanVo.gameId;
      
      this.createMarketPlan(data)
    },
    handlePreview() {},
    handleRemove() {},
    beforeRemove() {},
    handleExceed() {},
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
  .step-wrap{
    padding: 30px 0 40px;
  }
  .vlt-edit-btn{
    text-align: right;
    margin: 60px 0 30px;
    .el-button{
      width: 120px;
    }
    .cancel{
      margin: 0 50px 0 180px;
    }
  }
  .appendix{
    .vlt-edit-wrap{
      max-width: 850px;
      margin: 30px auto;
    }
    .vlt-edit-btn{
      .cancel{
        margin: 0 30px 0 130px;
      }
    }
  }
</style>
