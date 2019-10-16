<template>
  <!-- 明细 -->
  <div class="vlt-card">
    <panel-static title="基本信息">
      <base-info :infoList="infoList"></base-info>
    </panel-static>
    <control-bar :options="controlOptions" @select="selectBtn" position="left"></control-bar>

    <el-row class="card-table">
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
    </el-row>

    <table-paging
      position="left"
      :total="999"
      :currentPage="1"
      :pageSize="10"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></table-paging>
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
        { title: "批次", value: "ww", prop: "gameCode" },
        { title: "投注卡类型", value: "sss", prop: "gameName" },
        { title: "所属机构", value: "www", prop: "officialEndSale" },
        { title: "发卡数量", value: "2", prop: "cycleType" },
        { title: "有效日期", value: "9012-09-09", prop: "gameStatus" }
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
          },
          {
            id: 2,
            ardType: "F01",
          },
          {
            id: 3,
            ardType: "F01",
          },
          {
            id: 4,
            ardType: "F01",
          },
          {
            id: 5,
            ardType: "F01",
          },
          {
            id: 6,
            ardType: "F01",
          },
          {
            id: 7,
            ardType: "F01",
          },
          {
            id: 8,
            ardType: "F01",
          },
          {
            id: 9,
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
      }
    };
  },
  components: {
    "dialog-form": dialogForm
    },
  methods: {
    selectBtn (val) {
      // console.log(val);
      // this.showdialog = true;
      this.$router.push({
        name: 'exportCard',
        // query: 
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
    }
  }
};
</script>

<style lang="less" scoped>
.card-table {
  max-width: 700px;
}
</style>
