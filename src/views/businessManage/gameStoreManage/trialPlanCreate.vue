<template>
  <div class="vlt-card">
    <el-steps :active="active" align-center class="step-wrap">
      <el-step title="基础信息" icon="el-icon-edit"></el-step>
      <el-step title="游戏配置" icon="el-icon-setting"></el-step>
      <el-step title="问卷调查配置" icon="el-icon-tickets"></el-step>
      <el-step title="上传附件" icon="el-icon-paperclip"></el-step>
    </el-steps>
    <div class="vlt-edit-single" v-show="active==1">
      <base-info></base-info>
    </div>
    <!-- <div class="vlt-edit-single" v-show="active==2">
      <div class="vlt-edit-wrap">
        <el-form label-position="right" 
          label-width="90px" 
          ref="form"
          class="soft-form">
          <base-form :formData="softData" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        </el-form>
        <el-row class="vlt-edit-btn">
          <el-button size="medium" @click="prev" class="cancel">上一步</el-button>
          <el-button type="primary" v-prevent="1000" size="medium" @click="next">下一步</el-button>
        </el-row>
      </div>
    </div>
    <div class="vlt-edit-single" v-show="active==3">
      <div class="vlt-edit-wrap">
        <base-form :formData="appendixData" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        <el-row class="vlt-edit-btn">
          <el-button size="medium" @click="prev" class="cancel">上一步</el-button>
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提 交</el-button>
        </el-row>
      </div>
    </div>
    <div class="vlt-edit-single" v-show="active==4">
      <div class="vlt-edit-wrap">
        <base-form :formData="appendixData" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        <el-row class="vlt-edit-btn">
          <el-button size="medium" @click="prev" class="cancel">上一步</el-button>
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提 交</el-button>
        </el-row>
      </div>
    </div> -->
  </div>
</template>

<script type="text/javascript">
import BaseInfo from './trialPlanCreateBase'

export default {
  name: "",
  data() {
    return {
      appendixData: [
        {title: '其他附件', type: 'upload-drag',  prop: 'appendix', value: ''},
      ],
      active: 1,
      rules: {}
    }
  },
  components: {
    BaseInfo
  },
  methods: {
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
    text-align: center;
    margin: 60px 0 30px;
    .el-button{
      width: 120px;
    }
  }
</style>
