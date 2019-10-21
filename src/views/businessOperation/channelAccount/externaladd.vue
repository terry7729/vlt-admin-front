<template>
  <div class="vlt-card">
    <div class="externalpayadd">
      <div class="vlt-edit-single">
        <base-form
          :formData="externalpaydata"
          ref="baseForm"
          :rules="externalpayrules"
          direction="right"
          @change="externalpaychangeForm"
        ></base-form>

        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="externalpaysubmit">提交并保存</el-button>
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
      // 表单类型
      externalpaydata: [
        { type: "input", title: "账户名称", prop: "accountname" },
        {
          type: "select",
          title: "第三方支付平台",
          prop: "externalpay",
          options: [
            { lable: "支付宝", value: "0" },
            { lable: "支付宝", value: "1" }
          ]
        },
        {
          type: "select",
          title: "账户类型",
          prop: "accounttype",
          options: [
            { lable: "对公账户", value: "0" },
            { lable: "支付宝", value: "1" }
          ]
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
          prop: "registrationnumber"
        }
      ],
      //表单验证
      externalpayrules: {
        accountname: [
          { required: true, message: "请输入帐户名称", trigger: "blur" }
        ],
        externalpay: [
          { required: true, message: "请选择第三方支付平台", trigger: "change" }
        ],
        accounttype: [
          { required: true, message: "请选择账户类型", trigger: "change" }
        ],
        legalrepresentative: [
          { required: true, message: "请输入法人代表", trigger: "blur" }
        ],
        legalrepresentativepaper: [
          { required: true, message: "请输入法人代表证件", trigger: "change" }
        ],
        legalrepresentativepapernum: [
          { required: true, message: "请输入法人代表证件号", trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        registrationnumber: [
          { required: true, message: "请输入营业执照注册号", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  methods: {
    //提交按钮
    externalpaysubmit() {
      let form = this.$refs.baseForm.form;
      console.log(form);
    },
    externalpaycancel() {},
    externalpaychangeForm() {}
  }
};
</script>

<style lang="less" scoped>
</style>
