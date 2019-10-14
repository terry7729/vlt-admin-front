<!-- 配件故障-->
<template>
  <div class="vlt-card-child">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    ></search-bar>
    <analysisCard :list="serviceList"  :tableDatas="datas"></analysisCard>
  </div>
</template>

<script type="text/javascript">
import analysisCard from "@/views/businessManage/channelTerminalManagement/components/analysisCard";
export default {
  name: "",
  data() {
    return {
      // 搜索组件配置
      searchOptions: [
        {
          type: "input",
          prop: "inputName",
          value: "",
          title: "配件名称：",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "selectName",
          value: "",
          title: "配件型号：",
          placeholder: "请选择",
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
          type: "select",
          prop: "selectName2",
          value: "",
          title: "排行：",
          placeholder: "按工单完成总量排行",
          options: [
            {
              label: "配件故障率排行",
              value: 1
            },
            {
              label: "配件故障次数排行",
              value: 2
            },
            {
              label: "工单完成时效排行",
              value: 3
            }
          ]
        }
      ],
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
      datas: {
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
            width: ''
          },
          {
            label: "配件名称",
            value: "name",
            width: ''
          },
          {
            label: "配件型号",
            value: "model",
            width: ''
          },
          {
            label: "维修次数",
            value: "repairs",
            width: ''
          },
          {
            label: "故障率",
            value: "failureRate",
            width: ''
          }
        ]
      }
    };
  },
  components: {
    analysisCard
  },
  methods: {
    search(form) {
      console.log("search", form);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
