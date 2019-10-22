<template>
  <div class="vlt-card">
    <el-row>
      <el-col :span="6">
        <!--树形结构-->
        <div class="grid-content bg-purple">
          <el-tree
            :data="treeData"
            show-checkbox
            node-key="id"
            :expand-on-click-node="false"
            :default-expanded-keys="[1]"
            :default-checked-keys="[1]"
            :props="defaultProps"
            style="width:300px"
            @node-click="getnowNodeifo"
          ></el-tree>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="organi-select">
          <el-dropdown placement="bottom-start" @command="handleCommand">
            <!--下拉选择按钮 !-->
            <el-button size="small">
              选择操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">刷新</el-dropdown-item>
              <el-dropdown-item command="b">添加一级类别</el-dropdown-item>
              <el-dropdown-item command="c">添加子类别</el-dropdown-item>
              <el-dropdown-item command="d">展开所有</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple" style="background: rgba(247, 247, 247, 1);">
          <panel :title="title" :show="true">
            <div class="vlt-edit-single">
              <div class="vlt-edit-wrap">
                <base-form
                  :formData="formData"
                  labelWidth="90px"
                  :rules="rules"
                  ref="baseForm"
                  direction="right"
                  @change="changeForm"
                ></base-form>
                <el-row class="vlt-edit-btn">
                  <el-button type="primary" v-prevent="1000" size="medium">修改</el-button>
                  <el-button size="medium">重置</el-button>
                </el-row>
              </div>
            </div>
          </panel>
        </div>
      </el-col>
    </el-row>
    <!-- 添加一级类别弹框 -->
    <div class="role-dialog">
      <el-dialog :visible.sync="dialogFormVisible" width="600px" custom-class="roleDialog">
        <!-- <roleifometion></roleifometion> -->
        <div class="vlt-edit-single">
          <h2 class="title">添加一级类别</h2>
          <div class="vlt-edit-wrap">
            <!-- <base-form
              :formData="formData1"
              labelWidth="90px"
              ref="baseForm"
              direction="right"
              @change="changeForm"
            ></base-form>-->
            <el-form label-width="120px" ref="" :model="nodeQuery" size="small">
              <el-form-item label="类别名称" prop="name">
                <el-input placeholder="请输入类别名称" v-model="nodeQuery.name"></el-input>
              </el-form-item>
              <el-form>
                <el-row class="vlt-edit-btn">
                  <el-button
                    type="primary"
                    v-prevent="1000"
                    size="medium"
                    @click="addParentClass"
                  >提交并保存</el-button>
                  <el-button size="medium" @click="cancel">取消</el-button>
                </el-row>
              </el-form>
            </el-form>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 添加子类别弹框 -->
    <div class="role-dialog">
      <el-dialog :visible.sync="dialogFormVisible2" width="600px" custom-class="roleDialog">
        <!-- <roleifometion></roleifometion> -->
        <div class="vlt-edit-single">
          <h2 class="title">添加子类别</h2>
          <div class="vlt-edit-wrap">
            <!-- <base-form
              :formData="formData2"
              labelWidth="90px"
              :rules="rules"
              ref="baseForm"
              direction="right"
              @change="changeForm"
              
            ></base-form>
            <el-row class="vlt-edit-btn">
              <el-button type="primary" v-prevent="1000" size="medium" @click="addSubclass">提交并保存</el-button>
              <el-button size="medium" @click="cancel">取消</el-button>
            </el-row> -->
            <el-form label-width="120px" ref="" :model="formData2" size="small">
              <el-form-item label="类别名称" prop="Name">
                <el-input placeholder="请输入类别名称" v-model="formData2.Name"></el-input>
              </el-form-item>
              <el-form-item label="上级类别名称" prop="Subclass">
                <el-input placeholder="请输入上级类别名称" v-model="formData2.Subclass"></el-input>
              </el-form-item>
              <el-form>
                <el-row class="vlt-edit-btn">
                  <el-button
                    type="primary"
                    v-prevent="1000"
                    size="medium"
                    @click="addSubclass"
                  >提交并保存</el-button>
                  <el-button size="medium" @click="cancel">取消</el-button>
                </el-row>
              </el-form>
            </el-form>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">

export default {
  name: "",
  data() {
    return {
      nodeQuery:{
        name:"",
      },
      formData2:{
        Name:"",
        Subclass:""
      },
      rules:{},
      changeForm:"",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      title: "类别信息",
      treeData: [
        {
          id: 1,
          label: "游戏管理",
          children: [
            {
              id: 5,
              label: "游戏发行"
            },
            {
              id: 6,
              label: "游戏退市"
            },
            {
              id: 7,
              label: "游戏配置"
            }
          ]
        },
        {
          id: 2,
          label: "渠道业务",
          children: [
            {
              id: 8,
              label: "游戏发行"
            }
          ]
        },
        {
          id: 3,
          label: "营销活动",
          children: [
            {
              id: 9,
              label: "游戏发行"
            }
          ]
        },
        {
          id: 4,
          label: "责任彩票",
          children: [
            {
              id: 10,
              label: "游戏发行"
            }
          ]
        },
        {
          id: 5,
          label: "资金参数",
          children: [
            {
              id: 11,
              label: "游戏发行"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      options: [
        {
          value: "选项1",
          label: "刷新"
        },
        {
          value: "选项2",
          label: "添加一级类别"
        },
        {
          value: "选项3",
          label: "添加子类别"
        },
        {
          value: "选项4",
          label: "展开所有"
        }
      ],
      value: "",
      formData: [
        { title: "类别名称", type: "input", prop: "className", value: "" },
        {
          title: "上级类别",
          type: "input",
          prop: "superiorClasses",
          value: ""
        },
        { title: "状态", type: "switch", prop: "status", value: "" }
      ],
      // formData1: [
      //   { title: "类别名称", type: "input", prop: "classesName", value: "" },
      //   { title: "状态", type: "switch", prop: "status", value: "" }  
      // ],
      // formData2: [
      //   { title: "类别名称", type: "input", prop: "classesName", value: "" },
      //   { title: "上级类别", type: "input", prop: "superiorClasses", value: "" },
      //   { title: "状态", type: "switch", prop: "status", value: "" }
      // ]
    };
  },
  methods: {
    // modify() {
    //   this.$router.push("processClassify/processClassifyModify");
    // },
    handleCommand(command) {
      if (command == "c") {
        // this.$router.push("processClassify/processClassifyModify");
        this.dialogFormVisible2 = true;
      }else if(command=="b"){
        this.dialogFormVisible = true;
      }
    },
    // handele() {
    //   this.$router.push("processClassify/processClassifyModify");
    // }
    
    addParentClass(){   //添加一级类别
      let  parentClass=this.nodeQuery.name
      console.log(parentClass)
      let obj1={id:1,label:parentClass,children:[]}  
      this.treeData.push(obj1)
      this.dialogFormVisible = false;
    },
    getnowNodeifo(val, s) {
      //获取当前点击节点信息 s为当前节点node
      console.log(val, s);
       var lab=this.val
    },
    addSubclass(){
      let subclass=this.formData2.Name
      console.log(subclass)
      let obj2={id:2,label:subclass,children:[]}
      if(this.formData2.Subclass==lab.label){
        this.lab.children.push(obj2)
      }
        
        this.dialogFormVisible2= false;
      
      
    },
    cancel(){
      this.dialogFormVisible = false;
      this.dialogFormVisible2 = false;
    }   
  }
};
</script>

<style lang="less" scoped>
.select {
  width: 250px;
  position: relative;
  top: -200px;
  left: 250px;
}
#p1 {
  text-align: center;
  padding: 20px;
}
</style>
