<template>
  <div class="vlt-card">
    <el-button type="primary" size="medium">添加</el-button>
    <el-table :data="tableData" border>
        <el-table-column label="序号"  type="index" width="80px"></el-table-column>
        <el-table-column label="游戏ID" prop="gameId"></el-table-column>
        <el-table-column label="游戏名称" prop="gameName"></el-table-column>
        <el-table-column label="游戏编码" prop="gameCode"></el-table-column>
        <el-table-column label="周期类型">
          <template slot-scope="scope">
            <span>{{scope.row.cycleType == 0 ? '长周期' : '短周期'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="游戏类型" prop="gameTypeName"></el-table-column>
        <el-table-column label="游戏状态" >
          <template slot-scope="scope">
            {{scope.row.status}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="detail(scope.row, 'game-permission')">权限设置</el-button>
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
      tableData: [
        {gameId:'12',gameName: 'a',cycleType: 0,gameTypeName:'奖组型',status:'试玩'}
      ]
    }
  },
  created() {
  
  },
  methods: {
    add() {
      console.log('a')
    }
  },
  components: {

  },
}
</script>


<style lang="less" scoped>
@import './less/index.less';
</style>
