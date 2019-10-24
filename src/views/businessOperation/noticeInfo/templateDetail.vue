<template>
  <div class="vlt-card bulletin-detail">
    <panel-static title="基本信息">
      <base-info :infoList="infoList"></base-info>
    </panel-static>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      infoList: [
        { title: "模板名称", value: "新游戏发行", prop: "gameCode" },
        { title: "公告类型", value: "游戏发行", prop: "cycleType" },
        { title: "内容形式", value: "图片", prop: "gameStatus" },
        {
          title: "上传文件",
          value: "<img src='../../../assets/img/logo.png'>",
          prop: "gameName"
        },
        {
          title: "模板备注",
          value: "2019-10-20正式上线",
          prop: "officialEndSale"
        }
      ]
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
@import "./less/index";
</style>
