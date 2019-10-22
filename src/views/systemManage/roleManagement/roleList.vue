<template>
  <div class="vlt-card">
    <div class="role-search">
      <search-bar
        class="search-bar-demo"
        @search="search"
        :options="option"
        :total="num"
        labelWidth="80px"
      >
        <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
      </search-bar>
    </div>
    <div class="role-table">
      <el-table :data="tableData" border style="width: 100%; margin-top: 10px;">
        <el-table-column type="index" prop="date" label="序号"></el-table-column>
        <el-table-column prop="roleName" label="用户角色"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column prop="createBy" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="roleType" label="角色类型"></el-table-column>
        <el-table-column prop="updateBy" label="修改人"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间"></el-table-column>
        <el-table-column label="角色状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="tableData[scope.$index].status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="zip" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handelifo(scope.row)">查看</el-button>
            <el-button type="success" size="mini" @click="handelskip(scope.row)">编缉</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagintion">
        <table-paging
          :current-page="1"
          :page-size="10"
          :total="num"
          @handleSizeChange="pageSizeChange"
          @handleCurrentChange="pageCurrentChange"
        ></table-paging>
      </div>
    </div>
    <div class="role-dialog">
      <el-dialog :visible.sync="dialogFormVisible" width="600px" custom-class="roleDialog">
        <!-- <roleifometion></roleifometion> -->
        <div class="vlt-edit-single">
          <h2 class="title">角色信息</h2>
          <div class="vlt-edit-wrap">
            <base-form
              :formData="data2"
              labelWidth="90px"
              :rules="rules"
              ref="baseForm"
              direction="right"
              @change="changeForm"
            ></base-form>
            <el-row class="vlt-edit-btn">
              <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
              <el-button size="medium" @click="cancel">取消</el-button>
            </el-row>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "roleList",
  data() {
    return {
      rules: {},
      dialogFormVisible: false,
      controlOptions: [
        //按钮组
        { name: "新建角色", type: "primary", icon: "plus" } // type为按钮的五种颜色， icon为具体的图标
      ],
      data2: [
        { type: "input", title: "用户角色", prop: "roleName", value: "" },
        {
          type: "select",
          title: "角色类型",
          prop: "roleType",
          value: "",
          options: [
            { label: "管理员", value: 1 },
            { label: "子管理员", value: 2 },
            { label: "普通角色", value: 3 }
          ]
        },
        { type: "switch", title: "角色状态", prop: "status", value: 1 },
        {
          type: "cascader-multiple",
          prop: "moduleIds",
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            multiple: true,
            checkStrictly: true
          },
          value: [],
          title: "角色权限",
          placeholder: "请选择",
          options: []
        },
        { type: "textarea", title: "描述", prop: "roleDesc", value: "" }
      ],
      option: [
        //搜索框组
        {
          title: "用户角色",
          prop: "roleName",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          title: "创建人",
          prop: "createBy",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          title: "角色状态",
          prop: "status",
          type: "select",
          options: [
            {
              value: "0",
              label: "无效"
            },
            {
              value: "1",
              label: "有效"
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
      multipleSelection: [],
      //新建按钮点击
      newcreate: false,
      parms: {},
      currentState: "",
      num:0,
      val:{},
    };
  },
  computed: {},
  async created() {
    // let reslt = await this.$api.QueryAllRole({});
   
    let res = await this.$api.getMenu({});
    //
    let reslt = await this.$api.QueryRoleInfoPage({  });
    console.log(reslt)
     let arr = reslt.data.records;
     this.num = arr.length
    this.data2[3].options = res.data;
    if (reslt.code === 0) {
      this.dataProcessing(arr);
    }
  },
  mounted() {},
  components: {},
  methods: {
    handelifo(val) {
      console.log(val);
      this.$router.push({ name: "roleifometion", query: { id: val.roleId } });
    },
    pageSizeChange(val) {
      //每页显示条数
      console.log(val);
    },
    pageCurrentChange(val) {
      //当前显示页数
      console.log(val);
    },
    handelskip(val) {
      this.dialogFormVisible = true;
      this.currentState = "编缉";
      this.val = val ;
      let arr = Object.keys(val)
      let len  = this.data2
      console.log(val.roleType)
      for(var i = 0 ; i<len.length ; i++){
        for(var j = 0 ; j< arr.length ; j++){
          if(arr[j]===len[i].prop){
            len[i].value = val[arr[j]]
          }
        }
      }
      // this.$router.push("roleList/roleDestails");
    },
    selectBtn(val) {
      //新增删除事件
      if (val.name === "新建角色") {
        this.currentState = "新建角色";
        this.dialogFormVisible = true;
      }
    },
    async search(val) {
      //搜索事件
      let data = JSON.parse(JSON.stringify(val));
      let reslt = await this.$api.QueryRoleInfoPage({ data });
      console.log(reslt);
      let arr = reslt.data.records;
      if (reslt.code === 0) {
        this.dataProcessing(arr);
      }
    },
    dataProcessing(arr) {
      // console.log(arr);
      let obj = arr.map(item => {
        console.log(item);
        if (item.roleType === 1) {
          return {
            ...item,
            createTime: moment(item.createTime).format("YYYY-MM-DD HH:mm:ss"),
            updateTime: moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss"),
            roleType: "管理员"
          };
        } else if (item.roleType === 2) {
          return {
            ...item,
            createTime: moment(item.createTime).format("YYYY-MM-DD HH:mm:ss"),
            updateTime: moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss"),
            roleType: "子管理员"
          };
        } else {
          return {
            ...item,
            createTime: moment(item.createTime).format("YYYY-MM-DD HH:mm:ss"),
            updateTime: moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss"),
            roleType: "普通角色"
          };
        }
      });
      this.tableData = obj;
    },
    async submit(val) {
      //表单提交
      if (this.currentState === "新建角色") {
        //点击新建按钮提交
        this.parms.created = "新建角色";
        let data = JSON.parse(JSON.stringify(this.parms));
        data.sysCode= "VLT_BMS"
        data.status = Number(data.status)
        let reslt = await this.$api.SaveRoleInfo({ data });
        console.log(reslt);
      if(reslt.code===0){
        this.dialogFormVisible =false;
        this.$refs.baseForm.resetForm();
        this.parms = {};
      }
        
        console.log(data);
      } else if (this.currentState === "编缉") {
        //点击编缉按钮提交
        this.parms.created = "编缉";
       

        let data = JSON.parse(JSON.stringify(this.parms));
        data.roleId = this.val.roleId
        data.status = Number(data.status)
        if(typeof data.roleType != Number ){
            if(data.roleType ==="管理员"){
          data.roleType = 1;
        }else if(data.roleType === "子管理员"){
          data.roleType = 2;
        }else{
          data.roleType = 3;
        }
        }
        let reslt = await this.$api.UpdateRoleInfo({data})
         console.log(reslt)

        this.$refs.baseForm.resetForm();
        this.parms = {};
        // console.log(data);
      }
    },
    //弹框事件
    cancel() {
      this.dialogFormVisible = false;
    },
    changeForm(val) {
    
  
       Object.assign(this.parms, val);
      
    }
  }
};
</script>


<style lang="less">
@import "./less/index.less";

.roleDialog {
  border-radius: 20px;
  .el-dialog__header {
    padding: 0;
  }
}
</style>
