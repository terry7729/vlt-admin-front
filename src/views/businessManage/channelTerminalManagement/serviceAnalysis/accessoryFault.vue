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
    <el-row>
      <el-col>
        <el-button type="primary" size="mini" @click="getList">查看列表</el-button>
      </el-col>
    </el-row>
    <analysisCard :list="serviceList"></analysisCard>
  </div>
</template>

<script type="text/javascript">
import analysisCard from '@/components/main/analysisCard'
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
          title: "姓名：",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "selectName",
          value: "",
          title: "所属机构：",
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
              label: "完成总量排行",
              value: 1
            },
            {
              label: "完成率排行",
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
            avatar: require('@/assets/img/avatar.jpg'),
            name: "张三",
            tel: "13500001111",
            address: "乌鲁木齐市",
            descList: [
              {
                id: 0,
                name: "工单完成量",
                number: "76"
              },
              {
                id: 1,
                name: "贡献知识库",
                number: "39"
              },
              {
                id: 2,
                name: "平均响应时间",
                number: "4h"
              }
            ]
          },
          {
            id: 1,
            avatar: require('@/assets/img/avatar.jpg'),
            name: "张三",
            tel: "13500001111",
            address: "乌鲁木齐市",
            descList: [
              {
                id: 0,
                name: "工单完成量",
                number: "76"
              },
              {
                id: 1,
                name: "贡献知识库",
                number: "39"
              },
              {
                id: 2,
                name: "平均响应时间",
                number: "4h"
              }
            ]
          },
          {
            id: 2,
            avatar: require('@/assets/img/avatar.jpg'),
            name: "张三",
            tel: "13500001111",
            address: "乌鲁木齐市",
            descList: [
              {
                id: 0,
                name: "工单完成量",
                number: "76"
              },
              {
                id: 1,
                name: "贡献知识库",
                number: "39"
              },
              {
                id: 2,
                name: "平均响应时间",
                number: "4h"
              }
            ]
          },
          {
            id: 3,
            avatar: require('@/assets/img/avatar.jpg'),
            name: "张三",
            tel: "13500001111",
            address: "乌鲁木齐市",
            descList: [
              {
                id: 0,
                name: "工单完成量",
                number: "76"
              },
              {
                id: 1,
                name: "贡献知识库",
                number: "39"
              },
              {
                id: 2,
                name: "平均响应时间",
                number: "4h"
              }
            ]
          },
          {
            id: 4,
            avatar: require('@/assets/img/avatar.jpg'),
            name: "张三",
            tel: "13500001111",
            address: "乌鲁木齐市",
            descList: [
              {
                id: 0,
                name: "工单完成量",
                number: "76"
              },
              {
                id: 1,
                name: "贡献知识库",
                number: "39"
              },
              {
                id: 2,
                name: "平均响应时间",
                number: "4h"
              }
            ]
          },
          {
            id: 5,
            avatar: require('@/assets/img/avatar.jpg'),
            name: "张三",
            tel: "13500001111",
            address: "乌鲁木齐市",
            descList: [
              {
                id: 0,
                name: "工单完成量",
                number: "76"
              },
              {
                id: 1,
                name: "贡献知识库",
                number: "39"
              },
              {
                id: 2,
                name: "平均响应时间",
                number: "4h"
              }
            ]
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
    },
    getList() {
      console.log("GetList");
    }
  }
};
</script>

<style lang="less" scoped>
</style>
