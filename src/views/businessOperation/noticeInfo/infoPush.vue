<template>
  <div class="vlt-card">
    <div class="info-push">
      <div class="title">
        <i class="el-icon-message"></i>
        <span class="title-msg">消息推送</span>
      </div>
      <el-tabs :tab-position="tabPosition='left'">
        <el-tab-pane label="推送列表">
          <search-bar @search="infoSearch" :options="listOptions" :total="999" labelWidth="80px"></search-bar>
          <el-button type="primary" size="mini">
            <i class="el-icon-plus" @click="infoEdit">发布推送</i>
          </el-button>
          <el-table ref="multipleTable" :data="pushList" border>
            <el-table-column prop="num" label="序号"></el-table-column>
            <el-table-column prop="title" label="推送标题"></el-table-column>
            <el-table-column prop="name" label="模板名称"></el-table-column>
            <el-table-column prop="organ" label="发布机构"></el-table-column>
            <el-table-column prop="time" label="发布时间"></el-table-column>
            <el-table-column prop="state" label="发布状态"></el-table-column>
            <el-table-column prop="remark" label="备注内容"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="pushDetail(scope.row.num)">查看详情</el-button>
                <el-button type="primary" size="mini" v-if="scope.row.state=='推送中'">停用</el-button>
              </template>
            </el-table-column>
          </el-table>
          <tablePaging class="table_paging_right" :total="99" :currentPage="1" :pageSize="10"></tablePaging>
        </el-tab-pane>

        <el-tab-pane label="推送模板">
          <search-bar
            class
            @search="templateSearch"
            :options="templateOptions"
            :total="999"
            labelWidth="80px"
          ></search-bar>
          <el-button type="primary" size="mini">
            <i class="el-icon-plus">新建模板</i>
          </el-button>
          <el-table ref="templateList" :data="templateData" border>
            <el-table-column prop="num" label="序号"></el-table-column>
            <el-table-column prop="name" label="模板名称"></el-table-column>
            <el-table-column prop="type" label="模板类型"></el-table-column>
            <el-table-column prop="channel" label="推送渠道"></el-table-column>
            <el-table-column prop="time" label="推送频率"></el-table-column>
            <el-table-column prop="date" label="推送时间"></el-table-column>
            <el-table-column prop="remark" label="推送内容"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="templateDetail(scope.row.num)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="table_paging">
            <tablePaging class="table_paging_right" :total="99" :currentPage="1" :pageSize="10"></tablePaging>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      listOptions: [
        { title: "推送标题", type: "input", prop: "pushTitle", value: "" },
        { title: "模板名称", type: "input", prop: "templateName", value: "" },
        {
          title: "发布机构",
          type: "select",
          prop: "organ",
          value: "",
          options: [
            {
              label: "中彩",
              value: 1
            },
            {
              label: "广东分中心",
              value: 2
            }
          ]
        },
        {
          title: "发布状态",
          type: "select",
          prop: "state",
          value: "",
          options: [
            {
              label: "推送中",
              value: 3
            },
            {
              label: "已审核",
              value: 4
            }
          ]
        },
        { title: "备注内容", type: "input", prop: "remark", value: "" },
        {
          title: "发布时间",
          type: "datetime-range",
          prop: "date2",
          value: ""
        }
      ],
      templateOptions: [
        { title: "模板名称", type: "input", prop: "templateName", value: "" },
        { title: "推送频率", type: "input", prop: "pushTime", value: "" },
        {
          title: "模板类型",
          type: "select",
          prop: "templateType",
          value: "",
          options: [
            {
              label: "游戏发行",
              value: 1
            },
            {
              label: "营销活动",
              value: 2
            }
          ]
        },
        {
          title: "推送渠道",
          type: "select",
          prop: "channel",
          value: "",
          options: [
            {
              label: "用户",
              value: 3
            },
            {
              label: "人群",
              value: 4
            }
          ]
        },
        { title: "推送内容", type: "input", prop: "remark", value: "" },
        {
          title: "推送时间",
          type: "datetime-range",
          prop: "date",
          value: ""
        }
      ],

      pushList: [
        {
          num: "1",
          title: "防沉迷提醒",
          name: "防沉迷1",
          organ: "全国",
          time: "2019-10-16",
          state: "推送中",
          remark: "温馨提示：游戏时间过长"
        },
        {
          num: "2",
          title: "防沉迷提醒",
          name: "防沉迷2",
          organ: "全国",
          time: "2019-10-16",
          state: "已审核",
          remark: "温馨提示：游戏时间过长"
        }
      ],
      templateData: [
        {
          num: "1",
          name: "新游戏提醒",
          type: "游戏发行",
          channel: "用户",
          time: "一天两次",
          date: "2019-10-16",
          remark: "新游戏上线充值送积分"
        },
        {
          num: "2",
          name: "新游戏提醒",
          type: "游戏发行",
          channel: "用户",
          time: "一天两次",
          date: "2019-10-16",
          remark: "新游戏上线充值送积分"
        }
      ]
    };
  },
  components: {},
  methods: {
    infoSearch(params) {
      console.log("params1:", params);
    },
    templateSearch(params) {
      console.log("params2:", params);
    },
    infoEdit() {
      this.$router.push({ path: "infoEdit" });
    },
    pushDetail(num) {
      this.$router.push({ path: "infoEdit", query: { id: num } });
    },
    templateDetail(id) {}
  }
};
</script>

<style lang="less" scoped>
.info-push {
  .title {
    margin: 10px 0 15px 20px;
    font-size: 18px;
    .title-msg {
      margin-left: 5px;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
