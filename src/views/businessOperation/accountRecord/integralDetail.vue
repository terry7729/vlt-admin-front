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
        { title: "积分编号", value: "", prop: "gameCode" },
        { title: "投注卡号", value: "", prop: "cycleType" },
        { title: "投注卡类型", value: "", prop: "gameStatus" },
        { title: "账户ID", value: "", prop: "gameName" },
        { title: "彩民", value: "", prop: "officialEndSale" },
        { title: "手机号码", value: "", prop: "gameCode" },
        { title: "原始积分", value: "", prop: "cycleType" },
        { title: "变更后积分", value: "", prop: "gameName" },
        { title: "变动积分", value: "", prop: "gameName" },
        { title: "积分类型", value: "", prop: "gameStatus" },
        { title: "积分来源", value: "", prop: "gameCode" },
        { title: "变更时间", value: "", prop: "gameStatus" },
        { title: "积分规则", value: "", prop: "gameName" }
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
