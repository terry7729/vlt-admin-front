<template>
  <div class="vlt-card">
    <el-steps :active="active" align-center class="step-wrap">
      <el-step title="基础信息" icon="el-icon-edit"></el-step>
      <el-step title="游戏配置" icon="el-icon-setting"></el-step>
      <el-step title="上传附件" icon="el-icon-paperclip"></el-step>
    </el-steps>
    <div class="vlt-edit-single" v-show="active==0">
      <base-info @next="next"></base-info>
    </div>
    <div v-show="active==1">
      <game-set @next="next" @prev="prev" :planData="planData"></game-set>
    </div>
    <div class="vlt-edit-single appendix" v-show="active==2">
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
import BaseInfo from './gameChangePlanCreateBase'
import GameSet from './gameChangePlanCreateControl'

export default {
  name: "",
  components: {
    BaseInfo,
    GameSet,
  },
  data() {
    return {
      active: 0,
      rules: {},
      param: {},
      planData: {},
      listPlanId: '', // 计划id
      gameId:'',// 游戏id
    }
  },
  methods: {
    createChangePlan(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.createChangePlan({data})
				if(res && res.code == 0) {
          self.$message.success('提交成功')
          self.$router.push({path:'./gameChangePlanList'})
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    // 获取计划详情
    getMarketPlanDetail(data) {
      const self = this;
      (async (data)=>{
        let res = await self.$api.getMarketPlanDetail({data})
				if(res && res.code == 0) {
          // self.$message.success('注销成功')
          this.planData = res.data;
          // this.insId = res.data.gameListPlanVo.gameSaleArea.split(',');
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
      // this.$refs.main.scrollTop = 0;
      console.log('当前参数', val)
      this.param = Object.assign(this.param, val)
      if (this.active++ > 3) this.active = 0;
      if(val.gameChangePlanVo) {
        // this.listPlanId = val.gameChangePlanVo.listPlanId.value
        this.gameId = val.gameChangePlanVo.gameId
        // this.param.gameChangePlanVo.gameId = val.gameChangePlanVo..gameId
        const data = {
          id: 0,
          gameId: val.gameChangePlanVo.gameId
        };
        this.getMarketPlanDetail(data)
      }
    },
    submit() {
      console.log('提交的参数', this.param)
      let data = this.param;
      // data.gameChangePlanVo.listPlanId = this.listPlanId;
      // data.gameRuleVo.listPlanId = this.listPlanId;
      // data.gameBettingRuleVo.listPlanId = this.listPlanId;
      // data.gameFundRuleVo.listPlanId = this.listPlanId;
      // data.gameRiskRuleVo.listPlanId = this.listPlanId;
      data.gameChangePlanVo.gameId = this.gameId;
      data.gameRuleVo.gameId = this.gameId;
      data.gameBettingRuleVo.gameId = this.gameId;
      data.gameFundRuleVo.gameId = this.gameId;
      data.gameRiskRuleVo.gameId = this.gameId;
      // publishParams: this.publishParams,
      data.gameExchangeSetVoList.gameId = this.gameId;
      
      this.createChangePlan(data)
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
    },
    handleRemove() {},
  },
}
</script>

<style lang="less" scoped>
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
  .vlt-edit-wrap{
    width: 100%;
    margin: 30px auto;
  }
  .appendix{
    .vlt-edit-wrap{
      width: 850px;
      margin: 0 auto;
    }
    .vlt-edit-btn{
      .cancel{
        margin: 0 30px 0 130px;
      }
    }
  }
</style>
