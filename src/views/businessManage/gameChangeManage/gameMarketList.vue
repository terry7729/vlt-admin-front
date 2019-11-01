<template>
  <div class="vlt-card game-launch-list">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="tableDataList.total"
      labelWidth="86px"
    ></search-bar>
    <el-table
      border
      ref="multipleTable"
      :data="tableDataList.records"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="序号" type="index" width="55"></el-table-column>
      <el-table-column prop="gameId" label="游戏ID"></el-table-column>
      <el-table-column prop="gameName" label="游戏名称"></el-table-column>
      <el-table-column prop="gameStatus" label="游戏状态"></el-table-column>
      <el-table-column prop="gameType" label="游戏类型"></el-table-column>
      <el-table-column prop="jackpotType" label="奖池类型"></el-table-column>
      <el-table-column prop="rewardPoolRate" label="奖池比率"></el-table-column>
      <el-table-column prop="returnPrizeRate" label="返奖比率"></el-table-column>
      <el-table-column prop="reFundRate" label="调节基金比率"></el-table-column>
      <!-- <el-table-column prop="initiator" label="销售状态" width="150px"> 
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-prevent="2000" @click.native="detail(scope.row.id)">销售</el-button>
          <el-button  size="mini" v-prevent="2000" @click.native="edit(scope.row.id)">停售</el-button>
        </template>
      </el-table-column>-->
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            v-prevent="2000"
            @click.native="detail(scope.row)"
          >查看</el-button>
          <el-button size="mini" v-prevent="2000" @click.native="edit(scope.row.id)">数据封存</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-paging
      position="right"
      :total="tableDataList.total"
      :currentPage="tableDataList.page"
      :pageSize="tableDataList.pageSize"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></table-paging>
  </div>
</template>

<script>
export default {
  name: "gameMarketPlanList",
  data() {
    return {
      tableData: [
        {
          id: "01",
          code: "SS001",
          planName: "上市-基诺",
          gameName: "基诺",
          sellRang: "销售区域",
          planState: "20%",
          startTime: "50%",
          endTime: "40%",
          initiator: "60%",
          initiateTime: "50%"
        }
      ],
      multipleSelection: [],
      totalCount: 0,
      ruleForm: {
        page: 1,
        limit: 10
      },
      searchOptions: [
        {
          type: "input",
          prop: "gameId",
          value: "",
          title: "游戏ID",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "gameName",
          value: "",
          title: "游戏名称",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "gameType",
          value: "",
          title: "游戏类型",
          placeholder: "请选择",
          options: [
            {
              label: "概率型",
              value: 1
            },
            {
              label: "奖组型",
              value: 2
            }
          ]
        },
        {
          type: "select",
          prop: "gameStatus",
          value: "",
          title: "游戏状态",
          placeholder: "请选择",
          options: [
            {
              label: "审批中",
              value: 1
            },
            {
              label: "审批拒绝",
              value: 2
            },
            {
              label: "待上市",
              value: 3
            },
            {
              label: "已上市",
              value: 4
            }
          ]
        },
        {
          type: "select",
          prop: "jackpotType",
          value: "",
          title: "奖池类型",
          placeholder: "请选择",
          options: [{ label: "选项1", value: 1 }, { label: "选项2", value: 2 }]
        }
        // {
        //   type: "datepicker-range",
        //   prop: "date2",
        //   value: "",
        //   title: "上市时间",
        //   placeholder: ["开始日期", "结束日期"]
        // }
      ],
      currentPage: 1,
      tableDataList: {},
      options: {},
      formatObj: {
        formatGameStatus:['存储', '试玩', '上市', '变更', '退市'],
        formatGameType: ['概率型','奖组型'],
        formatPoolRate:['无奖池','单奖池', '多奖池'],
        formatPlanStatus: ['审批中', '审批拒绝','待生效','已生效'],
        formatConPattern: ['测试账户', '试玩积分'],
        formatIndulgeSwitch: ['启用','禁用']
      },
    };
  },
  methods: {
    queryGameListPlanPage(options) {
      const self = this;
      const data = options;
      (async data => {
        let res = await self.$api.queryGameListPlanPage({ data });
        console.log(res);
        if (res && res.code == 0) {
          self.tableDataList = res.data;
          self.tableDataList.records = self.tableDataList.records.map( item => {
            if (item.gameStatus) {
              item.gameStatus = self.formatObj.formatGameStatus[parseInt(item.gameStatus) - 1]
            }
            if (item.gameType) {
              item.gameType = self.formatObj.formatGameType[parseInt(item.gameType) - 1];
            }
            return item 
          })
        } else {
          self.$message.warning(res.msg);
        }
      })(data);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //查看页面跳转
    detail(row) {
      console.log(row);
      this.$router.push({
        path: "./gameMarketDetail",
        query: {
          id: row.developerId,
          gameId: row.gameId
        }
      });
    },
    edit(id) {
      this.$router.push({
        path: "./gameMarketPlanEdit",
        query: { id }
      });
    },
    search(form) {
      console.log("search", form);
      this.options = {
        page: 1,
        pageSize: 10,
        ...form
      };
      this.queryGameListPlanPage(this.options)
    },
    handleSizeChange(val) {
      this.options.pageSize = val;
      this.queryGameListPlanPage(this.options);
    },
    handleCurrentChange(val) {
      this.options.page = val;
      this.queryGameListPlanPage(this.options);
    }
  },
  computed: {},
  created() {
    this.queryGameListPlanPage(this.options);
  },
  mounted() {},
  components: {}
};
</script>


<style lang="less" scoped>
</style>
