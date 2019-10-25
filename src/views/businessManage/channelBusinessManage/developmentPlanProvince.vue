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
      <el-table-column label="所属机构" prop="gameId" min-width="120px"></el-table-column>
      <el-table-column label="新建销售厅" prop="gameName" min-width="120px"></el-table-column>
      <el-table-column label="销售厅投注机" prop="gameCode" min-width="120px"></el-table-column>
      <el-table-column label="省属合作厅" prop="cycleType" min-width="120px"></el-table-column>
      <el-table-column label="省属合作厅投注机" prop="gameTypeName" min-width="120px"></el-table-column>
      <el-table-column label="市属合作厅" prop="cycleType" min-width="120px"></el-table-column>
      <el-table-column label="市属合作厅投注机" prop="gameTypeName" min-width="120px"></el-table-column>
      <el-table-column label="发展预算" prop="status" min-width="120px"></el-table-column>
      <el-table-column label="状态" prop="status" min-width="100px"></el-table-column>
      <el-table-column label="操作" fixed="right" min-width="140px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="detail(scope.row, 'game-permission')">查看</el-button>
          <el-button size="mini" @click="detail(scope.row, 'game-permission')">审批</el-button>
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
        {
          type: 'cascader', prop: 'cascader1', value: '', title: '级联选择', placeholder: '请选择',
          options: []
        },
      ],
      options: [
        {name: '导出', type: '', icon: 's-promotion'},  // type为按钮的五种颜色， icon为具体的图标
      ],
      tableData: [
        {gameId:'12',gameName: 'a',cycleType: 0,gameTypeName:'奖组型',status:'已通过'}
      ]
    }
  },
  created() {
    // 搜索里面只查询两级 中心到省级机构
    this.getProvincePlanList({})
  },
  methods: {
    search(data) {
      this.getProvincePlanList(data)
    },
    select() {

    },
    getProvincePlanList(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.getProvincePlanList({data})
				if(res && res.code == 0) {
          console.log(res)
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
</style>
