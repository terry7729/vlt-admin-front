<template>
  <div class="vlt-card">
    <div class="systemLog-title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-select v-model="formInline.user" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-date-picker
            v-model="formInline.region"
            type="datetimerange"
            range-separator="~"
            value-format="yyyy:MM:dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <control-bar :options="controlOptions" @select="selectBtn" style="margin:0"></control-bar>
        </el-form-item>
      </el-form>
    </div>
    <div class="hint">
      <tips-line>
        操作人搜索
        <span>"</span>
        {{formInline.user}}
        <span>"</span>共搜索到
        <span>{{num}}</span>条内容
      </tips-line>
    </div>
    <div class="systemLog-tab">
      <el-table :data="tableData" border style="width: 100%; margin-top: 10px;">
        <el-table-column type="index" prop="date" label="序号"></el-table-column>
        <el-table-column prop="date" label="用户名称"></el-table-column>
        <el-table-column prop="name" label="操作时间"></el-table-column>
        <el-table-column prop="province" label="功能模块"></el-table-column>
        <el-table-column prop="city" label="操作内容"></el-table-column>
        <el-table-column prop="address" label="执行结果"></el-table-column>
      </el-table>
      <div class="system-pagintion">
        <table-paging
          :current-page="1"
          :page-size="10"
          :total="100"
          @handleSizeChange="pageSizeChange"
          @handleCurrentChange="pageCurrentChange"
        ></table-paging>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      num: 123,
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      controlOptions: [
        { name: "查询", type: "primary", icon: "search" },
        { name: "导出", type: "success", icon: "download" },
        { name: "打印", type: "primary", icon: "printer" }
      ],
      options: [
        {
          value: "所有",
          label: "所有"
        },
        {
          value: "张三",
          label: "张三"
        },
        {
          value: "李四",
          label: "李四"
        },
        {
          value: "王二麻子",
          label: "王二麻子"
        },
        {
          value: "王八犊子",
          label: "王八犊子"
        }
      ]
    };
  },
  components: {},
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    selectBtn(val) {
      console.log(val);
      if (val.icon === "search") {
        console.log(this.formInline);
      }
    },
    pageSizeChange() {},
    pageCurrentChange() {}
  }
};
</script>

<style lang="less" scoped>
</style>
