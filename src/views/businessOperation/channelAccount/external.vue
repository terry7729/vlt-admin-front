<template>
  <div>
    <search-bar
      class
      @search="threepaysearch"
      :options="threepaysearchOptions"
      :total="999"
      labelWidth="60px"
    >
      <controlBar slot="extend-bar" @select="threepayBtn" :options="options" position="left"></controlBar>
    </search-bar>

    <el-table
      ref="multipleTable"
      :data="threepaytableData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChangethreepay"
      border
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="joindate" label="注册时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="accountname" label="账号名称"></el-table-column>
      <el-table-column prop="externalpay" label="第三方支付平台"></el-table-column>
      <el-table-column prop="accounttype" label="账户类型"></el-table-column>
      <el-table-column prop="legalrepresentative" label="法人代表"></el-table-column>
      <el-table-column prop="legalrepresentativepaper" label="法人代表证件"></el-table-column>
      <el-table-column prop="legalrepresentativepapernum" label="法人代表证件证号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="telephonenum" label="手机号"></el-table-column>
      <el-table-column prop="remarks" label="备注"></el-table-column>
      <el-table-column prop="handle" label="操作" min-width="105">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="threepaybalance(scope.row.id)">余额</el-button>
          <el-button type="primary" size="mini" @click="threepaydetail(scope.row.id)">明细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table_paging">
      <tablePaging class="table_paging_right" :total="99" :currentPage="1" :pageSize="10"></tablePaging>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      threepaysearchOptions: [
        {
          type: "input",
          prop: "inputName",
          value: "",
          title: "输入框",
          placeholder: "请输入账户名称查询"
        }
      ],
      options: [
        { name: "新增", type: "primary", icon: "plus" },
        { name: "修改", type: "", icon: "edit" },
        { name: "删除", type: "", icon: "delete" },
        { name: "导入", type: "success", icon: "upload2" },
        { name: "导出", type: "danger", icon: "download" }
      ],
      threepaytableData: [
        {
          id: 1,
          joindate: "2019/01/01",
          accountname: "zgldi@dsa.com",
          externalpay: " 支付宝",
          accounttype: "对公账户",
          legalrepresentative: "张淼",
          legalrepresentativepaper: "身份证",
          legalrepresentativepapernum: "1235xxxxxxxxxxxxxx",
          telephonenum: "1371572258",
          remarks: "中国福利彩票中心"
        },
        {
          id: 2,
          joindate: "2019/01/01",
          accountname: "zgldi@dsa.com",
          externalpay: " 支付宝",
          accounttype: "对公账户",
          legalrepresentative: "张淼",
          legalrepresentativepaper: "身份证",
          legalrepresentativepapernum: "1235xxxxxxxxxxxxxx",
          telephonenum: "1371572258",
          remarks: "中国福利彩票中心"
        }
      ]
    };
  },
  components: {},
  methods: {
    //第三方支付按钮
    threepayBtn(val) {
      if (val.name == "新增") {
        this.$router.push("externaladd");
      } else if (val.name == "修改") {
        this.$router.push("externalrevise");
      }
    },
    //第三方支付搜索
    threepaysearch(params) {
      console.log("params2:", params);
    },
    handleSelectionChangethreepay() {},
    //第三方支付页面点击余额
    threepaybalance(id) {
      this.$router.push({
        path: "externalbalance",
        query: { id }
      });
    },
    //第三方支付页面点击明细
    threepaydetail(id) {
      this.$router.push({
        path: "externaldetail",
        query: { id }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
