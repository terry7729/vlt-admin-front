<template>
  <div class="vlt-card">
    <div class="search">
      <search-Bar :options="option"></search-Bar>
    </div>
    <div class="tipsline">
      <tips-line>操作人搜索"derek"共搜索到11项数据</tips-line>
    </div>
    <div class="el_table">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="序号" width="100"></el-table-column>
        <el-table-column prop="switchName" label="开关名称 "></el-table-column>
        <el-table-column prop="switchDescribe" label="开关描述"></el-table-column>
        <el-table-column label="状态  ">
          <div class="table-row-status-comp">
            <el-button
              size="mini"
              type="primary"
              v-if="option.enable"
              @click="openConfirm(option.enable.label, option.enable.value)"
              :disabled="disabled || scope.row[statusField] == option.enable.value"
            >{{option.enable.label}}</el-button>
            <!--禁用、冻结-->
            <el-button
              size="mini"
              type="warning"
              v-if="option.disable"
              @click="openConfirm(option.disable.label, option.disable.value)"
              :disabled="disabled || scope.row[statusField] == option.disable.value"
            >{{option.disable.label}}</el-button>
          </div>
        </el-table-column>
      </el-table>
      <table-paging :total="total"></table-paging>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      option: [
        {
          title: "开关名称",
          prop: "select",
          type: "select",
          options: [
            {
              value: "beijing",
              label: "北京"
            },
            {
              value: "shanghai",
              label: "上海"
            }
          ],
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        }
      ],
      tableData: [
        {
          id: 1,
          switchName: "实名制认证",
          switchDescribe: "渠道销售中对客户是否实名认证要求"
        },
        {
          id: 2,
          switchName: "销售金额计算",
          switchDescribe:
            "按游戏，用户中奖金额是否计算入销售额设置，可预设切换时间，支持切换后对切换前，切换后的数据进行统计与显示"
        }
      ],
      total:100,
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>

