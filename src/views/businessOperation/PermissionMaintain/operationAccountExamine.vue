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
        { title: "角色名称", value: "", prop: "roleName" },
        { title: "姓名", value: "", prop: "accountName" },
        { title: "账户权限", value: "", prop: "roleTypes" },
        { title: "手机号", value: "", prop: "phone" },
        { title: "身份证号", value: "", prop: "channelIdentity" },
        { title: "渠道编号", value: "", prop: "channelId" },
        { title: "联系地址", value: "", prop: "address" },

        { title: "创建时间", value: "", prop: "createTime" },

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
      let result = await this.$api.accountDetail({ data: id });

      console.log(result);
      if (result.data.accountStatus === 1) {
        result.data.accountStatus = "启用中";
      } else if (result.data.accountStatus === 2) {
        result.data.accountStatus = "禁用";
      } else {
        result.data.accountStatus = "注销";
      }
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
