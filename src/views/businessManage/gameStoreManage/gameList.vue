<template>
  <div class="vlt-card game-store-list">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="oprie.total"
      labelWidth="86px"
    >
      <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
    </search-bar>
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column label="序号" type="index" fixed width="55"></el-table-column>
      <el-table-column prop="gameId" label="游戏ID" min-width="100px"></el-table-column>
      <el-table-column prop="gameName" label="游戏名称" min-width="120px"></el-table-column>
      <el-table-column label="游戏类型" min-width="100px">
        <template slot-scope="scope">{{translateGameType(scope.row.gameType)}}</template>
      </el-table-column>
      <el-table-column label="游戏状态" min-width="100px">
        <template slot-scope="scope">{{translateStatus(scope.row.gameStatus)}}</template>
      </el-table-column>
      <el-table-column label="奖池类型" min-width="100px">
        <template slot-scope="scope">{{translateJackpotType(scope.row.jackpotType)}}</template>
      </el-table-column>
      <el-table-column prop="gameVersion" label="游戏版本" min-width="120px"></el-table-column>
      <el-table-column label="游戏图标" min-width="120px">
        <template slot-scope="scope">
          <img :src="scope.row.filePath" class="game-icon"/>
          <!-- <img src="scope.row.filePath" alt /> -->
        </template>
      </el-table-column>
      <el-table-column prop="developerName" label="游戏开发商" min-width="120px"></el-table-column>
      <el-table-column label="最近更新时间" min-width="160px">
        <template slot-scope="scope">{{translateTime(scope.row.updateTime)}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            v-prevent="2000"
            @click.native="detail(scope.row.gameId)"
          >查看</el-button>
          <el-button size="mini" v-prevent="2000" @click.native="edit(scope.row.gameId)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-paging
      position="right"
      :total="oprie.total"
      :currentPage="oprie.current "
      :pageSize="oprie.size"
      @handleSizeChange="changeSize"
      @handleCurrentChange="changeCurrent"
    ></table-paging>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "gameStoreManage",
  data() {
    return {
      controlOptions: [
        { name: "新建游戏", type: "primary", icon: "plus" }, // type为按钮的五种颜色， icon为具体的图标
        { name: "导出", type: "", icon: "download" },
      ],
      tableData: [],
      multipleSelection: [],
      totalCount: 0,
      ruleForm: {
        page: 1,
        limit: 10
      },
      searchOptions: [
        { title: "游戏编码", type: "input", prop: "gameCode", value: "" },
        { title: "游戏名称", type: "input", prop: "gameName", value: "" },
        {
          title: "游戏类型",
          type: "select",
          prop: "gameType",
          value: "",
          options: [
            { label: "概率型", value: 1 },
            { label: "奖组型", value: 2 }
          ]
        },
        {
          title: "游戏状态",
          type: "select",
          prop: "gameStatus",
          value: "",
          options: [
            { label: "储备", value: 1 },
            { label: "试玩", value: 2 },
            { label: "上市", value: 3 },
            { label: "退市", value: 4 }
          ]
        },
        {
          title: "奖池类型",
          type: "select",
          prop: "jackpotType",
          value: "",
          options: [
            { label: "无奖池", value: 1 },
            { label: "单奖池", value: 2 },
            { label: "多奖池", value: 3 }
          ]
        }
      ],
      currentPage: 1,
      params: {
        pageSize: 10,
        size: 1
      },
      oprie: {
        total: 0,
        size: 10,
        current: 1
      }
    };
  },
  created() {
    let data = {};
    this.getGameStoreList(data);
  },
  methods: {
    // 导出列表
    async exportExcel() {
      const res = await this.$api.exportGameExcel({
        data: {
          param:this.params.param
        },
        responseType: "blob"
      });
      var blob = new Blob([res], {
        type: "application/vnd.ms-excel;charset=utf-8"
      });
      var url = window.URL.createObjectURL(blob);
      var aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = url;
      aLink.setAttribute("download", "游戏储备信息.xls");
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink); //下载完成移除元素
      window.URL.revokeObjectURL(url); //释放掉blob对象
      console.log(res);
    },
    // 转换类型
    translateGameType (val) {
      let options = {1: "概率型",2: '奖组型'}
      return options[val]
    },
    // 转换类型
    translateJackpotType(val) {
      let options = {1: "无奖池",2: "单奖池",3: "多奖池"};
      return options[val];
    },
    // 转换类型
    translateStatus(val) {
      let options = {1: "储备",2: "试玩",3: "上市",4: "变更",5: "退市"};
      return options[val];
    },
    // 转换类型
    translateTime(val) {
      if (val != null) {
        return moment(val).format("YYYY-MM-DD HH:mm:ss");
      } else {
        return "";
      }
    },
    // 获取游戏储备列表
    getGameStoreList(data) {
      const self = this;
      (async data => {
        console.log(data);
        let res = await self.$api.getGameStoreList({ data });
        console.log(res);
        if (res && res.code == 0) {
          self.oprie.total = res.data.total;
          self.oprie.size = res.data.size;
          self.oprie.current = res.data.current;
          self.tableData = res.data.records;
        } else {
          // self.$message.warning(res.msg)
        }
      })(data);
    },
    selectBtn(val) {
      console.log(val)
      if (val.name == "新建游戏") {
        this.$router.push({path: "./gameCreate",});
      } else {
        // 导出列表
        this.exportExcel();
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
      this.$router.push({ path: "./gameDetail", query: { gameId } });
    },
    edit(gameId) {
      this.$router.push({ path: "./gameEdit", query: { gameId } });
    },
    search(form) {
      //   let data = {
      //     pageSize: 0,
      //     params: form
      //   }

      // console.log('search', data)
      this.params.size = 1;
      this.params.pageSize = 10;
      this.params.param = form;
      this.getGameStoreList(this.params);
    },
    changeSize(val) {
      console.log(`每页 ${val} 条`);
    },
    changeCurrent(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>


<style lang="less" scoped>
@import "./less/index.less";
.game-icon{
  width: 50px;
  height: 50px;
  display: inline-block;
}
</style>
