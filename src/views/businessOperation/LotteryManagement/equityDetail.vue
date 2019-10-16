<template>
  <div class="vlt-card">
    <section class="comp-item">
      <panel-static title="会员权益详情" style="margin-top: 10px;">
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
        { title: "权益ID", value: "", prop: "gameCode" },
        { title: "权益名称", value: "", prop: "gameStatus" },
        { title: "权益编码", value: "", prop: "gameName" },
        { title: "最低级别", value: "", prop: "cycleType" },
        { title: "权益状态", value: "", prop: "gameCode" },
        { title: "权益描述", value: "", prop: "gameName" },
        { title: "创建时间", value: "", prop: "officialEndSale" },
        { title: "更新时间", value: "", prop: "gameName" }
      ]
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>

