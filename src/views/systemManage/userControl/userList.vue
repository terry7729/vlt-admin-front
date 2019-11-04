<template>
  <div class="vlt-card">
    <div class="search">
      <!--搜索栏 !-->
      <search-bar
        class="search-bar-demo"
        @search="search"
        :options="option"
        :total="total"
        labelWidth="80px"
      >
        <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
      </search-bar>
    </div>
    <div class="role-table">
      <el-table
        :data="userList"
        border
        style="width: 100%; margin-top: 10px;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" prop="id" label="序号"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="subsidiaryOrgan" label="所属机构"></el-table-column>
        <el-table-column prop="department" label="部门"></el-table-column>
        <el-table-column prop="roleName" label="用户角色"></el-table-column>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="mobile" label="手机号码"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="loginCount" label="最近登陆次数" width="100"></el-table-column>
        <el-table-column prop="loginTime" label="最近登录时间" width="100"></el-table-column>
        <el-table-column prop="loginIp" label="最近登陆IP" width="90"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="用户状态" align="center" width="200">
          <template slot-scope="scope">
            <table-row-status
              statusField="userStatus"
              idField="userId"
              :scope="scope"
              :tableData="userList"
              :rowName="scope.row.name"
              :option="{
                'enable': {
                  apiName: 'userStatus', // 接口名称
                  label: '启用', // 按钮文字
                  value: 0// 接口字段传值
                },
                'disable': {
                  apiName: 'userStatus',
                  label: '冻结',
                  value: 1
                },
                'logout': {
                  apiName: 'userStatus',
                  label: '注销',
                  value: 2
                }
              }"
            ></table-row-status>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handelides(scope.row)">查看</el-button>
            <el-button type="success" size="mini" @click="handelifo(scope.$index,scope.row)">编缉</el-button>
            <el-button type="success" size="mini" @click="resetPassWord(scope.row)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagintion">
        <table-paging
          :currentPage="page"
          :pageSize="pageSize"
          :total="total"
          @handleSizeChange="pageSizeChange"
          @handleCurrentChange="pageCurrentChange"
        ></table-paging>
      </div>
    </div>

    <!-- 更改密码弹框-->
    <div class="dialog">
      <el-dialog
        title="重置密码"
        :visible.sync="dialogFormVisible"
        width="500px"
        custom-class="userDialog"
      >
        <el-form :model="restpaswordfrom">
          <el-form-item label="请选择你的操作" label-width="130px">
            <el-radio-group v-model="restpaswordfrom.pwdStatus">
              <el-radio :label="1">操作密码</el-radio>
              <el-radio :label="0">登陆密码</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="请输入管理员密码" label-width="130px">
            <el-input placeholder="请输入密码" v-model="restpaswordfrom.password" show-password></el-input>
          </el-form-item>-->
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
import moment from 'moment'
export default {
  name: "userList",
  data() {
    return {
       innerVisible:false,
      restpaswordfrom: {
        pwdStatus: 0
        // password:''
      },
      //测试数据
      total: 0,
      page: 1,
      pageSize: 10,
      //
      dialogFormVisible: false,
      currentPage4: 1,
      userList: [],
      multipleSelection: [],
      controlOptions: [
        //按钮组
        { name: "新建用户", type: "primary", icon: "plus" }, // type为按钮的五种颜色， icon为具体的图标
        { name: "批量删除", type: "", icon: "delete" }
      ],
      option: [
        //搜索框组
        {
         title: "姓名",
         prop: "userName",
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
         prop: "insInfoList",
         type: "cascader",
         setProps: {
            value: "id",
            label: "text",
            checkStrictly: true,
            children: "children"
         },
         options: [],
         value: "",
         placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          title: "用户角色",
          prop: "roleName",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          title: "手机号码",
          prop: "mobile",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          title: "用户状态",
          prop: "userStatus",
          type: "select",
          options: [
            {
              value: 0,
              label: "启用"
            },
            {
              value: 1,
              label: "冻结"
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
      searchFrom: {},
      searchStatus: "",
      userId: [],
      restParam: {}
    };
  },
  computed: {},
  created() {
   const self = this;
   (async ()=>{
      let reslt =await this.$api.QueryInsTree()
      if(reslt.code === 0){
         this.option[2].options = reslt.data
      }
   })()
   this.init();
  },
  mounted() {},
  methods: {
    async init(val) {
      console.log("param", this.searchFrom);
      let data = {
        page: val || 1,
        pageSize: this.pageSize,
        param: {
          ...this.searchFrom
        }
      };

      let reslt = await this.$api.userPage({ data });
      if(reslt.code === 0){
         console.log("reslt", reslt);
         let arr = reslt.data.records.map(item => {
         let userLoginLogVo = item.userLoginLogVo;
         return { ...userLoginLogVo, ...item };
         });
         console.log("arr", arr);
         this.userList = arr;
         this.page = reslt.data.current;
         this.total = reslt.data.total;
         console.log("我是默认", reslt);
      }
    },
    pageSizeChange(val) {//每页显示条数
      this.pageSize = val;
      this.init();
    },
    handleSelectionChange(val) {
      let arr = val.map(item => {
        return item.userId;
      });
      this.userId = [...arr];
    },
    pageCurrentChange(val) {//当前显示页数
      this.currentPage4 = val;
      this.init(val);
    },
    handelifo(val, obj) {  
      this.$router.push({ name: "userInformed", query: { title: "编缉用户信息", ifo: obj }});
    },
    handelides(val) {
      console.log(val);
      this.$router.push({ name: "userDestails", query: { id: val.userId } });
    },
    selectBtn(val) {
      //新增删除事件
      if (val.name === "新建用户") {
        this.$router.push({ name: "userInformed", query: { title: "新建用户信息" } });
      }
      if (val.name === "批量删除") {
        (async () => {
          let data = {};
          data.idList = [...this.userId];
          data = JSON.parse(JSON.stringify(data));
          console.log("data", data);
          let reslt = await this.$api.delByIds({ data }); //批量删除
          console.log(reslt);
        })();
      }
    },
    resetPassWord(val) {
      this.dialogFormVisible = true;
      this.restParam = val;
    },
    dialogFormVisibleEnter() {//操作密码重置
      this.$alert(this.restpaswordfrom.pwdStatus?"您确认要重置操作密码?":"您确认要重置登陆密码", "标题名称", {
        confirmButtonText: "确定",
        callback: async action => {
          this.dialogFormVisible = false;
          let data = {
            ...this.restpaswordfrom
          };
          data.userId = this.restParam.userId;
          let reslt = await this.$api.restPassWord({ data });
          if(reslt.code === 0){
            this.$message({
               type: "success",
               message: '重置成功'
            });
          }
        }
      });
    },
    search(val) { //搜索事件
      console.log(val);
      let list = {};
      if(val.createTime  && val.createTime.length>0){
       let startTime=moment(Date.parse(val.createTime[0])).format("YYYY-MM-DD")
       let endTime = moment(Date.parse(val.createTime[1])).format("YYYY-MM-DD")
         list = {
            ...val,
            startTime,
            endTime
         }
      }else{
        list = {
           ...val
        }
      }   
      delete list.createTime
      this.searchFrom = {...list};
      this.init();
    },
    pagingControl() {},
    resetPassWord(val) {
      this.dialogFormVisible = true;
      this.restParam = val;
      console.log(val);
    },
  },

  watch: {
    // pageSize: {
    //   handler: function(newValue, oldVale) {
    //        if(newValue != oldVale){
    //           this.init()
    //        }
    //   },
    //   deep: true // 对象内部的属性监听，也叫深度监听
    // }
  }
};
</script>


<style lang="less">
@import "./less/index.less";
.userDialog {
  border-radius: 20px;
}
</style>
