<template>
  <div class="vlt-card" style="min-height:500px">
    <el-container>
      <el-aside class="organi-left" style="width:330px;">
        <div class="organi-btn">
          <control-bar :options="treeStatus?controlOptions:obj" @select="selectBtn"></control-bar>
        </div>
        <el-col :span="18">
          <div class="organi-tree">
            <!--树形结构 !-->
            <el-tree
              :data="date"
              show-checkbox
              node-key="id"
              :check-strictly="true"
              @node-click="getnowNodeifo"
              @check-change="getCheckifo"
              :default-expanded-keys="[1, 2]"
              :expand-on-click-node="false"
              ref="attrList"
            ></el-tree>
          </div>
        </el-col>
      </el-aside>

      <el-main style="padding:0 40px;border-left:1px solid #ccc;margin-left:20px;">
        <div class="organi-right" style="margin-left:100px;">
          <div class="Lotteryinfo">
            <section class="comp-item">
              <panel-edit title="机构信息" @edit="jumptocompile" :show="true">
                <base-info :infoList="infoList"></base-info>
                <!-- <div style=" text-align: center;padding:10px;">
                  <el-button size="small" type="primary" @click="jumptocompile">更改</el-button>
                </div> -->
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
          </div> -->
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
              :formData="this.addOrChange === '更改部门信息'?data2.slice(1,6):data2"
              labelWidth="110px"
              ref="baseForm"
              :rules="rules2"
              direction="right"
              @change="changeForm"
            ></base-form>
          </el-form>
          <el-row class="vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="branch">提交并保存</el-button>
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
            :formData="data3"
            labelWidth="110px"
            ref="baseForm"
            :rules="rules2"
            direction="right"
            @change="changeForm"
          ></base-form>

          <el-row class="vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
            <el-button size="medium" @click="cancelTwo">取消</el-button>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Post from "../../../utils/ajax";
import rules from "../../../utils/rules";
let id = 1000;

export default {
  name: "organization",
  data() {
    
    return {
      rules2: {//验证表单对象
        section: { required: true, message: "部门不能为空" }
      },
      controlOptions: [//
        { name: "添加机构", type: "primary", icon: "plus", id: 1 }, // type为按钮的五种颜色， icon为具体的图标
        { name: "添加部门", type: "primary", icon: "plus", id: 2 },
        { name: "展开所有", type: "primary", icon:"arrow-down", id: 3 }
      ],
      obj:[
        { name: "添加机构", type: "primary", icon: "plus", id: 1 }, // type为按钮的五种颜色， icon为具体的图标
        { name: "添加部门", type: "primary", icon: "plus", id: 2 },
        { name: "关闭所有", type: "primary", icon:"arrow-up", id: 3 }
        ],
      // tit:"展开所有",
      data2: [//添加部门表单对象
        {
          type: "input",
          title: "上级部门",
          prop: "prevSection",
          value: "",
          disabled: true
        },
        { type: "input", title: "部门名称", prop: "section", value: "" },
        { type: "input", title: "部门负责人", prop: "sectionMan", value: "" },
        { type: "input", title: "负责人电话", prop: "principalPhone", value: "" },
        { type: "switch", title: "状态", prop: "status", value: "" },
        { type: "textarea", title: "备注", prop: "remark", value: "" }
      ],
      data3: [//添加机构表单对象
        {
          type: "input",
          title: "父机构",
          prop: " parentOrganization",
          disabled: true,
          value: ""
        },
        { type: "input", title: "父机构编码", prop: "parentEncoding", value: "" },
        {
          type: "input",
          title: "机构名称",
          prop: "organizationName",
          value: ""
        },
        {
          type: "input",
          title: "机构编码",
          prop: "organizationCode",
          value: ""
        },
        { type: "input", title: "区域", prop: "area", value: "" },
        { type: "input", title: "区域编码", prop: "regionalCode", value: "" },
        { type: "switch", title: "状态", prop: "status", value: "" },
        { type: "textarea", title: "备注", prop: "remark", value: "" }
      ],
      infoList: [//机构信息
        {
          title: "父机构",
          value: "",
          type: "input",
          prop: "parentOrganization",
          disabled: true
        },
        { title: "区域", value: "", type: "input", prop: "area" },
        {
          title: "父机构编码",
          value: "",
          type: "input",
          prop: "parentEncoding"
        },
        { title: "区域编码", value: "", type: "input", prop: "regionalCode" },
        {
          title: "机构名称",
          value: "",
          type: "input",
          prop: "organizationName"
        },
        {
          title: "机构状态",
          value: "",
          type: "switch",
          prop: "organizationStatus"
        },
        {
          title: "机构编码",
          value: "",
          type: "input",
          prop: "organizationCode"
        },
        { title: "备注", value: "", type: "textarea", prop: "remark" },
        {
          title: "创建人",
          value: "",
          type: "input",
          prop: "create",
          disabled: true
        },
        {
          title: "创建时间",
          value: "",
          type: "input",
          prop: "createNameOne",
          disabled: true
        },
        {
          title: "修改人",
          value: "",
          type: "input",
          prop: "modifine",
          disabled: true
        },
        {
          title: "创建时间",
          value: "",
          type: "input",
          prop: "createTimeTwo",
          disabled: true
        }
      ],
   
      value: "",
      data: [ 
        {
          id: 1,
          label: "中福彩",
          children: [
            {
              id: 4,
              label: "广东省",
              children: [
                {
                  id: 9,
                  label: "广州市"
                },
                {
                  id: 10,
                  label: "佛山市"
                },
                {
                  id: 11,
                  label: "深圳市"
                },
                {
                  id: 12,
                  label: "东莞市"
                },
                {
                  id: 13,
                  label: "惠州市"
                }
              ]
            },
            {
              id: 5,
              label: "河南省",
              children: [
                {
                  id: 14,
                  label: "郑州市"
                },
                {
                  id: 15,
                  label: "洛阳市"
                },
                {
                  id: 16,
                  label: "南阳市"
                },
                {
                  id: 17,
                  label: "汝阳市"
                },
                {
                  id: 18,
                  label: "驻马店市"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "体育彩票",
          children: [
            {
              id: 4,
              label: "广东省",
              children: [
                {
                  id: 9,
                  label: "广州市"
                },
                {
                  id: 10,
                  label: "佛山市"
                },
                {
                  id: 11,
                  label: "深圳市"
                },
                {
                  id: 12,
                  label: "东莞市"
                },
                {
                  id: 13,
                  label: "惠州市"
                }
              ]
            },
            {
              id: 5,
              label: "河南省",
              children: [
                {
                  id: 14,
                  label: "郑州市"
                },
                {
                  id: 15,
                  label: "洛阳市"
                },
                {
                  id: 16,
                  label: "南阳市"
                },
                {
                  id: 17,
                  label: "汝阳市"
                },
                {
                  id: 18,
                  label: "驻马店市"
                }
              ]
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      //测试数据
      testlist: [], //部门信息展示列表每页信息
      num: 0, //信息条数
      i: 10, //每页显示条数
      n: 1, //默认显示页
      slelectifo: "",
      //
      isexpand: false, //展开所有
      dialogFormVisible2: false, //弹框二控制
      dialogFormVisible: false, //弹框一控制
      dialogStatus: "",//操作状态
      department: [],//部门信息总列表
      onoff: true,
      params: {}, //机构信息表单对象,
      params2: {},//部门信息表单
      params3:{}, //更改|机构详情
      addOrChange: null,
      //
      date: [], //树形结构数据
      val: {}, //当前点击的节点data
      //
      treeStatus:true,
    };
  },
  computed: {},
  async created() {
    let n = await Post.axios("/organilist");
    console.log(n);
    this.date = n.data.data;
  },
  mounted() {},
  components: {},
  methods: {
    cancel() {
      //弹出框取消按钮
      this.dialogFormVisible = false;
    },
    cancelTwo() {
      //弹出框取消按钮2
      this.dialogFormVisible2 = false;
    },
    changeForm(val) {
      //弹出框表单change事件
      if (
        this.dialogStatus === "添加机构"
      ) {   
        Object.assign(this.params, val);
      } else if (
        this.dialogStatus === "添加部门" ||
        this.dialogStatus === "更改部门信息"
      ) {
        Object.assign(this.params2, val);
      }else if(this.dialogStatus === "更改机构信息"){
         Object.assign(this.params3, val);
      }
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
    branch(){
       if (this.addOrChange === "更改部门信息") {
        this.params2.created = "更改部门信息";    
        console.log(this.params2);
      } else if (this.addOrChange === "添加部门") {
        this.params2.created = "添加部门";
        console.log(this.params2);
      }
    },
    submit() {
      if (this.addOrChange === "更改机构信息") {
        this.params3.created = "更改机构信息";
          console.log(this.params3);      
      } else if (this.addOrChange === "添加机构") {
        this.params.created = "添加机构";
        console.log(this.params)
      }
      this.dialogFormVisible = false;
      this.dialogFormVisible2 = false;
    },

    selectBtn(val) {
      if (val.id === 2) {
        //添加部门
        if (this.slelectifo == "") {
          this.open("请选择要添加子部门的选项！");
        } else {
          this.clearIput(this.data2)
          this.dialogStatus = "添加部门";
          this.addOrChange = "添加部门";
          this.dialogFormVisible = true;
          this.data2[0].value = this.slelectifo;
        }
      }
      if (val.id === 1) {
        //添加机构
        if (this.slelectifo == "") {
          this.open("请选择要添加子机构的机构");
        } else {
          this.clearIput(this.data3)
          this.addOrChange = "添加机构";
          this.dialogStatus = "添加机构";
          this.dialogFormVisible2 = true;
          this.data3[0].value = this.slelectifo;
        }
      }
      if (val.id === 3) {
        //展开所有       
        if(this.treeStatus){            
        for (var i = 0;i < this.$refs.attrList.store._getAllNodes().length;i++) {
          this.$refs.attrList.store._getAllNodes()[i].expanded = this.treeStatus;
        }
        this.treeStatus=!this.treeStatus
        }else{
            for (var i = 0;i < this.$refs.attrList.store._getAllNodes().length;i++) {
          this.$refs.attrList.store._getAllNodes()[i].expanded = this.treeStatus;
        }
        this.treeStatus=!this.treeStatus
        }

      }
    },
    jumptocompile() {
      //更改机构信息
      this.dialogFormVisible2 = true;
      this.addOrChange = "更改机构信息";
      this.dialogStatus = "更改机构信息";
      this.Modifine(this.data3,this.infoList)

      console.log(this.params);
    },
    derparModifine(val) {
      this.dialogFormVisible = true;
      this.addOrChange = "更改部门信息";
      this.dialogStatus = "更改部门信息";
      this.addValue(val,this.data2)
      console.log(val); //修改部门信息按钮
    },

    getnowNodeifo(val, s) {
      //获取当前点击节点信息 s为当前节点node
      // console.log(val,s)
      this.val = val;

      this.department = val.obj.department;
      this.num = this.department.length;
      this.testlist = this.department.slice(0, 10);
      this.slelectifo = val.label;
      //当前节点父节点信息
      this.addValue(val.obj,this.infoList)
    },
    getCheckifo(...res) {
      //复选框选中状态变化事件递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
    },
    //公用方法
    addValue(val,data){ //value数值回填
        let arr = Object.keys(val);
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (data[i].prop == arr[j]) {
            data[i].value = val[arr[j]];
          }
        }
      }
    },
   Modifine(val,data){
      for(var i = 0 ; i < val.length ; i++){
        for(var j =0 ; j < data.length ; j ++){
          if(val[i].prop === data[j].prop){
            val[i].value = data[j].value
          }
        }
      }
    },
    clearIput(val){//清空输入框信息
      for(var i = 0 ; i < val.length ; i++){
        val[i].value = ''
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
</style>
