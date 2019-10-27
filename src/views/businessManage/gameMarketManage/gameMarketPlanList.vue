<template>
  <div class="vlt-card game-launch-list">
    <search-bar class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="config.total"
      labelWidth="86px">
      <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
    </search-bar>
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <!-- <el-table-column ty-pe="selection" width="55" fixed="left"></el-table-column> -->
      <el-table-column label="序号" type="index" width="55"></el-table-column>
      <el-table-column prop="id" label="上市计划ID" ></el-table-column>
      <el-table-column prop="gameListName" label="上市计划名称"></el-table-column>
      <el-table-column prop="gameName" label="游戏名称"></el-table-column>
      <el-table-column prop="gameSaleArea" label="销售范围"></el-table-column>
      <el-table-column label="计划状态">
        <template slot-scope="scope">
          {{translateStatus(scope.row.gameListStatus)}}
        </template>
      </el-table-column>
      <el-table-column prop="gameListTime" label="开始销售时间"></el-table-column>
      <el-table-column prop="gameListTime" label="结束销售时间 "></el-table-column>
      <el-table-column prop="createBy" label="发起人"></el-table-column>
      <el-table-column prop="createTime" label="发起时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-prevent="2000" @click.native="detail(scope.row)">查看</el-button>
          <el-button  size="mini" v-prevent="2000" @click.native="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-paging
      position="right"
      :total="config.total"
      :currentPage="config.current"
      :pageSize="config.size"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
    </table-paging>
  </div>
  
</template>

<script>
export default {
  name: 'gameMarketPlanList',
  data() {
    return {
      controlOptions: [
        { name: "新建上市计划", type: "primary", icon: "plus" }, // type为按钮的五种颜色， icon为具体的图标
      ],
      tableData: [],
      multipleSelection: [],
      totalCount:0,
      ruleForm: {
        page: 1,
        limit: 10
      },
      searchOptions:[
        {type: 'input', prop: 'gameListCode', value: '', title: '计划编号', placeholder: '请输入'},
        {type: 'input', prop: 'gameListName', value: '', title: '计划名称', placeholder: '请输入'},
        {type: 'input', prop: 'gameName', value: '', title: '游戏名称', placeholder: '请输入'},
        {
          type: 'select', prop: 'gameListStatus', value: '', title: '计划状态', placeholder: '请选择',
          options: [
            {
              label: '审批中',
              value: 1
            },
            {
              label: '审批拒绝',
              value: 2
            },
            {
              label: '待上市',
              value: 3
            },
            {
              label: '已上市',
              value: 4
            }
          ]
        },
        {type: 'datepicker-range', prop: 'gameListTime', value: '', title: '计划时间', placeholder: ['开始日期', '结束日期']},

      ],
      currentPage: 1,
      config: {

      },
    }
  },
  created() {
    let data = {
      page: 1,
      pageSize: 10
    };
    this.getMarketPlanList(data)
  },
  methods: {
    translateStatus(val) {
      let options = {
        1: '审批中',
        2: '审批拒绝',
        3: '待上市',
        4: '已上市'
      }
      return options[val]
    },
    getMarketPlanList(data) {
      const self = this;
      (async (data)=>{
        let res = await self.$api.getMarketPlanList({data})
        console.log(res);
				if(res && res.code == 0) {
          self.config = {
            total: res.data.total,
            size: res.data.size,
            current: res.data.current
          }
          self.tableData = res.data.records;
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
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
    detail(val) {
      this.$router.push({
        path: './gameMarketPlanDetail',
        query: {gameId:val.gameId,id:val.id}
      })
    },
    selectBtn() {
      this.$router.push({path: './gameMarketPlanCreate'})
    },
    edit(val) {
      this.$router.push({
        path: './gameMarketPlanEdit',
        query: {gameId:val.gameId,id:val.id}
      })
    },
    search(form) {
      Object.assign(this.config, form)
      this.config.page = 0;
      this.config.pageSize = 0;
      this.getMarketPlanList(this.config)
    },
    handleSizeChange(val) {
      this.data.pageSize = val
      this.getMarketPlanList(data)
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.data.page = val
      this.getMarketPlanList(data)
      console.log(`当前页: ${val}`);
    },
  },
}
</script>


<style lang="less">
@import './less/index.less';
</style>
