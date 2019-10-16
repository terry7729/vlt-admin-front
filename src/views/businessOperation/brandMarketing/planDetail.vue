<template>
  <div class="vlt-card plan-dedail">
    <div>
      <h3>活动计划详情</h3>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="活动内容" name="activeContent">
          <panel-static title="详细资料" style="margin-top: 10px;">
            <base-info :infoList="infoList" class="base-data"></base-info>
          </panel-static>
          <panel-static title="活动规则">
            <el-form :inline="true" class="base-data">
              <el-form-item v-for="item in ruleList" :key="item.index" class="rule-form">
                <el-select v-model="item.value" placeholder="充值">
                  <el-option
                    v-for="option in item.type"
                    :key="option.index"
                    :label="option"
                    :value="option"
                  ></el-option>
                </el-select>
                <el-input v-model="item.condition"></el-input>
                <span style="margin-right:0 5px;">赠送:</span>
                <el-input v-model="item.award"></el-input>
              </el-form-item>
            </el-form>
          </panel-static>
          <panel-static title="活动资金">
            <div class="base-data">
              <el-table :data="tableData" border>
                <el-table-column prop="data" label="序号"></el-table-column>
                <el-table-column prop="num" label="游戏编号"></el-table-column>
                <el-table-column prop="name" label="游戏名称"></el-table-column>
                <el-table-column prop="city" label="游戏所属机构"></el-table-column>
                <el-table-column prop="way" label="注入方式"></el-table-column>
                <el-table-column prop="money" label="注入金额"></el-table-column>
              </el-table>
              <p>备注：</p>
            </div>
          </panel-static>

          <panel-static title="活动资源">
            <div class="base-data">
              <el-table :data="tableData" border>
                <el-table-column prop="data" label="序号"></el-table-column>
                <el-table-column prop="num" label="资源ID"></el-table-column>
                <el-table-column prop="name" label="资源名称"></el-table-column>
                <el-table-column prop="city" label="资源分类"></el-table-column>
                <el-table-column prop="money" label="数量"></el-table-column>
              </el-table>
              <p>备注：</p>
            </div>
          </panel-static>

          <panel-static title="活动执行">
            <div class="base-data">
              <el-table :data="tableData" border>
                <el-table-column prop="data" label="执行编号"></el-table-column>
                <el-table-column prop="num" label="责任人"></el-table-column>
                <el-table-column prop="name" label="执行角色"></el-table-column>
                <el-table-column prop="city" label="执行计划名称"></el-table-column>
                <el-table-column prop="money" label="执行计划说明"></el-table-column>
                <el-table-column prop="city" label="执行开始时间"></el-table-column>
                <el-table-column prop="money" label="执行结束时间"></el-table-column>
              </el-table>
              <p>备注：</p>
            </div>
          </panel-static>

          <panel-static title="监控指标">
            <div class="base-data" style="margin-bottom:100px;">
              <div class="dimension-check">
                <span>维度选择：</span>
                <el-checkbox :checked="checked" v-for="item in checkList" :key="item.index">{{item}}</el-checkbox>
              </div>
              <div class="ration-target">
                <span>定量指标：</span>
                <div class="ration-check">
                  <el-checkbox
                    :checked="checked"
                    v-for="item in checkList2"
                    :key="item.index"
                  >{{item}}</el-checkbox>
                </div>
              </div>
            </div>
          </panel-static>
        </el-tab-pane>

        <el-tab-pane label="审核流程" name="auditProcess">
          <div class="state-inform">
            <span>状态</span>
            <h3>正常</h3>
          </div>

          <panel-static title="流程进度">
            <el-steps :active="3" class="progress-bar">
              <el-step title="创建活动" description="李某2019-10-14"></el-step>
              <el-step title="部门初审" description="王某"></el-step>
              <el-step title="财务复审" description="赵某"></el-step>
              <el-step title="经理批复" description="某某"></el-step>
            </el-steps>

            <el-tabs v-model="disposeDetail" @tab-click="handleClick">
              <el-tab-pane label="处理日志" name="disposeLog">
                <el-table :data="tableData">
                  <el-table-column prop="name" label="步骤名"></el-table-column>
                  <el-table-column prop="preson" label="处理人"></el-table-column>
                  <el-table-column prop="message" label="处理意见"></el-table-column>
                  <el-table-column prop="result" label="执行结果"></el-table-column>
                  <el-table-column prop="date" label="处理时间"></el-table-column>
                  <el-table-column prop="time" label="耗时"></el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="流程图预览" name="processImg">
                <h2>流程图</h2>
              </el-tab-pane>
            </el-tabs>
          </panel-static>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      value: "",
      activeName: "activeContent",
      disposeDetail: "disposeLog",
      tableData: [
        {
          data: "1",
          num: "007",
          name: "大乐透",
          city: "深圳",
          way: "发行经费",
          money: "10000"
        }
      ],
      infoList: [
        { title: "活动名称", value: "", prop: "gameCode" },
        { title: "活动类型", value: "", prop: "cycleType" },
        { title: "活动时间", value: "", prop: "gameStatus" },
        { title: "活动简介", value: "", prop: "gameName" },
        { title: "活动组织方", value: "", prop: "officialEndSale" },
        { title: "活动管理方", value: "", prop: "gameCode" },
        { title: "适用群体", value: "", prop: "cycleType" },
        { title: "活动区域", value: "", prop: "gameStatus" },
        { title: "活动预算", value: "", prop: "gameName" },
        { title: "活动大厅", value: "", prop: "officialEndSale" },
        { title: "活动目标", value: "", prop: "gameName" }
      ],
      ruleList: [
        {
          value: "",
          type: ["充值", "消费", "完成任务"],
          condition: "100",
          award: "100元"
        },
        {
          value: "",
          type: ["充值", "消费", "完成任务"],
          condition: "100",
          award: "100元"
        },
        {
          value: "",
          type: ["充值", "消费", "完成任务"],
          condition: "100",
          award: "100元"
        },
        {
          value: "",
          type: ["充值", "消费", "完成任务"],
          condition: "100",
          award: "100元"
        }
      ],
      checked: true,
      checkList: ["中心", "省级", "市级", "厅级", "渠道", "大厅", "游戏终端"],
      checkList2: [
        "充值总额",
        "充值总订单数",
        "投注总额",
        "投注总订单数",
        "提现总额",
        "活动预算使用分类汇总",
        "用户数",
        "充值用户数",
        "投注用户数",
        "提现用户数",
        "每用户充值额",
        "每用户投注额",
        "充值总额",
        "充值总订单数",
        "投注总额",
        "投注总订单数",
        "提现总额",
        "活动预算使用分类汇总",
        "用户数",
        "充值用户数",
        "投注用户数",
        "提现用户数",
        "每用户充值额",
        "每用户投注额"
      ]
    };
  },
  components: {},
  methods: {
     handleClick(tab, event) {
        console.log(tab, event);
      }
  }
};
</script>

<style lang="less" scoped>
.plan-dedail {
  .base-data {
    width: 60%;
    margin: 20px 0 20px 150px;
  }
  .ration-target {
    margin-top: 20px;
    .ration-check {
      margin-left: 70px;
      margin-top: -16px;
      .el-checkbox {
        margin-bottom: 20px;
      }
    }
  }
  .progress-bar {
    width: 800px;
    margin: 20px 150px;
  }
  .state-inform{
    position: absolute;
    left:900px;
    top: 12px;
    text-align: right;
  }
}
</style>
