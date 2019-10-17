<!-- 首页 - 概况 - 消息列表 -->

<template>
  <div class="vlt-card">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    >   
    <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions" position="left" ></control-bar>
    </search-bar>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
      <el-tab-pane v-for="item in tabs" :key="item.id" :label="item.label" :name="item.name">
        <el-table :data="item.tableData" style="width: 100%" border>
          <el-table-column prop="id" label="序号" width="60"></el-table-column>
          <el-table-column prop="title" label="标题" width="180"></el-table-column>
          <el-table-column prop="recipient" label="收件人" width="120"></el-table-column>
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="detail(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- <el-tab-pane label="接收消息" name="first">接收消息</el-tab-pane>
      <el-tab-pane label="已发消息" name="second">配置管理</el-tab-pane>-->
      <table-paging
        position="right"
        :total="999"
        :currentPage="1"
        :pageSize="10"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
      </table-paging>
    </el-tabs>
  </div>
</template>

<script>
const tabsList = [
  {
    id: 0,
    label: "接收消息",
    name: "frist",
    tableData: [
      {
        id: "1",
        title: "福彩促销活动通知",
        recipient: "张三，李四，王五",
        date: "2015-10-10",
        content: "福彩促销活动通知，请各位做好准备"
      },

      {
        id: "2",
        title: "福彩促销活动通知",
        recipient: "张三，李四，王五",
        date: "2015-10-10",
        content: "福彩促销活动通知，请各位做好准备"
      },
      {
        id: "3",
        title: "福彩促销活动通知",
        recipient: "张三，李四，王五",
        date: "2015-10-10",
        content: "福彩促销活动通知，请各位做好准备"
      },
      {
        id: "4",
        title: "福彩促销活动通知",
        recipient: "张三，李四，王五",
        date: "2015-10-10",
        content: "福彩促销活动通知，请各位做好准备"
      },
      {
        id: "5",
        title: "福彩促销活动通知",
        recipient: "张三，李四，王五",
        date: "2015-10-10",
        content: "福彩促销活动通知，请各位做好准备"
      }
    ]
  },
  {
    id: 1,
    label: "已发消息",
    name: "second",
    tableData: [
      {
        id: "1",
        title: "福彩促销活动通知2",
        recipient: "李四，王五",
        date: "2015-10-10",
        content: "福彩促销活动通知，请各位做好准备"
      },
      {
        id: "2",
        title: "福彩促销活动通知2",
        recipient: "张三，李四，王五",
        date: "2015-10-10",
        content: "福彩促销活动通知，请各位做好准备"
      },
      {
        id: "3",
        title: "福彩促销活动通知2",
        recipient: "张三，李四，王五",
        date: "2015-10-10",
        content: "福彩促销活动通知，请各位做好准备"
      },
      {
        id: "4",
        title: "福彩促销活动通知2",
        recipient: "张三，李四，王五",
        date: "2015-10-10",
        content: "福彩促销活动通知，请各位做好准备"
      }
    ]
  }
];
export default {
  name: 'messages',
  data() {
    return {
      tabs: [],
      activeName: "second",
      // 搜索组件配置
      searchOptions: [
        {
          type: "select",
          prop: "selectName",
          value: "",
          title: "标题：",
          placeholder: "请选择",
          options: [
            {
              label: "选项1",
              value: 1
            },
            {
              label: "选项2",
              value: 2
            }
          ]
        },
        {
          type: "datepicker-range",
          prop: "date2",
          value: "",
          title: "有效日期：",
          placeholder: ["开始日期", "结束日期"]
        }
      ],
      controlOptions: [
        { name: "发布消息", type: "primary", icon: "plus" }, // type为按钮的五种颜色， icon为具体的图标
      ]
    };
  },
  created() {
    this.tabs = tabsList;
  },
  watch: {
    $route(url) {
      // console.log(url.params.type);
    }
  },
  methods: {
    search(form) {
      console.log("search", form);
    },
    selectBtn() {
      console.log('selectBtn');
      this.$router.push({
        name: 'sendMessage'
      })
    },
    handleClick(tab, event) {
      const index = tab.index;
      const self = this;
      if (index == 1) {
        self.$router.push({
          params: {
            type: "sent"
          }
        });
      } else {
        self.$router.push({
          params: {
            type: "receiving"
          }
        });
      }
    },
    detail(row) {
      console.log(row);
      this.$router.push({
        name: 'messagesDetail',
        query: {id: row.id}
      })
    },
    toPush () {
      this.$router.push({
        name: 'sendMessage'
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
.el-tabs {
  margin-top: 20px;
}
</style>