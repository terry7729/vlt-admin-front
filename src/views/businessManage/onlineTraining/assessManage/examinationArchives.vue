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
      <el-table-column type="selection" width="55" fixed></el-table-column>
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="培训项目" prop="gameId" min-width="160px"></el-table-column>
      <el-table-column label="培训对象" prop="gameName" min-width="140px"></el-table-column>
      <el-table-column label="项目类型" prop="gameCode" min-width="140px"></el-table-column>
      <el-table-column label="单选题" prop="cycleType" min-width="140px"></el-table-column>
      <el-table-column label="多选题" prop="gameTypeName" min-width="140px"></el-table-column>
      <el-table-column label="总分" prop="gameCode" min-width="140px"></el-table-column>
      <el-table-column label="合格分" prop="cycleType" min-width="140px"></el-table-column>
      <el-table-column label="考试通过率" prop="gameTypeName" min-width="140px"></el-table-column>
      <el-table-column label="培训时间" prop="cycleType" min-width="140px"></el-table-column>
      <el-table-column label="操作" fixed="right" min-width="140px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="detail(scope.row, 'game-permission')">查看</el-button>
          <el-button size="mini" @click="detail(scope.row, 'game-permission')">删除</el-button>
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
        {title:'培训课程', type:'input', prop: 'title', value:''},
        {title: '发布方式', type: 'select', prop: 'status', value: '', options: [{label:'计划中',value:'1'},{label:'已通过',value:'2'},{label:'未通过',value:'3'}]},
        {title: '关联考试', type: 'select', prop: 'status', value: '', options: [{label:'计划中',value:'1'},{label:'已通过',value:'2'},{label:'未通过',value:'3'}]},
        {title: '培训时间', type: 'datetime-range', prop: 'date4', value: ''},
        {title: '培训对象', type: 'select', prop: 'status', value: '', options: [{label:'计划中',value:'1'},{label:'已通过',value:'2'},{label:'未通过',value:'3'}]},
      ],
      options: [
        // {name: '新建培训计划', type: 'primary', icon: 'plus'},  // type为按钮的五种颜色， icon为具体的图标
        
        {name: '批量删除', type: 'primary', icon: 'delete'},
        {name: '导出', type: '', icon: 's-promotion'},
      ],
      tableData: [
        {gameId:'2019-09-12 09：00：00',gameName: 'a',cycleType: 0,gameTypeName:'奖组型',status:'计划中'}
      ]
    }
  },
  components: {
  },
  methods: {
    select(val) {
      if(val.name=='新建培训计划') {
        this.$router.push({name:'developmentPlanCreate',query:{id:123}})
      }
    }
  },
}
</script>

<style lang="less" scoped>
</style>
