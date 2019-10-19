<!-- 渠道终端管理 - 服务分析 -->
<template>
  <div class="vlt-card vc-plr0">
    <el-container>
      <el-aside width="200px">
        <account-moneyMenu :menuList="menuData"></account-moneyMenu>
      </el-aside>
      <el-main style="padding:0">
        <div class="main-body">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script type="text/javascript">
import accountMoneyMenu from "@/views/businessOperation/channelAccount/components/accountMoneyMenu";
export default {
  name: "accountMoneyManage",
  data() {
    return {
      menuData: {
        id: 0,
        title: "资金账户管理",
        icon: "",
        list: [
          {
            id: 0,
            name: "银行",
            active: true,
            url: "bank"
          },
          {
            id: 1,
            name: "第三方支付",
            active: false,
            url: "external"
          }
        ]
      }
    };
  },
  components: {
    "account-moneyMenu": accountMoneyMenu
  },
  watch: {
    $route(val) {
      // console.log(val);
      if (val.name == "accountMoneyManage") {
        this.$router.push({
          name: "bank"
        });
      }
    }
  },
  beforeCreate() {
    if (this.$router.history.current.name == "accountMoneyManage") {
      this.$router.push({
        name: "bank"
      });
    }
    // console.log(this.$router);
  },
  created() {
    // this.$router.push({
    //   name: 'maintenanceEfficiency'
    // })
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.vlt-card {
  .el-main {
    border-left: 1px solid #e6e6e6;
  }
}
</style>
