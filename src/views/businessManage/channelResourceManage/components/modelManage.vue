<template>
  <div class="vlt-card">
    <search
      class="search-bar-demo"
      @search="modelSearch"
      :options="modelInfoOptions"
      :total="totalCount"
      labelWidth="80px"
    ></search>
    <control-bar :options="controlOptions" @select="modelAdd" position="left"></control-bar>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="序号" type="index" width="80px"></el-table-column>
      <el-table-column prop="modelType" label="物品类别"></el-table-column>
      <el-table-column prop="goodsName" label="物品名称"></el-table-column>
      <el-table-column prop="deviceModel" label="物品型号"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-switch
            class="switchStyle"
            @change="changeState(scope.row.id,scope.row.status)"
            v-model="scope.row.status"
            active-color="#1890ff"
            active-text="开"
            inactive-color="#c0c0c0"
            inactive-text="关"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click="modelCheck(scope.row.id,scope.row.modelType)"
            type="primary"
            v-prevent="2000"
            size="mini"
          >查看</el-button>
          <el-button @click="modelAmend(scope.row)" type="primary" v-prevent="2000" size="mini">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-paging
      position="right"
      :total="totalCount"
      :currentPage="currentPage"
      :pageSize="pageSize"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></table-paging>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
import search from "./search";
export default {
  name: "modelManage",
  data() {
    return {
      modelInfoOptions: [
        {
          title: "物品类别",
          type: "select",
          prop: "modelType",
          value: "",
          options: [{ label: "设备", value: 1 }, { label: "配件", value: 2 }]
        },
        {
          title: "物品名称",
          type: "select",
          prop: "id",
          value: "",
          options: []
        },
        {
          title: "物品型号",
          type: "select",
          prop: "modelId",
          value: "",
          options: [
            { label: "xxxx", value: "1" },
            { label: "xxxx", value: "0" }
          ]
        },
        {
          title: "物品状态",
          type: "select",
          prop: "status",
          value: "",
          options: [{ label: "开", value: 1 }, { label: "关", value: 2 }]
        }
      ],

      controlOptions: [{ name: "新增", type: "primary", icon: "plus" }],
      totalCount: 10,
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      requestData: {
        page: 1,
        pageSize: 10,
        param: {
          goodsId: 0,
          modelId: 0,
          modelType: 0,
          status: 0
        }
      }
    };
  },
  components: {
    search
  },
  created() {
    this.getModelList(this.requestData);
  },
  methods: {
    async getModelList(data) {
      let type = {
        1: "设备",
        2: "配件"
      };
      let res = await this.$api.getModelList({ data });
      console.log(res);
      if (res && res.code == 0) {
        this.tableData = res.data.records;
        this.totalCount = res.data.total;
        this.tableData.forEach(item => {
          item.modelType = type[item.modelType];
        });
      }
    },
    //状态修改
    async changeState(id, status) {
      console.log(status);
      let data = {
        id: id,
        status: status,
        updateBy: "",
        updateTime: ""
      };
      let res = await this.$api.ModelstatusUpdate({ data });
      if (res && res.code == 0) {
        this.$message({
          message: "状态修改成功",
          type: "success"
        });
      }
    },
    // 型号搜索
    modelSearch(data) {
      console.log("searchdata", data);
      this.currentPage = 1;
      this.requestData.param = data;
      this.getModelList(this.requestData);
    },
    // 型号新增
    modelAdd() {
      this.$router.push({ name: "modelAdd" });
    },
    // 型号查看
    modelCheck(id,modelType) {
      switch (modelType){
        case '设备' :
          this.$router.push({
            path: 'modelEquipmentCheck',
            query: {
              id,
            }
          })
        break
        case '配件' :
          this.$router.push({
            path: 'modelPreCheck',
            query: {
              id
            }
          })
      }
    },
    //型号修改
    modelAmend(row) {
      console.log(row);

      if (row.modelType == "配件") {
        // 配件
        this.$router.push({
          path: "modelModification",
          query: { id: row.id }
        });
      } else {
        // 设备
        this.$router.push({
          path: "facillityAlter",
          query: { id: row.id }
        });
      }
    },
    handleCurrentChange(currentPage) {
      this.requestData.page = currentPage;
      this.getModelList(this.requestData);
    },
    handleSizeChange(pageSize) {
      this.requestData.pageSize = pageSize;
      this.getModelList(this.requestData);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
