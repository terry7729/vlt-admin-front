<template>
  <div class="vlt-card">
    <panel title="游戏信息" :show="true">
      <base-info :infoList="gameData"></base-info>
    </panel>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      gameData: [
        { title: "计划时间", value: "", prop: "planDate" },
        { title: "所属机构", value: "", prop: "insName" },
        { title: "新建省级销售厅", value: "", prop: "provinceNewSellingHall" }, // 如果获取的是市级的信息 则需要隐藏省级的信息
        { title: "新建市级销售厅", value: "", prop: "cityNewSellingHall" }, // 如果获取的是市级的信息 则需要隐藏省级的信息
        {
          title: "省级销售厅投注机",
          value: "",
          prop: "provinceSellingMachine"
        }, // 如果获取的是市级的信息 则需要隐藏省级的信息
        { title: "市级销售厅投注机", value: "", prop: "citySellingMachine" },

        { title: "市属合作厅", value: "", prop: "cityCooperationHall" },
        {
          title: "市属合作厅投注机",
          value: "",
          prop: "cityCooperationMachine"
        },
        { title: "省属合作厅", value: "", prop: "provinceCooperationHall" }, // 如果获取的是市级的信息 则需要隐藏省级的信息
        {
          title: "省属合作厅投注机",
          value: "",
          prop: "provinceCooperationMachine"
        }, // 如果获取的是市级的信息 则需要隐藏省级的信息
        { title: "发展预算", value: "", prop: "developBudget" },
        { title: "状态", value: "", prop: "status" },
        { title: "计划说明", value: "", prop: "planDesc" },
        { title: '审批意见', value: '', prop: 'approvalComments'}
      ],

      planStatus: ["计划中", "已通过"]
    };
  },
  components: {},
  created() {
    const routerQuery = this.$route.query;
    if (routerQuery && routerQuery.id) {
      const data = {
        id: routerQuery.id,
        insLevel: routerQuery.insLevel
      };
      this.getQueryDevelopPlanInfo(data);
    }
  },
  methods: {
    getQueryDevelopPlanInfo(data) {
      const self = this;
      (async data => {
        let res = await self.$api.getQueryDevelopPlanInfo({ data });
        if (res && res.code == 0) {
          // if (res.data != null && res.data.length > 0) {
            console.log(res);
            this.gameData.forEach(item => {
              item.value = res.data[item.prop];
              if (item.prop == 'status') {
                item.value = this.planStatus[item.value];
              }
            })
          // }
        } else {
          self.$message.warning(res.msg);
        }
      })(data);
    },
    handleSelectionChange() {}
  }
};
</script>

<style lang="less" scoped>
</style>
