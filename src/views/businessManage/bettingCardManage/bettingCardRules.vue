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
            <el-button type="primary" size="mini" @click="toDelete(scope.row)">删除</el-button>
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
  name: "",
  data() {
    return {
      // 搜索组件配置
      searchOptions: [
        {
          title: "所属机构：",
          type: "select",
          prop: "selectName",
          value: "",
          options: [
            {
              label: "机构1",
              value: 1
            },
            {
              label: "机构2",
              value: 2
            }
          ]
        },
        {
          type: "datetime-range",
          prop: "date4",
          value: "",
          title: "生效日期：",
          placeholder: ["开始时间", "结束时间"]
        }
      ],
      controlOptions: [{ name: "新建", type: "primary", icon: "plus" }],
      tableData: {
        records: [],
        total : 4,
        size : 15,
        current : 1,
        searchCount : true,
        pages : 1,
      },
      tableDatas: {
        tableKey: [
          {
            label: "序号",
            value: "id",
            width: "80"
          },
          {
            label: "所属机构",
            value: "channelName",
            width: ""
          },
          {
            label: "选择渠道",
            value: "channelName",
            width: "100"
          },

          {
            label: "周期",
            value: "circleUnit",
            width: ""
          },
          {
            label: "笔数",
            value: "limitPenNum",
            width: "80"
          },
          {
            label: "限额",
            value: "limitAmount",
            width: ""
          },
          {
            label: "限制次数",
            value: "limitNum",
            width: ""
          },
          {
            label: "生效时间",
            value: "createTime",
            width: ""
          }
        ]
      }
    };
  },
  components: {},
  created() {
    this.getList();
  },
  methods: {
    selectBtn(val) {
      // console.log(val);
      // this.showdialog = true;
      this.$router.push({
        name: "newbettingRule"
      });
    },
    search(form) {
      console.log("search", form);
    },

    async getList() {
      let options = {
        page: 0,
        pageSize: 0,
        param: {
          insId: 0
        }
      };
      let data = JSON.parse(JSON.stringify(options));
      let result = await this.$api.getBettingRulesList({ data });
      console.log("data", result);
      if (result.code == 0) {
      this.tableData = result.data
      }
    },
    edit(row) {
      console.log(row);
      // this.$router.push({
      //   name: "equipmentResume"
      // });
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
.vlt-card {
  padding: 20px;
}
</style>
