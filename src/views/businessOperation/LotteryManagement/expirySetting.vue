<template>
  <div class="vlt-card">
    <div class="expirySetting">
      <search-bar :options="expirySettingOptions" :total="999">
        <controlBar
          slot="extend-bar"
          @select="expirySettingBtn"
          :options="expirySettingBtnOption"
          position="left"
        ></controlBar>
      </search-bar>
      <el-table
        ref="multipleTable"
        :data="expirySettingTableData"
        tooltip-effect="dark"
        @selection-change="expirySettingChange"
        border
      >
        <el-table-column prop="expirySettingId" label="序号"></el-table-column>
        <el-table-column prop="expirySettingName" label="兑奖名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="expirySettingType" label="兑奖类型"></el-table-column>
        <el-table-column prop="expirySettingMoney" label="兑奖金额"></el-table-column>
        <el-table-column prop="expirySettingExplain" label="说明" min-width="100"></el-table-column>
        <el-table-column prop="handles" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="expirySettingWrite(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_paging">
        <tablePaging class="table_paging_right" :total="99" :currentPage="1" :pageSize="10"></tablePaging>
      </div>
      <!-- 编辑弹框 -->
      <el-dialog title="兑奖设置" :visible.sync="lotteryTicketFormWriteVisible">
        <div class="vlt-edit-single">
          <base-form
            :formData="lotteryTicketWriteData"
            ref="baseForm"
            :rules="lotteryTicketWriteRule"
            direction="right"
            @change="lotteryTicketWritechangeForm"
          ></base-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="lotteryTicketFormWriteVisible = false">取 消</el-button>
          <el-button type="primary" @click="lotteryTicketFormWriteVisible = false">保 存</el-button>
        </div>
      </el-dialog>
      <!-- 新增弹框 -->
      <el-dialog title="兑奖设置" :visible.sync="lotteryTicketFormAddVisible">
        <div class="vlt-edit-single">
          <base-form
            :formData="lotteryTicketAddData"
            ref="baseForm"
            :rules="lotteryTicketAddRule"
            direction="right"
            @change="lotteryTicketAddchangeForm"
          ></base-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="lotteryTicketFormAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="lotteryTicketFormAddVisible = false">保 存</el-button>
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
      //新增弹框默认为false
      lotteryTicketFormAddVisible: false,
      //编辑弹框默认为false
      lotteryTicketFormWriteVisible: false,
      //编辑弹框表单验证
      lotteryTicketWriteRule: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        all: [{ required: true, validator: rules.checkEmail, trigger: "blur" }]
      },
      //新增弹框表单验证
      lotteryTicketWriteRule: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        all: [{ required: true, validator: rules.checkEmail, trigger: "blur" }]
      },
      //新增弹框表单类型
      lotteryTicketAddData: [
        { type: "input", title: "兑奖名称", prop: "AddName" },
        {
          type: "select",
          title: "兑奖类型",
          prop: "AddType",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        {
          title: "兑奖金额",
          prop: "WriteSection",
          type: "minMax",
          value: "",
          options: ["betMoneyMin", "betMoneyMax"]
        },
        { type: "textarea", title: "说明", prop: "AddArea" }
      ],
      //编辑弹框表单类型
      lotteryTicketWriteData: [
        { type: "input", title: "兑奖名称", prop: "WriteName" },
        {
          type: "select",
          title: "兑奖类型",
          prop: "WriteType",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        {
          title: "兑奖金额",
          prop: "WriteSection",
          type: "minMax",
          value: "",
          options: ["betMoneyMin", "betMoneyMax"]
        },
        { type: "textarea", title: "说明", prop: "WriteArea" }
      ],
      //搜索框类型
      expirySettingOptions: [
        {
          type: "input",
          prop: "expirySettingName",
          value: "",
          title: "兑奖名称",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "expirySettingMoney",
          value: "",
          title: "兑奖金额",
          placeholder: "请输入"
        }
      ],
      //新增按钮类型
      expirySettingBtnOption: [{ name: "新增", type: "primary", icon: "plus" }],
      //表格数据
      expirySettingTableData: [
        {
          expirySettingId: 1,
          expirySettingName: "自动反奖",
          expirySettingType: "全局",
          expirySettingMoney: "<3000.00",
          expirySettingExplain: "所有游戏奖额<3000.00时自动反奖至账户"
        }
      ]
    };
  },
  components: {},
  methods: {
    //新增按钮
    expirySettingBtn() {
      this.lotteryTicketFormAddVisible = true;
    },
    //编辑按钮
    expirySettingWrite() {
      this.lotteryTicketFormWriteVisible = true;
    },
    expirySettingChange() {},
    //编辑弹框表单change事件
    lotteryTicketWritechangeForm() {},
    //新增弹框表单change事件
    lotteryTicketAddchangeForm() {}
  }
};
</script>

<style lang="less" scoped>
</style>
