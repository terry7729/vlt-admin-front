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
          <template slot-scope="scope">
            <table-row-status
              statusField="status"
              idField="id"
              :scope="scope"
              :tableData="tableData"
              :rowName="scope.row.name"
              :option="{
                'enable': {
                  apiName: 'apiName', // 接口名称
                  label: '启用', // 按钮文字
                  value: 0 // 接口字段传值
                },
                'logout': {
                  apiName: 'apiName',
                  label: '冻结',
                  value: 1
                }
              }"
            ></table-row-status>
          </template>
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
      total: 100
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>

