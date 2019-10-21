<template>
  <div class="vlt-card organizati" style="min-height:500px">
    <el-container>
      <el-aside class="organi-left" style="width:330px;">
        <div class="organi-btn">
          <control-bar :options="controlOptions" @select="selectBtn"></control-bar>
        </div>
        <el-col :span="18">
          <div class="organi-tree">
            <!--树形结构 !-->
            <!-- <el-tree
              :data="nodeTreeData"
              show-checkbox
              node-key="id"
              :props="setProps"
              :check-strictly="true"
              @node-click="getnowNodeifo"
              @check-change="getCheckifo"
              :default-expanded-keys="[1, 2]"
              :expand-on-click-node="false"
              ref="attrList"
            ></el-tree> -->

            <!--xbot-->
             <el-tree
      :data="nodeTreeData"
        :props="setProps"
      show-checkbox
      node-key="id"
       @node-click="getnowNodeifo"
       @check-change="getCheckifo"
      default-expand-all
      ref="attrList"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="freeze">
           <el-button
            type="text"
            size="mini"
            @click="() => append(node, data)">
            新增
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            冻结
          </el-button>
        </span>
      </span>
    </el-tree>
    <!--添加删除功能-->
          </div>
        </el-col>
      </el-aside>

      <el-main style="padding:0 40px;border-left:1px solid #ccc;margin-left:20px;">
        <div class="organi-right" style="margin-left:100px;">
          <div class="Lotteryinfo">
            <section class="comp-item">
              <panel-edit title="机构信息" @edit="jumptocompile" :show="true">
                <base-info :infoList="AgencyInformation"></base-info>
                <!-- <div style=" text-align: center;padding:10px;">
                  <el-button size="small" type="primary" @click="jumptocompile">更改</el-button>
                </div>-->
              </panel-edit>
            </section>
          </div>
          <!-- <div class="vlt-edit-double">
            <h2 class="title">机构信息</h2>
            <div class="vlt-edit-wrap">
              <base-form
                :formData="infoList"
                ref="baseForm"
                labelWidth="140px"
                :rules="rules2"
                direction="top"
                @change="changeForm"
              ></base-form>
              <el-row class="el-form-item vlt-edit-btn">
                <el-button
                  type="primary"
                  v-prevent="1000"
                  size="medium"
                  @click="jumptocompile"
                >提交并保存</el-button>
                <el-button size="medium" @click="cancel">取消</el-button>
              </el-row>
            </div>
          </div>-->
          <div class="departmentinfo" style="margin:40px 0 40px 0; ">
            <section class="comp-item">
              <panel title="部门信息" :show="true">
                <tips-line>
                  共搜索到
                  <span style="color:#57a3f3;padding:0 4px">{{num}}</span>条数据
                </tips-line>
                <!-- 提示信息!-->
                <el-table
                  ref="singleTable"
                  :data="testlist"
                  highlight-current-row
                  style="width: 100%"
                  border
                >
                  <el-table-column type="index" width="50" label="序号"></el-table-column>
                  <el-table-column property="section" label="部门名称" width="120"></el-table-column>
                  <el-table-column property="superiorDepartment" label="所属机构" width="120"></el-table-column>
                  <el-table-column property="prevSection" label="上级部门"></el-table-column>
                  <el-table-column property="departmentPrincipal" label="部门负责人"></el-table-column>
                  <el-table-column property="principalPhone" label="负责人电话"></el-table-column>
                  <el-table-column property="status" label="状态">
                    <template slot-scope="scope">
                      <el-switch
                        v-model="testlist[scope.$index].status"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      ></el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column property="address" label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" @click="derparModifine(scope.row)">修改</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="padding:10px;" v-if="num">
                  <!-- 分页!-->
                  <table-paging
                    :current-page="1"
                    :page-size="i"
                    :total="num"
                    @handleSizeChange="pageSizeChange"
                    @handleCurrentChange="pageCurrentChange"
                  ></table-paging>
                </div>
              </panel>
            </section>
          </div>
        </div>
      </el-main>
    </el-container>
    <!--弹出框-->
    <el-dialog title :visible.sync="dialogFormVisible" custom-class="organiDialog">
      <div class="vlt-edit-single">
        <h2 class="title">编辑</h2>
        <div class="vlt-edit-wrap">
          <el-form>
            <base-form
              :formData="this.addOrChange === '更改部门信息'?AddDepartment.slice(1,6):AddDepartment"
              labelWidth="110px"
              ref="DepartmentBaseForm"
              :rules="rules2"
              direction="right"
              @change="DepartmentChangeForm"
            ></base-form>
          </el-form>
          <el-row class="vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="DepartmentSubmit">提交并保存</el-button>
            <el-button size="medium" @click="cancel">取消</el-button>
          </el-row>
        </div>
      </div>
    </el-dialog>
    <!--弹出框2-->
    <el-dialog title :visible.sync="dialogFormVisible2" custom-class="organiDialog">
      <div class="vlt-edit-single">
        <h2 class="title">添加机构信息</h2>
        <div class="vlt-edit-wrap">
          <base-form
            :formData="OrganizationAdd"
            labelWidth="110px"
            ref="OrganizationBaseForm"
            :rules="rules2"
            direction="right"
            @change="OrganizationChangeForm"
          ></base-form>

          <el-row class="vlt-edit-btn">
            <el-button
              type="primary"
              v-prevent="1000"
              size="medium"
              @click="OrganizationSubmit"
            >提交并保存</el-button>
            <el-button size="medium" @click="cancelTwo">取消</el-button>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import rules from "../../../utils/rules";
let id = 1000;
import moment from "moment";
export default {
  name: "organization",
  computed: {},
  created() {
    this.init();
  },
  data() {
    return {
      setProps: {
        label: "text",
        value: "id",
        children: "children"
      },
      rules2: {
        //验证表单对象
        section: { required: true, message: "部门不能为空" }
      },
      controlOptions: [
        //顶部按钮
        // { name: "添加机构", type: "primary", icon: "plus", id: 1 }, // type为按钮的五种颜色， icon为具体的图标
        { name: "添加部门", type: "primary", icon: "plus", id: 2 },
        { name: "刷新", type: "", icon: "refresh-right", id: 3 }
      ],
      AddDepartment: [
        //添加部门表单对象
        {
          type: "cascader",
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            checkStrictly: true
          },
          title: "上级部门",
          prop: "PrveSection",
          value: "",
          placeholder: "请选择",
          options: []
        },
        { type: "input", title: "部门名称", prop: "departmentName", value: "" },
        { type: "input", title: "部门负责人", prop: "principal", value: "" },
        {
          type: "input",
          title: "负责人电话",
          prop: "principalMobile",
          value: ""
        },
        { type: "switch", title: "状态", prop: "status", value: 1 },
        { type: "textarea", title: "备注", prop: "remark", value: "" }
      ],
      OrganizationAdd: [
        //添加机构表单对象
        {
          type: "input",
          title: "父机构",
          prop: " parent",
          disabled: true,
          value: ""
        },
        {
          type: "input",
          title: "父机构编码",
          disabled: true,
          prop: "parentInsCode",
          value: ""
        },
        {
          type: "input",
          title: "机构名称",
          prop: "insName",
          value: ""
        },
        {
          type: "input",
          title: "机构编码",
          prop: "insCode",
          value: ""
        },
        {
          type: "cascader",
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            checkStrictly: true
          },
          title: "区域",
          prop: "regionName",
          value: "",
          placeholder: "请选择",
          options: []
        },
        { type: "input", title: "区域编码", prop: "regionCode", value: "" },
        { type: "switch", title: "状态", prop: "status", value: true },
        { type: "textarea", title: "备注", prop: "remark", value: "" }
      ],
      AgencyInformation: [
        //机构信息
        {
          title: "父机构",
          value: "",
          type: "input",
          prop: "parentInsName",
          disabled: true
        },
        { title: "区域名称", value: "", type: "input", prop: "regionName" },
        {
          title: "父机构编码",
          value: "",
          type: "input",
          prop: "parentInsCode"
        },
        { title: "区域编码", value: "", type: "input", prop: "regionCode" },
        {
          title: "机构名称",
          value: "",
          type: "input",
          prop: "insName"
        },
        {
          title: "机构状态",
          value: "",
          type: "switch",
          prop: "status"
        },
        {
          title: "机构编码",
          value: "",
          type: "input",
          prop: "insCode"
        },
        { title: "备注", value: "", type: "textarea", prop: "remark" },
        {
          title: "创建人",
          value: "",
          type: "input",
          prop: "createBy",
          disabled: true
        },
        {
          title: "创建时间",
          value: "",
          type: "input",
          prop: "createTime",
          disabled: true
        },
        {
          title: "修改人",
          value: "",
          type: "input",
          prop: "modifierBy",
          disabled: true
        },
        {
          title: "修改时间",
          value: "",
          type: "input",
          prop: "modifierTime",
          disabled: true
        }
      ],
      value: "",
      //测试数据
      testlist: [], //部门信息展示列表每页信息
      num: 0, //信息条数
      i: 10, //每页显示条数
      n: 1, //默认显示页
      slelectifo: "",
      //
      regional: [],
      isexpand: false, //展开所有
      dialogFormVisible2: false, //弹框二控制
      dialogFormVisible: false, //弹框一控制
      dialogStatus: "", //操作状态
      department: [], //部门信息总列表
      onoff: true,
      DepartmenParams: {}, //部门信息表单对象,
      OrganizationParams: {}, //机构信息表单
      addOrChange: null,
      //
      nodeTreeData: [], //树形结构数据
      val: {}, //当前点击的节点data
      //
      close: false //节点树状态控制
    };
  },
  mounted() {},
  components: {},
  methods: {
    async init() {
      let reslt = await this.$api.OrganizationMenu({});
      this.nodeTreeData = reslt.data;
      let res = await this.$api.RegionalTree({});
      this.OrganizationAdd[4].options = res.data;
    },
    cancel() {
      //弹出框取消按钮
      this.dialogFormVisible = false;
    },
    cancelTwo() {
      //弹出框取消按钮2
      this.close = true;
      this.dialogFormVisible2 = false;
    },
     append(node,data) {//机构新增
      console.log(node,data)
      this.addOrChange = "添加机构";
      this.dialogStatus = "添加机构";
      console.log(this.OrganizationParams)
      this.dialogFormVisible2 = true;
      this.OrganizationAdd[0].value = data.text;
      this.OrganizationAdd[1].value = data.code;
      
      },

    async remove(node,date) { //冻结
          console.log(node,date)
          let data ={
            insId:date.id,
            status:1
          }
          let reslt = await this.$api.UpdateInsInfoStatus({data})
          console.log(reslt)
          if(reslt.code === 0){
            this.init()
          }
      },
    DepartmentChangeForm(val) {//部门表单对象
      console.log(val)
      //弹出框表单change事件
          Object.assign(this.DepartmenParams, val);
    },
    OrganizationChangeForm(val){//机构表单对象
      console.log(val)
        Object.assign(this.OrganizationParams, val);
    },
    pageSizeChange(val) {
      //每页显示条数
      this.i = val;
      this.testlist = this.department.slice((this.n - 1) * val, this.n * val);
    },
    pageCurrentChange(val) {
      //当前显示页数
      this.n = val;
      this.testlist = this.department.slice((val - 1) * this.i, val * this.i);
      console.log(val);
    },
    open(val) {
      this.$alert(val, "温馨提示！", {
        confirmButtonText: "确定",
        callback: action => {
          close();
        }
      });
    },
   async DepartmentSubmit() {
      if (this.addOrChange === "更改部门信息") {
        this.DepartmenParams.created = "更改部门信息";
        
        console.log(  this.$refs.DepartmentBaseForm)
        console.log(this.params);
        this.$refs.DepartmentBaseForm.resetForm()//表单重置
        this.DepartmenParams ={}//表单对象重置为空
      } else if (this.addOrChange === "添加部门") {
         
        this.DepartmenParams.created = "添加部门";
         console.log(this.DepartmenParams.prev);

        let reslt = await this.$api.DepartmentAdd()
       


        this.$refs.DepartmentBaseForm.resetForm()
        this.DepartmenParams ={}
      }
    },
    async OrganizationSubmit() {
      if (this.addOrChange === "更改机构信息") {
        this.OrganizationParams.created = "更改机构信息";
        console.log(this.params);
        return
      } else if (this.addOrChange === "添加机构") {
           this.OrganizationParams.created = "添加机构";
          
        let data = JSON.parse(JSON.stringify(this.OrganizationParams));
        if (data.status) {
          data.status = 0;
        } else {
          data.status = 1;
        }
        data.parentId = this.val.id
        console.log(this.data)
        let reslt = await this.$api.OrganizationAdd({ data });
        console.log(reslt);
      
        if (reslt.code === 0) {
          this.$refs.OrganizationBaseForm.resetForm()
          this.OrganizationParams ={}
          this.dialogFormVisible = false;
          this.dialogFormVisible2 = false;
          this.init();
        }
      }
     
      
    },

   async selectBtn(val) {
      if (val.name === "添加部门") {
        //添加部门
          console.log(this.DepartmenParams)
          this.dialogStatus = "添加部门";
          this.addOrChange = "添加部门";
          this.dialogFormVisible = true;
          this.AddDepartment[0].value = this.slelectifo;
        
          let res = await this.$api.FindDeptTreeRoots({},this.val.id);
          this.AddDepartment[0].options = res.data
          console.log(res)
        
      }
      if(val.name === "刷新"){
          location.assign(location)
      }
    },
    jumptocompile() {
      //更改机构信息
      this.dialogFormVisible2 = true;
      this.addOrChange = "更改机构信息";
      this.dialogStatus = "更改机构信息";
      // this.Modifine(this.OrganizationAdd,this.AgencyInformation)

      console.log(this.params);
    },
    derparModifine(val) {
      this.dialogFormVisible = true;
      this.addOrChange = "更改部门信息";
      this.dialogStatus = "更改部门信息";
      // this.addValue(val,this.AddDepartment)
      console.log(val); //修改部门信息按钮
    },

    async getnowNodeifo(val, s) {
      //获取当前点击节点信息 s为当前节点node
      console.log(val, s);
      this.val = val;
      let reslt = await this.$api.OrganizationDestils({ },val.id);
      let arr = Object.entries(reslt.data);
      let obj = arr.map(([key, val]) => {
        if (
          (key === "createTime" && val != null) ||
          (key === "modifierTime" && val != null)
        ) {
          return { [key]: moment(val).format("YYYY-MM-DD HH:mm:ss") };
        } else if (key === "status") {
          if (val === 0) {
            return { [key]: "启用" };
          } else {
            return { [key]: "失效" };
          }
        } else {
          return { [key]: val };
        }
      });
      this.slelectifo = reslt.data.insName;
      //当前节点父节点信息
      if (reslt.code === 0) {
        this.addValue(obj, this.AgencyInformation);
      }
      console.log()
      let  data = {
          insId:val.id ,
          pageSize: 2,
          pageNum: 1
      }
      let resl = await this.$api.DepartmentPage({data});
          console.log(resl)
        
    },  
  async departmentPage(val){//部门分页参数
    
      
      
    },
    getCheckifo(...res) {
      //复选框选中状态变化事件递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
    },
    //公用方法
    addValue(val, data) {
      //value数值回填
      for (var i = 0; i < val.length; i++) {
        for (var j = 0; j < data.length; j++) {
          if (Object.keys(val[i])[0] === data[j].prop) {
            data[j].value = Object.values(val[i])[0];
          }
        }
      }
    },
    clearIput(val) {
      //清空输入框信息
      for (var i = 0; i < val.length; i++) {
        val[i].value = "";
      }
    }
  },
  watch: {
    val: {
      handler: function(val, oldval) {
        this.$refs.attrList.setChecked(val, true);
        this.$refs.attrList.setChecked(oldval, false);
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
  }
};
</script>


<style lang="less">
@import "./less/index.less";
.organiDialog {
  width: 600px;
  border-radius: 20px;
  .el-dialog__header {
    padding: 0;
  }
}

.freeze{
  padding-left:20px; 
  
}
.custom-tree-node{
  width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.organizati{
  .el-col-18{
  width: 100%;
}
}

</style>
