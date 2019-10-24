<template>
  <div class="vlt-card preview-template">
    <slot name="header">
      <h2 class="template-title">{{templateName}}</h2>
    </slot>

    <panel title="基础信息" :show="true">
      <div class="template-info">
        <base-info :infoList="baseInfo"></base-info>
      </div>
    </panel>

    <slot name="upload-file">
      <panel title="附件信息" :show="true">
        <div class="template-info file-info">
          <div>
            <img src="../../../../assets/img/avatar.jpg" alt />
          </div>
        </div>
      </panel>
    </slot>

    <panel title="活动规则" :show="true">
      <div class="template-info">
        <base-info :infoList="ruleInfo"></base-info>
      </div>
    </panel>

    <panel title="活动资金" :show="true">
      <div class="template-info table-info">
        <el-table :data="tableData" border style="width:70%;">
          <el-table-column prop="date" label="序号"></el-table-column>
          <el-table-column prop="name" label="游戏编号"></el-table-column>
          <el-table-column prop="address" label="游戏名称"></el-table-column>
          <el-table-column prop="date" label="游戏所属机构"></el-table-column>
          <el-table-column prop="name" label="注入方式"></el-table-column>
          <el-table-column prop="address" label="注入金额"></el-table-column>
        </el-table>
      </div>
    </panel>

    <panel title="活动资源" :show="true">
      <div class="template-info table-info">
        <el-table :data="tableData" border style="width:70%;">
          <el-table-column prop="date" label="序号"></el-table-column>
          <el-table-column prop="name" label="资源ID"></el-table-column>
          <el-table-column prop="address" label="资源名称"></el-table-column>
          <el-table-column prop="date" label="资源分类"></el-table-column>
          <el-table-column prop="name" label="数量"></el-table-column>
        </el-table>
      </div>
    </panel>

    <panel title="活动执行" :show="true">
      <div class="template-info table-info">
        <el-table :data="tableData" border style="width:70%;">
          <el-table-column prop="date" label="执行编号"></el-table-column>
          <el-table-column prop="name" label="责任人"></el-table-column>
          <el-table-column prop="address" label="执行角色"></el-table-column>
          <el-table-column prop="date" label="执行计划名称"></el-table-column>
          <el-table-column prop="name" label="执行计划说明"></el-table-column>
          <el-table-column prop="address" label="预期开始时间"></el-table-column>
          <el-table-column prop="date" label="预期结束时间"></el-table-column>
        </el-table>
      </div>
    </panel>

    <panel title="监控指标" :show="true">
      <div class="template-info target-check">
        <p>维度选择：</p>
        <el-checkbox-group v-model="checkedItem" class="check-box">
          <el-checkbox v-for="item in checkList" :key="item" :label="item"></el-checkbox>
        </el-checkbox-group>
        <p>指标选择：</p>
        <el-checkbox-group v-model="checkedItem2" class="check-box">
          <el-checkbox v-for="item in checkList2" :key="item" :label="item"></el-checkbox>
        </el-checkbox-group>
      </div>
    </panel>

    <slot name="footer-btn"></slot>
  </div>
</template>

<script>
export default {
  name: "name",
  prop: [],
  data() {
    return {
      templateName: "",
      checkedItem: [],
      checkedItem2: [],
      baseInfo: [
        { title: "活动名称", value: "", prop: "gameCode" },
        { title: "活动类型", value: "", prop: "cycleType" },
        { title: "活动时间", value: "", prop: "gameStatus" },
        { title: "活动简介", value: "", prop: "gameName" },
        { title: "活动管理方", value: "", prop: "officialEndSale" },
        { title: "适用群体", value: "", prop: "gameCode" },
        { title: "活动区域", value: "", prop: "cycleType" },
        { title: "活动大厅", value: "", prop: "gameStatus" },
        { title: "活动目标", value: "", prop: "gameName" },
        { title: "活动预算", value: "", prop: "officialEndSale" },
        { title: "是否发布消息", value: "", prop: "gameName" },
        { title: "消息内容", value: "", prop: "officialEndSale" }
      ],
      ruleInfo: [
        { title: "规则1", value: "充值100赠送10", prop: "gameCode" },
        { title: "规则2", value: "消费1000赠送100", prop: "cycleType" },
        { title: "规则3", value: "完成任务赠送50", prop: "gameStatus" }
      ],
      tableData: [],
      checkList: ["中心", "省级", "市级", "厅级"],
      checkList2: [
        "中心",
        "省级",
        "市级",
        "充值总额",
        "充值总订单数",
        "投注总额",
        "投注总订单数",
        "充值用户数",
        "投注用户数",
        "提现用户数",
        "每用户充值额",
        "用户数",
        "提现总额"
      ]
    };
  },

  methods: {},
  computed: {},
  created() {
    this.templateName = this.$route.query.name;
  },
  mounted() {},
  components: {},
  updated() {}
};
</script>


<style lang="less" scoped >
@import "./less/index.less";
</style>