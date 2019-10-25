<template>
  <div class="vlt-card">
    <div class="role-search">
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
      <el-table :data="tableData" border style="width: 100%; margin-top: 10px;">
        <el-table-column type="index" prop="date" label="序号"></el-table-column>
        <el-table-column prop="roleName" label="用户角色"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column prop="createBy" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" ></el-table-column>
        <el-table-column prop="roleType" label="角色类型"></el-table-column>
        <el-table-column prop="updateBy" label="修改人"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间"></el-table-column>
        <el-table-column label="角色状态" prop="status" >
          <template slot-scope="scope">
            <el-switch
              v-model="tableData[scope.$index].status"
              active-color="#13ce66"
              @change="switchChange(scope.row)"
              active-text="启用"
              inactive-text="冻结"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="zip" label="操作" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handelifo(scope.row)">查看</el-button>
            <el-button type="success" size="mini" @click="handelskip(scope.row)" :disabled="tableData[scope.$index].status?true:false">编缉</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagintion" v-if="total">
        <table-paging
          :current-page="page"
          :page-size="10"
          :total="total"
          @handleSizeChange="pageSizeChange"
          @handleCurrentChange="pageCurrentChange"
        ></table-paging>
      </div>
    </div>
    <div class="role-dialog">
      <el-dialog :visible.sync="dialogFormVisible" width="600px" custom-class="roleDialog" >
        <!-- <roleifometion></roleifometion> -->
        <div class="vlt-edit-single">
          <h2 class="title">角色信息</h2>
          <div class="vlt-edit-wrap">
            <base-form
              :formData="this.currentStatus === '编缉'?updataFrom: addFrom"
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
      controlOptions: [//按钮组
        { name: "新建角色", type: "primary", icon: "plus" } // type为按钮的五种颜色， icon为具体的图标
      ],
      addFrom: [ //新建角色表单
        { type: "input", title: "用户角色", prop: "roleName", value: "" },
        { title: "角色类型",
          type: "select",
          prop: "roleType",
          value: "",
          options: [
            { label: "管理员", value: 1 },
            { label: "子管理员", value: 2 },
            { label: "普通角色", value: 3 }
          ]},
        { type: "switch", title: "角色状态", prop: "status", value: true },
        { type: "input", title: "角色编码", prop: "roleCode", value: '' },
        { title: "角色权限",
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
          placeholder: "请选择",
          options: []},
        { type: "textarea", title: "描述", prop: "roleDesc", value: "" }
      ],
      updataFrom:[//编缉角色信息
        { type: "input", title: "用户角色", prop: "roleName", value: "" },
        { title: "角色类型",
          type: "select",
          prop: "roleType",
          value: "",
          options: [
            { label: "管理员", value: 1 },
            { label: "子管理员", value: 2 },
            { label: "普通角色", value: 3 }
          ]},
        { title: "角色权限",
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
          placeholder: "请选择",
          options: []},
        { type: "textarea", title: "描述", prop: "roleDesc", value: "" }
      ],
      option: [//搜索框组
        { title: "用户角色",prop: "roleName",type: "input",value: "",placeholder: "请输入" || ["请输入1", "请输入2"]},
        {title: "创建人",prop: "createBy",type: "input",value: "", placeholder: "请输入" || ["请输入1", "请输入2"]},
        {title: "角色状态", value: "", prop: "status",type: "select",options: [{value: 0,label: "无效"},{value: 1,label: "有效" }],placeholder: "请输入" || ["请输入1", "请输入2"] },
        {type: "datetime-range",prop: "createTime", value: "",title: "创建时间",placeholder: ["开始时间", "结束时间"]}
      ],
      dialogFormVisible: false,//弹框控制
      currentPage4: 0,//当前显示分页
      tableData: [],
      //新建按钮点击
      parms: {},//表单对象
      currentStatus: "",//当前操作状态
      total:0,
      val:{},
      page:1,
      pageSize:10,
      searchStatus:'',
      searchFrom:{}
    };
  },
  computed: {},
  created() {
    this.init()
  },
  mounted() {},
  components: {},
  methods: {
async init(val){ //初始化页面数据
    let res = await this.$api.QueryModuleTree({});
        if(res.code === 0){
        this.addFrom[4].options = res.data;
        this.updataFrom[2].options = res.data;
        }
    console.log('菜单树查询',res)
    this.pagingControl()

    },
async pagingControl(val){ //分页控制
    let data = {
          ...this.searchFrom,
          page:val||1,
          pageSize:this.pageSize
        }
      if(this.searchStatus != "搜索"){
        console.log('我是默认',data)
          let reslt = await this.$api.QueryRoleInfoPage({data });//获取当前分页信息，不传值为总信息   
        console.log("获取当前分页信息",reslt)
           if (reslt.code === 0) {
          let arr = reslt.data.records;
          this.total = reslt.data.total//查询到的信息总数量
          this.page = reslt.data.page  //当前返回页
          let Arr = JSON.parse(JSON.stringify(arr))
          this.dataProcessing(Arr);//处理数据
          }
          console.log('我是默认',n)
      }else{
        console.log('我是搜索',data)
          let reslt = await this.$api.QueryRoleInfoPage({ data });//角色查询接口
        console.log('角色查询接口',reslt);  
        if (reslt.code === 0) {
        let arr = reslt.data.records;
        this.total = reslt.data.total;
        let Arr = JSON.parse(JSON.stringify(arr))
        this.dataProcessing(Arr);//处理数据
      }
      }
     },
    handelifo(val) {//路由跳转到角色详情
      this.$router.push({ name: "roleifometion", query: { id: val.roleId } });
    },
    async switchChange(val){
        let ifo;
        if(val.status){
          ifo = "此操作会解除冻结状态，请确认是否解除此角色冻结状态？"
        }else{
          ifo = "此操作会冻结此角色，认确认是否要冻结此角色？"
        }
         this.$confirm(ifo, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {

                 let data = {
                    status:Number(val.status),
                    roleId:val.roleId
                  }
                  let reslt = await this.$api.UpdateRoleStatusInfo({data})
                  console.log('更改角色状态',reslt)
                  if(reslt.code === 0){
                    this.init()
                       this.$message({
                        type: "success",
                        message: "状态更改成功!"
                      });
                  }
          })
          .catch(() => {
            this.init()
            this.$message({
              type: "info",
              message: "更改状态失败"
            });
          });
    },
   async pageSizeChange(val) {//每页显示条数
      // console.log(val);
      this.pageSize = val;
      this.pagingControl()
    },
    pageCurrentChange(val) { //当前显示页数
      // console.log(val);
      this.currentPage4 = val;
      this.pagingControl(val)
    },
    handelskip(val) {
      this.dialogFormVisible = true;
      this.currentStatus = "编缉";
      this.val = val ;
      let arr = Object.keys(val)
      let len  = this.updataFrom
      console.log(val.roleType)
      for(var i = 0 ; i<len.length ; i++){
        for(var j = 0 ; j< arr.length ; j++){
          if(arr[j]===len[i].prop){
            len[i].value = val[arr[j]]
          }
        }
      }
    },
    selectBtn(val) {//新增删除事件
      if (val.name === "新建角色") {
        this.currentStatus = "新建角色";
        this.dialogFormVisible = true;
      }
    },
async search(val) {//搜索事件
      console.log(val)
        this.searchFrom = val;
          this.searchStatus = "搜索"
            this.init()
      let data = JSON.parse(JSON.stringify(val));
     
    },
    dataProcessing(arr) {//数据处理
        arr.forEach(item => {      
              item.status = !!item.status;
        });
        //  console.log(arr)
      let obj = arr.map(item => {
        // console.log(item);
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
    async submit(val) {//表单提交
      if (this.currentStatus === "新建角色") {//点击新建按钮提交
        this.parms.created = "新建角色";
        let data = JSON.parse(JSON.stringify(this.parms));
        data.sysCode= "VLT_BMS"
        data.status = Number(data.status)
        console.log('保存角色信息表单对象',data);
        let reslt = await this.$api.SaveRoleInfo({ data });//保存角色信息
        console.log('保存角色信息',reslt);
      if(reslt.code===0){
        this.init()
        this.dialogFormVisible =false;
        this.$refs.baseForm.resetForm();
        this.parms = {};
      }        
      } else if (this.currentStatus === "编缉") { //点击编缉按钮提交
        this.parms.created = "编缉";
        let data = JSON.parse(JSON.stringify(this.parms));
        data.roleId = this.val.roleId
        // data.status = Number(data.status)  
        if(typeof data.roleType != Number ){
            if(data.roleType ==="管理员"){
              data.roleType = 1;
            }else if(data.roleType === "子管理员"){
              data.roleType = 2;
            }else{
              data.roleType = 3;
            }
        }
        console.log(data,"修改角色信息表单对象")
        let reslt = await this.$api.UpdateRoleInfo({data})//修改角色信息
         console.log('修改角色信息',reslt)
        if(reslt.code === 0){
          this.init(this.currentPage4)
          this.dialogFormVisible = false;
          this.$refs.baseForm.resetForm();
          this.parms = {};
        }      
      }
    },
    //弹框事件
    cancel() {
      this.dialogFormVisible = false;
    },
    changeForm(val) {
       Object.assign(this.parms, val);
    }
  },

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
