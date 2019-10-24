<template>
  <div class="vlt-card bulletin-detail">
    <div class="vlt-edit-single">
      <div class="vlt-edit-wrap form-detail">
        <h3>基础信息</h3>
        <el-form label-width="90px" :model="form" ref="form">
          <base-form
            :formData="detailData"
            labelWidth="140px"
            ref="baseForm"
            :rules="rule1"
            direction="right"
            @change="changeForm"
          ></base-form>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      rule1: { rule: "" },
      form: {},
      detailData: [
        { type: "input", title: "公告名称", prop: "test" },
        {
          type: "select",
          title: "公告模板",
          prop: "template",
          options: [
            { label: "模板1", value: "0" },
            { label: "模板2", value: "1" }
          ]
        },
        {
          type: "datepicker-range",
          prop: "time",
          value: "",
          title: "公告周期",
          options: ["start", "end"]
        },
        {
          type: "select",
          title: "管理层级",
          prop: "tier",
          options: [
            { label: "全国", value: "2" },
            { label: "广东省", value: "3" }
          ]
        },
        {
          type: "select",
          title: "选择机构",
          prop: "organ",
          options: [
            { label: "中彩", value: "4" },
            { label: "广东福彩中心", value: "5" }
          ]
        },
        { type: "textarea", title: "公告对象", prop: "all" }
      ]
    };
  },
  components: {},
  methods: {
    changeForm() {}
  }
};
</script>

<style lang="less" scoped>
@import "./less/index";
</style>
