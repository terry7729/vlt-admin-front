<template>
  <div class="vlt-card">
    <div class="search">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="假日名称">
          <el-select v-model="form.name" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
      <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
    </div>
    <div class="el_table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'id', order: 'descending'}"
      >
        <el-table-column prop="id" label="序号" width="100"></el-table-column>
        <el-table-column prop="holidayName" label="假日名称" width="100"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" sortable width="190"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" sortable width="190"></el-table-column>
        <el-table-column prop="abandonstartTime" label="弃奖开始日期" sortable width="130"></el-table-column>
        <el-table-column prop="abandonendTime" label="弃奖结束日期 " sortable width="130"></el-table-column>

        <el-table-column label="销售状态" >
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
        <el-table-column label="启用状态">
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
      <table-paging :total="total"></table-paging>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      value1: true,
      value2: true,
      form: {
        name: ""
      },
      options: [
        {
          value: "chunjie",
          label: "春节"
        },
        {
          value: "guoqing",
          label: "国庆"
        },
        {
          value: "zhongqiu",
          label: "中秋"
        },
        {
          value: "qingming",
          label: "清明"
        },
        {
          value: "duanwu",
          label: "端午"
        }
      ],
      value: "",

      controlOptions: [
        { name: "新增", type: "primary", icon: "plus" },
        { name: "保存", type: "success" }
      ],
      tableData: [
        {
          id: 1,
          holidayName: "春节",
          startTime: "2019-10-11 10:0:0",
          endTime: "2019-10-11 12:0:0",
          abandonstartTime: "2019-11-12",
          abandonendTime: "2019-10-15",
          switch1: 1,
          switch2:0,
        },
        {
          id: 2,
          holidayName: "端午",
          startTime: "2019-10-12 10:0:0",
          endTime: "2019-10-12 12:0:0",
          abandonstartTime: "2019-12-12",
          abandonendTime: "2019-10-15",
          switch1: 1,
          switch2:0,
        },
        {
          id: 3,
          holidayName: "中秋",
          startTime: "2019-10-13 10:0:0",
          endTime: "2019-10-13 12:0:0",
          abandonstartTime: "2019-1-12",
          abandonendTime: "2019-10-15",
          switch1: 1,
          switch2:0,
        },
        {
          id: 4,
          holidayName: "国庆",
          startTime: "2019-10-14 10:0:0",
          endTime: "2019-10-14 12:0:0",
          abandonstartTime: "2019-2-12",
          abandonendTime: "2019-10-15",
          switch1: 1,
          switch2:0,
        },
        {
          id: 5,
          holidayName: "清明",
          startTime: "2019-10-15 10:0:0",
          endTime: "2019-10-15 12:0:0",
          abandonstartTime: "2019-10-12",
          abandonendTime: "2019-10-15",
          switch1: 1,
          switch2:0,
        }
      ],
      total: 400
    };
  },
  components: {},
  methods: {
    selectBtn(val) {
      this.$emit("select", val);
    },
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

