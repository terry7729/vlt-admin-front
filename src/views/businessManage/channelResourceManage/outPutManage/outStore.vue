<template>
  <div class="vlt-card outStore-page">
    <panel-static title="基本信息" style="margin-bottom:10px;">
      <base-info :infoList="infoList"></base-info>
    </panel-static>
    <panel-static title="物品列表">
      <el-table :data="goodsListData" border style="width: 100%">
        <el-table-column prop="id" label="序号" type="index" width="80"></el-table-column>
        <el-table-column prop="goodsName" label="物品名称"></el-table-column>
        <el-table-column prop="goodsType" label="物品型号"></el-table-column>
        <el-table-column prop="goodsCode" label="物品编号"></el-table-column>
        <el-table-column prop="miniNum" label="数量"></el-table-column>
        <el-table-column prop="money" label="单价（元）"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </panel-static>
    <div class="inp-total">
      <span>
        合计金额：
        <el-input v-model="totalMoney" placeholder="请输入总金额"></el-input>
      </span>
    </div>
    <el-row class="outStore">
      <el-button type="primary" class="mainBtn" @click="outStore">出库</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-row>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "outStore",
  data() {
    return {
      totalMoney: "",
      infoList: [
        { title: "单据编号", value: "", prop: "documentNumber" },
        { title: "单据主题", value: "", prop: "oplType" },
        { title: "申请人员", value: "", prop: "cUserId" },
        { title: "申请日期", value: "", prop: "cDate" },
        { title: "出库仓库", value: "", prop: "outWarehouseId" },
        { title: "入库仓库", value: "", prop: "entryWarehouseId" },
        { title: "备注", value: "", prop: "remark" }
      ],
      goodsListData: [
        {
          id: 1,
          goodsName: "投注终端",
          goodsType: "xxxxx",
          goodsCode: "xxxxx",
          miniNum: "xxxx",
          money: "xxxx",
          remark: ""
        }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      let oplType = this.$route.query.id;
      let data = {
        page: 1,
        pageSize: 10,
        param: {
          documentNumber: "2222"
        }
      };
      switch (oplType) {
        //资源采购
        case 1:
          var res = await this.$api.channelResPurcPageList({ data });
          break;
        //资源申请
        case 2:
          var res = await this.$api.channelResApplyPageList({ data });
          break;
        //资源发放
        case 3:
          var res = await this.$api.channelResProvidePageList({ data });
          break;

        default:
          break;
      }
      if (res.code === 0) {
        let obj = res.data.list[0];
        let keys = Object.keys(obj);
        for (let item of this.infoList) {
          keys.forEach(index => {
            if (index === item.prop) {
              item.value = obj[index];
            }
          });
        }
      }
      console.log(res);
    },
    outStore() {
      console.log(32123);
    },
    cancel() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less">
.outStore-page {
  .inp-total {
    margin-top: 20px;
    margin-left: 20px;
    .el-input {
      width: 500px;
    }
  }
  .outStore {
    .el-button {
      margin: 10px;
    }
    .mainBtn {
      margin-top: 80px;
      margin-left: 1350px;
      margin-bottom: 150px;
    }
  }
}
</style>
