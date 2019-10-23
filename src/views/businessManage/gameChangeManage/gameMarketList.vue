<template>
  <div class="vlt-card game-launch-list">
    <search-bar class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="86px">
    </search-bar>
    <el-table
    border
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column label="序号" type="index" width="55"></el-table-column>
      <el-table-column prop="code" label="游戏ID" ></el-table-column>
      <el-table-column prop="planName" label="游戏名称"></el-table-column>
      <el-table-column prop="planName" label="游戏状态"></el-table-column>
      <el-table-column prop="gameName" label="游戏类型"></el-table-column>
      <el-table-column prop="sellRang" label="奖池类型"></el-table-column>
      <el-table-column prop="planState" label="奖池比率"></el-table-column>
      <el-table-column prop="startTime" label="返奖比率"></el-table-column>
      <el-table-column prop="endTime" label="调节基金比率"></el-table-column>
      <el-table-column prop="initiator" label="销售状态" width="150px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-prevent="2000" @click.native="detail(scope.row.id)">销售</el-button>
          <el-button  size="mini" v-prevent="2000" @click.native="edit(scope.row.id)">停售</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-prevent="2000" @click.native="detail(scope.row.id)">查看</el-button>
          <el-button  size="mini" v-prevent="2000" @click.native="edit(scope.row.id)">数据封存</el-button>
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
      tableData: [
        {
          id:"01",
          code: 'SS001',
          planName:'上市-基诺',
          gameName:"基诺",
          sellRang:"销售区域",
          planState:"20%",
          startTime:"50%",
          endTime:"40%",
          initiator:"60%",
          initiateTime:"50%",
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
  methods: {
    getStoreList(row) {
      const self = this;
      const data = {
        orderId: row.orderId
      };
      (async (data)=>{
				let res = await self.$api.getStoreList({data})
				if(res && res.code == 0) {
          self.$message.success('注销成功')
          row.orderStatus = 6;
          self.getLotteryList(self.param)
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
    detail (id) {
      this.$router.push({
        path: './gameDetail',
        query: {id}
      })
    },
    edit (id) {
      this.$router.push({
        path: './gameMarketPlanEdit',
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


<style lang="less" scoped>
</style>
