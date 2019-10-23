<template>
  <!-- 投注卡规则 -->
  <div class="vlt-card">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="100px"
    >
      <control-bar slot="extend-bar" position="left" @select="selectBtn" :options="controlOptions"></control-bar>
    </search-bar>

    <el-row class="card-table">
      <el-table
        :data="tableData.records"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        class="table-box"
      >
        <el-table-column
          v-for="(item,key) in tableDatas.tableKey"
          :key="key"
          :prop="item.value"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="toDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <table-paging
      position="right"
      :total="tableData.total"
      :currentPage="tableData.current"
      :pageSize="tableData.size"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></table-paging>
    <edit-betting-rule :isShow="showformDia" :oData="rowData" @closeDia="closeDia"></edit-betting-rule>
  </div>
</template>

<script type="text/javascript">
import editBettingRule from '@/views/businessManage/bettingCardManage/editBettingRule'
export default {
  name: "",
  data() {
    return {
      showformDia: false,
      // 搜索组件配置
      searchOptions: [
        {
          type: "select",
          title: "所属机构：",
          prop: "insId",
          options: [{ label: "中福彩", value: "1" }]
        },
        // {
        //   type: "datetime-range",
        //   prop: "date4",
        //   value: "",
        //   title: "生效日期：",
        //   placeholder: ["开始时间", "结束时间"]
        // }
      ],
      controlOptions: [{ name: "新建", type: "primary", icon: "plus" }],
      tableData: {
        records: [],
        total: 4,
        size: 15,
        current: 1,
        searchCount: true,
        pages: 1
      },
      tableDatas: {
        tableKey: [
          { label: "序号", value: "id", width: "80" },
          { label: "所属机构", value: "insName", width: "" },
          { label: "选择渠道", value: "channelName", width: "200" },
          { label: "周期", value: "circle", width: "" },
          { label: "笔数", value: "limitPenNum", width: "80" },
          { label: "限额", value: "limitAmount", width: "" },
          { label: "限制次数", value: "limitNum", width: "" }
        ]
      },
      rowData: {}
    };
  },
  components: {
    'edit-betting-rule': editBettingRule
  },
  created() {
    // this.getList(1, 2);
    this.getList();
  },
  methods: {
    selectBtn(val) {
      this.$router.push({
        name: "newbettingRule"
      });
    },
    search(form) {
      console.log("search", form);
      this.getList(form.insId)
    },

    async getList(insId = 0, page=1, size=10) {
      let options = {
        page: page,
        pageSize: size,
        param: {
          insId: insId
        }
      };
      let data = JSON.parse(JSON.stringify(options));
      let result = await this.$api.getBettingRulesList({ data });
      console.log("data", result);
      if (result.code == 0) {
        this.tableData = result.data;
      }
    },
    async deleteBettingRule(id) {
      const _this = this;
      let result = await _this.$api.deleteBettingCard(id);
      return result;
    },
    edit(row) {
      console.log(row);
      this.rowData = row;
      this.showformDia = true;
    },
    toDelete(row) {
      this.$confirm("将永久删除这条规则, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let result = this.deleteBettingRule(row.id);
          result.then(resp => {
            if (resp.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            // 删除之后再次刷新一下数据
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(pageSize) {
      this.getList(0, 1, pageSize);
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage);
      this.getList(0, currentPage, 10);
    },
    closeDia () {
      this.showformDia = false;
      this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.vlt-card {
  padding: 20px;
}
</style>
