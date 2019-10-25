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
      // 详情类型
      operationAccountExamineData: [
        { title: "员工编号", value: "", prop: "accountCode" },
        { title: "年龄", value: "", prop: "age" },
        { title: "账户ID", value: "", prop: "operationManageID" },
        { title: "账户名称", value: "", prop: "accountName" },
        { title: "账户权限", value: "", prop: "roleTypes" },
        { title: "手机号", value: "", prop: "phone" },
        { title: "身份证号", value: "", prop: "channelIdentity" },
        { title: "所属渠道", value: "", prop: "channelName" },
        { title: "账户地址", value: "", prop: "address" },
        { title: "创建人", value: "", prop: "createBy" },
        { title: "创建时间", value: "", prop: "createTime" },
        { title: "更新人", value: "", prop: "updateBy" },
        { title: "更新时间", value: "", prop: "updateTime" },
        { title: "账户状态", value: "", prop: "accountStatus" }
      ]
    };
  },
  created() {
    this.getDetail();
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
  methods: {
    async getDetail() {
      let id = this.$route.query.id;
      let result = await this.$api.accountDetail(id);

      console.log(result);
      if (result.code === 0) {
        let arr = Object.keys(result.data);
        let brr = this.operationAccountExamineData;
        for (var i = 0; i < brr.length; i++) {
          for (var j = 0; j < arr.length; j++) {
            if (brr[i].prop === arr[j]) {
              brr[i].value = result.data[arr[j]];
            }
          }
        }
        console.log(result);
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
