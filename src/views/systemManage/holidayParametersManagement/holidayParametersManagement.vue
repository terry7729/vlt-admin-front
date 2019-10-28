<template>
  <div class="vlt-card">
    <div class="search">
      <searchBar :options="options" @search="search" :total="this.num">
        <controlBar slot="extend-bar" @select="Addclick" :options="Addbtn" position="left"></controlBar>
      </searchBar>
      <!-- <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar> -->
    </div>
    <div class="el_table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'id', order: 'descending'}"
        border
      >
        <el-table-column prop="id" type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="holidayName" label="假日名称" width="100"></el-table-column>
        <el-table-column label="开始时间" sortable width="190">
          <template slot-scope="scope">{{translateTime(scope.row.beginTime)}}</template>
        </el-table-column>
        <el-table-column label="结束时间" sortable width="190">
          <template slot-scope="scope">{{translateTime(scope.row.endTime)}}</template>
        </el-table-column>
        <el-table-column label="弃奖开始日期" sortable width="130">
          <template slot-scope="scope">{{translateTime(scope.row.discardBeginTime)}}</template>
        </el-table-column>
        <el-table-column label="弃奖结束日期 " sortable width="130">
          <template slot-scope="scope">{{translateTime(scope.row.discardEndTime)}}</template>
        </el-table-column>

        <el-table-column label="销售状态" prop="marketStatus">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.marketStatus"
              inactive-text="停销"
              active-text="不停销"
              :active-value="1"
              :inactive-value="0"
              @change="switchMarketChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="启用状态" prop="holidayStatus">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.holidayStatus"
              active-text="已启用"
              inactive-text="已停用"
              :active-value="1"
              :inactive-value="0"
              @change="switchChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
      <tablePaging
        :total="this.num"
        :currentPage="1"
        :pageSize="10"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></tablePaging>
    </div>
  </div>
</template>

<script type="text/javascript">
import moment from "moment";
// import storage from "@/utils/storage";
export default {
  data() {
    return {
      num: 0,
      // value1: true,
      // value2: true,
      form: {
        name: ""
      },
      Addbtn: [{ name: "新增", type: "primary", icon: "plus" }],
      options: [
        {
          type: "select",
          prop: "holidayType",
          value: "",
          title: "假日名称",
          placeholder: "请输入",
          options: [
            { label: "春节", value: 0 },
            { label: "清明节", value: 1 },
            { label: "中秋节", value: 2 },
            { label: "国庆节", value: 3 }
          ]
        }
      ],
      value: "",
      page: {
        page: 1,
        pageSize: 10
      },

      controlOptions: [
        { name: "新增", type: "primary", icon: "plus" },
        { name: "保存", type: "success" }
      ],
      tableData: [],

      row: "",
      param: null,
      data: {
        marketStatus: "",
        holidayStatus: "",
        id: ""
      }
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
      //初始查询列表的参数
      let data = this.page;
      //console.log(data);
      let result = await this.$api.queryHolInfoPage({ data: data });

      console.log(result);
      if (result.code === 0) {
        let arr = result.data.records;
        let num = result.data.total;
        this.tableData = arr;
      }
    },

    async search(val) {
      let info = val;
      console.log();
      let res = {
        ...this.page,
        ...info
      };

      let resul = await this.$api.queryHolInfoPage({ data: res });
      console.log(resul);
      if (resul.code === 0) {
        this.tableData = resul.data.records;
        this.num = resul.data.total;
        console.log(this.num);
        console.log(resul);
      }
    },
    //新增按钮
    Addclick() {
      this.$router.push({
        path: "holidayParametersManagement/holidayParametersAdd"
      });
    },
    switchMarketChange(val) {
      //this.MarketChange = !val.marketStatus;
      console.log(val.marketStatus);
      if (this.data) {
        this.data.marketStatus = val.marketStatus;
        this.data.holidayStatus = val.holidayStatus;
        this.data.id = val.id;
        this.getUpdata();
      }

      //console.log(this.data);
    },
    //改变状态
    switchChange(val) {
      if (this.data) {
        this.data.marketStatus = val.marketStatus;
        this.data.holidayStatus = val.holidayStatus;
        this.data.id = val.id;
        this.getUpdata();
      }

      console.log(val.holidayStatus);
      // console.log(this.change);
    },
    async getUpdata() {
      if (this.data) {
        let data = {
          ...this.data
        };
        let res = await this.$api.updateHolStatus({ data: data });
      }

      //console.log(res);
    },
    handleSizeChange(size) {
      console.log(size);
    },
    handleCurrentChange(val) {
      console.log(val);
    }
  }
  // selectBtn(val) {
  //   this.$emit("select", val);
  // },
  // 提交
  // onSubmit() {
  //   let formData = {};
  //   for (let key in this.form) {
  //     if (this.form[key] !== "") formData[key] = this.form[key];
  //   }
  //   this.$emit("search", formData);
  // }
};
</script>
<style lang="less" scoped>
</style>

