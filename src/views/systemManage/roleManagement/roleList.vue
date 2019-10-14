<template>
  <div class="vlt-card">
    <div class="role-search">
      <search-bar
        class="search-bar-demo"
        @search="search"
        :options="option"
        :total="999"
        labelWidth="80px"
      >
        <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
      </search-bar>
    </div>
    <div class="role-table">
      <el-table :data="tableData" border style="width: 100%; margin-top: 10px;">
        <el-table-column type="index" prop="date" label="序号"></el-table-column>
        <el-table-column prop="date" label="用户角色"></el-table-column>
        <el-table-column prop="name" label="角色描述"></el-table-column>
        <el-table-column prop="province" label="创建人"></el-table-column>
        <el-table-column prop="city" label="角色类型"></el-table-column>
        <el-table-column prop="address" label="创建时间"></el-table-column>

        <el-table-column label="角色状态" align="center">
          <template slot-scope="scope">
            <table-row-status
              statusField="status"
              idField="id"
              :scope="scope"
              :tableData="tableData"
              :rowName="scope.row.name"
              :option="{
                'enable': {
                  apiName: 'apiName', // 接口名称
                  label: '启用', // 按钮文字
                  value: 0 // 接口字段传值
                },
                'disable': {
                  apiName: 'apiName',
                  label: '冻结',
                  value: 1
                },
                'logout': {
                  apiName: 'apiName',
                  label: '注销',
                  value: -1
                }
              }"
            ></table-row-status>
          </template>
        </el-table-column>
        <el-table-column prop="zip" label="操作">
          <template>
            <el-button type="primary" size="mini" @click="handelifo">查看</el-button>
            <el-button type="success" size="mini" @click="handelskip">编缉</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagintion">
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

<script>
export default {
  name: "roleList",
  data() {
    return {
      controlOptions: [
        //按钮组
        { name: "新建计划", type: "primary", icon: "plus" } // type为按钮的五种颜色， icon为具体的图标
      ],

      option: [
        //搜索框组
        {
          title: "用户角色",
          prop: "userRole",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          title: "创建人",
          prop: "createrMan",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          title: "角色状态",
          prop: "rolueStatus",
          type: "select",
          options: [
            {
              value: "beijing",
              label: "北京"
            },
            {
              value: "shanghai",
              label: "上海"
            }
          ],
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          type: "datetime-range",
          prop: "createTime",
          value: "",
          title: "创建时间",
          placeholder: ["开始时间", "结束时间"]
        }
      ],
      currentPage4: 4,
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
      multipleSelection: []
    };
  },
  computed: {},
  created() {},
  mounted() {},
  components: {},
  methods: {
    handelifo() {
      this.$router.push("roleList/roleifometion");
    },
    pageSizeChange(val) {
      //每页显示条数
      console.log(val);
    },
    pageCurrentChange(val) {
      //当前显示页数
      console.log(val);
    },
    handelskip() {
      this.$router.push("roleList/roleDestails");
    },
    selectBtn(val) {
      //新增删除事件
      console.log(val);
    },
    search(val) {
      //搜索事件
      console.log(val);
    }
  }
};
</script>


<style lang="less">
@import "./less/index.less";

.el-dialog__footer {
  text-align: center;
}
</style>
