<template>
  <div class="vlt-card store-check">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="游戏详情" name="first">
        <panel title="基本信息" :show="true">
          <base-info :infoList="baseInfo"></base-info>
        </panel>
        <panel title="游戏开发商" :show="true">
          <base-info :infoList="developerInfo"></base-info>
        </panel>
        <panel title="版本信息" :show="true">
          <base-info :infoList="editionInfo"></base-info>
        </panel>
        <panel title="游戏附件" :show="true">
          <div class="base-info">
            <ul class="info-list">
              <li class="info-item" v-for="(item, index) in appendixInfo" :key="index">
                <span class="title">{{item.fileName}}：</span>
                <el-link :href="item.filePath" type="primary" target="_blank">下载</el-link>
                <!-- <el-button
                  type="text"
                  class="text"
                  v-html="(item.value === null ? '' : item.value) + (item.unit || '')"
                ></el-button> -->
              </li>
            </ul>
          </div>
        </panel>
      </el-tab-pane>
      <el-tab-pane label="试玩记录" name="second">
        <el-table :data="demoList" border style="width: 100%">
          <el-table-column type="index" fixed label="序号" width="55"></el-table-column>
          <el-table-column prop="demoProgram" label="试玩计划编号" width="100"></el-table-column>
          <el-table-column prop="demoPlanName" label="试玩计划名称" width="180"></el-table-column>
          <el-table-column prop="gameVersions" label="游戏版本"></el-table-column>
          <el-table-column prop="area" label="试玩区域" width="150"></el-table-column>
          <el-table-column prop="startTime" label="试玩开始时间" width="150"></el-table-column>
          <el-table-column prop="endTime" label="试玩结束时间" width="150"></el-table-column>
          <el-table-column prop="initiator" label="创建人" width="150"></el-table-column>
          <el-table-column prop="initiateTime" label="创建时间" width="150"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                v-prevent="2000"
                @click.native="detail(scope.row.id)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <table-paging
          position="right"
          :total="999"
          :currentPage="1"
          :pageSize="10"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        ></table-paging>
      </el-tab-pane>
      <el-tab-pane label="上市记录" name="third">
        <el-table :data="IPOList" border style="width: 100%">
          <el-table-column type="index" fixed label="序号" width="55"></el-table-column>
          <el-table-column prop="gameListCode" label="上市计划编号" width="100"></el-table-column>
          <el-table-column prop="gameListName" label="上市计划名称" width="180"></el-table-column>
          <el-table-column prop="versionNumber" label="游戏版本" width="120"></el-table-column>
          <el-table-column prop="gameSaleArea" label="上市区域" width="160"></el-table-column>
          <el-table-column prop="createTime" label="上市开始时间" width="160"></el-table-column>
          <el-table-column prop="gameListTime" label="上市结束时间" width="160"></el-table-column>
          <el-table-column prop="createBy" label="创建人" width="160"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                v-prevent="2000"
                @click.native="detail(scope.row.id)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <table-paging
          position="right"
          :total="999"
          :currentPage="1"
          :pageSize="10"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        ></table-paging> -->
      </el-tab-pane>
      <el-tab-pane label="退市记录" name="fourth">
        <el-table :data="delistList" border style="width: 100%">
          <el-table-column type="index" fixed label="序号" width="55"></el-table-column>
          <el-table-column prop="delistProgram" label="退市计划编号" width="100"></el-table-column>
          <el-table-column prop="delistPlanName" label="退市计划名称" width="180"></el-table-column>
          <el-table-column prop="gameVersions" label="游戏版本" width="120"></el-table-column>
          <el-table-column prop="area" label="退市区域" width="160"></el-table-column>
          <el-table-column prop="startTime" label="退市时间" width="160"></el-table-column>
          <el-table-column prop="initiator" label="创建人" width="160"></el-table-column>
          <el-table-column prop="initiatorTime" label="创建时间" width="160"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                v-prevent="2000"
                @click.native="detail(scope.row.id)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <table-paging
          position="right"
          :total="999"
          :currentPage="1"
          :pageSize="10"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        ></table-paging>
      </el-tab-pane>
      <el-tab-pane label="数据封存记录" name="five">
        <el-table :data="delistList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column prop="delistProgram" label="封存时间" width="180"></el-table-column>
          <el-table-column prop="delistPlanName" label="封存状态" width="180"></el-table-column>
          <el-table-column prop="gameVersions" label="封存报告"></el-table-column>
          <el-table-column prop="area" label="操作人"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                v-prevent="2000"
                @click.native="detail(scope.row.id)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <table-paging
          position="right"
          :total="999"
          :currentPage="1"
          :pageSize="10"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        ></table-paging>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "gameDetail",
  data() {
    return {
      activeName: "first",
      baseInfo: [
        { title: "游戏ID", value: "", prop: "id" },
        { title: "游戏名称", value: "", prop: "gameName" },
        { title: "游戏类型", value: "", prop: "gameType" },
        { title: "游戏状态", value: "", prop: "gameStatus" },
        { title: "游戏版权", value: "", prop: "gameGenlot" },
        { title: "游戏奖池", value: "", prop: "jackpotType" },
        { title: "游戏简介", value: "", prop: "gameDesc" },
        { title: "创建人", value: "", prop: "createUser" },
        { title: "创建时间", value: "", prop: "createTime" },
        { title: "更新人", value: "", prop: "updateUser" },
        { title: "更新时间", value: "", prop: "updateTime" }
      ],
      developerInfo: [
        { title: "开发商名称", value: "", prop: "developerName" },
        { title: "联系人", value: "", prop: "person" },
        { title: "手机号码", value: "", prop: "cellPhone" },
        { title: "电子邮箱", value: "", prop: "email" },
        { title: "传真电话", value: "", prop: "faxPhone" },
        { title: "详细地址", value: "", prop: "address" }
      ],
      editionInfo: [
        { title: "软件名称", value: "", prop: "softwareName" },
        { title: "软件大小", value: "", prop: "softwareSize" },
        { title: "软件版本", value: "", prop: "versionName" },
        { title: "版本号", value: "", prop: "versionNumber" },
        { title: "上传时间", value: "", prop: "updateTime" },
        { title: "软件描述", value: "", prop: "softwareDesc" },
        { title: "新版特性", value: "", prop: "newFeatures" }
      ],
      appendixInfo: [
        { title: "文档一.doc", value: "下载", prop: "newCharacter" }
      ],
      //试玩列表
      demoList: [
        {
          demoProgram: "SW001",
          demoPlanName: "试玩1-连环夺宝",
          gameVersions: "1.0.1",
          area: "广东",
          startTime: "2019-9-9 09:21:12",
          endTime: "2019-10-2 09:55:12",
          initiator: "小明",
          initiateTime: "2019-8-8 05:12:12"
        },
        {
          demoProgram: "SW001",
          demoPlanName: "试玩1-连环夺宝",
          gameVersions: "1.0.1",
          area: "广东",
          startTime: "2019-9-9 09:21:12",
          endTime: "2019-10-2 09:55:12",
          initiator: "小明",
          initiateTime: "2019-8-8 05:12:12"
        },
        {
          demoProgram: "SW001",
          demoPlanName: "试玩1-连环夺宝",
          gameVersions: "1.0.1",
          area: "广东",
          startTime: "2019-9-9 09:21:12",
          endTime: "2019-10-2 09:55:12",
          initiator: "小明",
          initiateTime: "2019-8-8 05:12:12"
        },
        {
          demoProgram: "SW001",
          demoPlanName: "试玩1-连环夺宝",
          gameVersions: "1.0.1",
          area: "广东",
          startTime: "2019-9-9 09:21:12",
          endTime: "2019-10-2 09:55:12",
          initiator: "小明",
          initiateTime: "2019-8-8 05:12:12"
        },
        {
          demoProgram: "SW001",
          demoPlanName: "试玩1-连环夺宝",
          gameVersions: "1.0.1",
          area: "广东",
          startTime: "2019-9-9 09:21:12",
          endTime: "2019-10-2 09:55:12",
          initiator: "小明",
          initiateTime: "2019-8-8 05:12:12"
        }
      ],
      //上市列表
      IPOList: [],
      // 退市列表
      delistList: [
        {
          delistProgram: "SW001",
          delistPlanName: "试玩1-连环夺宝",
          gameVersions: "1.0.1",
          area: "广东",
          startTime: "2019-9-9 09:21:12",
          endTime: "2019-10-2 09:55:12",
          initiator: "小明"
        },
        {
          delistProgram: "SW001",
          delistPlanName: "试玩1-连环夺宝",
          gameVersions: "1.0.1",
          area: "广东",
          startTime: "2019-9-9 09:21:12",
          endTime: "2019-10-2 09:55:12",
          initiator: "小明"
        },
        {
          delistProgram: "SW001",
          delistPlanName: "试玩1-连环夺宝",
          gameVersions: "1.0.1",
          area: "广东",
          startTime: "2019-9-9 09:21:12",
          endTime: "2019-10-2 09:55:12",
          initiator: "小明"
        },
        {
          delistProgram: "SW001",
          delistPlanName: "试玩1-连环夺宝",
          gameVersions: "1.0.1",
          area: "广东",
          startTime: "2019-9-9 09:21:12",
          endTime: "2019-10-2 09:55:12",
          initiator: "小明"
        },
        {
          delistProgram: "SW001",
          delistPlanName: "试玩1-连环夺宝",
          gameVersions: "1.0.1",
          area: "广东",
          startTime: "2019-9-9 09:21:12",
          endTime: "2019-10-2 09:55:12",
          initiator: "小明"
        },
        {
          delistProgram: "SW001",
          delistPlanName: "试玩1-连环夺宝",
          gameVersions: "1.0.1",
          area: "广东",
          startTime: "2019-9-9 09:21:12",
          endTime: "2019-10-2 09:55:12",
          initiator: "小明"
        }
      ]
    };
  },
  created() {
    this.getGameStoreInfo();
  },
  methods: {
    getGameStoreInfo() {
      const self = this;
      const data = {
        gameId: this.$route.query.id,
        id: this.$route.query.gameId,
      };
      (async data => {
        let res = await self.$api.getGameStoreInfo({ data });
        console.log(res);
        if (res && res.code == 0) {
          if (res.data.gameInfoVo != null) {
            this.eachList (this.baseInfo, res.data.gameInfoVo);
            this.eachList(this.developerInfo, res.data.developerInfo);
            this.eachList(this.editionInfo, res.data.tSoftwareInfo);
            this.appendixInfo = res.data.fileList
          } else {
            self.$message.warning(res.data.msg);
          }
        } else {
          self.$message.warning(res.msg);
        }
      })(data);
    },
    getQueryPlan () {
      const _this = this;
      const data = {
        gameId: _this.$route.query.gameId
      } 
      console.log(data);
      (async data => {
        let res = await _this.$api.queryPlanByGameId({ data });
        console.log(res);
        if (res && res.code == 0) {
          this.IPOList = res.data
        } else {
          _this.$message.warning(res.msg);
        }
      })(data);
    },
    handleClick(tab, event) {
      if (tab.index == '2') {
        this.getQueryPlan()
      }
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {},
    eachList (arr, obj) {
       arr.forEach(item => {
          item.value = obj[item.prop]
          if (item.prop == 'jackpotType') {
            item.value = this.formatJackpotType(obj[item.prop])
          }
        })
    },
    formatJackpotType (status) {
      switch(status){
        case 1:
        case "1": 
        return status = '无奖池'
        case 2:
        case "2": 
        return status = '单奖池'
        case 3:
        case "3": 
        return status = '多奖池'
      }
    }
  }
};
</script>

<style lang="less" scoped>
.store-check {
  background: #fff;
  // border-radius: 8px;
}
.el-tabs__content {
  background: #000;
}
.panel {
  margin-bottom: 15px;
}
.base-info .info-list .text {
  font-size: 12px;
  overflow: hidden;
  word-break: break-all;
}
</style>