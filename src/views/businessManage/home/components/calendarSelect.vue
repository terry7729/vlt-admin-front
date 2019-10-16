<!-- 首页 - 日期选项 -->
<template>
  <div class="module-calemdar">
    <el-row>
      <el-col :span="10">
        <el-calendar v-model="value"></el-calendar>
      </el-col>
      <el-col :span="13"  :offset="1" class="select-table">
        <p class="tips-item">
          <i class="el-alert__icon el-icon-info"></i>
          <span> 2019-09-30 星期一</span>
        </p>
        <el-table :data="tableData" style="width: 100%" border class="table-box">
          <el-table-column prop="time0" label=" 9:00"></el-table-column>
          <el-table-column prop="time1" label="10:00"></el-table-column>
          <el-table-column prop="time2" label="11:00"></el-table-column>
          <el-table-column prop="time3" label="12:00"></el-table-column>
          <el-table-column prop="time4" label="13:00"></el-table-column>
          <el-table-column prop="time5" label="14:00"></el-table-column>
          <el-table-column prop="time6" label="15:00"></el-table-column>
          <el-table-column prop="time7" label="16:00"></el-table-column>
          <el-table-column prop="time8" label="17:00"></el-table-column>
          <el-table-column prop="time9" label="18:00"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "calendarSelect",
  data() {
    return {
      value: new Date(),
      tableData: [
        {
          time0: '待办',
          time1: '',
          time2: '',
          time3: '',
          time4: '待办',
          time5: '',
          time6: '',
          time7: '',
          time8: '待办',
          time9: ''
        }
      ]
    };
  },
  methods: {
    open() {
      this.$message("这是一条消息提示");
    }
  }
};
</script>

<style lang="less" scoped>
.module-calemdar {
  margin-top: 40px;
  .el-calendar {
    border: 1px solid #ededed;
  }
}
.select-table {
  // padding: 20px;
  background-color: #f7f7f7;
}
.tips-item {
  height: 32px;
  line-height: 32px;
  background-color: rgba(230, 243, 252, 1);
  // border: 1px solid rgba(212, 240, 252, 1);
  font-size: 12px;
  color: #515a6e;
  // border-radius: 4px;
  padding: 0 10px;
  margin: 10px 0;
  em {
    color: #2d8cf0;
    font-style: normal;
    padding: 0 3px;
  }
  i {
    vertical-align: middle;
    line-height: 32px;
    color: #2d8cf0;
    padding-right: 5px;
    margin-right: 5px;
  }
  span {
    line-height: 32px;
  }
}
</style>