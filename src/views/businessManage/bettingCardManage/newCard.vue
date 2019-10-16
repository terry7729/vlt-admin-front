<template>
  <div class="vlt-card">
        <div class="vlt-edit-single">
      <h2 class="title">基本信息</h2>
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
          <el-button type="primary" v-prevent="1000" size="medium" @click="onSubmit">生成并导出</el-button>
          <el-button size="medium" @click="close">取 消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "CreateCard",
  data() {
    return {
      show: this.showForm,
      params: {},
      formDatas: [
        {
          title: "所属机构：",
          type: "address",
          prop: "address",
          value: ["130000", "130200", "130203"],
          address: ""
        },
        {
          type: "select",
          title: "投注卡类型：",
          prop: "status",
          options: [{ label: "类型1", value: "0" }, { label: "类型2", value: "1" }]
        },
        {
          type: "select",
          title: "发卡数量：",
          prop: "status2",
          options: [{ label: "1", value: "0" }, { label: "2", value: "1" }]
        },
        {
          type: "datepicker-range",
          prop: "date2",
          value: "",
          title: "有效日期：",
          options: ["start", "end"]
        },
        { type: "textarea", title: "备注", prop: "all" },
      ],
      rule: {
        address: [{required: true,trigger: "blur" }],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ]
      }
    };
  },
 components: {
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
      console.log("formData", this.params);
      this.close();
    }
 },
}
</script>

<style lang="less" scoped>
</style>
