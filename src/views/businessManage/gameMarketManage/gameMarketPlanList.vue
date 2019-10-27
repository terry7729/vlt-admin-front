<template>
  <div class="vlt-card game-launch-list">
    <search-bar class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
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
      <el-table-column prop="gameListStatus" label="计划状态"></el-table-column>
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
      :total="999"
      :currentPage="1"
      :pageSize="10"
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
        {type: 'input', prop: 'inputName', value: '', title: '游戏ID', placeholder: '请输入'},
        {type: 'input', prop: 'inputName2', value: '', title: '游戏名称', placeholder: '请输入'},
        {
          type: 'select', prop: 'selectName', value: '', title: '游戏类型', placeholder: '请选择',
          options: [
            {
              label: '选项1',
              value: 1
            },
            {
              label: '选项2',
              value: 2
            }
          ]
        },
        {
          type: 'select', prop: 'selectName2', value: '', title: '游戏状态', placeholder: '请选择',
          options: [
            {
              label: '选项1',
              value: 1
            },
            {
              label: '选项2',
              value: 2
            }
          ]
        },
        {
          type: 'select', prop: 'selectName3', value: '', title: '奖池类型', placeholder: '请选择',
          options: [
            {
              label: '选项1',
              value: 1
            },
            {
              label: '选项2',
              value: 2
            }
          ]
        },
        {type: 'datepicker-range', prop: 'date2', value: '', title: '上市时间', placeholder: ['开始日期', '结束日期']},
          
      ],
      currentPage: 1
    }
  },
  created() {
    let data = {};
    this.getMarketPlanList(data)
  },
  methods: {
    getMarketPlanList(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.getMarketPlanList({data})
				if(res && res.code == 0) {
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
      console.log('search', form)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
}
</script>


<style lang="less">
@import './less/index.less';
</style>
