<template>
  <div class="vlt-card create-active">
    <el-steps :active="activeStep"  class="step-bar">
      <el-step title="模板选择" icon="el-icon-check"></el-step>
      <el-step title="模板预览" icon="el-icon-tickets"></el-step>
      <el-step title="创建计划"  icon="el-icon-edit"></el-step>
    </el-steps>

    <preview-template v-show="activeStep===1">
      <template v-slot:header>
        <div class="template-check">
          <span>模板选择</span>
          <el-select v-model="value" size="small" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </template>

      <template v-slot:footer-btn>
        <div class="footer-btn">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button type="primary" size="small" @click="nextStep">下一步</el-button>
        </div>
      </template>
    </preview-template>

    <preview-template v-show="activeStep===2">
      <template v-slot:header>
        <div class="template-preview">
          <span>模板预览</span>
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
import previewTemplate from "../planTemplate/previewTemplate";
export default {
  name: "",
  data() {
    return {
      activeStep: 1,
      value: "",
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
        that.activeStep = 1;
      } else {
        that.$router.push({ path: "planManage" });
      }
    },

    nextStep() {
      const that = this;
      that.$el.parentNode.parentNode.scrollTop = 0;
      if (that.activeStep === 1) {
        that.activeStep = 2;
      } else {
        that.$router.push({ path: "activityPlan" });
      }
    },
    handleClick() {}
  }
};
</script>

<style lang="less" scoped>
.create-active {
  .step-bar{
    width: 80%;
    margin: 10px auto;
  }
  .template-check {
    margin-left: 36px;
    margin-bottom: 10px;
    span {
      font-size: 18px;
      font-weight: 800;
    }
    .el-select {
      left: 20px;
    }
  }
  .template-preview {
    margin-left: 36px;
    margin-bottom: 10px;
    span {
      font-size: 18px;
      font-weight: 800;
    }
  }
  
  .footer-btn {
    width: 200px;
    margin-left: 60%;
    margin-bottom: 20px;
  }
}

</style>
