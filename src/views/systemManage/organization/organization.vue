<template>
  <div class="vlt-card" style="min-height:500px">
    <el-container>
      <el-aside class="organi-left">
        <el-row type="flex">
          <el-col :span="18">
            <div class="organi-tree">
              <!--树形结构 !-->
                  <el-tree
              :data="data"
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
          <div class="organi-select">
            <el-dropdown placement="bottom-start" @command="handele">
              <!--下拉选择按钮 !-->
              <el-button size="mini">
                选择操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="刷新">刷新</el-dropdown-item>
                <el-dropdown-item command="添加机构">添加机构</el-dropdown-item>
                <el-dropdown-item command="添加部门">添加部门</el-dropdown-item>
                <el-dropdown-item command="展开所有">展开所有</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-row>
      </el-aside>

      <el-main style="padding:0 40px;border-left:1px solid #ccc;margin-left:20px;">
        <div class="organi-right" style="margin-left:100px;">
          <div class="Lotteryinfo">
            <section class="comp-item">
              <panel title="彩票信息" :show="true">
                <base-info :infoList="infoList"></base-info>
                <div style=" text-align: center;padding:10px;">
                  <el-button size="small" type="primary" @click="jumptocompile">更改</el-button>
                </div>
              </panel>
            </section>
          </div>
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
                  :data="tableData"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  style="width: 100%"
                >
                  <el-table-column type="index" width="50" label="序号"></el-table-column>
                  <el-table-column property="date" label="部门名称" width="120"></el-table-column>
                  <el-table-column property="name" label="所属机构" width="120"></el-table-column>
                  <el-table-column property="address" label="上级部门"></el-table-column>
                  <el-table-column property="address" label="部门负责人"></el-table-column>
                  <el-table-column property="address" label="负责人电话"></el-table-column>
                  <el-table-column property="address" label="状态">
                    <template slot-scope="scope">
                      <el-switch
                        v-model="tableData[scope.$index].isShow"
                        @change="change"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      ></el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column property="address" label="操作">
                    <template>
                      <el-button type="text" @click="dialogFormVisible=true">修改</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="padding:10px;">
                  <!-- 分页!-->
                  <table-paging
                    :current-page="1"
                    :page-size="10"
                    :total="100"
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
              :formData="data2"
              labelWidth="110px"
              ref="baseForm"
              :rules="rules2"
              direction="right"
              @change="changeForm"
            ></base-form>
          </el-form>
          <el-row class="vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
            <el-button size="medium" @click="cancel">取消</el-button>
          </el-row>
        </div>
      </div>
    </el-dialog>
     <!--弹出框2-->
        <el-dialog title :visible.sync="dialogFormVisible2" custom-class="organiDialog">
      <div class="vlt-edit-single">
        <h2 class="title">{{dialogStatus}}信息</h2>
        <div class="vlt-edit-wrap">
          <el-form>
            <base-form
              :formData="dialogStatus==='添加部门'?data4:data3"
              labelWidth="110px"
              ref="baseForm"
              :rules="rules2"
              direction="right"
              @change="changeForm"
            ></base-form>
          </el-form>
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
import Post from '../../../utils/ajax'
import rules from "../../../utils/rules";
let id = 1000;
export default {
  name: "organization",
  data() {
    return {
      isexpand:false,
      dialogFormVisible2:false,
      dialogFormVisible: false,
      dialogStatus:'',
      num: "50",
      onoff: true,
      rules2: {
        section: { required: true, message: "部门不能为空" }
      },
      data2: [
        { type: "input", title: "部门名称", prop: "section" ,value:''},
        { type: "input", title: "部门负责人", prop: "sectionMan",value:'' },
        { type: "input", title: "测负责人电话", prop: "testPhone" ,value:''},
        { type: "switch", title: "状态", prop: "status",value:'' },
        { type: "textarea", title: "备注", prop: "remark",value:'' }
      ],
      data4:[
        { type: "input", title: "上级部门", prop: " superiorDepartment" ,value:''},
        { type: "input", title: "部门名称", prop: "departmentName" ,value:''},
        { type: "input", title: "部门负责人", prop: "departmentPrincipal" ,value:''},
        { type: "input", title: "负责人电话", prop: "principalPhone",value:'' },
        { type: "switch", title: "状态", prop: "status",value:'' },
        { type: "textarea", title: "备注", prop: "remark" ,value:''},
      ],
      data3:[
        { type: "input", title: "父机构", prop: " parentOrganization" ,value:''},
        { type: "input", title: "父机构编码", prop: "parentCoding",value:'' },
        { type: "input", title: "机构名称", prop: "organizationName" ,value:''},
        { type: "input", title: "机构编码", prop: "organizationCoding",value:'' },
        { type: "input", title: "区域", prop: "area" ,value:''},
        { type: "input", title: "区域编码", prop: "areaCoding",value:'' },
        { type: "switch", title: "状态", prop: "status" ,value:''},
        { type: "textarea", title: "备注", prop: "remark" ,value:''},
        
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isShow: true
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          isShow: false
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          isShow: false
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          isShow: true
        }
      ],
      currentRow: null,

      infoList: [
        { title: "父机构", value: "", prop: "gameCode" },
        { title: "区域", value: "", prop: "cycleType" },
        { title: "父机构编码", value: "", prop: "gameStatus" },
        { title: "区域编码", value: "", prop: "gameName" },
        { title: "机构名称", value: "", prop: "officialEndSale" },
        { title: "机构状态", value: "", prop: "gameName" },
        { title: "机构编码", value: "", prop: "gameName" },
        { title: "备注", value: "", prop: "gameName" },
        { title: "创建人", value: "", prop: "gameName" },
        { title: "创建时间", value: "", prop: "gameName" },
        { title: "修改人", value: "", prop: "gameName" },
        { title: "创建时间", value: "", prop: "gameName" }
      ],
      options: [
        {
          value: "选项1",
          label: "刷新"
        },
        {
          value: "选项2",
          label: "添加机构"
        },
        {
          value: "选项3",
          label: "添加部门"
        },
        {
          value: "选项3",
          label: "展开所有"
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
      defaultProps: {
        children: "children",
        label: "label"
      },
      params: {} //弹出框对象
    };
  },
  computed: {},
 async created() {
   console.log(Post)
  let n = await  Post.axios('/shoopList')

    console.log(n)
  },
  mounted() {},
  components: {},
  methods: {
    submit(val) {// 弹出框确认按钮
      console.log(val);
    },
    cancel(){//弹出框取消按钮
      this.dialogFormVisible= false;
    },
    cancelTwo(){//弹出框取消按钮2
       this.dialogFormVisible2= false;
    },
    changeForm(val) { //弹出框表单change事件
      Object.assign(this.params, val);

      console.log(this.params);
    },
    change(val) {//tabel表格状态栏变化事件
      //状态改变
      console.log(val);
      console.log(this.tableData);
    },
   
    handleCurrentChange(val) {
      console.log(val)
      this.currentRow = val;
    },
    pageSizeChange(val) {
      //每页显示条数
      console.log(val);
    },
    pageCurrentChange(val) {
      //当前显示页数
      console.log(val);
    },
    handleClick() {
      alert("button click");
    },
    handele(val) {
      if(val=== '添加部门'){
        this.dialogStatus = val;
        this.dialogFormVisible2= true;
      }
      if(val==='添加机构'){
        this.dialogStatus = val;
        this.dialogFormVisible2= true;
      }
      if(val==='展开所有'){
        for(var i=0;i<this.$refs.attrList.store._getAllNodes().length;i++){
           this.$refs.attrList.store._getAllNodes()[i].expanded=!this.isexpand;
        }

      }
      if(val==='刷新'){
        history.go(0)   
      }
 
    },
    jumptocompile() {
      this.$router.push("organizationChild/organicompile");
    },
       getnowNodeifo(val) {
      //获取当前点击节点信息
      this.slelectifo = val.label;
      this.ifo = { ...val.obj };
      console.log();
      console.log(val);
    },
    getCheckifo(...res) {
      //复选框选中状态变化事件递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
      console.log(res);
    }
  }
};
</script>


<style lang="less">
@import "./less/index.less";
.organiDialog {
  width:600px;
  border-radius: 20px;
  .el-dialog__header{
    padding:0;
  }
}
</style>
