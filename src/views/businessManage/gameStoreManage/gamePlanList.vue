<template>
  <div class="vlt-card game-store-list">
    <search-bar class="search-bar-demo" @search="search" :options="searchOptions" :total="999" labelWidth="100px"></search-bar>
    
    <el-table
    border
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" fixed="left"></el-table-column>
      <el-table-column label="序号" type="index" width="55"></el-table-column>
      <el-table-column prop="gameCode" label="试玩计划编号" ></el-table-column>
      <el-table-column prop="planName" label="试玩计划名称"></el-table-column>
      <el-table-column prop="gameName" label="游戏名称"></el-table-column>
      <el-table-column prop="rang" label="试玩范围"></el-table-column>
      <el-table-column prop="planState" label="计划状态"></el-table-column>
      <el-table-column prop="startTime" label="试玩开始时间"></el-table-column>
      <el-table-column prop="endTime" label="试玩结束时间"></el-table-column>
      <el-table-column prop="initiator" label="发起人"></el-table-column>
      <el-table-column prop="operation" label="发起时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-prevent="2000" @click.native="detail(scope.row.id)">查看</el-button>
          <el-button  size="mini" v-prevent="2000" @click.native="edit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :hide-on-single-page="false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total,prev, pager, next, sizes,jumper"
      :total="100" background>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'gameStoreManage',
  data() {
    return {
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
        // {
        //   type: 'select', prop: 'selectName3', value: '', title: '奖池类型', placeholder: '请选择',
        //   options: [
        //     {
        //       label: '选项1',
        //       value: 1
        //     },
        //     {
        //       label: '选项2',
        //       value: 2
        //     }
        //   ]
        // },
        {type: 'datepicker-range', prop: 'date2', value: '', title: '试玩时间', placeholder: ['开始日期', '结束日期']},
          
        ],
        currentPage: 1
      }
    
  },
  methods: {
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
          name: 'planCheck',
          query: {id}
        })
      },
      edit (id) {
        this.$router.push({
          name: 'planEdit',
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
