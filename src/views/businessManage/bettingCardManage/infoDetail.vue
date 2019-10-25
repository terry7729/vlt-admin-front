<template>
  <div class="vlt-card">
    <section class="comp-item">
      <panel-static title="基本信息">
        <base-info :infoList="infoList"></base-info>
      </panel-static>
    </section>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "infoDetail",
  data() {
    return {
      infoList: [
        { title: "批次", value: "xxxxxxxxxx", prop: "batch" },
        { title: "投注卡类型", value: "xxxxx", prop: "bettingCardType" },
        { title: "所属机构", value: "广东省", prop: "insName" },
        { title: "投注卡编号", value: "xxxxxxxxxx", prop: "cardNumber" },
        { title: "投注卡状态", value: "已激活", prop: "cardStatus" },
        { title: "开卡渠道", value: "xxxxxxxxxxx", prop: "channelName" }
      ]
    };
  },
  components: {},
  created() {
    let id = this.$route.query.id;
    if (id) {
      this.id = id;
      this.initDetail(this.id)
    }
  },
  methods: {
    async initDetail(id) {
      const _this = this;
      let result = await this.$api.bettingCardInfoDetail(id);
      console.log(result);
      if (result.code === 0) {
        _this.infoList.forEach(item => {
          item.value = result.data[item.prop]
          if (item.prop == 'bettingCardType') {
            item.value = _this.forMatType(result.data[item.prop]);
          } else if ( item.prop == 'cardStatus') {
            item.value = _this.forMatStatus(result.data[item.prop]);
          }
        })
      }
    },
    forMatType(type) {
      switch (type) {
        case 1:
          return (type = "普通卡");
        case 2:
          return (type = "会员卡");
        case 3:
          return (type = "试玩卡");
      }
    },
    forMatStatus(status) {
      switch (status) {
        case 1:
          return (status = "待激活");
        case 2:
          return (status = "已激活");
        case 3:
          return (status = "失效");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tips-name {
  display: block;
  margin: 20px auto;
  font-size: 14px;
  color: #666;
  font-weight: 600;
}
</style>
