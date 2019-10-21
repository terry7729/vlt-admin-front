<template>
  <!-- 知识库审核 -->
  <div class="vlt-card">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    ></search-bar>

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
            <el-button type="primary" size="mini" @click="handleClick(scope.row)">查看</el-button>
            <el-button type="primary" size="mini" @click="toAudit(scope.row)">审核</el-button>
            <el-button type="primary" size="mini" @click="toDelete(scope.row)">删除</el-button>
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
          type: "select",
          prop: "selectName",
          value: "",
          title: "物品类别：",
          placeholder: "请选择",
          options: [
            {
              label: "类别1",
              value: 1
            },
            {
              label: "类别2",
              value: 2
            }
          ]
        },
        {
          type: "select",
          prop: "selectName",
          value: "",
          title: "故障类型：",
          placeholder: "请选择",
          options: [
            {
              label: "类型1",
              value: 1
            },
            {
              label: "类型2",
              value: 2
            }
          ]
        }
      ],
      tableDatas: {
        tableData: [
          {
            id: 0,
            category: "设备",
            name: "投注机",
            status: "投注机进水",
            type: "待审核",
            auditFesults: ""
          },
          {
            id: 1,
            category: "设备",
            name: "投注机",
            status: "投注机进水",
            type: "已审核",
            auditFesults: "通过"
          },
          {
            id: 2,
            category: "设备",
            name: "投注机",
            status: "投注机进水",
            type: "待审核",
            auditFesults: ""
          },
          {
            id: 3,
            category: "设备",
            name: "投注机",
            status: "投注机进水",
            type: "待审核",
            auditFesults: ""
          },
          {
            id: 4,
            category: "设备",
            name: "投注机",
            status: "投注机进水",
            type: "待审核",
            auditFesults: ""
          },
          {
            id: 5,
            category: "设备",
            name: "投注机",
            status: "投注机进水",
            type: "已审核",
            auditFesults: "通过"
          },
          {
            id: 6,
            category: "设备",
            name: "投注机",
            status: "投注机进水",
            type: "待审核",
            auditFesults: ""
          },
          {
            id: 7,
            category: "设备",
            name: "投注机",
            status: "投注机进水",
            type: "已审核",
            auditFesults: "通过"
          },
          {
            id: 8,
            category: "设备",
            name: "投注机",
            status: "投注机进水",
            type: "待审核",
            auditFesults: ""
          },
          {
            id: 9,
            category: "设备",
            name: "投注机",
            status: "投注机进水",
            type: "待审核",
            auditFesults: ""
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
            label: "审核状态",
            value: "status",
            width: "100"
          },
          {
            label: "故障类型",
            value: "type",
            width: ""
          },
          {
            label: "审核结果",
            value: "auditFesults",
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
    handleClick(row) {
      this.$router.push({
        name: "knowledgeBaseInfo",
        query: {
          id: row.id
        }
      });
    },

    toAudit(row) {
      console.log(row);
    },
    toDelete(row) {
      console.log(row);
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
