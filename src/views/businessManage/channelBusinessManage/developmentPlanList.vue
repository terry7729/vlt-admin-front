<template>
  <div class="vlt-card">
    <search-bar class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px">
      <control-bar slot="extend-bar" @select="select" :options="options"></control-bar>
    </search-bar>
    <el-table :data="tableData" border>
      <el-table-column label="序号" fixed type="index" width="60px"></el-table-column>
      <el-table-column label="计划时间" prop="gameId" min-width="160px"></el-table-column>
      <el-table-column label="新建销售厅" prop="gameName" min-width="140px"></el-table-column>
      <el-table-column label="销售厅投注机" prop="gameCode" min-width="140px"></el-table-column>
      <el-table-column label="省属合作厅" prop="cycleType" min-width="140px"></el-table-column>
      <el-table-column label="省属合作厅投注机" prop="gameTypeName" min-width="140px"></el-table-column>
      <el-table-column label="市属合作厅" prop="cycleType" min-width="140px"></el-table-column>
      <el-table-column label="市属合作厅投注机" prop="gameTypeName" min-width="140px"></el-table-column>
      <el-table-column label="发展预算（亿）" prop="status" min-width="140px"></el-table-column>
      <el-table-column label="状态" prop="status" min-width="140px"></el-table-column>
      <el-table-column label="操作" fixed="right" min-width="140px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="detail(scope.row, 'game-permission')">查看</el-button>
          <el-button size="mini" @click="detail(scope.row, 'game-permission')">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/javascript">

export default {
  name: "",
  data() {
    return {
      searchOptions: [
        {type: 'datetime-range', prop: 'date4', value: '', title: '日期时间', placeholder: ['开始时间', '结束时间']},
        {title: '状态', type: 'select', prop: 'status', value: '', options: [{label:'计划中',value:'1'},{label:'已通过',value:'2'},{label:'未通过',value:'3'}]},
      ],
      options: [
        {name: '新建发展计划', type: 'primary', icon: 'plus'},  // type为按钮的五种颜色， icon为具体的图标
        {name: '导出', type: '', icon: 's-promotion'},
      ],
      tableData: [
        {gameId:'2019-09-12 09：00：00',gameName: 'a',cycleType: 0,gameTypeName:'奖组型',status:'计划中'}
      ]
    }
  },
  created() {
    let data = {};
    this.getDevelopPlanList(data)
  },
  methods: {
    search(data) {
      this.getDevelopPlanList(data)
    },
    getDevelopPlanList(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.getDevelopPlanList({data})
				if(res && res.code == 0) {
          console.log(res)
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    select(val) {
      if(val.name=='新建发展计划') {
        this.$router.push({name:'developmentPlanCreate',query:{id:123}})
      }
    }
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
</style>
