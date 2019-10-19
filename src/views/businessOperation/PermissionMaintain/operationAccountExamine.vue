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
      dal: [],
      operationAccountExamineData: [
        { title: "员工编号", value: "", prop: "operationManageStaffNum" },
        { title: "年龄", value: "", prop: "operationManageAge" },
        { title: "账户ID", value: "", prop: "operationManageID" },
        { title: "账户角色", value: "", prop: "operationManageRoleName" },
        { title: "账户权限", value: "", prop: "userauthority" },
        { title: "手机号", value: "", prop: "operationManagetelephone" },
        { title: "身份证号", value: "", prop: "IDCard" },
        { title: "所属渠道", value: "", prop: "operationManageBelong" },
        { title: "账户地址", value: "", prop: "useraddress" },
        { title: "创建人", value: "", prop: "operationManageCreater" },
        { title: "创建时间", value: "", prop: "operationManageCreateDate" },
        { title: "更新人", value: "", prop: "updatecreater" },
        { title: "更新时间", value: "", prop: "updatetime" },
        { title: "账户状态", value: "", prop: "operationManageStatus" }
      ]
    };
  },
  created() {
    //console.log(this);
    // this.eventBus.$on("send", data => {
    //   //console.log(data);
    //   var val = Object.keys(data);
    //   //console.log(val);
    //   var info = this.operationAccountExamineData;
    //   for (var i = 0; i < info.length; i++) {
    //     for (var j = 0; j < val.length; j++) {
    //       if (info[i].prop === val[j]) {
    //         info[i].value = data[val[j]];
    //       }
    //     }
    //   }
    //   this.dal = info;
    //   this.dal = this.operationAccountExamineData;
    //   console.log(this.operationAccountExamineData);
    //   console.log(this.dal);
    // });
  },
  mounted() {},
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
