<template>
  <div class="vlt-card">
    <div class="lotteryDetail">
      <panelStatic title="兑奖信息" style="margin-bottom:20px">
        <base-info :infoList="redeemTitle"></base-info>
      </panelStatic>
      <panelStatic title="兑奖人信息">
        <base-info :infoList="redeemPeoleTitle"></base-info>
      </panelStatic>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      redeemTitle: [
        { title: "投注卡ID", value: "", prop: "lotteryDetailID" },
        { title: "投注卡类型", value: "", prop: "lotteryDetailType" },
        { title: "所在区域", value: "", prop: "lotteryDetailAddress" },
        { title: "武林争霸", value: "", prop: "lotteryDetailHegemony" },
        { title: "订单编号", value: "", prop: "lotteryDetailPhone" },
        { title: "投注内容", value: "", prop: "lotteryDetailContent" },
        { title: "投注金额", value: "", prop: "lotteryDetailMoney" },
        { title: "中奖金额", value: "", prop: "lotteryDetailWinMoney" },
        { title: "中奖时间", value: "", prop: "lotteryDetailTime" },
        { title: "中奖状态", value: "", prop: "lotteryDetailStatus" }
      ],
      redeemPeoleTitle: [
        { title: "姓名", value: "", prop: "lotteryDetailName" },
        { title: "身份证", value: "", prop: "lotteryDetailIDCard" },
        { title: "手机号", value: "", prop: "lotteryDetailTelephone" },
        { title: "地址", value: "", prop: "lotteryDetailSite" },
        { title: "捐款金额", value: "", prop: "lotteryDetailDonation" },
        { title: "实际缴税", value: "", prop: "lotteryDetailPayment" },
        { title: "实兑金额", value: "", prop: "lotteryDetailSittwe" }
      ]
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
