<template>
  <!-- 设备管理 - 设备列表 -->
  <div class>
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="tableData.total"
      labelWidth="80px"
    ></search-bar>

    <el-row class="card-table">
      <el-table
        :data="tableData.records"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        class="table-box"
      >
        <el-table-column
          v-for="(item,key) in tableKey"
          :key="key"
          :prop="item.value"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleClick(scope.row)">查看</el-button>
            <el-button type="primary" size="mini" @click="resume(scope.row)">履历</el-button>
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
  name: "equipmentList",
  data() {
    return {
      // 搜索组件配置
      searchOptions: [
        {
          type: "select",
          prop: "deviceName",
          value: "",
          title: "设备名称：",
          placeholder: "请选择",
          options: [
            { label: "投注机", value: "投注机" },
            { label: "彩明机", value: "投注机" }
          ]
        },
        {
          type: "select",
          prop: "deviceModel",
          value: "",
          title: "设备型号：",
          placeholder: "请选择",
          options: [
            { label: "SD123", value: "SD123" },
            { label: "SD456", value: "SD456" },
            { label: "MODEL003", value: "MODEL003" }
          ]
        },
        {
          type: "input",
          prop: "deviceCode",
          value: "",
          title: "设备编码：",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "nameX",
          value: "",
          title: "所属仓库：",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "status",
          value: "",
          title: "设备状态：",
          placeholder: "请输入",
          options: [
            { label: "正常", value: "1" },
            { label: "已损坏", value: "2" },
            { label: "故障", value: "3" }
          ]
        }
      ],
      tableData: {
        records: [],
        total: 0,
        size: 0,
        current: 0,
        orders: [],
        searchCount: true,
        pages: 0
      },
      tableKey: [
        { label: "序号", value: "id", width: "80" },
        { label: "设备名称", value: "deviceName", width: "" },
        { label: "设备型号", value: "deviceModel", width: "100" },
        { label: "设备编码", value: "deviceCode", width: "" },
        { label: "仓库类型", value: "typeX", width: "80" },
        { label: "所属仓库", value: "nameX", width: "" },
        { label: "使用状态", value: "useStatus", width: "" },
        { label: "设备状态", value: "status", width: "" }
      ],
      options: {
        page: 1,
        pageSize: 10,
        deviceCode: "",
        deviceModel: "",
        deviceName: "",
        nameX: "",
        status: "",
        param: {}
      },
      params: {},
    };
  },
  components: {},
  created() {
    this.initList(this.options);
  },
  methods: {
    async initList(options) {
      console.log('this.options', options);
      let data = JSON.parse(JSON.stringify(options));
      let result = await this.$api.equipmentListPage({ data });
      console.log("data", result);
      if (result.code === 0) {
        this.tableData = result.data;
        this.tableData.records = result.data.records.map(item => {
          item.useStatus = this.formatUseStatus(item.useStatus);
          item.status = this.forMatStatus(item.status);
          return item;
        });
      }
    },
    search(form) {
      console.log("search", form);
      Object.assign(this.params,this.options, form)
      this.initList(this.params);
    },
    handleClick(row) {
      this.$router.push({
        name: "equipmentDesc",
        query: {
          id: row.id
        }
      });
    },
    resume(row) {
      console.log(row);
      this.$router.push({
        name: "equipmentResume"
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(pageSize) {
      this.tableData.size = pageSize;
      this.options.pageSize = pageSize
      this.initList(this.options);
    },
    handleCurrentChange(currentPage) {
      this.options.page = currentPage;
      this.initList(this.options);
    },
    formatUseStatus(status) {
      switch (status) {
        case "0":
          return (status = "闲置中");
        case "1":
          return (status = "运行中");
      }
    },
    forMatStatus(status) {
      switch (status) {
        case "0":
          return (status = "正常");
        case "1":
          return (status = "已损坏");
        case "2":
          return (status = "故障");
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
