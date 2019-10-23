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
      <control-bar slot="extend-bar" position="left" @select="selectBtn" :options="controlOptions" ></control-bar>
    </search-bar>
    <el-row class="card-table">
      <el-table
        :data="tableDatas.tableData"
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
      :total="999"
      :currentPage="1"
      :pageSize="10"
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
        { title: "批次：", type: "input", prop: "inputName", value: "" },
        {
          title: "所属机构：",
          type: "select",
          prop: "selectName",
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
          prop: "selectName2",
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
        },
        {
          type: "datetime-range",
          prop: "date4",
          value: "",
          title: "有效日期：",
          placeholder: ["开始时间", "结束时间"]
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
        tableData: [
          {
            id: 0,
            ardType: "F01",
            batch: 3,
            cardsIssued: 1,
            affiliation: "56",
            date: "2019-09-08",
            remarks: "sss"
          },
          {
            id: 1,
            ardType: "F01",
            batch: 3,
            cardsIssued: 1,
            affiliation: "56",
            date: "2019-09-08",
            remarks: "sss"
          },
          {
            id: 2,
            ardType: "F01",
            batch: 3,
            cardsIssued: 1,
            affiliation: "56",
            date: "2019-09-08",
            remarks: "sss"
          },
          {
            id: 3,
            ardType: "F01",
            batch: 3,
            cardsIssued: 1,
            affiliation: "56",
            date: "2019-09-08",
            remarks: "sss"
          },
          {
            id: 4,
            ardType: "F01",
            batch: 3,
            cardsIssued: 1,
            affiliation: "56",
            date: "2019-09-08",
            remarks: "sss"
          },
          {
            id: 5,
            ardType: "F01",
            batch: 3,
            cardsIssued: 1,
            affiliation: "56",
            date: "2019-09-08",
            remarks: "sss"
          },
          {
            id: 6,
            ardType: "F01",
            batch: 3,
            cardsIssued: 1,
            affiliation: "56",
            date: "2019-09-08",
            remarks: "sss"
          },
          {
            id: 7,
            ardType: "F01",
            batch: 3,
            cardsIssued: 1,
            affiliation: "56",
            date: "2019-09-08",
            remarks: "sss"
          },
          {
            id: 8,
            ardType: "F01",
            batch: 3,
            cardsIssued: 1,
            affiliation: "56",
            date: "2019-09-08",
            remarks: "sss"
          },
          {
            id: 9,
            ardType: "F01",
            batch: 3,
            cardsIssued: 1,
            affiliation: "56",
            date: "2019-09-08",
            remarks: "sss"
          }
        ],
        tableKey: [
          {
            label: "序号",
            value: "id",
            width: "80"
          },
          {
            label: "批次",
            value: "batch",
            width: ""
          },
          {
            label: "投注卡类型",
            value: "ardType",
            width: "100"
          },
          {
            label: "所属机构",
            value: "affiliation",
            width: ""
          },
          {
            label: "发卡数量",
            value: "cardsIssued",
            width: "80"
          },
          {
            label: "有效日期",
            value: "date",
            width: ""
          },
          {
            label: "备注",
            value: "remarks",
            width: ""
          }
        ]
      }
    };
  },
  methods: {
    changeSelect(val) {
      console.log(this.form, val);
    },
    selectBtn(val) {
      // console.log(val);
      // this.showdialog = true;
      this.$router.push({
        name: 'newCard',
      })
    },
    search(form) {
      console.log("search", form);
    },
    handleClick(row) {
      this.$router.push({
        name: 'cardDetail',
        query: {
          id: row.id
        }
      })
    },
    edit (val) {
      this.$router.push({
        name: 'exportCard',
        query: {
          id: val.id
        }
      })
    },
    toExport (val) {
      this.$router.push({
        name: 'exportCard',
        query: {
          id: val.id
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(pageSize) {
      console.log(pageSize);
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage);
    },
    changeForm(val) {
      Object.assign(this.params, val);
      console.log("派发出来的参数", this.params);
    },
    logout (row) {
      console.log('注销', row);
    }
  },
  components: {
    "dialog-form": dialogForm
  }
};
</script>

<style lang="less" scoped>

</style>
