<template>
  <div class="vlt-card game-launch-list">
    <search-bar class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="tableData.total"
      labelWidth="86px">
      <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
    </search-bar>
    <el-table
      border
      ref="multipleTable"
      :data="tableData.records"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
        <el-table-column label="序号" type="index" width="55"></el-table-column>
        <el-table-column prop="changePlanCode" label="变更计划编号" ></el-table-column>
        <el-table-column prop="changePlanName" label="变更计划名称"></el-table-column>
        <el-table-column prop="gameName" label="游戏名称"></el-table-column>
        <el-table-column prop="gameSaleArea" label="销售区域"></el-table-column>
        <el-table-column prop="changePlanStatus" label="计划状态">
          <template slot-scope="scope">
            {{translateChangeStatus(scope.row.changePlanStatus)}}
          </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" v-prevent="2000" @click.native="detail(scope.row.id)">查看</el-button>
            <el-button  size="mini" v-prevent="2000" @click.native="edit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
    </el-table>
    <table-paging
      position="right"
      :total="tableData.total"
      :currentPage="tableData.size"
      :pageSize="tableData.current"
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
        { name: "新建变更计划", type: "primary", icon: "plus" }, // type为按钮的五种颜色， icon为具体的图标
      ],
      tableData: {},
      multipleSelection: [],
      totalCount:0,
      ruleForm: {
        page: 1,
        limit: 10
      },
      searchOptions:[
        {title: '游戏ID', type: 'input', prop: 'gameId', value: ''},
        {title: '游戏名称', type: 'input', prop: 'gameName', value: ''},
        {title: '游戏类型', type: 'select', prop: 'gameType', value: '', options: [{label: '选项1',value: 1},{label: '选项2',value: 2}]},
        {title: '游戏状态',type: 'select', prop: 'gameStatus', value: '', options: [{label: '选项1',value: 1},{label: '选项2',value: 2}]},
        {title: '奖池类型', type: 'select', prop: 'jackpotType', value: '',options: [{label: '选项1',value: 1},{label: '选项2',value: 2}]},
        {title: '上市时间',type: 'datepicker-range', prop: 'gameListTime', value: '', options: ['start', 'end']},
      ],
      currentPage: 1,
      requestOptions: {

      }
    }
  },
  created() {
  
  },
  mounted() {
    this.getChangePlanList({})
  },
  methods: {
    getChangePlanList(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.getChangePlanList({data})
				if(res && res.code == 0) {
          console.log('游戏变更计划',res);
          if (res.data && res.data.records.length > 0) {
            this.tableData = res.data;
          }
				} else {
          self.$message.warning(res.msg)
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
    detail (id) {
      this.$router.push({
        path: './gameChangePlanDetail',
        query: {id}
      })
    },
    selectBtn() {
      this.$router.push({path: './gameChangePlanCreate'})
    },
    edit (id) {
      this.$router.push({
        path: './gameChangePlanEdit',
        query: {id}
      })
    },
    search(form) {
      console.log('search', form)
      this.requestOptions = {
        
        ...form
      }
      console.log(this.requestOptions);
      // this.getChangePlanList({});
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.requestOptions.size = val;
      this.getChangePlanList(this.getChangePlanList);
    },
    handleCurrentChange(val) {
      this.requestOptions.current = val;
      this.getChangePlanList(this.getChangePlanList);
      console.log(`当前页: ${val}`);
    },
    translateChangeStatus(val) {
      let options = {
        1: "审批中",
        2: "审批拒绝",
        3: "待生效",
        4: '已生效'
      };
      return options[val];
    },
  },
  computed: {

  },
  components: {
  }
}
</script>


<style lang="less" scoped>
</style>
