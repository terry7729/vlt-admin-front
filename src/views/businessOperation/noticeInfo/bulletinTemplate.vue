<template>
  <div class="vlt-card">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    ></search-bar>
    <el-button type="primary" size="small" @click="createTemplate">
      <i class="el-icon-plus">新建模板</i>
    </el-button>
    
      <el-table :data="tableData" border style="width: 100%; margin-top: 10px;">
        <el-table-column prop="num" label="序号"></el-table-column>
        <el-table-column prop="accountName" label="模板名称"></el-table-column>
        <el-table-column prop="type" label="公告类型"></el-table-column>
        <el-table-column prop="phoneNum" label="渠道类型"></el-table-column>
        <el-table-column prop="balance" label="内容形式"></el-table-column>
        <el-table-column prop="area" label="模板备注"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="templateDetail(scope.row.accountName)"
            >查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <table-paging
        :current-page="1"
        :page-size="10"
        :total="100"
        @handleSizeChange="pageSizeChange"
        @handleCurrentChange="pageCurrentChange"
      ></table-paging>
 
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      searchOptions: [
        { title: "模板名称", type: "input", prop: "inputName", value: "" },
        {
          title: "公告类型",
          type: "select",
          prop: "date1",
          value: "",
          options: [
            {
              label: "游戏发行",
              value: 1
            },
            {
              label: "营销活动",
              value: 2
            },
            {
              label: "公益广告",
              value: 3
            }
          ]
        },

        {
          title: "内容形式",
          type: "select",
          prop: "date2",
          value: "",
          options: [
            {
              label: "图片",
              value: 4
            },
            {
              label: "文字",
              value: 5
            },
            {
              label: "视频",
              value: 6
            }
          ]
        }
      ],
      tableData: [
        {
          num: 1,
          accountName: "flypig",
          phoneNum: "17620465151",
          balance: "18888",
          area: "深圳",
          time: "2019-10-14",
          type: ""
        }
      ]
    };
  },
  components: {},
  methods: {
    templateDetail(account) {
      this.$router.push({ path: "templateDetail", query: account });
    },
    createTemplate() {
      this.$router.push({ path: "createTemplate" });
    },
    search() {},
    pageSizeChange(size) {},
    pageCurrentChange(page) {}
  }
};
</script>

<style lang="less" scoped>
</style>
