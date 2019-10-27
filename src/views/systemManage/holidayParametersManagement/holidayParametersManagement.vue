<template>
  <div class="vlt-card">
    <div class="search">
      <searchBar :options="options" @search="search" :total="total">
        <controlBar slot="extend-bar" @select="Addclick" :options="Addbtn" position="left"></controlBar>
      </searchBar>
      <!-- <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar> -->
    </div>
    <div class="el_table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'id', order: 'descending'}"
      >
        <el-table-column prop="id" type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="holidayName" label="假日名称" width="100"></el-table-column>
        <el-table-column label="开始时间" sortable width="190">
          <template slot-scope="scope">{{translateTime(scope.row.beginTime)}}</template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" sortable width="190">
          <template slot-scope="scope">{{translateTime(scope.row.beginTime)}}</template>
        </el-table-column>
        <el-table-column prop="discardBeginTime" label="弃奖开始日期" sortable width="130"></el-table-column>
        <el-table-column prop="discardEndTime" label="弃奖结束日期 " sortable width="130"></el-table-column>

        <el-table-column label="销售状态" prop="marketStatus">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.switch1"
              inactive-text="停销"
              active-text="不停销"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="启用状态" prop="holidayStatus">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.switch2"
              active-text="已启用"
              inactive-text="已停用"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
      <tablePaging :total="total" :currentPage="1" :pageSize="10"></tablePaging>
    </div>
  </div>
</template>

<script type="text/javascript">
import moment from "moment";
// import storage from "@/utils/storage";
export default {
  data() {
    return {
      value1: true,
      value2: true,
      form: {
        name: ""
      },
      Addbtn: [{ name: "新增", type: "primary", icon: "plus" }],
      options: [
        {
          type: "select",
          prop: "holidayName",
          value: "",
          title: "假日名称",
          placeholder: "请输入",
          options: []
        }
      ],
      value: "",

      controlOptions: [
        { name: "新增", type: "primary", icon: "plus" },
        { name: "保存", type: "success" }
      ],
      tableData: [],
      total: 400,
      row: "",
      param: null
    };
  },
  created() {
    this.init();
  },
  components: {},
  methods: {
    translateTime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    },
    async init() {
      this.getHolidayList();
      this.getTableData();
    },
    async getTableData() {
      //初始查询列表的参数
      let data = {
        page: 1,
        pageSize: 10,
        holidayName: ""
      };
      let result = await this.$api.queryHolInfoPage({ data: data });
      console.log(result);
      if (result.code === 0) {
        let arr = result.data.records;
        this.tableData = arr;
      }
    },
    //获取假日名称列表数据
    async getHolidayList() {
      let res = await this.$api.getHolidayList();
      console.log(res);
    },

    search(val) {
      console.log(val);
    },
    //新增按钮
    Addclick() {
      this.$router.push({
        path: "holidayParametersManagement/holidayParametersAdd"
      });
    },
    // selectBtn(val) {
    //   this.$emit("select", val);
    // },
    // 提交
    onSubmit() {
      let formData = {};
      for (let key in this.form) {
        if (this.form[key] !== "") formData[key] = this.form[key];
      }
      this.$emit("search", formData);
    }
  }
};
</script>
<style lang="less" scoped>
</style>

