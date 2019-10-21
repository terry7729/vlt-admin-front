<template>
  <div class="vlt-card">
    <search-bar class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="86px">
      <control-bar slot="extend-bar" @select="select" :options="controlOptions"></control-bar>
    </search-bar>
    <el-table :data="tableData" border>
      <el-table-column label="序号"  type="index" width="80px"></el-table-column>
      <el-table-column label="合作伙伴名称" prop="gameId"></el-table-column>
      <el-table-column label="合作类型" prop="gameName"></el-table-column>
      <el-table-column label="业务类型" prop="gameCode"></el-table-column>
      <el-table-column label="合作等级" prop="cycleType"></el-table-column>
      <el-table-column label="合作状态" prop="status"></el-table-column>
      <el-table-column label="创建时间" prop="time"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="detail(scope.row, 'game-permission')">查看</el-button>
          <el-button type="" size="mini" @click="detail(scope.row, 'game-permission')">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'channelList',
  data() {
    return {
      searchOptions: [
        {title: '合作伙伴名称', type: 'input', prop: 'inputName', value: ''},
        {title: '合作类型', type: 'select', prop: 'selectName', value: '', options: [{label: '选项1',value: 1},{label: '选项2',value: 2}]},
        {title: '合作状态', type: 'select', prop: 'selectName', value: '', options: [{label: '选项1',value: 1},{label: '选项2',value: 2}]},
        {title: '业务类型', type: 'select', prop: 'selectName', value: '', options: [{label: '选项1',value: 1},{label: '选项2',value: 2}]},
        {title: '合作等级', type: 'select', prop: 'selectName', value: '', options: [{label: '选项1',value: 1},{label: '选项2',value: 2}]},
        {title: '起止时间', type: 'datetime-range', prop: '', value: '', options:['start', 'end']},
      ],
      controlOptions: [
        {name: '新增合作伙伴', type: 'primary', icon: 'plus'},  // type为按钮的五种颜色， icon为具体的图标
      ],
      tableData: [
        {gameId:'12',gameName: 'a',cycleType: 0,gameTypeName:'奖组型',time:'2019-09-12 09：00：00',status:'启用'}
      ]
    }
  },
  created() {
  
  },
  methods: {
    search(val) {
      console.log(val)
    },
    select(val) {
      console.log(val)
    },
    add() {
      console.log('a')
    }
  },
  components: {

  },
}
</script>


<style lang="less" scoped>
</style>
