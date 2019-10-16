<template>
  <div class="vlt-card">
    <section class="comp-item">
      <el-table :data="tableData" border style="width: 100%; margin-top: 10px;">
        <el-table-column prop="num" label="序号"></el-table-column>
        <el-table-column prop="type" label="责任类型"></el-table-column>
        <el-table-column prop="msg" label="规则说明"></el-table-column>
        <el-table-column prop="person" label="创建人"></el-table-column>
        <el-table-column prop="time" label="创建时间"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="ruleSet(scope.row.type)">规则设置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      tableData: [
        {
          num: 1,
          type: "全局限时限制",
          msg:
            "1.提供可按日、周、月的时间设置规则2.设置的内容包含：彩民（购彩者）投注终端游戏时间" +
            "3.显示使用时长、累计使用时长等信息，累计时长超标时，提示告知彩民，并锁定账户暂停继续使用",
          person: "Joe",
          time: "2019-10-14"
        },
        {
          num: 2,
          type: "全局投注限制",
          msg: "设置的内容包含：彩民（购彩者）投注金额限制",
          person: "Joe",
          time: "2019-10-14"
        },
        {
          num: 3,
          type: "全局最大输额",
          msg: "设置的内容包含：彩民（购彩者）最大输金额限制",
          person: "Joe",
          time: "2019-10-14"
        },
        {
          num: 4,
          type: "全局最大充值",
          msg: "设置的内容包含：彩民（购彩者）充值金额限制",
          person: "Joe",
          time: "2019-10-14"
        },
        {
          num: 5,
          type: "全局信用卡充值限制",
          msg:
            "禁止使用信用卡充当资金账号，禁止使用信用卡进2.行账户充值，充分杜绝部分投注彩民通过本方案进行非法信用卡套现",
          person: "Joe",
          time: "2019-10-14"
        },
        {
          num: 6,
          type: "全局未成年购彩",
          msg: "在彩民开卡、会员注册时进行身份验证，未成年儿童禁止注册；",
          person: "Joe",
          time: "2019-10-14"
        }
      ]
    };
  },
  components: {},
  methods: {
    ruleSet(type) {
      this.$router.push({ path: "ruleSet", query: type });
    },
    pageSizeChange(size) {
      // this.PAGESIZE = size;
      // this.$emit("handleSizeChange", size);
    },
    pageCurrentChange(page) {
      // this.CURRENTPAGE = page;
      // this.$emit("handleCurrentChange", page);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
