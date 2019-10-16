<template>
  <div class="vlt-card">
    <section class="comp-item">
      <panel-static title="详细资料" style="margin-top: 10px;">
        <base-info :infoList="infoList"></base-info>
      </panel-static>
    </section>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      infoList: [
        { title: "订单编号", value: "", prop: "gameCode" },
        { title: "提现账号", value: "", prop: "cycleType" },
        { title: "提现类型", value: "", prop: "gameStatus" },
        { title: "账户ID", value: "", prop: "gameName" },
        { title: "彩民", value: "", prop: "officialEndSale" },
        { title: "手机号码", value: "", prop: "gameCode" },
        { title: "提现金额", value: "", prop: "cycleType" },
        { title: "提现方式", value: "", prop: "gameStatus" },
        { title: "账户余额", value: "", prop: "gameName" },
        { title: "操作员ID", value: "", prop: "gameCode" },
        { title: "操作员姓名", value: "", prop: "cycleType" },
        { title: "操作时间", value: "", prop: "gameStatus" },
        { title: "设备编号", value: "", prop: "officialEndSale" },
        { title: "交易厅名称", value: "", prop: "gameName" },
        { title: "所属机构", value: "", prop: "officialEndSale" }
      ]
    };
  },
  components: {},
  methods: {},
  created() {
    for (let item of this.infoList) {
      item.value = "1";
    }
  }
};
</script>

<style lang="less" scoped>
</style>
