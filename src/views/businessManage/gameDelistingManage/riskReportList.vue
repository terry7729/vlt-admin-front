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
      <el-table-column type="selection" width="55" fixed="left"></el-table-column>
      <el-table-column label="序号" type="index" width="55"></el-table-column>
      <el-table-column prop="id" label="告警源" ></el-table-column>
      <el-table-column prop="name" label="告警内容"></el-table-column>
      <el-table-column prop="type" label="警报等级"></el-table-column>
      <el-table-column prop="pond" label="告警次数"></el-table-column>
      <el-table-column prop="versions" label="告警历时"></el-table-column>
      <el-table-column prop="icon" label="通知状态"></el-table-column>
      <el-table-column prop="developer" label="处理状态"></el-table-column>
      <el-table-column prop="time" label="最新时间" width="160"></el-table-column>
      <el-table-column prop="state" label="处理人"></el-table-column>
      <el-table-column prop="time" label="处理时间" width="160"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-prevent="2000" @click.native="detail(scope.row.id)">查看</el-button>
          <el-button  size="mini" v-prevent="2000" @click.native="edit(scope.row.id)">处理</el-button>
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
        { name: "导出", type: "primary", icon: "s-promotion" }, // type为按钮的五种颜色， icon为具体的图标
      ],
      tableData: [
        {id:"01", name: '开心一刻',type:'概率型',pond:"单奖池",versions:"1.0.1",icon:"",developer:"中彩",time:"2019-09-12 09:00:00",
          state:"试玩",}
      ],
      multipleSelection: [],
      totalCount:0,
      ruleForm: {
        page: 1,
        limit: 10
      },
      searchOptions:[
        {title: '警报等级', type: 'select', prop: 'selectName', value: '', options: [{label: '一般',value: 1},{label: '严重',value: 2}]},
        {title: '告警源', type: 'input', prop: 'inputName', value: '',},
        {title: '处理状态', type: 'select', prop: 'selectName', value: '', options: [{label: '未处理',value: 1},{label: '已处理',value: 2}]},
        {title: '告警时间', type: 'datepicker-range', prop: 'date2', value: ''},
        
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
    selectBtn(val) {
      if(val.name == '新建游戏'){
        this.$router.push({
          path:'./gameCreate',
          query: {
          // regionCode: data.regionCode,
          // instId: data.id,
          // instCode: data.insCode
          }
        })
      }
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
        path: './gameEdit',
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
</style>
