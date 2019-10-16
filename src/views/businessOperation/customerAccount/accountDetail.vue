<template>
  <div class="vlt-card account-detail">
    <section class="comp-item">
      <panel-static title="账户资料" style="margin-top: 10px;">
        <base-info :infoList="infoList"></base-info>
      </panel-static>
      <panel-static title="资金账户" style="margin-top: 10px;">
        <base-info :infoList="infoList2"></base-info>
      </panel-static>
      <panel-static title="钱包列表" style="margin-top: 10px;">
        <el-table :data="tableData" border style="width: 100%; margin-top: 10px;">
          <el-table-column prop="num" label="序号"></el-table-column>
          <el-table-column prop="cardNum" label="投注卡号"></el-table-column>
          <el-table-column prop="sequenceNum" label="投注卡序号"></el-table-column>
          <el-table-column prop="type" label="投注卡类型"></el-table-column>
          <el-table-column prop="cash" label="现金余额"></el-table-column>
          <el-table-column prop="bonus" label="奖金余额"></el-table-column>
          <el-table-column prop="give" label="赠送金额"></el-table-column>
          <el-table-column prop="deposit" label="押金"></el-table-column>
          <el-table-column prop="issuing" label="发卡厅"></el-table-column>
          <el-table-column prop="state" label="投注卡状态"></el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="walletDetail(scope.row.cardNum)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </panel-static>

      <panel-static title="会员权益" style="margin-top: 10px; margin-bottom:200px">
        <div class="equity-title">
          <span>会员卡号</span>
          <span>会员等级</span>
          <span>会员积分</span>
        </div>
        <el-table :data="tableData" border style="width: 100%; margin-top: 10px;">
          <el-table-column prop="num" label="序号"></el-table-column>
          <el-table-column prop="cardNum" label="权益名称"></el-table-column>
          <el-table-column prop="sequenceNum" label="起止时间"></el-table-column>
          <el-table-column prop="type" label="权益描述"></el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="equityDetail(scope.row.cardNum)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </panel-static>
    </section>
  </div>
</template>


<script type="text/javascript">
export default {
  data() {
    return {
      tableData: [],
      infoList: [
        { title: "账户ID", value: "", prop: "gameCode" },
        { title: "会员账号", value: "", prop: "cycleType" },
        { title: "账户昵称", value: "", prop: "gameStatus" },
        { title: "真实名称", value: "", prop: "gameName" },
        { title: "手机号码", value: "", prop: "gameCode" },
        { title: "身份证", value: "", prop: "cycleType" },
        { title: "账户状态", value: "", prop: "gameStatus" },
        { title: "是否注销", value: "", prop: "gameName" },
        { title: "营业厅", value: "", prop: "officialEndSale" },
        { title: "注册区域", value: "", prop: "gameName" },
        { title: "详细地址", value: "", prop: "officialEndSale" },
        { title: "注册时间", value: "", prop: "gameCode" },
        { title: "更新时间", value: "", prop: "cycleType" }
      ],
      infoList2: [
        { title: "资金账户ID", value: "", prop: "gameCode" },
        { title: "账户总额", value: "", prop: "cycleType" },
        { title: "资金账户余额", value: "", prop: "gameStatus" },
        { title: "银行卡号", value: "", prop: "gameName" },
        { title: "所属银行", value: "", prop: "gameCode" },
        { title: "支行名称", value: "", prop: "cycleType" },
        { title: "创建时间", value: "", prop: "gameStatus" },
        { title: "更新时间", value: "", prop: "gameName" }
      ],
      tableData: [
        {
          num: 1,
          cardNum: "10086",
          sequenceNum: "2",
          type: "电子卡",
          cash: "2000",
          bonus: "20",
          give: "50",
          deposit: "5",
          issuing: "大鹏投注厅",
          state: "激活"
        }
      ]
    };
  },
  components: {},
  methods: {
    walletDetail(cardNum) {
      this.$router.push({ path: "betcardDetail", query: cardNum });
    },
    equityDetail(cardNum) {
   
      this.$router.push({ path: "equityDetail", query: cardNum });
    }
  },
  created() {
    for (let item of this.infoList) {
      item.value = "1";
    }
  }
};
</script>

<style lang="less" scoped>

</style>

