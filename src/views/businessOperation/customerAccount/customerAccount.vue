<template>
  <div class="vlt-card">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    ></search-bar>

    <section class="comp-item">
      <el-table :data="tableData" border style="width: 100%; margin-top: 10px;">
        <el-table-column prop="num" label="序号"></el-table-column>
        <el-table-column prop="accountName" label="账户名称"></el-table-column>
        <el-table-column prop="phoneNum" label="手机号码"></el-table-column>
        <el-table-column prop="balance" label="账户余额"></el-table-column>
        <el-table-column prop="area" label="注册区域"></el-table-column>
        <el-table-column prop="time" label="注册时间"></el-table-column>
        <el-table-column prop="type" label="账户状态" align="center">
          <template slot-scope="scope">
            <table-row-status
              statusField="status"
              idField="id"
              :scope="scope"
              :rowName="scope.row.accountName"
              :option="{
                'enable': {
                  apiName: 'apiName', 
                  label: '启用', 
                  value: 0 
                },
                'disable': {
                  apiName: 'apiName',
                  label: '冻结',
                  value: 1
                }
               
              }"
            ></table-row-status>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="accountDetail(scope.row.accountName)">详情</el-button>
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
    </section>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      searchOptions: [
        { title: "账户昵称", type: "input", prop: "inputName", value: "" },
        { title: "手机号", type: "input", prop: "date1", value: "" },
        {
          title: "账户类型",
          type: "select",
          prop: "selectName",
          value: "",
          options: [
            {
              label: "识别客户",
              value: 1
            },
            {
              label: "会员客户",
              value: 2
            }
          ]
        },

        {
          title: "注册区域",
          type: "select",
          prop: "date4",
          value: "",
          options: [
            {
              label: "区域1",
              value: 3
            },
            {
              label: "区域2",
              value: 4
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
    accountDetail(account) {
      this.$router.push({ name: "accountDetail", params: {id:account} });
    },
    search() {},
    pageSizeChange(size) {
      // this.PAGESIZE = size;
      // this.$emit("handleSizeChange", size);
    },
    pageCurrentChange(page) {
      // this.CURRENTPAGE = page;
      // this.$emit("handleCurrentChange", page);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
