<!-- 首页 - 概况 - 发布消息 -->
<template>
  <div class="vlt-card">
    <div class="vlt-edit-single">
      <h3 class="title">基本信息</h3>
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
          <el-button
            type="primary"
            v-prevent="1000"
            size="medium"
            @click="onSubmit"
            :loading="submitLoad"
          >发布</el-button>
          <el-button size="medium" @click="close">取 消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import rules from "@/utils/rules.js";
export default {
  name: "sendMessage",
  data() {
    return {
      submitLoad: false,
      params: {},
      formDatas: [
        {
          title: "标题",
          type: "input",
          prop: "name"
        },
        {
          type: "select",
          title: "收件人",
          prop: "status",
          options: [
            { label: "收件人1", value: "0" },
            { label: "收件人2", value: "1" }
          ]
        },
        { type: "textarea", title: "消息内容", prop: "all" }
      ],
      rule: {
        name: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ]
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

<style lang="less" scoped>
</style>