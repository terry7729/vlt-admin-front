<template>
  <div class="vlt-card plan-check">
    <panel title="告警监控详情" :show="true">
      <base-info :infoList="planList"></base-info>
    </panel>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "warningWatchDetail",
  data() {
    return {
      planList: [
        { title: "省", value: detaillist.provinceName, prop: "provinceName" },
        { title: "描述", value: "", prop: "gameName" },
        { title: "警报等级", value: "", prop: "planState" },
        { title: "告警次数", value: "", prop: "planState" },
        { title: "最新时间", value: "", prop: "startTime" },
        { title: "最新告警历时", value: "", prop: "startTime" },
        { title: "通知状态", value: "", prop: "startTime" },
        { title: "处理状态", value: "", prop: "startTime" }
      ],
      gameInfoList: [{ title: "游戏ID", value: "", prop: "gameID" }],
      detaillist: []
    };
  },
  components: {},
  methods: {
    //获取中央交易数据列表
    async getGameRiskDetail() {
      const self = this;
      const res = await self.$api.getGameRiskDetail({
        data: {
          businessKey: "59434291918934016"
        }
      });
      if (res && res.code == 0) {
        this.detaillist = res.data;
        this.planList.forEach((v, i) => {
        //   console.log(v.prop);
        //   if (v.prop in res.data) {
        //       console.log(res.data[v.prop])
        //     v.value=res.data[v.prop]
        //   }else{
        //       console.log(false)
        //   }
        });
      }
    }
  },
  mounted() {
    this.getGameRiskDetail();
  }
};
</script>

<style lang="less" scoped>
.plan-check {
  background: white;
  margin: 20px 20px;
  border-radius: 8px;
  padding: 25px;
}
</style>
