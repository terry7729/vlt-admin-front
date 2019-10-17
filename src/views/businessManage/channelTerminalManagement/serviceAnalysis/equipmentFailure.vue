<!-- 设备故障 -->
<template>
  <div class="vlt-card-child">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    ></search-bar>
    <analysisCard :list="serviceList" :tableDatas="datas"></analysisCard>
  </div>
</template>

<script type="text/javascript">
import analysisCard from "@/views/businessManage/channelTerminalManagement/components/analysisCard";
export default {
  name: "equipmentFailure",
  data() {
   return {
      // 搜索组件配置
      searchOptions: [
        {
          type: "select",
          prop: "selectName2",
          value: "",
          title: "设备名称：",
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
          title: "设备型号：",
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
          prop: "selectName3",
          value: "",
          title: "选择机构：",
          placeholder: "请选择",
          options: [
            {
              label: "设备故障率排行",
              value: 1
            },
            {
              label: "设备故障次数排行",
              value: 2
            }
          ]
        }
      ],
      serviceList: {
        type: '2',
        dataList: [{
          id: 0,
          avatar: require('@/assets/img/avatar.jpg'),
          name: '投注机-F01型',
          failure: {
            failureRate: '1%',
            name: '故障率'
          },
          descList: [{
            id: 0,
            name: '工单完成量',
            number: '76'
          },{
            id: 1,
            name: '贡献知识库',
            number: '39'
          },{
            id: 2,
            name: '平均响应时间',
            number: '4h'
          }]
        },{
          id: 1,
          avatar: require('@/assets/img/avatar.jpg'),
          name: '投注机-F01型',
          failure: {
            failureRate: '1%',
            name: '故障率'
          },
          descList: [{
            id: 0,
            name: '工单完成量',
            number: '76'
          },{
            id: 1,
            name: '贡献知识库',
            number: '39'
          },{
            id: 2,
            name: '平均响应时间',
            number: '4h'
          }]
        },{
          id: 2,
          avatar: require('@/assets/img/avatar.jpg'),
          name: '投注机-F01型',
          failure: {
            failureRate: '1%',
            name: '故障率'
          },
          descList: [{
            id: 0,
            name: '工单完成量',
            number: '76'
          },{
            id: 1,
            name: '贡献知识库',
            number: '39'
          },{
            id: 2,
            name: '平均响应时间',
            number: '4h'
          }]
        },{
          id: 3,
          avatar: require('@/assets/img/avatar.jpg'),
          name: '投注机-F01型',
          failure: {
            failureRate: '1%',
            name: '故障率'
          },
          descList: [{
            id: 0,
            name: '工单完成量',
            number: '76'
          },{
            id: 1,
            name: '贡献知识库',
            number: '39'
          },{
            id: 2,
            name: '平均响应时间',
            number: '4h'
          }]
        },{
          id: 4,
          avatar: require('@/assets/img/avatar.jpg'),
          name: '投注机-F01型',
          failure: {
            failureRate: '1%',
            name: '故障率'
          },
          descList: [{
            id: 0,
            name: '工单完成量',
            number: '76'
          },{
            id: 1,
            name: '贡献知识库',
            number: '39'
          },{
            id: 2,
            name: '平均响应时间',
            number: '4h'
          }]
        },{
          id: 5,
          avatar: require('@/assets/img/avatar.jpg'),
          name: '投注机-F01型',
          failure: {
            failureRate: '1%',
            name: '故障率'
          },
          descList: [{
            id: 0,
            name: '工单完成量',
            number: '76'
          },{
            id: 1,
            name: '贡献知识库',
            number: '39'
          },{
            id: 2,
            name: '平均响应时间',
            number: '4h'
          }]
        }]
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
            label: "设备名称",
            value: "name",
            width: ''
          },
          {
            label: "设备型号",
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
   }
  },
 components: {
   analysisCard
 },
 methods: {
   getList () {
     console.log('查看列表');
   },
    search(form) {
      console.log("search", form);
    },
 },
}
</script>

<style lang="less" scoped>
</style>
