<template>
  <div class="vlt-card game-store-list">
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
      <el-table-column fixed label="序号" type="index" width="55"></el-table-column>
      <el-table-column prop="gameCode" label="试玩计划编号" width="100px"></el-table-column>
      <el-table-column prop="planName" label="试玩计划名称" width="180px"></el-table-column>
      <el-table-column prop="gameName" label="游戏名称" width="100px"></el-table-column>
      <el-table-column prop="rang" label="试玩范围" width="160px"></el-table-column>
      <el-table-column prop="planState" label="计划状态" width="100px"></el-table-column>
      <el-table-column prop="startTime" label="试玩开始时间" width="160px"></el-table-column>
      <el-table-column prop="endTime" label="试玩结束时间" width="160px"></el-table-column>
      <el-table-column prop="initiator" label="创建人" width="100px"></el-table-column>
      <el-table-column prop="operation" label="创建时间" width="160px"></el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-prevent="2000" @click.native="detail(scope.row.id)">查看</el-button>
          <el-button  size="mini" v-prevent="2000" @click.native="edit(scope.row.id)">编辑</el-button>
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
  name: 'gameStoreManage',
  data() {
    return {
      controlOptions: [
        { name: "新建试玩计划", type: "primary", icon: "plus" }, // type为按钮的五种颜色， icon为具体的图标
      ],
      tableData: [
        {
          id:"01",
          gameCode:'SW001',
          planName: '试玩-开心一刻',
          gameName:'连环夺宝',
          rang:"试玩终端",
          planState:"试玩中",
          startTime:"2019-09-12 09:12:12",
          endTime:"2019-12-12 09:12:12",
          initiator:"黎明",
          initiateTime:"2019-09-12 09:00:00",
          operation:"2019-08-12 09:12:12",
        },
        {
          id:"02",
          gameCode:'SW001',
          planName: '试玩-开心一刻',
          gameName:'连环夺宝',
          rang:"试玩终端",
          planState:"试玩中",
          startTime:"2019-09-12 09:12:12",
          endTime:"2019-12-12 09:12:12",
          initiator:"黎明",
          initiateTime:"2019-09-12 09:00:00",
          operation:"2019-08-12 09:12:12",
        },
      ],
        multipleSelection: [],
        totalCount:0,
        ruleForm: {
          page: 1,
          limit: 10
        },
        searchOptions:[
          {title: '游戏ID', type: 'input', prop: 'inputName', value: '',},
          {title: '游戏名称', type: 'input', prop: 'inputName2', value: '',},
          {title: '游戏类型', type: 'select', prop: 'selectName', value: '',options: [{label: '选项1',value: 1},{label: '选项2',value: 2}]},
          {title: '游戏状态', type: 'select', prop: 'selectName2', value: '', options: [{label: '选项1',value: 1},{label: '选项2',value: 2}]},
          {title: '试玩时间', type: 'datepicker-range', prop: 'date2', value: '',}
        ],
        currentPage: 1
      }
    
  },
  methods: {
    selectBtn() {
      this.$router.push({path: './trialPlanCreate',query: {id:123}})
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
        path: './trialPlanDetail',
        query: {id}
      })
    },
    edit (id) {
      this.$router.push({
        path: './trialPlanEdit',
        query: {id}
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
  computed: {

  },
  created() {
  
  },
  mounted() {
    
  },
  components: {

  }
}
</script>


<style lang="less">
@import './less/index.less';
</style>
