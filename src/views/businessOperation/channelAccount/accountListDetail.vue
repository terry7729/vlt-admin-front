<template>
  <div class="vlt-card account_detail">
    <div class="account_detail_data">
      <h3>账户资料</h3>
      <div class="account_detail_vessel">
        <div class="account_detail_classify" v-for="item in data" :key="item.id">
          <span>{{item.name}}:</span>
          <span></span>
        </div>
      </div>
      <div class="account_detail_data">
        <h3>账户资料</h3>
        <div class="account_detail_vessel">
          <div class="account_detail_classify" v-for="item in data" :key="item.id">
            <span>{{item.name}}:</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { id: 1, name: "账户ID" },
        { id: 2, name: "账户名称" },
        { id: 3, name: "负责人" },
        { id: 4, name: "手机号码" },
        { id: 5, name: "账户状态" },
        { id: 6, name: "账户类型" },
        { id: 7, name: "所属区域" },
        { id: 8, name: "详细地址" },
        { id: 9, name: "创建时间" },
        { id: 10, name: "更新时间" }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
@import "./less/index.less";
</style>