<template>
  <div class="vlt-card alreadyOut-detail">
    <panel-static title="基本信息" style="margin-bottom:10px;">
      <base-info :infoList="infoList"></base-info>
    </panel-static>
    <panel-static title="物品列表">
      <el-table :data="goodsListData" border style="width: 100%">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column prop="goodsName" label="物品名称"></el-table-column>
        <el-table-column prop="goodsModel" label="物品型号"></el-table-column>
        <el-table-column prop="goodsCode" label="物品编号"></el-table-column>
        <el-table-column prop="num" label="数量"></el-table-column>
        <el-table-column prop="unitPrice" label="单价"></el-table-column>
        <el-table-column prop="amount" label="金额"></el-table-column>
        <el-table-column label="序列号">
          <template slot-scope="scope">
            <p v-if="scope.row.goodsSerialNumber!=null">{{scope.row.goodsSerialNumber}}</p>
           <el-input v-else size="small" type="number"  v-model="scope.row.goodsSerialNumberNew" placeholder="请输入序列号"></el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="serialNumber" label="序列号" ></el-table-column> -->
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </panel-static>

    <div class="inp-total">
      <span>
        合计金额：
        <el-input :disabled="true" v-model="totalMoney" placeholder="请输入总金额"></el-input>
      </span>
    </div>
    <el-row class="outStore">
      <el-button size="small" type="primary" class="mainBtn" @click="outStoreClick">确定</el-button>
      <el-button size="small" @click="cancel">取消</el-button>
    </el-row>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "alreadyOutDetail",
  data() {
    return {
      totalMoney: 0,
      infoList: [
        { title: "单据编号", value: "11111", prop: "documentNumber" },
        { title: "单据主题", value: "", prop: "documentToppic" },
        { title: "出库人员", value: "", prop: "userName" },
        { title: "出库日期", value: "", prop: "createTime" },
        { title: "出库仓库", value: "", prop: "outWarehouseName" },
        { title: "入库仓库", value: "", prop: "entryWarehouseName" },
        { title: "备注", value: "", prop: "remark" }
      ],
      goodsListData: [],
      // documentNumber: this.$route.query.documentNumber,
      queryRequest: {
        documentNumber: '',
        oplType: ''
      }
    };
  },
  components: {},
  created() {
    if (this.$route.query.documentNumber && this.$route.query.oplType) {
      this.queryRequest = this.$route.query;
      this.queryRequest.oplType = parseInt(this.queryRequest.oplType);
    }
    console.log(this.queryRequest);
    this.outStoreDetail(this.queryRequest);
  },
  methods: {
    async outStoreDetail(data) {
      let res = await this.$api.getOutPutDetail({ data });
      console.log(res);
      if (res && res.code == 0) {
        this.infoList.forEach(item => {
          this.totalMoney = res.data.totalPrice;
          item.value = res.data[item.prop];
          this.goodsListData = res.data.list;
          this.queryRequest.warehouseId = res.data.entryWarehouseId
        });
      }
    },

    outStoreClick() {
      let  newList = [];
      this.goodsListData.forEach(item => {
        newList.push({
          id: item.id,
          goodsSerialNumber: item.goodsSerialNumberNew || item.goodsSerialNumber
        })
      })
      const data = {
        ...this.queryRequest,
        list: newList
      }
      console.log(this.queryRequest, newList, data);
      (async data => {
        let res = this.$api.entryAndOut({message: '提交成功', data})
        if (res && res.code == 0) {
          this.$router.back();
        }
      })(data)
    },
    cancel() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less">
.alreadyOut-detail {
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
      margin-left: 150px;
      margin-bottom: 150px;
    }
  }
}
</style>
