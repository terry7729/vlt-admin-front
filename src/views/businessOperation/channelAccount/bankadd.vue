<template>
  <div class="vlt-card">
    <div class="bankAdd">
      <div class="vlt-edit-single">
        <base-form
          :formData="bankAccount"
          ref="baseForm"
          :rules="rules2"
          direction="right"
          @change="changeForm"
        ></base-form>

        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
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
      bankAccount: [
        { type: "input", title: "户名全称", value: "", prop: "accountname" },
        {
          type: "input",
          title: "银行接口类型",
          value: "",
          prop: "bankinterfacetype"
        },
        { type: "input", title: "银行账号", value: "", prop: "bankaccount" },
        {
          type: "select",
          title: "账户类别",
          prop: "typeofaccount",
          value: "",
          options: [
            {
              label: "专用存款账户",
              value: "0"
            },
            {
              label: "专用存款账户2",
              value: "1"
            }
          ]
        },
        {
          type: "select",
          title: "账户属性",
          prop: "accountproperties",
          value: "",
          options: [
            {
              label: "对公账户",
              value: "0"
            },
            {
              label: "对公账户2",
              value: "1"
            }
          ]
        },
        { type: "input", title: "开户行", value: "", prop: "openingbank" },
        {
          type: "datepicker",
          title: "开户日期",
          value: "",
          prop: "openingdate"
        },
        { type: "input", title: "备注", value: "", prop: "remark" },
        { type: "input", title: "联系人", value: "", prop: "linkman" },
        {
          type: "input",
          title: "电话",
          value: "",
          value: "",
          prop: "telephone"
        },
        {
          type: "upload-drag",
          title: "开户许可证",
          prop: "openCard",
          value: ""
        }
      ],
      // 表单验证
      rules2: {
        accountname: [
          { required: true, message: "请输入户名全称", trigger: "blur" }
        ],
        bankinterfacetype: [
          { required: true, message: "请输入银行接口类型", trigger: "blur" }
        ],
        bankaccount: [
          { required: true, message: "请输入银行账号", trigger: "blur" }
        ],
        typeofaccount: [
          { required: true, message: "请输入账户类别", trigger: "blur" }
        ],
        accountproperties: [
          { required: true, message: "请输入账户属性", trigger: "blur" }
        ],
        openingbank: [
          { required: true, message: "请输入开户行", trigger: "blur" }
        ],
        openingdate: [
          { required: true, message: "请输入开户日期", trigger: "blur" }
        ],
        linkman: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        telephone: [{ required: true, message: "请输入电话", trigger: "blur" }]
      }
      // 点击提交和取消按钮
      // options: [
      //   { type: "primary", name: "提交并保存" },
      //   { type: "danger", name: "取消" }
      // ]
    };
  },
  components: {},
  methods: {
    //  表单change事件
    changeForm() {},
    // 提交并保存按钮
    submit() {
      let form = this.$refs.baseForm.form;
      console.log(form);
    },
    // 取消按钮
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
