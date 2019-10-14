<template>
  <div class="vlt-card">
    <div class="externalpayadd">
      <div class="vlt-edit-single">
        <el-form
          label-position="right"
          label-width="90px"
          :model="externalpayform"
          ref="form"
          class="device-add"
        >
          <base-form
            :formData="externalpaydata"
            ref="baseForm"
            :rules="externalpayrules"
            direction="right"
            @change="externalpaychangeForm"
          ></base-form>
        </el-form>
        <el-row class="vlt-edit-btn">
          <el-button
            type="primary"
            v-prevent="1000"
            size="medium"
            @click="externalpaysubmit(form)"
          >提交并保存</el-button>
          <el-button size="medium" @click="externalpaycancel">取消</el-button>
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
      externalpayform: {},
      externalpaydata: [
        { type: "input", title: "账户名称", prop: "accountname" },
        {
          type: "select",
          title: "第三方支付平台",
          prop: "externalpay",
          options: [{ lable: "支付宝", value: "0" }]
        },
        {
          type: "select",
          title: "账户类型",
          prop: "accounttype",
          options: [{ lable: "对公账户", value: "0" }]
        },
        { type: "input", title: "法人代表", prop: "legalrepresentative" },
        {
          type: "select",
          title: "法人代表证件",
          prop: " legalrepresentativepaper",
          options: [{ lable: "对公账户", value: "0" }]
        },
        {
          type: "input",
          title: "法人代表证件号",
          prop: "legalrepresentativepapernum"
        },
        { type: "input", title: "手机号", prop: "telephone" },
        {
          type: "input",
          title: "营业执照注册号",
          prop: "businesslicenseregistrationnumber"
        }
      ],
      externalpayrules: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        all: [{ required: true, validator: rules.checkEmail, trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    externalpaysubmit() {},
    externalpaycancel() {},
    externalpaychangeForm() {}
  }
};
</script>

<style lang="less" scoped>
</style>
