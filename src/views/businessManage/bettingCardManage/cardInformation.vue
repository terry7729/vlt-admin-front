
<template>
  <!-- 投注卡信息 -->
  <div class="vlt-card">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="100px"
    ></search-bar>
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
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleClick(scope.row)">查看</el-button>
            <el-button v-if="scope.row.status === '待激活'" type="primary" size="mini" @click="activation(scope.row)">激活</el-button>
            <el-button type="danger" size="mini" @click="logout(scope.row)">注销</el-button>
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
export default {
  name: "cardInformation",
  data() {
    return {
      // 搜索组件配置
      searchOptions: [
        { title: "投注卡编号：", type: "input", prop: "inputName", value: "" },
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
      tableDatas: {
        tableData: [
          {
            id: 0,
            ardType: "试玩卡",
            number: 3,
            status: "已激活",
            affiliation: "杭州市",
            date: "2019-05-05  ～  2019-10-10 ",
            remarks: "sss"
          },
          {
            id: 1,
            ardType: "试玩卡",
            number: 3,
            status: "已激活",
            affiliation: "杭州市",
            date: "2019-05-05  ～  2019-10-10 ",
            remarks: "sss"
          },
          {
            id: 2,
            ardType: "试玩卡",
            number: 3,
            status: "待激活",
            affiliation: "杭州市",
            date: "2019-05-05  ～  2019-10-10 ",
            remarks: "sss"
          },
          {
            id: 3,
            ardType: "试玩卡",
            number: 3,
            status: "已激活",
            affiliation: "杭州市",
            date: "2019-05-05  ～  2019-10-10 ",
            remarks: "sss"
          },
          {
            id: 4,
            ardType: "试玩卡",
            number: 3,
            status: "待激活",
            affiliation: "杭州市",
            date: "2019-05-05  ～  2019-10-10 ",
            remarks: "sss"
          },
          {
            id: 5,
            ardType: "试玩卡",
            number: 3,
            status: "已激活",
            affiliation: "杭州市",
            date: "2019-05-05  ～  2019-10-10 ",
            remarks: "sss"
          },
          {
            id: 6,
            ardType: "试玩卡",
            number: 3,
            status: "待激活",
            affiliation: "杭州市",
            date: "2019-05-05  ～  2019-10-10 ",
            remarks: "sss"
          },
          {
            id: 7,
            ardType: "试玩卡",
            number: 3,
            status: "已激活",
            affiliation: "杭州市",
            date: "2019-05-05  ～  2019-10-10 ",
            remarks: "sss"
          },
          {
            id: 8,
            ardType: "试玩卡",
            number: 3,
            status: "待激活",
            affiliation: "杭州市",
            date: "2019-05-05  ～  2019-10-10 ",
            remarks: "sss"
          },
          {
            id: 9,
            ardType: "试玩卡",
            number: 3,
            status: "已激活",
            affiliation: "杭州市",
            date: "2019-05-05  ～  2019-10-10 ",
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
            label: "编号",
            value: "number",
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
            label: "状态",
            value: "status",
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
      },
    };
  },
  components: {},
  methods: {
    search(form) {
      console.log("search", form);
    },  handleClick(row) {
      this.$router.push({
        name: 'infoDetail',
        query: {
          id: row.id
        }
      })
    },
    activation (row) {
      console.log(row);
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
    logout (row) {
      console.log('注销', row);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
