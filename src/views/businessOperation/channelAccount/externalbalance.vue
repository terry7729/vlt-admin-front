<template>
  <div class="vlt-card">
    <div class="externalbalance">
      <base-Info :infoList="externalbalanceData"></base-Info>
      <div :data="externalbalancemoney" style="margin-left:20px">
        账面余额:人民币元
        <span></span>
      </div>
      <controlBar :options="externalbalancegobackbtn" @select="externalbalancegoback"></controlBar>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      externalbalancemoney: "",
      externalbalanceData: [
        { title: "账户名称", value: "", prop: "accountname" },
        { title: "账户类型", value: "", prop: "accounttype" },
        { title: "法人代表证件", value: "", prop: "legalrepresentativepaper" },
        { title: "注册时间", value: "", prop: "joindate" },
        {
          title: "营业执照注册号",
          value: "",
          prop: "businesslicenseregistrationnumber"
        },
        { title: "第三方支付平台", value: "", prop: "externalpay" },
        { title: "法人代表", value: "", prop: "legalrepresentative" },
        {
          title: "法人代表证件号",
          value: "",
          prop: "legalrepresentativepapernum"
        },
        { title: "手机号", value: "", prop: "telephonenumber" }
      ],
      externalbalancegobackbtn: [{ name: "返回", type: "primary", icon: "" }]
    };
  },
  components: {},
  methods: {
    externalbalancegoback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
