<template>
  <div class="vlt-card">
    <panel-static title="详细资料" style="margin-top: 10px;">
      <base-info :infoList="infoList"></base-info>
    </panel-static>

    <panel-static title="订单状态变更记录"  style="margin-top: 10px;">
      <el-table :data="tableData" border style="width: 100%; margin-top: 10px">
        <el-table-column prop="num" label="序号"></el-table-column>
        <el-table-column prop="state" label="订单状态"></el-table-column>
        <el-table-column prop="date" label="变更时间"></el-table-column>
        <el-table-column prop="id" label="操作人ID"></el-table-column>
        <el-table-column prop="name" label="操作人姓名"></el-table-column>
        <el-table-column prop="type" label="操作人类型"></el-table-column>
        <el-table-column prop="remark" label="备注" ></el-table-column>
      </el-table>
    </panel-static>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      infoList: [
        { title: "订单编号", value: "", prop: "gameCode" },
        { title: "投注卡号", value: "", prop: "cycleType" },
        { title: "投注卡类型", value: "", prop: "gameStatus" },
        { title: "账户ID", value: "", prop: "gameName" },
        { title: "彩民", value: "", prop: "officialEndSale" },
        { title: "手机号码", value: "", prop: "gameCode" },
        { title: "投注金额", value: "", prop: "cycleType" },
        { title: "投注点数", value: "", prop: "gameStatus" },
        { title: "投注时间", value: "", prop: "gameStatus" },
        { title: "设备编号", value: "", prop: "officialEndSale" },
        { title: "交易厅名称", value: "", prop: "gameName" },
        { title: "所属机构", value: "", prop: "officialEndSale" },
        { title: "游戏名称", value: "", prop: "gameCode" },
        { title: "订单状态", value: "", prop: "cycleType" },
        { title: "变更时间", value: "", prop: "gameStatus" }
      ],
      tableData: [
        {
          num: "1",
          state: "已中奖",
          date: "2019-10-16",
          id: "007",
          name: "009",
          type:'彩民',
          remark: ''
        }
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
