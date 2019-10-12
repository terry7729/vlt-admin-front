<template>
  <div class="vlt-card">
    <div class="money_Account_Manage">
      <div class="money_Account_Manage_firstrow">
        <i class="el-icon-price-tag"></i>
        <span>资金账户管理</span>
      </div>
      <div class="money_account">
        <el-tabs :tab-position="tabPosition" style="height: auto;">
          <el-tab-pane label="用户管理" width="100px">
            <div>哈哈</div>
          </el-tab-pane>
          <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      tabPosition: "left"
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
@import "./less/index";
</style>
