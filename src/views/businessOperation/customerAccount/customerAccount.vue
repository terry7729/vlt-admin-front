<template>
  <div class="vlt-card">
    <search-bar @search="search" :options="searchOptions" :total="888"></search-bar>
    <el-table :data="accountList" border style="width: 100%; margin-top: 10px;">
      <el-table-column type="index" label="序号"></el-table-column>
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
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      searchOptions: [
        { title: "账户昵称", type: "input", prop: "name", value: "" },
        { title: "手机号", type: "input", prop: "phone", value: "" },
        {
          title: "账户类型",
          type: "select",
          prop: "type",
          value: "",
          options: [
            {
              label: "识别客户",
              value: "识别客户"
            },
            {
              label: "会员客户",
              value: "会员客户"
            }
          ]
        },

        {
          type: "cascader",
          prop: "area",
          value: "",
          title: "注册区域",
          options: [
            {
              value: "1",
              label: "江西省",
              children: [
                {
                  value: "2",
                  label: "宜春市",
                  children: [
                    {
                      value: "3",
                      label: "上高县"
                    }
                  ]
                }
              ]
            },
            {
              value: "4",
              label: "广东省",
              children: [
                {
                  value: "5",
                  label: "广州市",
                  children: [
                    {
                      value: "6",
                      label: "白云区"
                    }
                  ]
                }
              ]
            },
            {
              value: "7",
              label: "北京",
              children: [
                {
                  value: "8",
                  label: "海淀区"
                }
              ]
            }
          ]
        }
      ],
      accountList: [
        {
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
      this.$router.push({ name: "accountDetail", params: { id: account } });
    },
    search(params) {
      console.info("search", params);
    },
    pageSizeChange(size) {

    },
    pageCurrentChange(page) {

    }
  }
};
</script>

<style lang="less" scoped>
</style>
