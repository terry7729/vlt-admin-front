<template>
  <div class="vlt-card allot-task">
    <div class="vlt-edit-double">
      <div class="vlt-edit-wrap">
        <el-form label-position="top" label-width="90px" :model="allotForm" ref="allotForm">
          <base-form
            :formData="allotData"
            labelWidth="140px"
            :rules="rules1"
            direction="top"
            @change="changeForm"
          ></base-form>
        </el-form>
        <el-row class="el-form-item vlt-edit-btn">
          <el-button type="primary"  size="medium" @click="submit">提交并保存</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      rules1: { rule: "" },
      allotData: [
        {
          type: "select",
          title: "活动编号",
          prop: "activeNum",
          options: [
            { label: "007", value: "007" },
            { label: "008", value: "008" }
          ]
        },
        {
          type: "select",
          title: "执行编号",
          prop: "execuNum",
          options: [
            { label: "101", value: "101" },
            { label: "102", value: "102" }
          ]
        },
        {
          type: "select",
          title: "执行人",
          prop: "person",
          options: [
            { label: "王二", value: "王二" },
            { label: "赵二", value: "赵二" }
          ]
        },

        { title: "任务名", type: "input", prop: "name", value: "" },
        { title: "任务描述", type: "input", prop: "describe", value: "" },
        {
          title: "",
          type: "",
          prop: "",
          value: ""
        },
        {
          title: "生效时间",
          type: "datetime",
          prop: "startTime",
          value: ""
        },
        {
          title: "截止时间",
          type: "datetime",
          prop: "endTime",
          value: ""
        }
      ],
      allotForm: {}
    };
  },
  methods: {
    submit() {
      console.log(this.allotForm);
      this.$router.push({ path: "executionManage" });
    },
    cancel() {
      this.$router.go(-1);
    },
    changeForm(val) {
      this.allotForm = val;
    }
  }
};
</script>

<style lang="less" scoped >
</style>
