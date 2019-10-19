<template>
  <div class="vlt-card">
    <div class="bankbalance">
      <base-Info :infoList="accountData"></base-Info>
      <div :data="bookbalance" style="margin-left:20px">
        账面余额:人民币元
        <span></span>
      </div>
      <controlBar :options="gobackbtn" @select="goback" position="left"></controlBar>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      bookbalance: "",
      accountData: [
        { title: "账户名称", value: "", prop: "accountname" },
        { title: "账户类别", value: "", prop: "accounttype" },
        { title: "银行接口类型", value: "", prop: "Bankinterfacetype" },
        { title: "开户许可证核准号", value: "", prop: "approvalnumber" },
        { title: "银行账户", value: "", prop: "bankaccount" },
        { title: "开户行", value: "", prop: "opeingbank" },
        { title: "账户属性", value: "", prop: "accountproperty" },
        { title: "开户日期", value: "", prop: "opeingdate" },
        { title: "备注", value: "", prop: "remark" },
        { title: "联系人", value: "", prop: "linkman" },
        { title: "电话", value: "", prop: "telephone" }
      ],
      gobackbtn: [{ name: "返回", type: "primary", icon: "" }]
    };
  },
  components: {},
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
