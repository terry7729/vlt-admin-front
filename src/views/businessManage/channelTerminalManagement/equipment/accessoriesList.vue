<template>
  <!-- 设备管理 - 配件列表 -->
  <div class="">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    >
    </search-bar>

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
            <el-button type="primary" size="mini" @click="resume(scope.row)">履历</el-button>
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
          title: "配件名称：",
          placeholder: "请选择",
          options: [
            {
              label: "设备1",
              value: 1
            },
            {
              label: "设备2",
              value: 2
            }
          ]
        },
        {
          type: "select",
          prop: "selectName2",
          value: "",
          title: "配件型号：",
          placeholder: "请选择",
          options: [
            {
              label: "型号1",
              value: 1
            },
            {
              label: "型号2",
              value: 2
            },
            {
              label: "型号3",
              value: 3
            }
          ]
        },
        {
          type: "input",
          prop: "inputName",
          value: "",
          title: "配件编码：",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "inputName2",
          value: "",
          title: "所属仓库：",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "selectName3",
          value: "",
          title: "配件状态：",
          placeholder: "请选择",
          options: [
            {
              label: "状态1",
              value: 1
            },
            {
              label: "状态2",
              value: 2
            },
            {
              label: "状态3",
              value: 3
            }
          ]
        }
      ],
      tableDatas: {
        tableData: [
          {
            id: 0,
            accessories: 'xxx',
            type: 'xxx',
            coding: 'xxx',
            Warehousetype: '中彩仓库',
            ownWarehouse: 'XXX仓库',
            useStatus: '运行中',
            accessoryStatus: '正常'
          },
          {
            id: 1,
            accessories: 'xxx',
            type: 'xxx',
            coding: 'xxx',
            Warehousetype: '中彩仓库',
            ownWarehouse: 'XXX仓库',
            useStatus: '运行中',
            accessoryStatus: '正常'
          },
          {
            id: 2,
            accessories: 'xxx',
            type: 'xxx',
            coding: 'xxx',
            Warehousetype: '中彩仓库',
            ownWarehouse: 'XXX仓库',
            useStatus: '运行中',
            accessoryStatus: '正常'
          },
          {
            id: 3,
            accessories: 'xxx',
            type: 'xxx',
            coding: 'xxx',
            Warehousetype: '中彩仓库',
            ownWarehouse: 'XXX仓库',
            useStatus: '运行中',
            accessoryStatus: '正常'
          },
          {
            id: 4,
            accessories: 'xxx',
            type: 'xxx',
            coding: 'xxx',
            Warehousetype: '中彩仓库',
            ownWarehouse: 'XXX仓库',
            useStatus: '运行中',
            accessoryStatus: '正常'
          },
          {
            id: 5,
            accessories: 'xxx',
            type: 'xxx',
            coding: 'xxx',
            Warehousetype: '中彩仓库',
            ownWarehouse: 'XXX仓库',
            useStatus: '运行中',
            accessoryStatus: '正常'
          },
          {
            id: 6,
            accessories: 'xxx',
            type: 'xxx',
            coding: 'xxx',
            Warehousetype: '中彩仓库',
            ownWarehouse: 'XXX仓库',
            useStatus: '运行中',
            accessoryStatus: '正常'
          },
          {
            id: 7,
            accessories: 'xxx',
            type: 'xxx',
            coding: 'xxx',
            Warehousetype: '中彩仓库',
            ownWarehouse: 'XXX仓库',
            useStatus: '运行中',
            accessoryStatus: '正常'
          },
          {
            id: 8,
            accessories: 'xxx',
            type: 'xxx',
            coding: 'xxx',
            Warehousetype: '中彩仓库',
            ownWarehouse: 'XXX仓库',
            useStatus: '运行中',
            accessoryStatus: '正常'
          },
          {
            id: 9,
            accessories: 'xxx',
            type: 'xxx',
            coding: 'xxx',
            Warehousetype: '中彩仓库',
            ownWarehouse: 'XXX仓库',
            useStatus: '运行中',
            accessoryStatus: '正常'
          }
        ],
        tableKey: [
          {
            label: "序号",
            value: "id",
            width: "80"
          },
          {
            label: "配件名称",
            value: "accessories",
            width: ""
          },
          {
            label: "配件型号",
            value: "type",
            width: "100"
          },
          {
            label: "配件编码",
            value: "coding",
            width: ""
          },
          {
            label: "仓库类型",
            value: "Warehousetype",
            width: "80"
          },
          {
            label: "所属仓库",
            value: "ownWarehouse",
            width: ""
          },
          {
            label: "使用状态",
            value: "useStatus",
            width: ""
          },
          {
            label: "配件状态",
            value: "accessoryStatus",
            width: ""
          }
        ]
      },
    };
  },
  components: {},
  methods: {
    search(form) {
      console.log("search", form);
    },  
    handleClick(row) {
      this.$router.push({
        name: 'equipmentDesc',
        query: {
          id: row.id
        }
      })
    },
    resume (row) {
      console.log(row);
      this.$router.push({
        name: 'equipmentResume'
      })
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
