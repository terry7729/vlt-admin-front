<template>
  <!-- 配置管理 - 故障类型 -->
  <div class="vlt-card">
    故障类型
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    ><control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions" position="left"></control-bar></search-bar>

    <el-row class="card-table">
      <el-table
        :data="tableDatas.tableData"
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

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleClick(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <table-paging
      position="right"
      :total="999"
      :currentPage="1"
      :pageSize="10"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></table-paging>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "accessoriesList",
  data() {
    return {
      // 搜索组件配置
      searchOptions: [
        {
          type: "input",
          prop: "inputName",
          value: "",
          title: "故障类型：",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "inputName2",
          value: "",
          title: "设备名称：",
          placeholder: "请输入"
        }
      ],
      controlOptions: [
        { name: "新增", type: "primary", icon: "plus" }, // type为按钮的五种颜色， icon为具体的图标
      ],
      tableDatas: {
        tableData: [
          {
            id: 0,
            category: "设备",
            name: "投注机",
            type: "投注机进水"
          },
          {
            id: 1,
            category: "设备",
            name: "投注机",
            type: "投注机进水"
          },
          {
            id: 2,
            category: "设备",
            name: "投注机",
            type: "投注机进水"
          },
          {
            id: 3,
            category: "设备",
            name: "投注机",
            type: "投注机进水"
          },
          {
            id: 4,
            category: "设备",
            name: "投注机",
            type: "投注机进水"
          },
          {
            id: 5,
            category: "设备",
            name: "投注机",
            type: "投注机进水"
          },
          {
            id: 6,
            category: "设备",
            name: "投注机",
            type: "投注机进水"
          },
          {
            id: 7,
            category: "设备",
            name: "投注机",
            type: "投注机进水"
          },
          {
            id: 8,
            category: "设备",
            name: "投注机",
            type: "投注机进水"
          },
          {
            id: 9,
            category: "设备",
            name: "投注机",
            type: "投注机进水"
          }
        ],
        tableKey: [
          {
            label: "序号",
            value: "id",
            width: "80"
          },
          {
            label: "物品类别",
            value: "category",
            width: ""
          },
          {
            label: "物品名称",
            value: "name",
            width: "100"
          },
          {
            label: "故障类型",
            value: "type",
            width: ""
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    search(form) {
      console.log("search", form);
    },
    selectBtn() {
      this.$router.push({
        name: 'addFaultType'
      })
    },
    handleClick(row) {
      // this.$router.push({
      //   name: "knowledgeBaseInfo",
      //   query: {
      //     id: row.id
      //   }
      // });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(pageSize) {
      console.log(pageSize);
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
