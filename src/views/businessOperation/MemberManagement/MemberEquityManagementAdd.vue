<template>
  <div class="vlt-card">
    <div class="MemberEquityAdd">
      <div class="vlt-edit-single">
        <base-form
          :formData="MemberEquityAddData"
          ref="baseForm"
          :rules="MemberEquityAddRules"
          direction="right"
          @change="MemberEquityAddChangeForm"
        ></base-form>
        <el-row class="vlt-edit-btn">
          <el-button
            type="primary"
            v-prevent="1000"
            size="medium"
            @click="MemberEquityAddSubmit(form)"
          >提交并保存</el-button>
          <el-button size="medium" @click="MemberEquityAddCancel">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "",
  data() {
    return {
      //新增表单验证
      MemberEquityAddRules: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        all: [{ required: true, validator: rules.checkEmail, trigger: "blur" }]
      },
      //新增表单类型
      MemberEquityAddData: [
        { type: "input", title: "权益名称", prop: "WriteName" },
        { type: "input", title: "权益编码", prop: "WriteNumber" },
        {
          type: "select",
          title: "操作等级",
          prop: "WriteGrade",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        {
          type: "select",
          title: "权益状态",
          prop: "WriteStatus",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        { type: "textarea", title: "权益描述", prop: "WriteDescribe" },
        {
          title: "创建时间",
          type: "datepicker",
          prop: "WriteCreateDate",
          value: ""
        },
        {
          title: "更新时间",
          type: "datepicker",
          prop: "WriteUpdateDate",
          value: ""
        }
      ]
    };
  },
  components: {},
  methods: {
    //新增表单change事件
    MemberEquityAddChangeForm() {},
    //新增表单提交
    MemberEquityAddSubmit() {},
    //新增表单取消
    MemberEquityAddCancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
