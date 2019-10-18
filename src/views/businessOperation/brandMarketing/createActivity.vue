<template>
  <div class="vlt-card create-active">
    <el-steps :active="activeStep" finish-status="success" simple style="margin-top: 20px">
      <el-step title="模板选择"></el-step>
      <el-step title="模板预览"></el-step>
      <el-step title="创建计划"></el-step>
    </el-steps>

    <preview-template v-show="stepOne">
      <template v-slot:header>
        <h3>模板选择</h3>
        <el-select v-model="value" size="small" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>

      <template v-slot:footer-btn>
        <div class="footer-btn">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button type="primary" size="small" @click="nextStep">下一步</el-button>
        </div>
      </template>
    </preview-template>

    <preview-template v-show="stepTwo">
      <template v-slot:header>
        <div class="header-box">
          <h3>模板预览</h3>
        </div>
      </template>
      <template v-slot:footer-btn>
        <div class="footer-btn">
          <el-button size="small" @click="prevStep">上一步</el-button>
          <el-button type="primary" size="small" @click="nextStep">使用模板</el-button>
        </div>
      </template>
    </preview-template>
  </div>
</template>

<script type="text/javascript">
import previewTemplate from "./previewTemplate";
export default {
  name: "",
  data() {
    return {
      activeStep: 1,
      value: "",
      stepOne: true,
      stepTwo: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      options: [
        {
          value: "选项1",
          label: "模板1"
        },
        {
          value: "选项2",
          label: "模板2"
        },
        {
          value: "选项3",
          label: "模板3"
        }
      ]
    };
  },
  components: {
    previewTemplate
  },
  methods: {
    cancel() {
      this.$router.push({ path: "planManage" });
    },
    prevStep() {
      const that = this;
      that.$el.parentNode.parentNode.scrollTop = 0;
      if (that.activeStep === 2) {
        that.stepTwo = false;
        that.stepOne = true;
        that.activeStep = 1;
      } else {
        that.$router.push({ path: "planManage" });
      }
    },

    nextStep() {
      const that = this;
      that.stepOne = false;
      that.$el.parentNode.parentNode.scrollTop = 0;
      if (that.activeStep === 1) {
        that.stepTwo = true;
        that.activeStep = 2;
      } else if (that.activeStep === 2) {
        that.stepTwo = false;

        that.activeStep = 3;
        that.$router.push({ path: "activityPlan" });
      } else {
        that.activeStep = 3;
      }
    },
    handleClick() {}
  }
};
</script>

<style lang="less" scoped>
.footer-btn {
  width: 200px;
  margin-left: 60%;
  margin-bottom: 20px;
}
.process-content {
  margin-left: 100px;

  .state-inform {
    text-align: right;
    height: 20px;
    margin-top: 10px;
    margin-right: 33%;
  }
  .process-form {
    margin-left: 80px;
    width: 550px;
    background: #eee;
  }
}
</style>
