<template>
  <div class="vlt-card putStore-page">
    <panel-static title="基本信息" style="margin-bottom:10px;">
      <base-info :infoList="infoList"></base-info>
    </panel-static>
    <panel-static title="物品列表">
      <el-table :data="goodsListData" border style="width: 100%">
        <el-table-column prop="id" label="序号" type="index" width="80"></el-table-column>
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
        <el-table-column prop="remark" label="备注"></el-table-column>
      
      </el-table>
    </panel-static>
    <div class="inp-total">
      <span>
        合计金额：
        <el-input size="small" :disabled="true" v-model="totalMoney" placeholder="请输入总金额"></el-input>
      </span>
    </div>
    <el-row class="putStore">
      <el-button size="small" type="primary" class="mainBtn" @click="putStore">入库</el-button>
      <el-button size="small" @click="cancel">取消</el-button>
    </el-row>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "putStore",
  data() {
    return {
      totalMoney: 0,
      infoList: [
        { title: "单据编号", value: "", prop: "documentNumber" },
        { title: "单据主题", value: "", prop: "documentToppic" },
        { title: "申请人员", value: "", prop: "userName" },
        { title: "申请日期", value: "", prop: "createTime" },
        { title: "出库仓库", value: "", prop: "outWarehouseName" },
        { title: "入库仓库", value: "", prop: "entryWarehouseName" },
        { title: "备注", value: "", prop: "remark" }
      ],
      goodsListData: [],
      seriesNum: [],

      requestData: {
        documentNumber: "", //单据编号
        list: {
          goodsCode: "", //物品编号
          goodsInfoId: 0, //  物品详情id
          serialNumber: "" // 物品序列号
        },
        oplBy: "1", // 出入库操作人id
        oplType: 1, // 操作类型
        warehouseId: 10 // 仓库id
      },
      entryWarehouseId: 0,
      // oplType:1,
      queryRequest: {
        documentNumber: "",
        oplType: ""
      }
    };
  },
  components: {},
  created() {
    if (this.$route.query.documentNumber && this.$route.query.oplType) {
      this.queryRequest = this.$route.query;
      this.queryRequest.oplType = parseInt(this.queryRequest.oplType);
    }
    //  this.$route.query.documentNumber
    this.getInfolist(this.queryRequest);
  },
  methods: {
    async getInfolist(data) {
      let res = await this.$api.getOutPutDetail({ data });
      console.log(res);
      if (res && res.code == 0) {
        this.totalMoney = res.data.totalPrice;
        this.entryWarehouseId = res.data.entryWarehouseId;
        this.oplType = res.data.oplBy;
        this.infoList.forEach(item => {
          item.value = res.data[item.prop];
        });
        // let array =[]
        res.data.list.forEach(item => {
          // item.num = 5
          for (let i = 0; i < item.num; i++) {
            let obj = JSON.parse(JSON.stringify(item));
            obj.serialNumber = "";
            obj.num = 1;
            this.goodsListData.push(obj);
          }
        });
        // this.goodsListData = array;
        console.log("array", this.goodsListData);
      }
    },

    //入库
    async putStore() {
      let obj = {};
      let array = [];
      this.goodsListData.forEach(item => {
        console.log(item);
        let param = {
          goodsInfoId: item.id,
          goodsSerialNumber: item.goodsSerialNumberNew || item.goodsSerialNumber
        };
        array.push(param);
      });
      console.log("提交参数", array);
      let data = {
        documentNumber: this.$route.query.documentNumber,
        list: array,
        oplType: 1,
        warehouseId: this.entryWarehouseId
      };
      console.log("提交参数2", data);
      let res = await this.$api.entryAndOut({ data });
      if (res && res.code == 0) {
        this.$message({
          type: "success",
          message: "入库成功"
        });
        this.$router.push({ path: "outPutManage" });
      }
    },
    cancel() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less">
.putStore-page {
  .inp-total {
    margin-top: 20px;
    margin-left: 20px;
    .el-input {
      width: 300px;
    }
  }
  .putStore {
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
