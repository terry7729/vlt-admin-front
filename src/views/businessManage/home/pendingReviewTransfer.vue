<!-- 首页 - 概况 - 移交 -->
<template>
  <div class="vlt-card pading-review-transfer">
    <div class="vlt-edit-single">
      <h3 class="title">移交[中心出库]步骤</h3>
      <div class="vlt-edit-wrap">
        <base-form
          :formData="formDatas"
          labelWidth="140px"
          ref="baseForm"
          :rules="rule"
          direction="right"
          @change="changeForm"
        ></base-form>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" size="medium" @click="onSubmit" :loading="submitLoad">提交</el-button>
          <el-button size="medium">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import rules from "@/utils/rules.js";
export default {
  name: "pendingReviewTransfer",
  data() {
    return {
      submitLoad: false,
      form: {
        name: "",
        content: ""
      },
      params: {},
      formDatas: [
        {
          title: "步骤移交人",
          type: "input",
          prop: "name"
        },
        { type: "textarea", title: "填写处理意见：", prop: "all" }
      ],
      rule: {
        name: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }]
      }
    };
  },
  methods: {
    changeForm(val) {
      Object.assign(this.params, val);
      // console.log("change", this.params);
    },
    handleClose() {
      console.log("close");
    },
    close() {
      this.$router.back();
    },
    onSubmit() {
      this.submitLoad = true;
      console.log("formData", this.params);
      setTimeout(() => {
        this.submitLoad = false;
        this.close();
      }, 1000);
    }
  }
};
</script>

<style lang="less">
.pading-review-transfer {
  .el-row {
    margin-top: 40px;
  }
}
</style>