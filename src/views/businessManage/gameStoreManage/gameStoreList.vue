<template>
  <div style="padding: 25px;" class="game-search-list">
    <h1>游戏储备管理列表页</h1>
    
    
    <el-table
    border
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="55">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="游戏ID" ></el-table-column>
      <el-table-column prop="name" label="游戏名称"></el-table-column>
      <el-table-column prop="name" label="游戏类型"></el-table-column>
      <el-table-column prop="name" label="奖池类型"></el-table-column>
      <el-table-column prop="name" label="游戏版本"></el-table-column>
      <el-table-column prop="name" label="游戏图标"></el-table-column>
      <el-table-column prop="name" label="游戏开发商"></el-table-column>
      <el-table-column prop="name" label="最近更新时间"></el-table-column>
      <el-table-column prop="name" label="游戏状态"></el-table-column>

      <el-table-column label="操作" width="190">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native="detail(scope.row.date)">查看</el-button>
          <el-button type="text" size="small" @click.native="deleteMsg(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'gameStoreManage',
  data() {
    return {
      tableData: [{
          date: '1',
          name: '王小虎',
          operation: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '3',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '3',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '4',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '5',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '6',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
        totalCount:0,
        ruleForm: {
          page: 1,
          limit: 10
        }
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
        name: 'check',
        query: {id}
      })
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
