<template>
  <div class="vlt-card">
    <section class="comp-item">
      <cell title="基本信息" style="margin-top: 10px;">
        <base-info :infoList="infoList"></base-info>
      </cell>
      <cell title="客户信息" style="margin-top: 10px;">
        <base-info :infoList="infoList2"></base-info>
      </cell>
    </section>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      infoList: [
        { title: "批次", value: "", prop: "gameCode" },
        { title: "投注卡类型", value: "", prop: "gameStatus" },
        { title: "所属机构", value: "", prop: "gameName" },
        { title: "投注卡编号", value: "", prop: "cycleType" },
        { title: "有效日期", value: "", prop: "gameCode" },
        { title: "投注卡状态", value: "", prop: "gameName" },
        { title: "卡上余额", value: "", prop: "officialEndSale" },
        { title: "累计消费", value: "", prop: "gameName" }
      ],
      infoList2: [
        { title: "姓名", value: "", prop: "gameCode" },
        { title: "性别", value: "", prop: "gameStatus" },
        { title: "年龄", value: "", prop: "gameName" },
        { title: "地址", value: "", prop: "cycleType" },
        { title: "身份证", value: "", prop: "gameCode" }
      ]
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
