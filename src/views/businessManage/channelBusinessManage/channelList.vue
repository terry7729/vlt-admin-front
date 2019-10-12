<template>
  <div class="vlt-card">
    <el-button type="primary" v-prevent='2000' size="medium" @click="add">提交</el-button>
    <el-table :data="tableData" border>
        <el-table-column label="序号"  type="index" width="80px"></el-table-column>
        <el-table-column label="渠道编号" prop="gameId"></el-table-column>
        <el-table-column label="渠道类型" prop="gameName"></el-table-column>
        <el-table-column label="所属机构" prop="gameCode"></el-table-column>
        <el-table-column label="渠道等级" prop="cycleType"></el-table-column>
        <el-table-column label="负责人" prop="gameTypeName"></el-table-column>
        <el-table-column label="创建时间" prop="status"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="detail(scope.row, 'game-permission')">查看</el-button>
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
        {gameId:'12',gameName: 'a',cycleType: 0,gameTypeName:'奖组型',status:'2019-09-12 09：00：00'}
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
