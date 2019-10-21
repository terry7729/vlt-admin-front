<template>
  <div>
    <search-bar
      class
      @search="banksearch"
      :options="banksearchOptions"
      :total="999"
      labelWidth="60px"
    >
      <controlBar slot="extend-bar" @select="bankBtn" :options="options" position="left"></controlBar>
    </search-bar>

    <div class="account_manage_bankmain">
      <el-table
        ref="multipleTable"
        :data="banktableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="accountname" label="户名全称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Bankinterfacetype" label="银行接口类型"></el-table-column>
        <el-table-column prop="banknum" label="银行账号"></el-table-column>
        <el-table-column prop="accounttype" label="账户类别"></el-table-column>
        <el-table-column prop="accountproperty" label="账户属性"></el-table-column>
        <el-table-column prop="opeingbank" label="开户行" show-overflow-tooltip></el-table-column>
        <el-table-column prop="opeingdate" label="开户日期"></el-table-column>
        <el-table-column prop="handles" label="操作" min-width="105">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="balance(scope.row.id)">余额</el-button>
            <el-button type="primary" size="mini" @click="detail(scope.row.id)">明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_paging">
        <tablePaging class="table_paging_right" :total="99" :currentPage="1" :pageSize="10"></tablePaging>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      banksearchOptions: [
        {
          type: "input",
          prop: "inputName",
          value: "",
          title: "输入框",
          placeholder: "请输入银行账户或开户名称查询"
        }
      ],
      options: [
        { name: "新增", type: "primary", icon: "plus" },
        { name: "修改", type: "", icon: "edit" },
        { name: "删除", type: "", icon: "delete" },
        { name: "导入", type: "success", icon: "upload" },
        { name: "导出", type: "danger", icon: "download" }
      ],
      banktableData: [
        {
          id: 1,
          accountname: "中央福利彩票中心",
          Bankinterfacetype: "中国农业银行222",
          banknum: " 6222xxxxx2216",
          accounttype: "专项",
          accountproperty: "对公账户",
          opeingbank: "中国农业银行海淀总行",
          opeingdate: "2019/01/01"
        },
        {
          id: 2,
          accountname: "中央福利彩票中心",
          Bankinterfacetype: "中国农业银行",
          banknum: " 6222xxxxx2216",
          accounttype: "专项",
          accountproperty: "对公账户",
          opeingbank: "中国农业银行海淀总行",
          opeingdate: "2019/01/01"
        }
      ]
    };
  },
  components: {},
  methods: {
    //银行搜索
    banksearch(params) {
      console.log("params1:", params);
    },
    //银行按钮
    bankBtn(val) {
      if (val.name == "新增") {
        this.$router.push("bankadd");
      } else if (val.name == "修改") {
        this.$router.push("bankrevise");
      }
    },
    handleSelectionChange() {},
    //点击余额
    balance(id) {
      this.$router.push({
        path: "bankbalance",
        query: { id }
      });
    },
    //点击明细
    detail(id) {
      this.$router.push({
        path: "bankdetail",
        query: { id }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
