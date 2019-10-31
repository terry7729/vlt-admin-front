<template>
 <div class="vlt-card">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="0">
        <base-info @submit="submit" :planData="planData"></base-info>
      </el-tab-pane>
      <el-tab-pane label="游戏配置" name="1">
        <game-set @submit="submit" :planData="planData"></game-set>
      </el-tab-pane>
      <el-tab-pane label="上传附件" name="2">
        <div class="vlt-edit-single appendix">
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
              <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
              <el-button size="medium" @click="cancel" class="cancel">取 消</el-button>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
 </div>
</template>

<script type="text/javascript">
import BaseInfo from './gameChangePlanEditBase'
import GameSet from './gameChangePlanEditControl'
import rules from '@/utils/rules.js';

export default {
  name: "planEdit",
  components: {
    BaseInfo,
    GameSet,
  },
  data() {
  return {
    appendixData: [
      {title: '其他附件', type: 'upload-drag',  prop: 'appendix', value: ''},
    ],
    activeName: 0,
    rules: {
        name: [
          { required: true, validator: rules.checkEmpty, trigger: 'blur' }
        ],
        gameName: [
          { required: true, validator: rules.checkEmpty, trigger: 'blur' }
        ],
        all: [
          { required: true, validator: rules.checkEmail, trigger: 'blur' }
        ]
      },
    params: {},
    planData: {},
  }
  },
  created() {
    this.getChangePlanDetail()
  },
  methods: {
    editChangePlan(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.editChangePlan({data})
				if(res && res.code == 0) {
          self.$message.success('保存成功')
          //
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    // 获取计划详情
    getChangePlanDetail() {
      const self = this;
      // const data = {
      //   id: this.$route.query.id,
      //   gameId: this.$route.query.gameId,
      //   listPlanId: this.$route.query.listPlanId
      // };
      const data = this.$route.query;
      (async (data)=>{
        let res = await self.$api.getChangePlanDetail({data})
				if(res && res.code == 0) {
          // self.$message.success('注销成功')
          this.planData = res.data;
          // this.insId = res.data.gameListPlanVo.gameSaleArea.split(',');
          // self.getInsData();
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    // 附件上传
    async uploadFileOther(files) {
      let formData = new FormData();
      console.log('files', files.file.size/1024)
      // this.softData[3].value = `${(files.file.size/1024).toFixed()}`
      formData.append('file', files.file);
      // formData.append('refId', 1);
      // formData.append('flag', true);
      // formData.append('busType', 9);
      const res = await this.$api.testUpload({
        data: formData,
        onUploadProgress(evt) {
          console.log('上传进度事件:', evt)
        }
      })
      console.log('uploadFile', res);
      this.gameOtherId = res.data.fileId;
    },
    next(){
      this.active ++
    },
    back(){
      this.active --
    },
    cancel() {

    },
    handleClick() {

    },
    handleRemove() {

    },
    changeForm(val) {
      Object.assign(this.params, val)
      console.log('派发出来的参数', this.params)
    },
    //保存
    submit(param){
      const self = this;
      console.log('部分数据', param)
      console.log('总共的参数', this.planData)
      if(param.gameChangePlanVo) {
        Object.assign(this.planData.gameChangePlanVo, param.gameChangePlanVo)
      }else{
        Object.assign(this.planData.gameRuleVo, param.gameRuleVo)
        Object.assign(this.planData.gameBettingRuleVo, param.gameBettingRuleVo)
        Object.assign(this.planData.gameFundRuleVo, param.gameFundRuleVo)
        Object.assign(this.planData.gameRiskRuleVo, param.gameRiskRuleVo)
        // Object.assign(this.planData.publishParams, param.publishParams)
        Object.assign(this.planData.gameExchangeSetVoList, param.gameExchangeSetVoList)
      }
      self.editChangePlan(this.planData)
    },
  },
}
</script>

<style lang="less" scoped>
  .vlt-edit-btn{
    text-align: right;
    margin: 60px 0 30px;
  }
  .appendix{
    padding-top: 10px;
  }
</style>

