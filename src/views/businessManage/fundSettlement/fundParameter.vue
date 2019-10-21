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
            <el-button type="primary" size="mini" @click="handleClick(scope.row)">查看</el-button>
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
          prop: "selectName",
          value: "",
          title: "游戏名称：",
          placeholder: "请选择",
          options: [
            {
              label: "游戏1",
              value: 1
            },
            {
              label: "游戏2",
              value: 2
            }
          ]
        },
        {
          type: "input",
          prop: "inputName",
          value: "",
          title: "创建人：",
          placeholder: "请输入"
        },
        {
          title: "生效时间：",
          type: "datetime-range",
          prop: "date3",
          value: ["2019-08-12 09:10:10", "2019-09-20 12:12:12"],
          option: ["start", "end"]
        },
        {
          title: "创建时间：",
          type: "datetime-range",
          prop: "date4",
          value: ["2019-08-12 09:10:10", "2019-09-20 12:12:12"],
          option: ["start", "end"]
        },
      ],
      controlOptions: [
        { name: "全局参数", type: "primary", icon: "" } // type为按钮的五种颜色， icon为具体的图标
      ],
      tableDatas: {
        tableData: [
          {
            id: 0,
            gameNumber: '1001',
            gameName: 'A',
            returnRate: '64%',
            regulatoryFund: '2%',
            agencySalesRate: '66%',
            issuanceFunding: '19%',
            communityFund: '15%',
            pointExchange: '1:100',
            status: '审核中',
            founder: 'XX',
            effectiveTime: '2019-12-25 01:50:06',
            creationTime: '2019-02-25 01:50:06'
          },
          {
            id: 1,
            gameNumber: '1001',
            gameName: 'A',
            returnRate: '64%',
            regulatoryFund: '2%',
            agencySalesRate: '66%',
            issuanceFunding: '19%',
            communityFund: '15%',
            pointExchange: '1:100',
            status: '审核中',
            founder: 'XX',
            effectiveTime: '2019-12-25 01:50:06',
            creationTime: '2019-02-25 01:50:06'
          },
          {
            id: 2,
            gameNumber: '1001',
            gameName: 'A',
            returnRate: '64%',
            regulatoryFund: '2%',
            agencySalesRate: '66%',
            issuanceFunding: '19%',
            communityFund: '15%',
            pointExchange: '1:100',
            status: '审核中',
            founder: 'XX',
            effectiveTime: '2019-12-25 01:50:06',
            creationTime: '2019-02-25 01:50:06'
          },
          {
            id: 3,
            gameNumber: '1001',
            gameName: 'A',
            returnRate: '64%',
            regulatoryFund: '2%',
            agencySalesRate: '66%',
            issuanceFunding: '19%',
            communityFund: '15%',
            pointExchange: '1:100',
            status: '审核中',
            founder: 'XX',
            effectiveTime: '2019-12-25 01:50:06',
            creationTime: '2019-02-25 01:50:06'
          },
          {
            id: 4,
            gameNumber: '1001',
            gameName: 'A',
            returnRate: '64%',
            regulatoryFund: '2%',
            agencySalesRate: '66%',
            issuanceFunding: '19%',
            communityFund: '15%',
            pointExchange: '1:100',
            status: '审核中',
            founder: 'XX',
            effectiveTime: '2019-12-25 01:50:06',
            creationTime: '2019-02-25 01:50:06'
          },
          {
            id: 5,
            gameNumber: '1001',
            gameName: 'A',
            returnRate: '64%',
            regulatoryFund: '2%',
            agencySalesRate: '66%',
            issuanceFunding: '19%',
            communityFund: '15%',
            pointExchange: '1:100',
            status: '审核中',
            founder: 'XX',
            effectiveTime: '2019-12-25 01:50:06',
            creationTime: '2019-02-25 01:50:06'
          },
          {
            id: 6,
            gameNumber: '1001',
            gameName: 'A',
            returnRate: '64%',
            regulatoryFund: '2%',
            agencySalesRate: '66%',
            issuanceFunding: '19%',
            communityFund: '15%',
            pointExchange: '1:100',
            status: '审核中',
            founder: 'XX',
            effectiveTime: '2019-12-25 01:50:06',
            creationTime: '2019-02-25 01:50:06'
          },
          {
            id: 7,
            gameNumber: '1001',
            gameName: 'A',
            returnRate: '64%',
            regulatoryFund: '2%',
            agencySalesRate: '66%',
            issuanceFunding: '19%',
            communityFund: '15%',
            pointExchange: '1:100',
            status: '审核中',
            founder: 'XX',
            effectiveTime: '2019-12-25 01:50:06',
            creationTime: '2019-02-25 01:50:06'
          },
          {
            id: 8,
            gameNumber: '1001',
            gameName: 'A',
            returnRate: '64%',
            regulatoryFund: '2%',
            agencySalesRate: '66%',
            issuanceFunding: '19%',
            communityFund: '15%',
            pointExchange: '1:100',
            status: '审核中',
            founder: 'XX',
            effectiveTime: '2019-12-25 01:50:06',
            creationTime: '2019-02-25 01:50:06'
          },
          {
            id: 9,
            gameNumber: '1001',
            gameName: 'A',
            returnRate: '64%',
            regulatoryFund: '2%',
            agencySalesRate: '66%',
            issuanceFunding: '19%',
            communityFund: '15%',
            pointExchange: '1:100',
            status: '审核中',
            founder: 'XX',
            effectiveTime: '2019-12-25 01:50:06',
            creationTime: '2019-02-25 01:50:06'
          }
        ],
        tableKey: [
          {
            label: "序号",
            value: "id",
            width: '50'
          },
          {
            label: "游戏编号",
            value: "gameNumber",
            width: '80'
          },
          {
            label: "游戏名称",
            value: "gameName",
            width: ''
          },
          {
            label: "返奖率",
            value: "returnRate",
            width: '60'
          },
          {
            label: "调节基金",
            value: "regulatoryFund",
            width: '80'
          },{
            label: "代销费率",
            value: "agencySalesRate",
            width: ''
          },{
            label: "发行经费",
            value: "issuanceFunding",
            width: ''
          },{
            label: "公益金",
            value: "communityFund",
            width: ''
          },{
            label: "游戏点兑换比例",
            value: "pointExchange",
            width: ''
          },{
            label: "状态",
            value: "status",
            width: '80'
          },{
            label: "创建人",
            value: "founder",
            width: ''
          },{
            label: "生效时间",
            value: "effectiveTime",
            width: ''
          },{
            label: "创建时间",
            value: "creationTime",
            width: ''
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

    selectBtn(val) {
      this.$router.push({
        name: 'globalParameter'
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
    },
    handleClick(row) {
      this.$router.push({
        name: 'fundParameterDetail',
        query: {
          id: row.id
        }
      })
    },
    edit (row) {
      console.log(row);
      this.$router.push({
        name: 'fundParameterEdit',
        query: {
          id: row.id
        }
      })
    },
  }
};
</script>

<style lang="less" scoped>
</style>



