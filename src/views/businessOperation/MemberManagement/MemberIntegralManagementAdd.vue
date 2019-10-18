<template>
  <div class="vlt-card">
    <div class="MemberIntegraAdd">
      <div class="vlt-edit-single">
        <base-form
          :formData="MemberIntegraAddData"
          ref="baseForm"
          :rules="MemberIntegraAddRules"
          direction="right"
          @change="MemberIntegraAddChangeForm"
        ></base-form>
        <el-row class="vlt-edit-btn">
          <el-button
            type="primary"
            v-prevent="1000"
            size="medium"
            @click="MemberIntegraAddSubmit(form)"
          >提交并保存</el-button>
          <el-button size="medium" @click="MemberIntegraAddCancel">取消</el-button>
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
      MemberIntegraAddRules: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        all: [{ required: true, validator: rules.checkEmail, trigger: "blur" }]
      },
      //新增表单类型
      MemberIntegraAddData: [
        { type: "input", title: "规则名称", prop: "MemberIntegralName" },
        { type: "input", title: "额度", prop: "MemberIntegralLimit" },
        {
          type: "select",
          title: "积分类型",
          prop: "MemberIntegralType",
          options: [
            { label: "哈哈", value: "0" },
            { label: "哈哈", value: "1" }
          ]
        },
        { type: "input", title: "积分", prop: "MemberIntegralIntegral" },
        { type: "textarea", title: "规则描述", prop: "MemberIntegralDescribe" }
      ]
    };
  },
  components: {},
  methods: {
    //新增表单change事件
    MemberIntegraAddChangeForm() {},
    //新增表单提交
    MemberIntegraAddSubmit() {},
    //新增表单取消
    MemberIntegraAddCancel() {}
  }
};
</script>

<style lang="less" scoped>
</style>
