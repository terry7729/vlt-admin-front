<template>
  <div class="vlt-card">
    <div class="lotteryRePrint">
      <panelStatic title="补打兑奖单" class="containner">
        <div class="print-content" ref="print">
          <h2 class="print-title">中国福利彩票发行中心兑奖单</h2>
          <table class="print-table">
            <thead>
              <tr>
                <th width="25%"></th>
                <th width="25%"></th>
                <th width="25%"></th>
                <th width="25%"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2"></td>
                <td class="tc" colspan="2">NO. 0135131315315</td>
              </tr>
              <tr>
                <td>游戏名称：武林争霸</td>
                <td>投注卡号：201900791</td>
                <td>投注卡类型：会员卡</td>
                <td>流水号：1</td>
              </tr>
              <tr>
                <td colspan="2">设备编号：3513513513sad13a5s135</td>
                <td>兑奖方式：柜员机</td>
                <td>有效性：有效</td>
              </tr>
              <tr>
                <td colspan="2">销售时间：2019-09-10 16:36:31</td>
                <td colspan="2">兑奖时间：2019-09-10 16:56:22</td>
              </tr>
              <tr>
                <td class="tl" colspan="4">
                  <span>中奖情况：</span>
                  <span class="text">奖等:43,中奖个数:1,倍数:1,单注中奖金额:4.50元;</span>
                </td>
                <!-- <td class="tl" colspan="3" style="word-break:break-all"></td> -->
              </tr>
              <tr>
                <td class="tl">中奖金额：4.50元</td>
                <td class="tc" colspan="2">税金：0.00元</td>
                <td class="tl">实付金额：4.50元</td>
              </tr>
              <tr>
                <td class="pt" colspan="2">中奖人姓名：李四</td>
                <td class="pt" colspan="2">联系电话：13510002000</td>
              </tr>
              <tr>
                <td class="dashed" colspan="2">身份证号：32165161613513513</td>
                <td class="dashed" colspan="2">
                  <span>家庭地址：</span>
                  <span class="text">北京四合院</span>
                </td>
              </tr>
              <tr>
                <td class="pt20 tl">兑奖操作员：</td>
                <td class="pt20 tc" colspan="2">技术负责人：</td>
                <td class="pt20 tl">中心负责人：</td>
              </tr>
              <tr>
                <td class="time" colspan="2"></td>
                <td class="time tr" colspan="2">打印时间：2019-09-14 20:13:59</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p class="btn-print">
            <el-button type="primary" size="mini" @click="Reprint">打印</el-button>
          </p>
        </div>
      </panelStatic>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
  methods: {
    Reprint() {}
  }
};
</script>

<style lang="less" scoped>
@import "./less/index.less";
</style>
