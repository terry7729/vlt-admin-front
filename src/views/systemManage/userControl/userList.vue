<template>
  <div class="vlt-card">
    <div class="search">
      <!--搜索栏 !-->
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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" prop="date" label="序号"></el-table-column>
        <el-table-column prop="date" label="账号"></el-table-column>
        <el-table-column prop="name" label="所属机构"></el-table-column>
        <el-table-column prop="province" label="部门"></el-table-column>
        <el-table-column prop="city" label="用户角色"></el-table-column>
        <el-table-column prop="address" label="姓名"></el-table-column>
        <el-table-column prop="address" label="手机号码"></el-table-column>
        <el-table-column prop="address" label="最近登陆次数"></el-table-column>
        <el-table-column prop="address" label="最近登录时间"></el-table-column>
        <el-table-column prop="address" label="最近登陆IP"></el-table-column>
        <el-table-column prop="address" label="创建时间"></el-table-column>
        <el-table-column label="用户状态" align="center" width="200">
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
        <el-table-column prop="zip" label="操作" width="200px">
          <template>
            <el-button type="primary" size="mini" @click="handelides">查看</el-button>
            <el-button type="success" size="mini" @click="handelifo">编缉</el-button>
            <el-button type="success" size="mini" @click="dialogFormVisible=true">重置密码</el-button>
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

    <!-- 更改密码弹框-->
    <div class="dialog">
      <el-dialog title="重置密码" :visible.sync="dialogFormVisible" width="500px">
        <el-form :model="restpaswordfrom">
          <el-form-item label="请选择你的操作" label-width="120px">
            <el-radio-group v-model="restpaswordfrom.radio">
              <el-radio :label="3">操作密码</el-radio>
              <el-radio :label="6">登陆密码</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="restpaswordfrom.radio===3?'请输入操作密码':'请输入登陆密码'" label-width="120px">
            <el-input placeholder="请输入密码" v-model="restpaswordfrom.password" show-password></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisibleEnter">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "userList",
  data() {
    return {
      restpaswordfrom: {
        radio: 3,
        password: ""
      },
      dialogFormVisible: false,
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
      multipleSelection: [],
      controlOptions: [
        //按钮组
        { name: "新建计划", type: "primary", icon: "plus" }, // type为按钮的五种颜色， icon为具体的图标
        { name: "批量删除", type: "", icon: "delete" }
      ],
      option: [
        //搜索框组
        {
          title: "姓名",
          prop: "name",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          title: "账号",
          prop: "account",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          title: "所属机构",
          prop: "organ",
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
          title: "用户角色",
          prop: "userrole",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          title: "手机号码",
          prop: "phonecode",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          title: "用户状态",
          prop: "userstatus",
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
          prop: "date4",
          value: "",
          title: "创建时间",
          placeholder: ["开始时间", "结束时间"]
        }
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    pageSizeChange(val) {
      //每页显示条数
      console.log(val);
    },
    pageCurrentChange(val) {
      //当前显示页数
      console.log(val);
    },
    handelskip() {
      // this.$router.push("roleList/roleDestails");
    },
    handelifo() {
      this.$router.push("userList/userInformed");
    },
    handelides() {
      this.$router.push("userList/userDestails");
    },
    selectBtn(val) {
      //新增删除事件
      console.log(val);
    },
    search(val) {
      //搜索事件
      console.log(val);
    },
    dialogFormVisibleEnter() {
      console.log(this.restpaswordfrom);
      this.dialogFormVisible = false;
    }
  }
};
</script>


<style lang="less">
@import "./less/index.less";
.pagintion {
  margin: 20px;
  .el-pagination {
    position: relative;
    .el-pagination__jump {
      position: absolute;
      right: 0;
    }
    .el-pagination__sizes {
      position: absolute;
      right: 94px;
    }
    .btn-prev {
      position: absolute;
      right: 599px;
    }
    .el-pager {
      position: absolute;
      right: 269px;
    }
    .btn-next {
      position: absolute;
      right: 220px;
    }
  }
}

.el-table th {
  background: #f8f8f9;
  padding: 8px 0;
  text-align: center;
}
.el-table td {
  padding: 10px 0;
  text-align: center;
}
</style>
