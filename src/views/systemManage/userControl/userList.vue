<template>
  <div class="vlt-card">
    <div class="search"><!--搜索栏 !-->
         <search-bar class="search-bar-demo"
        @search="search"
        :options="option"
        :total="999"
        labelWidth="80px"
      >
        <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
      </search-bar>
    </div>
    <div class="from"><!-- table表格!-->
      <el-table    
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :border="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="用户状态" show-overflow-tooltip>
          <template>
            <div>
              <el-button type="text">启用</el-button>
              <span>|</span>
              <el-button type="text">冻结</el-button>
              <span>|</span>
              <el-button type="text">注销</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" show-overflow-tooltip>
          <el-button type="text" @click="handelides()">查看</el-button>
          <span>|</span>
          <el-button type="text" @click="handelifo()">编缉</el-button>
          <span>|</span>
          <el-button type="text"  @click="dialogFormVisible=true">重置密码</el-button>
        </el-table-column>
      </el-table>
      <div class="pagintion">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper,slot"
          :total="400"
        >
          <span style="color:#606266;font-weight: 400;">第 1 / 80 页</span>
        </el-pagination>
      </div>
    </div>
     <!-- 更改密码弹框-->
    <div class="dialog">
      <el-dialog title="重置密码" :visible.sync="dialogFormVisible" width="500px">
        <el-form :model="restpaswordfrom" >
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
        radio:3,
        password:''
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
        controlOptions: [//按钮组
        {name: '新建计划', type: 'primary', icon: 'plus'},  // type为按钮的五种颜色， icon为具体的图标
        {name: '批量删除', type: '', icon: 'delete'}   
      ],
      option: [ //搜索框组
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
        },
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handelskip() {
      // this.$router.push("roleList/roleDestails");
    },
    handelifo(){
      this.$router.push('userList/userInformed')
    },
    handelides(){
      this.$router.push('userList/userDestails')
    },
    selectBtn(val){ //新增删除事件
      console.log(val)
    },
    search(val){//搜索事件
      console.log(val)
    },
    dialogFormVisibleEnter(){
      console.log(this.restpaswordfrom)
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
