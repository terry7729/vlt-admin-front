<template>
  <div class="vlt-card result-assess">
    <el-steps :active="activeStep" finish-status="success" simple style="margin-top: 20px">
      <el-step title="开始评估"></el-step>
      <el-step title="定性报告"></el-step>
      <el-step title="指标配置"></el-step>
    </el-steps>

    <div v-show="startAssess">
      <section class="comp-item">
        <div class="vlt-edit-single">
          <div class="vlt-edit-wrap">
            <el-form label-position="right" label-width="90px" :model="form" ref="form">
              <el-form-item label="活动编号">
                <el-input v-model="form.activeNum"></el-input>
              </el-form-item>
              <el-form-item label="报告名称">
                <el-input v-model="form.reportName"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </section>
      <el-button type="primary" size="small" class="start-assess" @click="assess">开始评估</el-button>
    </div>

    <div class="report-type" v-show="reportType">
      <div class="upload-file">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
        >
          <span>上传定性总结报告：</span>
          <el-button size="small" type="primary">
            <i class="el-icon-upload2"></i>上传文件
          </el-button>
          <div slot="tip" class="upload-tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
        </el-upload>
      </div>
      <el-button size="small" @click="prevStep">上一步</el-button>
      <el-button type="primary" size="small" @click="nextStep">下一步</el-button>
    </div>

    <div class="index-config" v-show="indexConfig">
      <section class="comp-item">
        <div class="check-index">
          <span>维度选择：</span>
          <el-checkbox :checked="checked" v-for="item in checkList" :key="item">{{item}}</el-checkbox>
        </div>
        <div class="check-index">
          <span>定量指标：</span>
          <div class="check">
            <el-checkbox :checked="checked" v-for="item in checkList2" :key="item">{{item}}</el-checkbox>
          </div>
        </div>
      </section>
      <div class="btn-box">
        <el-button size="small" @click="prevBack">上一步</el-button>
        <el-button type="primary" size="small" @click="createReport">生成报告</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      form: {
        activeNum: "",
        reportName: ""
      },
      startAssess: true,
      reportType: false,
      indexConfig: false,
      activeStep: "",
      checked: true,
      checkList: ["中心", "省级", "市级", "厅级", "渠道", "大厅", "游戏终端"],
      checkList2: [
        "充值总额",
        "充值总订单数",
        "投注总额",
        "投注总订单数",
        "提现总额",
        "活动预算使用分类汇总",
        "用户数",
        "充值用户数",
        "投注用户数",
        "提现用户数",
        "每用户充值额",
        "每用户投注额",
        "充值总额",
        "充值总订单数",
        "投注总额",
        "投注总订单数",
        "提现总额",
        "活动预算使用分类汇总",
        "用户数",
        "充值用户数",
        "投注用户数",
        "提现用户数",
        "每用户充值额",
        "每用户投注额"
      ]
    };
  },
  components: {},
  methods: {
    assess() {
      this.activeStep = 1;
      this.startAssess = false;
      this.reportType = true;
    },
    prevStep() {
      this.activeStep = 1;
      this.startAssess = true;
      this.reportType = false;
    },
    nextStep() {
      this.activeStep = 2;
      this.reportType = false;
      this.indexConfig = true;
    },
    prevBack() {
      this.activeStep = 2;
      this.reportType = true;
      this.indexConfig = false;
    },
    createReport() {
      this.activeStep = 3;
    },
    beforeRemove() {},
    handleExceed() {},
    handlePreview() {},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    }
  }
};
</script>

<style lang="less" scoped>
.result-assess {
  .start-assess {
    margin-left: 500px;
  }
  .report-type {
    margin: 50px 150px;
    .upload-tip {
      margin: 10px 0 100px 124px;
      color: #aaa;
    }
  }
  .index-config {
    width: 900px;
    .comp-item {
      padding: 75px;
      .check {
        margin-left: 70px;
        margin-top: -15px;
      }
    }
    .check-index {
      margin-bottom: 20px;
    }
    .btn-box {
      margin-left: 300px;
      margin-top: -20px;
    }
  }
}
</style>
