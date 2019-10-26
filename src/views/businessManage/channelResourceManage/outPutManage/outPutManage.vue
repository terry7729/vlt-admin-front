<template>
  <div class="vlt-card">
    <div class="tabs-content">
      <h3>出入库管理</h3>
      <el-tabs tab-position="left" style="height: 800px;">
        <el-tab-pane label="入库管理">
          <search-bar
            class="search-bar-demo"
            @search="putSearch"
            :options="PutOptions"
            :total="999"
            labelWidth="80px"
          ></search-bar>
          <control-bar :options="controlOptions" position="left" @select="putSelectBtn"></control-bar>
          <el-tabs v-model="putActiveName" @tab-click="puthandleClick" class="tables-content">
            <el-tab-pane label="待入库" name="stayPut">
              <el-table :data="stayPutData" border style="width: 100%">
                <el-table-column prop="id" label="序号" type="index"></el-table-column>
                <el-table-column prop="documentNumber" label="单据编号"></el-table-column>
                <el-table-column prop="resourceApplyTitle" label="申请标题"></el-table-column>
                <el-table-column prop="oplType" label="操作类型">
                  <template slot-scope="scope">
                    <span>{{scope.row.oplType===1?'资源采购':(scope.row.oplType===2?'资源申请':'资源发放')}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="preReceivDate" label="申请时间"></el-table-column>
                <el-table-column prop="cUserName" label="申请人员"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="putStore(scope.row.id)"
                      type="primary"
                      v-prevent="2000"
                      size="mini"
                    >入库</el-button>
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
            <el-tab-pane label="已入库" name="alreadyPut">
              <el-table :data="alreadyPutData" border style="width: 100%">
                <el-table-column prop="id" label="序号" type="index"></el-table-column>
                <el-table-column prop="billCode" label="单据编号"></el-table-column>
                <el-table-column prop="applyTitle" label="申请标题"></el-table-column>
                <el-table-column prop="operationType" label="操作类型"></el-table-column>
                <el-table-column prop="putTime" label="入库时间"></el-table-column>
                <el-table-column prop="putPerson" label="入库人员"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="putDetail(scope.row.id)"
                      type="primary"
                      v-prevent="2000"
                      size="mini"
                    >详情</el-button>
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
        </el-tab-pane>
        <el-tab-pane label="出库管理">
          <search-bar
            class="search-bar-demo"
            @search="outSearch"
            :options="outOptions"
            :total="999"
            labelWidth="80px"
          ></search-bar>
          <control-bar :options="controlOptions" position="left" @select="outSelectBtn"></control-bar>
          <el-tabs v-model="outActiveName" @tab-click="outhandleClick" class="tables-content">
            <el-tab-pane label="待出库" name="stayOut">
              <el-table :data="stayOutData" border style="width: 100%">
                <el-table-column prop="id" label="序号" type="index"></el-table-column>
                <el-table-column prop="documentNumber" label="单据编号"></el-table-column>
                <el-table-column prop="resourceApplyTitle" label="申请标题"></el-table-column>
                <el-table-column prop="oplType" label="操作类型">
                  <template slot-scope="scope">
                    <span>{{scope.row.oplType===1?'资源采购':(scope.row.oplType===2?'资源申请':'资源发放')}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="preReceivDate" label="申请时间"></el-table-column>
                <el-table-column prop="cUserName" label="申请人员"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="outStore(scope.row.id)"
                      type="primary"
                      v-prevent="2000"
                      size="mini"
                    >出库</el-button>
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
            <el-tab-pane label="已出库" name="alreadyOut">
              <el-table :data="alreadyOutData" border style="width: 100%">
                <el-table-column prop="id" label="序号" type="index"></el-table-column>
                <el-table-column prop="billCode" label="单据编号"></el-table-column>
                <el-table-column prop="applyTitle" label="申请标题"></el-table-column>
                <el-table-column prop="operationType" label="操作类型"></el-table-column>
                <el-table-column prop="putTime" label="入库时间"></el-table-column>
                <el-table-column prop="putPerson" label="入库人员"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="outDetail(scope.row.id)"
                      type="primary"
                      v-prevent="2000"
                      size="mini"
                    >详情</el-button>
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "outPutManage",
  data() {
    return {
      total: 400,
      currentPage: 6,
      pageSize: 20,
      putActiveName: "stayPut",
      outActiveName: "stayOut",
      params: {},
      //入库
      PutOptions: [
        { title: "单据编号", type: "input", prop: "documentNumber", value: "" },
        {
          title: "申请标题",
          type: "input",
          prop: "resourceApplyTitle",
          value: ""
        }
      ],
      //出库
      outOptions: [
        { title: "单据编号", type: "input", prop: "documentNumber", value: "" },
        {
          title: "申请标题",
          type: "input",
          prop: "resourceApplyTitle",
          value: ""
        }
      ],
      controlOptions: [
        { name: "导出", type: "danger", icon: "download" },
        { name: "打印当前", type: "primary", icon: "printer" }
      ],
      stayPutData: [
        {
          id: 1,
          documentNumber: "2222",
          resourceApplyTitle: "1234",
          oplType: "1",
          preReceivDate: "2019-03-15",
          cUserName: "张三",
          remark: ""
        }
      ],
      alreadyPutData: [],
      stayOutData: [
        {
          id: 1,
          documentNumber: "2222",
          resourceApplyTitle: "xxxxx",
          oplType: 3,
          preReceivDate: "2019-03-15",
          cUserName: "张三",
          remark: ""
        }
      ],
      alreadyOutData: []
    };
  },
  created() {
    // if (this.stayPutData) {
    // }
  },
  methods: {
    //入库管理
    puthandleClick(tab, event) {
      console.log(tab, event);
    },
    putSearch(form) {
      console.log("search", form);
    },
    putSelectBtn(val) {
      console.log(val);
    },
    putDetail(id) {
      this.$router.push({ name: "alreadyPutDetail", query: { id } });
      console.log(id);
    },

    putStore(id) {
      this.$router.push({
        name: "putStore",
        query: { id }
      });
    },

    //出库管理
    outSearch(form) {
      console.log("search", form);
    },
    outSelectBtn(val) {
      console.log(val);
    },
    outhandleClick(tab, event) {
      console.log(tab, event);
    },
    //出库跳转
    outStore(id) {
      console.log(this.stayPutData);
      this.$router.push({
        name: "outStore",
        query: { id }
      });
    },
    //  出库详情
    outDetail(id) {
      this.$router.push({
        name: "alreadyOutDetail",
        query: { id }
      });
    },

    handleCurrentChange(currentPage) {
      console.log(currentPage);
    },
    handleSizeChange(pageSize) {
      console.log(pageSize);
    }
  }
};
</script>

<style lang="less">
h3 {
  margin-bottom: 20px;
}
.tabs-content {
  padding: 16px 30px;
  .el-tabs__nav {
    margin-right: 100px;
  }
  .el-tabs__item.is-active {
    background: rgb(230, 247, 255);
  }
  .el-tabs--left .el-tabs__active-bar.is-left,
  .el-tabs--left .el-tabs__nav-wrap.is-left::after {
    left: 194px;
    margin-right: 10px;
  }
  .el-tabs--left .el-tabs__nav-wrap.is-left {
    margin-right: -60px;
  }
  .el-tabs__item {
    padding: 0 70px;
  }
  .tables-content .el-tabs__item.is-active {
    background: none;
  }
}
</style>
