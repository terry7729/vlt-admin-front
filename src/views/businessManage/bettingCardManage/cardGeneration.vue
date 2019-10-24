<template>
  <!-- 投注卡生成 -->
  <div class="vlt-card">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="100px"
    >
      <control-bar slot="extend-bar" position="left" @select="selectBtn" :options="controlOptions"></control-bar>
    </search-bar>
    <el-row class="card-table">
      <el-table
        :data="tableData.records"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        class="table-box"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          v-for="(item,key) in tableDatas.tableKey"
          :key="key"
          :prop="item.value"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button> -->
            <el-button type="primary" size="mini" @click="handleClick(scope.row)">明细</el-button>
            <el-button type="primary" size="mini" @click="toExport(scope.row)">导出</el-button>
            <el-button type="danger" size="mini" @click="logout (scope.row) ">注销</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <table-paging
      position="right"
      :total="tableData.total"
      :currentPage="tableData.current"
      :pageSize="tableData.size"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></table-paging>
  </div>
</template>

<script type="text/javascript">
import dialogForm from "@/views/businessManage/bettingCardManage/components/dialogForm";
export default {
  name: "cardGeneration",
  data() {
    return {
      // 搜索组件配置
      searchOptions: [
        { title: "批次：", type: "input", prop: "batch", value: "" },
        {
          title: "所属机构：",
          type: "select",
          prop: "insId",
          value: "",
          options: [
            {
              label: "机构1",
              value: 1
            },
            {
              label: "机构2",
              value: 2
            }
          ]
        },
        {
          title: "投注卡类型：",
          type: "select",
          prop: "bettingCardType",
          value: "",
          options: [
            {
              label: "类型1",
              value: 1
            },
            {
              label: "类型2",
              value: 2
            }
          ]
        }
      ],
      controlOptions: [{ name: "新建卡片", type: "primary", icon: "plus" }],
      serviceList: {
        type: "1",
        dataList: [
          {
            id: 0,
            avatar: require("@/assets/img/avatar.jpg"),
            name: "主板-xx型",
            device: "投注机-F01型",
            failure: {
              failureRate: "1%",
              name: "故障率"
            },
            descList: [
              {
                id: 0,
                name: "配件数量",
                number: "3568"
              },
              {
                id: 1,
                name: "维修次数",
                number: "14"
              }
            ]
          },
          {
            id: 1,
            avatar: require("@/assets/img/avatar.jpg"),
            name: "主板-xx型",
            device: "投注机-F01型",
            failure: {
              failureRate: "1%",
              name: "故障率"
            },
            descList: [
              {
                id: 0,
                name: "配件数量",
                number: "3568"
              },
              {
                id: 1,
                name: "维修次数",
                number: "14"
              }
            ]
          },
          {
            id: 2,
            avatar: require("@/assets/img/avatar.jpg"),
            name: "主板-xx型",
            device: "投注机-F01型",
            failure: {
              failureRate: "1%",
              name: "故障率"
            },
            descList: [
              {
                id: 0,
                name: "配件数量",
                number: "3568"
              },
              {
                id: 1,
                name: "维修次数",
                number: "14"
              }
            ]
          },
          {
            id: 3,
            avatar: require("@/assets/img/avatar.jpg"),
            name: "主板-xx型",
            device: "投注机-F01型",
            failure: {
              failureRate: "1%",
              name: "故障率"
            },
            descList: [
              {
                id: 0,
                name: "配件数量",
                number: "3568"
              },
              {
                id: 1,
                name: "维修次数",
                number: "14"
              }
            ]
          },
          {
            id: 4,
            avatar: require("@/assets/img/avatar.jpg"),
            name: "主板-xx型",
            device: "投注机-F01型",
            failure: {
              failureRate: "1%",
              name: "故障率"
            },
            descList: [
              {
                id: 0,
                name: "配件数量",
                number: "3568"
              },
              {
                id: 1,
                name: "维修次数",
                number: "14"
              }
            ]
          },
          {
            id: 5,
            avatar: require("@/assets/img/avatar.jpg"),
            name: "主板-xx型",
            device: "投注机-F01型",
            failure: {
              failureRate: "1%",
              name: "故障率"
            },
            descList: [
              {
                id: 0,
                name: "配件数量",
                number: "3568"
              },
              {
                id: 1,
                name: "维修次数",
                number: "14"
              }
            ]
          }
        ]
      },
      tableDatas: {
        tableKey: [
          { label: "序号", value: "bettingCardId", width: "80" },
          { label: "批次", value: "batch", width: "" },
          { label: "投注卡类型", value: "bettingCardType", width: "100" },
          { label: "所属机构", value: "insName", width: "" },
          { label: "发卡数量", value: "cardMakingQuantity", width: "80" },
          { label: "备注", value: "remark", width: "" }
        ]
      },
      tableData: {
        records: [],
        total: 4,
        size: 15,
        current: 1,
        orders: [],
        searchCount: true,
        pages: 1
      }
    };
  },
  created() {
    this.initList();
  },
  methods: {
    async initList(insId = 0, page = 1, size = 10, batch = '', bettingCardType = 0) {
      let options = {
        page: 0,
        pageSize: 0,
        param: {
          batch: "",
          bettingCardType: 0,
          insId: 0
        }
      };
      let data = JSON.parse(JSON.stringify(options));
      let result = await this.$api.cardGenerationList({ data });
      console.log("data", result);
      if (result.code == 0) {
        this.tableData = result.data;
      }
    },
    changeSelect(val) {
      console.log(this.form, val);
    },
    selectBtn(val) {
      // console.log(val);
      // this.showdialog = true;
      this.$router.push({
        name: "newCard"
      });
    },
    search(form) {
      console.log("search", form);
      // this.initList();
    },
    handleClick(row) {
      this.$router.push({
        name: "cardDetail",
        query: {
          id: row.id
        }
      });
    },
    edit(val) {
      this.$router.push({
        name: "exportCard",
        query: {
          id: val.id
        }
      });
    },
    toExport(val) {
      this.$router.push({
        name: "exportCard",
        query: {
          id: val.id
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(pageSize) {
      // this.tableData.size = pageSize
      this.initList(0, 1, pageSize);
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage);
      this.initList(0, currentPage, 10);
    },
    changeForm(val) {
      Object.assign(this.params, val);
      console.log("派发出来的参数", this.params);
    },
    logout(row) {
      console.log("注销", row);
    }
  },
  components: {
    "dialog-form": dialogForm
  }
};
</script>

<style lang="less" scoped>
</style>
