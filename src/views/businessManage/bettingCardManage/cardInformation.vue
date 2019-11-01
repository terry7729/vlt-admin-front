
<template>
  <!-- 投注卡信息 -->
  <div class="vlt-card">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="tableData.total"
      labelWidth="100px"
    ></search-bar>
    <el-row class="card-table">
      <el-table
        :data="tableData.records"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        class="table-box"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          v-for="(item,key) in tableKey"
          :key="key"
          :prop="item.value"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleClick(scope.row)">查看</el-button>
            <!-- <el-button v-if="scope.row.status === '待激活'" type="primary" size="mini" @click="activation(scope.row)">激活</el-button> -->
            <el-button type="danger" size="mini" @click="logout(scope.row)">注销</el-button>
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
  </div>
</template>

<script type="text/javascript">
export default {
  name: "cardInformation",
  data() {
    return {
      // 搜索组件配置
      searchOptions: [
        { title: "投注卡编号：", type: "input", prop: "cardNumber", value: "" },
        {
          title: "所属机构：",
          type: "select",
          prop: "insId",
          value: "",
          options: [{ label: "中福彩", value: "1" }]
        },
        {
          title: "投注卡类型：",
          type: "select",
          prop: "bettingCardType",
          value: "",
          options: [
            { label: "普通卡", value: 1 },
            { label: "会员卡", value: 2 },
            { label: "试玩卡", value: 3 }
          ]
        }
      ],
      tableKey: [
        { label: "序号", value: "id", width: "80" },
        { label: "编号", value: "cardNumber", width: "" },
        { label: "投注卡类型", value: "bettingCardType", width: "100" },
        { label: "所属机构", value: "insName", width: "" },
        { label: "状态", value: "cardStatus", width: "80" },
        { label: "备注", value: "remark", width: "" }
      ],
      tableData: {},
      options: {
        page: 1,
        pageSize: 10,
        param: {}
      }
    };
  },
  components: {},
  created() {
    this.initList(this.options);
  },
  methods: {
    async initList(options) {
      let data = JSON.parse(JSON.stringify(options));
      let result = await this.$api.bettingCardInfoList({ data });
      console.log("data", result);
      if (result.code == 0) {
        this.tableData = result.data;
        this.tableData.records = result.data.records.map(item => {
          item.bettingCardType = this.forMatType(item.bettingCardType);
          item.cardStatus = this.forMatStatus(item.cardStatus);
          return item;
        });
      }
    },
    search(form) {
      // console.log("search", form);
      this.options.param = {
        bettingCardType: form.bettingCardType,
        cardNumber: form.cardNumber,
        insId: form.insId
      };
      this.initList(this.options);
    },
    handleClick(row) {
      this.$router.push({
        name: "infoDetail",
        query: {
          id: row.id
        }
      });
    },
    activation(row) {
      console.log(row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(pageSize) {
      this.tableData.size = pageSize;
      this.options.pageSize = pageSize;
      this.initList(this.options);
    },
    handleCurrentChange(currentPage) {
      this.options.page = currentPage;
      this.initList(this.options);
    },
    logout(row) {
      console.log("注销", row);
      this.$confirm("将永久注销此数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let result = this.deleteBetting({data:row.id});
          result.then(resp => {
            console.log(resp);
            if (resp.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            // 删除之后再次刷新一下数据
            this.initList(this.options);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async deleteBetting(id) {
      const _this = this;
      let result = await _this.$api.deleteBettingCardInfo(id);
      return result;
    },
    forMatType(type) {
      switch (type) {
        case 1:
          return (type = "普通卡");
        case 2:
          return (type = "会员卡");
        case 3:
          return (type = "试玩卡");
      }
    },
    forMatStatus(status) {
      switch (status) {
        case 1:
          return (status = "待激活");
        case 2:
          return (status = "已激活");
        case 3:
          return (status = "失效");
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
