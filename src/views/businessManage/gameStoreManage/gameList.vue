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
      <el-table-column type="selection" width="55" fixed></el-table-column>
      <el-table-column label="序号" type="index" width="55"></el-table-column>
      <el-table-column prop="gameId" label="游戏ID" min-width="100px"></el-table-column>
      <el-table-column prop="gameName" label="游戏名称" min-width="120px"></el-table-column>
      <el-table-column prop="gameType" label="游戏类型" min-width="100px"></el-table-column>
      <el-table-column label="游戏状态" min-width="100px">
        <template slot-scope="scope">
          {{translateStatus(scope.row.gameStatus)}}
        </template>
      </el-table-column>
      <el-table-column label="奖池类型" min-width="100px">
        <template slot-scope="scope">
          {{translateJackpotType(scope.row.jackpotType)}}
        </template>
      </el-table-column>
      <el-table-column prop="versions" label="游戏版本" min-width="120px"></el-table-column>
      <el-table-column prop="icon" label="游戏图标" min-width="120px"></el-table-column>
      <el-table-column prop="developerName" label="游戏开发商" min-width="120px"></el-table-column>
      <el-table-column label="最近更新时间" min-width="160px">
        <template slot-scope="scope">
          {{translateTime(scope.row.updateTime)}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-prevent="2000" @click.native="detail(scope.row.gameId)">查看</el-button>
          <el-button  size="mini" v-prevent="2000" @click.native="edit(scope.row.gameId)">编辑</el-button>
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
import moment from 'moment'

export default {
  name: 'gameStoreManage',
  data() {
    return {
      controlOptions: [
        { name: "新建游戏", type: "primary", icon: "plus" }, // type为按钮的五种颜色， icon为具体的图标
        { name: "批量删除", type: "", icon: "delete" },
        { name: "导出", type: "", icon: "download" }
      ],
      tableData: [],
      multipleSelection: [],
      totalCount:0,
      ruleForm: {
        page: 1,
        limit: 10
      },
      searchOptions:[
        {title: '游戏编码', type: 'input', prop: 'inputName', value: '',},
        {title: '游戏名称', type: 'input', prop: 'inputName2', value: '',},
        {title: '游戏类型', type: 'select', prop: 'selectName', value: '', options: []},
        {title: '游戏状态', type: 'select', prop: 'selectName2', value: '', options: []},
        {title: '奖池类型', type: 'select', prop: 'selectName3', value: '', options: []},
        {title: '最近更新时间', type: 'datepicker-range', prop: '', value: '', options: ['start', 'end']} 
      ],
      currentPage: 1,
      params: {
        pageSize: 10,
        size: 1,
      }
    }
    
  },
  created() {
    let data = {};
    this.getGameStoreList(data)
  },
  methods: {
    translateJackpotType(val) {
      let options = {
        1: '无奖池',
        2: '单奖池',
        3: '多奖池'
      }
      return options[val]
    },
    translateStatus(val) {
      let options = {
        1: '储备',
        2: '试玩',
        3: '上市',
        4: '变更',
        5: '退市'
      }
      return options[val]
    },
    translateTime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss")
    },
    getGameStoreList(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.getGameStoreList({data})
				if(res && res.code == 0) {
          self.tableData = res.data.records;
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
    detail(gameId) {
      this.$router.push({path: './gameDetail',query: {gameId}})
    },
    edit(gameId) {
      this.$router.push({path: './gameEdit',query: {gameId}})
    },
    search(form) {
      console.log('search', form)
      let data = {
        pageSize: 1,
        params: form
      }
      this.getGameStoreList(data)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
}
</script>


<style lang="less">
@import './less/index.less';
</style>
