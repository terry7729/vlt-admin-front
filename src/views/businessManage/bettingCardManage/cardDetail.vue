<template>
  <!-- 明细 -->
  <div class="vlt-card">
    <panel-static title="基本信息">
      <base-info :infoList="infoList"></base-info>
    </panel-static>
    <!-- <panel-static title="基本信息">
      <base-info :infoList="infoList2"></base-info>
    </panel-static> -->
    <control-bar :options="controlOptions" @select="selectBtn" position="left"></control-bar>

    <!-- <el-row class="card-table">
      <el-table
        :data="tableDatas.tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        class="table-box"
      >
        <el-table-column
          v-for="(item,key) in tableDatas.tableKey"
          :key="key"
          :prop="item.value"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
      </el-table>
    </el-row> -->

    <!-- <table-paging
      position="left"
      :total="999"
      :currentPage="1"
      :pageSize="10"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></table-paging> -->
    <dialog-form 
    :showForm="showdialog"
    :formDatas="data2"
    :rule="rules2"
     @closeDia="hideDia"></dialog-form>
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
        { title: "批次", value: '', prop: "batch" },
        { title: "投注卡类型", value: '', prop: "bettingCardType" },
        { title: "所属机构", value: '', prop: "insName" },
        { title: "发卡数量", value:'', prop: "cardMakingQuantity" }
      ],
      controlOptions: [{ name: "导出", type: "primary", icon: "download" }],
      tableDatas: {
        tableData: [
          {
            id: 0,
            ardType: "F01",
            batch: 3,
          },
          {
            id: 1,
            ardType: "F01",
          }
        ],
        tableKey: [
          {
            label: "序号",
            value: "id",
            width: ""
          },
          {
            label: "投注卡编号",
            value: "ardType",
            width: ""
          }
        ]
      },
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
          options: [{ label: "类型1", value: "0" }, { label: "类型2", value: "1" }]
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
        { type: "textarea", title: "备注", prop: "all" },
      ],
      rules2: {
        address: [{required: true,trigger: "blur" }],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ]
      },
      id: '',
      dataList: {}
    };
  },
  components: {
    "dialog-form": dialogForm
    },
  created () {
    let id = this.$route.query.id;
    if (id) {
      this.id = id;
      this.getInfo(this.id)
    }
  },
  methods: {
    async getInfo(id) {
      const _this = this;
      let result = await _this.$api.cardGenerationDetail(id);
      if (result.code === 0) {
        console.log(result.data);
        _this.infoList.forEach(item => {
          // result.data
          item.value = result.data[item.prop]
          if (item.prop == 'bettingCardType') {
            item.value = _this.forMatType(result.data[item.prop]);
          }
        })
      }
    },
    selectBtn () {
      this.$router.push({
        name: 'exportCard',
        query: {
          id:  this.id
        }
      })
    },
    hideDia () {
      this.showdialog = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(pageSize) {
      console.log(pageSize);
    },
    handleCurrentChange(currentPage) {
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
