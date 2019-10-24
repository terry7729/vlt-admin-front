<template>
  <div class="vlt-card">
    <search-bar @search="search" :options="searchOptions" :total="999" labelWidth="80px"></search-bar>
    <el-table :data="rechargeList" border style="width: 100%; margin-top: 10px;">
      <el-table-column prop="channelId" label="序号"></el-table-column>
      <el-table-column prop="orderNum" label="订单编号"></el-table-column>
      <el-table-column prop="type" label="充值类型"></el-table-column>
      <el-table-column prop="account" label="充值账号"></el-table-column>
      <el-table-column prop="accountName" label="账户名称"></el-table-column>
      <el-table-column prop="phoneNum" label="手机号码"></el-table-column>
      <el-table-column prop="area" label="所在区域"></el-table-column>
      <el-table-column prop="money" label="充值金额"></el-table-column>
      <el-table-column prop="balance" label="账户余额"></el-table-column>
      <el-table-column prop="way" label="充值方式"></el-table-column>
      <el-table-column prop="createTime" label="操作时间"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="rechargeDetail(scope.row.channelId)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-paging
      :current-page="1"
      :page-size="10"
      :total="this.rechargeList.length"
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
        { title: "充值账号", type: "input", prop: "account", value: "" },
        {
          title: "充值类型",
          type: "select",
          prop: "type",
          value: "",
          options: [
            {
              label: "微信",
              value: "微信"
            },
            {
              label: "支付宝",
              value: "支付宝"
            }
          ]
        },
        { title: "手机号", type: "input", prop: "phone", value: "" },
        { title: "订单编号", type: "input", prop: "num", value: "" },
        {
          type: "cascader",
          prop: "area",
          value: "",
          title: "所在区域",
          options: [
            {
              value: "江西省",
              label: "江西省",
              children: [
                {
                  value: "宜春市",
                  label: "宜春市",
                  children: [
                    {
                      value: "上高县",
                      label: "上高县"
                    }
                  ]
                }
              ]
            },
            {
              value: "广东省",
              label: "广东省",
              children: [
                {
                  value: "广州市",
                  label: "广州市",
                  children: [
                    {
                      value: "白云区",
                      label: "白云区"
                    }
                  ]
                }
              ]
            },
            {
              value: "北京",
              label: "北京",
              children: [
                {
                  value: "海淀区",
                  label: "海淀区"
                }
              ]
            }
          ]
        },
        {
          title: "操作时间",
          type: "datetime-range",
          prop: "time",
          value: ""
        }
      ],
      rechargeList: [
        {
          channelId: 1,
          orderNum: "8008208820",
          type: "投注卡",
          account: "10086",
          accountName: "匿名",
          phoneNum: "17620465151",
          area: "深圳",
          money: "8080",
          balance: "18888",
          way: "微信",
          createTime: "2019-10-14"
        }
      ]
    };
  },
  created() {
    this.init();
  },

  methods: {
    async init() {
      let data = {
        page: "1",
        pageSize: "15",
        param: {
          accountName: "",
          accountStatus: "",
          createBy: "",
          endTime: "",
          fundId: "",
          roleId: "",
          startTime: ""
        }
      };
      let res = await this.$api.getAccount({ data });
      if (res.code === 0) {
        console.log(res);
        this.rechargeList = res.data.records;
      }
    },
    rechargeDetail(account) {
      this.$router.push({ path: "rechargeDetail", query: { id: account } });
    },
    search(params) {
      if (params.area && params.area.length > 0) {
        let area = params.area.slice(params.area.length - 1);
        params.area = area.join();
      }

      console.info(params);
    },
    pageSizeChange(size) {},
    pageCurrentChange(page) {}
  },
  components: {}
};
</script>

<style lang="less" scoped>
</style>
