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
        <el-table-column prop="createTime" label="创建时间" >
          <template slot-scope="scope">
          {{timeCycle(tableData[scope.$index].createTime)}}
        </template></el-table-column>
        <el-table-column prop="roleType" label="角色类型"></el-table-column>
        <el-table-column prop="updateBy" label="修改人"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间">
          <template slot-scope="scope">
            {{timeCycle(tableData[scope.$index].updateTime)}}
          </template>
          </el-table-column>
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
      <div class="pagintion" >
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
      cs: [],
      tree: [],
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
        { type: "switch", title: "角色状态", prop: "status", value: 1 },
        { type: "input", title: "角色编码", prop: "roleCode", value: '' },
        { title: "角色权限",
          type: "cascader-multiple",
          prop: "moduleIds",
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            multiple: true,
            // checkStrictly: true
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
            // checkStrictly: true
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
      searchFrom:{},
      isData:[]
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
    let res = await this.$api.QueryModuleTree()
        if(res.code === 0){
        this.isData = res.data
        this.addFrom[4].options = res.data;
        this.updataFrom[2].options = res.data;
        this.tree = res.data;
        // this.$set(this.updataFrom[2], 'value', [254])
        
        }
    console.log('菜单树查询',res)
    this.pagingControl()

    },
async pagingControl(val){ //分页控制
      const self = this;
        let data = {
          param:{...this.searchFrom},
          page:val||1,
          pageSize:this.pageSize
        }
    
        
          let reslt = await this.$api.QueryRoleInfoPage({data });//获取当前分页信息，不传值为总信息   
        console.log("获取当前分页信息",reslt)
           if (reslt.code === 0) {
          let arr = reslt.data.records;
          self.total = reslt.data.total//查询到的信息总数量
          self.page = reslt.data.current 
           //当前返回页
          let Arr = JSON.parse(JSON.stringify(arr))
          self.dataProcessing(Arr);//处理数据
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
                  console.log(data)
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
    timeCycle(val){  
      return  moment(val).format("YYYY-MM-DD HH:mm:ss")
    } ,
   async handelskip(val) {
     this.$router.push({name:"roleOfEditorial", query: { id: val.roleId } })
     return
     const self = this;
    this.$nextTick(() => {
          this.cs.push(254)
        })
      this.dialogFormVisible = true;
      this.currentStatus = "编缉";
      let reslt =  await this.$api.QueryRoleInfoDetail({data:val.roleId})//查询角色详情
      this.val = val ;
      let arr = Object.keys(val)
      let upDataFrom  = this.updataFrom
      let array = []
      console.log(reslt)
      // debugger;
      let ids = reslt.data.moduleIds;
      ids.forEach((item)=>{
        let arrs = self.$formMethods.getInsArray(item, 'id',  self.isData, 'id')
        console.log('arr',arrs)
      })

      if(reslt.code === 0){
        upDataFrom.forEach(item=>{
          item.value = reslt.data[item.prop]
        
        })
        this.$set(this.updataFrom[2], 'moduleIds', [254])
        // updataFrom[2].moduleIds = [254] // 254,246,245
      }
      
  
    },
    selectBtn(val) {//新增删除事件
      if (val.name === "新建角色") {
        this.$router.push({name:"roleOfEditorial"})
        this.currentStatus = "新建角色";
        // this.dialogFormVisible = true;
      }
    },
     search(val) {//搜索事件
        console.log(val)
        // alert(1)
       
        this.searchFrom = val;
        this.searchStatus = "搜索"
        this.pagingControl()

    },
    dataProcessing(arr) {//数据处理
        arr.forEach(item => {      
              item.status = !!item.status;
        });
      let obj = arr.map(item => {
        if (item.roleType === 1) {
          return {
            ...item,
            roleType: "管理员"
          };
        } else if (item.roleType === 2) {
          return {
            ...item,
            roleType: "子管理员"
          };
        } else {
          return {
            ...item,
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
      const self = this
      console.log('表单change事件',val)
      if(val.moduleIds.length<0){
          let arr2='' 
        val.moduleIds.forEach(item=>{
         let arr = this.getInsArray(item,'id',this.isData,'id')
            arr2+=arr.join(',')+','          
        })
        console.log(arr2)
       let  arr3 =Array.from(new Set(arr2.split(',')))
       arr3.forEach((item,index)=>{
         if(item === ''){
           arr3.splice(index,1)
         }
       })  
      let arr4 =  arr3.map(item=>{
          return parseInt(item)
        })
        self.$set(this.parms,'moduleIds',[...arr4])
      }else{
         Object.assign(this.parms, val);
      }
      
    },
     getInsArray(id, key, data, keyBack) { // 传入id和key是一样胡  keyBack返回key
        const self = this;
        for (var i in data) {
          if (data[i][key] == id) {
            // return [data[i][key]]; //用于传id 返回id数组
              return [data[i][keyBack]]; //用于传id 返回code数组
          }
          if (data[i].children) {
          let ro = self.getInsArray(id, key, data[i].children, keyBack);
            if (ro !== undefined) {
            return ro.concat(data[i][keyBack]);
            }
          }
        }
      },
  },

};
</script>


<style lang="less">
@import "./less/index.less";

.roleDialog {
  border-radius: 10px;
  .el-dialog__header {
    padding: 0;
  }
}
</style>
