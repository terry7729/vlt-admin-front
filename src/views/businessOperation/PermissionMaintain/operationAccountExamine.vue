<template>
  <div class="vlt-card">
    <div class="operationAccountExamine">
      <panel-static title="账号信息">
        <base-Info :infoList="operationAccountExamineData"></base-Info>
      </panel-static>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      operationAccountExamineData: [
        { title: "账户ID", value: "", prop: "userID" },
        { title: "账户角色", value: "", prop: "userrole" },
        { title: "账户权限", value: "", prop: "userauthority" },
        { title: "手机号", value: "", prop: "usertelephone" },
        { title: "身份证号", value: "", prop: "IDCard" },
        { title: "所属渠道", value: "", prop: "belong" },
        { title: "账户地址", value: "", prop: "useraddress" },
        { title: "创建人", value: "", prop: "creater" },
        { title: "创建时间", value: "", prop: "createtime" },
        { title: "更新人", value: "", prop: "updatecreater" },
        { title: "更新时间", value: "", prop: "updatetime" },
        { title: "账户状态", value: "", prop: "userstatus" }
      ]
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
