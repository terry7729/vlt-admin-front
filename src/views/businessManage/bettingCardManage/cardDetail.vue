<template>
  <!-- 明细 -->
  <div class="vlt-card">
    <panel-static title="基本信息">
      <base-info :infoList="infoList"></base-info>
    </panel-static>
    <control-bar :options="controlOptions" @select="selectBtn" position="left"></control-bar>

    <el-row class="card-table">
      <el-table
        :data="tableData.records"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        class="table-box"
      >
        <el-table-column
          v-for="(item,key) in tableKey"
          :key="key"
          :prop="item.value"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
      </el-table>
    </el-row>

    <table-paging
      position="left"
      :total="tableData.total"
      :currentPage="tableData.current"
      :pageSize="tableData.size"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></table-paging>
    <dialog-form :showForm="showdialog" :formDatas="data2" :rule="rules2" @closeDia="hideDia"></dialog-form>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
import dialogForm from "@/views/businessManage/bettingCardManage/components/dialogForm";
export default {
  name: "cardDetail",
  data() {
    return {
      showdialog: false,
      infoList: [
        { title: "批次", value: "", prop: "batch" },
        { title: "投注卡类型", value: "", prop: "bettingCardType" },
        { title: "所属机构", value: "", prop: "insName" },
        { title: "发卡数量", value: "", prop: "cardMakingQuantity" }
      ],
      controlOptions: [
        { name: "导出当前页数据", type: "primary", icon: "download" },
        { name: "导出全部数据", type: "", icon: "download" }],
      tableData: [],
      tableKey: [
        {
          label: "序号",
          value: "rownum",
          width: "80"
        },
        {
          label: "投注卡编号",
          value: "cardNumber",
          width: ""
        }
      ],
      data2: [
        {
          title: "所属机构：",
          type: "address",
          prop: "address",
          value: ["130000", "130200", "130203"],
          address: ""
        },
        {
          type: "select",
          title: "投注卡类型：",
          prop: "status",
          options: [
            { label: "类型1", value: "0" },
            { label: "类型2", value: "1" }
          ]
        },
        {
          type: "select",
          title: "发卡数量：",
          prop: "status2",
          options: [{ label: "1", value: "0" }, { label: "2", value: "1" }]
        },
        {
          type: "datepicker-range",
          prop: "date2",
          value: "",
          title: "有效日期：",
          options: ["start", "end"]
        },
        { type: "textarea", title: "备注", prop: "all" }
      ],
      rules2: {
        address: [{ required: true, trigger: "blur" }],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ]
      },
      id: "",
      dataList: {},
      requestOptions: {
        page: 1,
        pageSize: 10,
        param: {
          all: false,
          batch: "",
          bettingCardId: 0
        }
      },
      outData: {}
    };
  },
  components: {
    "dialog-form": dialogForm
  },
  created() {
    let id = this.$route.query.id;
    if (id) {
      this.id = id;
      this.getInfo(this.id);
      this.requestOptions.param.bettingCardId = this.id;
      this.getBettingCardList(this.requestOptions);
    }
  },
  methods: {
    async getInfo(id) {
      const _this = this;
      let result = await _this.$api.cardGenerationDetail({ data: id });
      if (result.code === 0) {
        _this.infoList.forEach(item => {
          item.value = result.data[item.prop];
          if (item.prop == "bettingCardType") {
            item.value = _this.forMatType(result.data[item.prop]);
          }
        });
      }
    },
    getBettingCardList(data) {
      const self = this;
      (async data => {
        let res = await self.$api.bettingCardList({ data });
        if (res && res.code == 0) {
          this.tableData = res.data;
        } else {
          self.$message.warning(res.msg);
        }
      })(data);
    },
    selectBtn(val) {
      if(val.name == '导出当前页数据') {
        this.exportExcel('now');
      } else if (val.name == '导出全部数据') {
        this.exportExcel('all');
      }
    },
    async exportExcel(val) {
      if (val == 'now') {
        this.outData = {
          page: this.requestOptions.page,
          pageSize: this.requestOptions.pageSize,
          param: {
            all: false,
            batch: "",
            bettingCardId: this.id
          }
        }
      } else if (val == 'all'){
        this.outData = {
          page: 0,
          pageSize: 0,
          param: {
            all: true,
            batch: "",
            bettingCardId: this.id
          }
        }
      }

      const data = JSON.parse(JSON.stringify(this.outData));
      let result = await this.$api.bettingCardExportExcel({
        data,
        responseType: 'blob'
      });
      var blob = new Blob([result], {
        type: "application/vnd.ms-excel;charset=utf-8"
      });
      var url = window.URL.createObjectURL(blob);
      var aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = url;
      aLink.setAttribute("download", "年度发展计划列表.xls");
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink); //下载完成移除元素
      window.URL.revokeObjectURL(url); //释放掉blob对象
      //console.log("res", result);
    },
    hideDia() {
      this.showdialog = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(pageSize) {
      console.log(pageSize);
      this.requestOptions.pageSize = pageSize;
      this.getBettingCardList(this.requestOptions);
    },
    handleCurrentChange(currentPage) {
      
      this.requestOptions.page = currentPage;
      this.getBettingCardList(this.requestOptions);
      console.log(currentPage);
    },
    forMatType(type) {
      switch (type) {
        case 1:
          return (type = "普通卡");
        case 2:
          return (type = "会员卡");
        case 3:
          return (type = "试玩卡");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.card-table {
  max-width: 700px;
}
</style>
