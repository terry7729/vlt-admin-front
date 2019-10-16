<template>
  <div class="vlt-card">
    <div class="lotteryTicket">
      <search-bar :options="lotteryTicketOptions" :total="999"></search-bar>
      <el-table :data="lotteryTicketTableData" border>
        <el-table-column prop="lotteryTicketNum" label="序号"></el-table-column>
        <el-table-column prop="lotteryTicketId" label="投注卡ID"></el-table-column>
        <el-table-column prop="lotteryTicketType" label="投注卡类型"></el-table-column>
        <el-table-column prop="lotteryTicketAddress" label="所在区域"></el-table-column>
        <el-table-column prop="lotteryTicketName" label="游戏名称"></el-table-column>
        <el-table-column prop="lotteryTicketNumber" label="订单编号"></el-table-column>
        <el-table-column prop="lotteryTicketContent" label="投注内容"></el-table-column>
        <el-table-column prop="lotteryTicketMoney" label="投注金额"></el-table-column>
        <el-table-column prop="lotteryTicketWinMoney" label="中奖金额"></el-table-column>
        <el-table-column prop="lotteryTicketWinDate" label="中奖时间"></el-table-column>
        <el-table-column prop="lotteryTicketStatus" label="兑奖状态"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="lotteryTicketExpiry(scope.row)"
              v-if="scope.row.lotteryTicketStatus==0"
            >兑奖</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="lotteryTicketPrint(scope.row)"
              v-if="scope.row.lotteryTicketStatus==1"
            >打印</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="lotteryTicketReprint(scope.row)"
              v-if="scope.row.lotteryTicketStatus==1"
            >补打</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="lotteryTicketDetail(scope.row)"
              v-if="scope.row.lotteryTicketStatus==2"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <tablePaging :total="99" :currentPage="1" :pageSize="10"></tablePaging>
      <el-dialog title="兑奖信息" :visible.sync="lotteryTicketFormVisible">
        <div class="vlt-edit-single">
          <base-form
            :formData="lotteryTicketRedeemData"
            ref="baseForm"
            :rules="lotteryTicketRule"
            direction="right"
            @change="lotteryTicketchangeForm"
          ></base-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="lotteryTicketFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="lotteryTicketFormVisible = false">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "",
  data() {
    return {
      //点击兑奖弹框验证
      lotteryTicketRule: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        all: [{ required: true, validator: rules.checkEmail, trigger: "blur" }]
      },
      //点击兑奖弹框表单类型数据
      lotteryTicketRedeemData: [
        { type: "input", title: "姓名", prop: "lotteryName" },
        { type: "input", title: "身份证", prop: "lotteryIDCard" },
        { type: "input", title: "手机号", prop: "lotterytelephone" },
        { type: "input", title: "地址", prop: "lotteryAddress" },
        { type: "input", title: "中奖金额", prop: "lotteryWinMoney" },
        { type: "input", title: "捐款金额", prop: "lotteryDonationMoney" },
        { type: "input", title: "实际缴税", prop: "lotteryPayment" },
        { type: "input", title: "实兑金额", prop: "lotterySittwe" }
      ],
      //默认弹框
      lotteryTicketFormVisible: false,
      //搜索的表单类型数据
      lotteryTicketOptions: [
        {
          type: "input",
          prop: "lotteryTicketID",
          value: "",
          title: "投注卡ID",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "lotteryTicketStatus",
          value: "",
          title: "兑奖状态",
          placeholder: "请输入",
          options: [
            {
              label: "启用",
              value: 1
            },
            {
              label: "冻结",
              value: 2
            }
          ]
        },
        {
          type: "select",
          prop: "lotteryTicketAddress",
          value: "",
          title: "所在区域",
          placeholder: "请输入",
          options: [
            {
              label: "启用",
              value: 1
            },
            {
              label: "冻结",
              value: 2
            }
          ]
        },
        {
          type: "datetime-range",
          prop: "lotteryTicketWinDate",
          value: "",
          title: "中奖时间",
          placeholder: ["开始时间", "结束时间"]
        }
      ],
      //表格数据
      lotteryTicketTableData: [
        {
          lotteryTicketNum: 1,
          lotteryTicketId: "1001",
          lotteryTicketType: "上海市普陀区金沙江路 1518 弄",
          lotteryTicketAddress: "赵",
          lotteryTicketName: "自营",
          lotteryTicketNumber: "赵",
          lotteryTicketContent: "13800131358",
          lotteryTicketMoney: "13800131358",
          lotteryTicketWinMoney: "13800131358",
          lotteryTicketWinDate: "13800131358",
          lotteryTicketStatus: "0"
        },
        {
          lotteryTicketNum: 2,
          lotteryTicketId: "1002",
          lotteryTicketType: "上海市普陀区金沙江路 1518 弄",
          lotteryTicketAddress: "赵",
          lotteryTicketName: "自营",
          lotteryTicketNumber: "赵",
          lotteryTicketContent: "13800131358",
          lotteryTicketMoney: "13800131358",
          lotteryTicketWinMoney: "13800131358",
          lotteryTicketWinDate: "13800131358",
          lotteryTicketStatus: 1
        },
        {
          lotteryTicketNum: 3,
          lotteryTicketId: "1003",
          lotteryTicketType: "上海市普陀区金沙江路 1518 弄",
          lotteryTicketAddress: "赵",
          lotteryTicketName: "自营",
          lotteryTicketNumber: "赵",
          lotteryTicketContent: "13800131358",
          lotteryTicketMoney: "13800131358",
          lotteryTicketWinMoney: "13800131358",
          lotteryTicketWinDate: "13800131358",
          lotteryTicketStatus: 2
        }
      ]
    };
  },
  components: {},
  methods: {
    //点击兑奖
    lotteryTicketExpiry() {
      this.lotteryTicketFormVisible = true;
    },
    //点击打印
    lotteryTicketPrint(row) {
      let id = row.lotteryTicketId;
      this.$router.push({ path: "lotteryTicketPrint", query: { id } });
    },
    //点击补打
    lotteryTicketReprint(row) {
      let id = row.lotteryTicketId;
      this.$router.push({ path: "lotteryTicketRePrint", query: { id } });
    },
    //点击详情
    lotteryTicketDetail(row) {
      let id = row.lotteryTicketId;
      this.$router.push({ path: "lotteryTicketDetail", query: { id } });
    },
    //表单change事件
    lotteryTicketchangeForm() {}
  }
};
</script>

<style lang="less" scoped>
</style>
