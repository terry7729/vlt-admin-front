<template>
  <!-- 投注卡生成 -->
  <div class="vlt-card">
    <section class="comp-item">
      <h4 class="comp-title">搜索框-拓展</h4>
      <search-bar
        class="search-bar-demo"
        @search="search"
        :options="searchOptions"
        :total="999"
        labelWidth="100px"
      >
        <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
      </search-bar>
    </section>
    <el-row class="card-table">
      <el-table :data="tableDatas.tableData" border style="width: 100%" class="table-box">
        <el-table-column
          v-for="(item,key) in tableDatas.tableKey"
          :key="key"
          :prop="item.value"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
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
            model: "F01",
            name: "投注机",
            repairs: 1,
            failureRate: "56"
          },
          {
            id: 1,
            model: "F01",
            name: "投注机",
            repairs: 1,
            failureRate: "56"
          },
          {
            id: 2,
            model: "F01",
            name: "投注机",
            repairs: 1,
            failureRate: "56"
          },
          {
            id: 3,
            model: "F01",
            name: "投注机",
            repairs: 1,
            failureRate: "56"
          },
          {
            id: 4,
            model: "F01",
            name: "投注机",
            repairs: 1,
            failureRate: "56"
          },
          {
            id: 5,
            model: "F01",
            name: "投注机",
            repairs: 1,
            failureRate: "56"
          },
          {
            id: 6,
            model: "F01",
            name: "投注机",
            repairs: 1,
            failureRate: "56"
          },
          {
            id: 7,
            model: "F01",
            name: "投注机",
            repairs: 1,
            failureRate: "56"
          },
          {
            id: 8,
            model: "F01",
            name: "投注机",
            repairs: 1,
            failureRate: "56"
          },
          {
            id: 9,
            model: "F01",
            name: "投注机",
            repairs: 1,
            failureRate: "56"
          }
        ],
        tableKey: [
          {
            label: "序号",
            value: "id",
            width: ""
          },
          {
            label: "配件名称",
            value: "name",
            width: ""
          },
          {
            label: "配件型号",
            value: "model",
            width: ""
          },
          {
            label: "维修次数",
            value: "repairs",
            width: ""
          },
          {
            label: "故障率",
            value: "failureRate",
            width: ""
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    changeSelect(val) {
      console.log(this.form, val);
    },
    selectBtn(val) {
      console.log(val);
    },
    search(form) {
      console.log("search", form);
    }
  },
  components: {
  }
};
</script>

<style lang="less" scoped>
</style>
