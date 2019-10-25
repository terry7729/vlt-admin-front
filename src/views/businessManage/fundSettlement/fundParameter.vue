<template>
  <div class="vlt-card">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    >
      <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions" position="left"></control-bar>
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
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="getDetail(scope.row)">查看</el-button>
            <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
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
  name: "",
  data() {
    return {
      // 搜索组件配置
      searchOptions: [
        {
          type: "select",
          prop: "gameName",
          value: "",
          title: "游戏名称：",
          options: [
            {
              label: "王者荣耀1",
              value: "王者荣耀1"
            },
            {
              label: "游戏2",
              value: "游戏2"
            }
          ]
        },
        {
          type: "input",
          prop: "createBy",
          value: "",
          title: "创建人："
        },
        {
          title: "生效时间：",
          type: "datetime",
          prop: "effectiveTime",
          value: ""
        },
        {
          title: "创建时间：",
          type: "datetime",
          prop: "createTime",
          value: ""
        }
      ],
      controlOptions: [
        { name: "全局参数", type: "primary", icon: "" } // type为按钮的五种颜色， icon为具体的图标
      ],
      tableDatas: {
        tableData: [],
        tableKey: [
          {
            label: "序号",
            value: "id",
            width: "50"
          },
          {
            label: "游戏编号",
            value: "gameCode",
            width: "80"
          },
          {
            label: "游戏名称",
            value: "gameName",
            width: ""
          },
          {
            label: "返奖率",
            value: "returnRate",
            width: "60"
          },
          {
            label: "调节基金",
            value: "regulationFund",
            width: "80"
          },
          {
            label: "代销费率",
            value: "generationRate",
            width: ""
          },
          {
            label: "发行经费",
            value: "lssueFundPro",
            width: ""
          },
          {
            label: "公益金",
            value: "publicFundPro",
            width: ""
          },
          {
            label: "游戏点兑换比例",
            value: "gameConPro",
            width: ""
          },
          {
            label: "状态",
            value: "status",
            width: "80"
          },
          {
            label: "创建人",
            value: "createBy",
            width: ""
          },
          {
            label: "生效时间",
            value: "effectiveTime",
            width: ""
          },
          {
            label: "创建时间",
            value: "createTime",
            width: ""
          }
        ]
      }
    };
  },
  created() {
    this.init();
  },

  methods: {
    async init() {
      let data = {
        page: 1,
        pageSize: 10,
        param: {}
      };
      let res = await this.$api.getFundsParameter({ data });
      if (res.code === 0) {
        this.tableDatas.tableData = res.data.records;
      }
    },
    async search(form) {
      let data = {
        page: 1,
        pageSize: 10,
        param: form
      };
      let res = await this.$api.getFundsParameter({ data });
      if (res.code === 0) {
        this.tableDatas.tableData = res.data.records;
      }
    },

    selectBtn(val) {
      this.$router.push({
        name: "globalParameter"
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(pageSize) {
      console.log(pageSize);
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage);
    },
    getDetail(row) {
      this.$router.push({
        name: "fundParameterDetail",
        query: {
          id: row.id
        }
      });
    },
    edit(row) {
      console.log(row);
      this.$router.push({
        name: "fundParameterEdit",
        query: {
          id: row.id
        }
      });
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
</style>



