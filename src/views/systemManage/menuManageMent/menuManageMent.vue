<template>
  <div class="vlt-card">
    <el-container>
      <el-aside class="tree-list" style="padding:20px;width:380px">
        <div class="menu-btn">
          <!--顶部按钮-->
          <control-bar :options="controlOptions" @select="selectBtn"></control-bar>
        </div>
        <div class="menu-ipt">
          <div class="editorial">
            <tips-line style="white-space: nowrap;overflow: hidden;">
              当前选择编缉：
              <span
                style="color:#40a9ff;font-size:14px;font-weight:700;padding:0 5px;   text-overflow: ellipsis"
              >
                {{slelectifo}}
                <el-button type="text" style="font-size:12px;padding:0 5px;" @click="deselect">取消选择</el-button>
              </span>
            </tips-line>
          </div>
          <div class="menu-tree" v-if="nodeTreeData">
            <!--树形结构-->
            <el-tree
              ref="tree"
              :data="nodeTreeData"
              show-checkbox
              node-key="id"
              :check-strictly="true"
              @node-click="getnowNodeifo"
              @check-change="getCheckifo"
              :default-expanded-keys="[1, 2]"
              :expand-on-click-node="false"
              :props="setProps"
            ></el-tree>
          </div>
        </div>
      </el-aside>
      <el-main style="border-left:1px solid #ccc;padding-left:100px;">
        <div class="vlt-edit-single">
          <div class="vlt-edit-wrap">
            <base-form
              :formData="rightFrom"
              ref="baseForm"
              :rules="rules"
              direction="right"
              @change="ModifineChangeForm"
              labelWidth="110px"
            ></base-form>
            <!-- <base-form
              v-else
              :formData="data3"
              ref="baseForm"
              :rules="rules"
              direction="right"
              @change="ModifineChangeForm"
              labelWidth="110px"
            ></base-form> -->
            <el-row class="vlt-edit-btn">
              <el-button type="primary" v-prevent="1000" size="medium" @click="submitModifine">提交并保存</el-button>
              <el-button size="medium" @click="cancel">取消</el-button>
            </el-row>
          </div>
        </div>
      </el-main>
    </el-container>
    <div class="bouncedMessage">
      <!--添加子节点弹框-->
      <el-dialog :visible.sync="dialogFormVisible" width="600px" custom-class="menuDialog">
        <div class="vlt-edit-single">
          <h2 class="title">添加子节点</h2>
          <div class="vlt-edit-wrap">
            <!-- <el-form>
              <el-form-item label="类型" label-width="110px">
                <el-select v-model="menuType" placeholder="请选择">
                  <el-option
                    v-for="item in option"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form> -->
            <base-form
              :formData="Addchildnodes"
              ref="baseForm"
              :rules="rules"
              direction="right"
              @change="addChangeForm"
              labelWidth="110px"
            ></base-form>
            <el-row class="vlt-edit-btn">
              <el-button type="primary" v-prevent="1000" size="medium" @click="submitAdd">提交并保存</el-button>
              <el-button size="medium" @click="cancel">取消</el-button>
            </el-row>
          </div>
        </div>
      </el-dialog>
    </div>
    <!--添加顶部菜单-->
    <div class="topManu">
      <el-dialog :visible.sync="dialogFormVisible2" width="600px" custom-class="menuDialog">
        <div class="vlt-edit-single">
          <h2 class="title">添加顶部菜单</h2>
          <div class="vlt-edit-wrap">
            <base-form
              :formData="topMnu"
              labelWidth="90px"
              ref="TopMenubaseForm"
              :rules="rules"
              direction="right"
              @change="addTopChangeForm"
            ></base-form>
            <el-row class="vlt-edit-btn">
              <el-button
                type="primary"
                v-prevent="1000"
                size="medium"
                @click="addTopFromsubmit"
              >提交并保存</el-button>
              <el-button size="medium" @click="cancel">取消</el-button>
            </el-row>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  created() {
    this.init();
  },
  mounted() {},
  data() {
    return {
      setProps: {
        label: "text",
        value: "id",
        children: "children"
      },
      option: [
        //类型选择
        { label: "菜单", value: "0" },
        { label: "按钮", value: "1" }
      ],
      controlOptions: [
        //顶部按钮
        { name: "添加子节点", type: "primary", icon: "", id: 1 }, // type为按钮的五种颜色， icon为具体的图标
        { name: "添加顶部菜单", type: "", icon: "", id: 2 },
        { name: "批量删除", type: "", icon: "", id: 3 }
      ],
      topMnu: [
        //添加顶部菜单表单
        { type: "input", title: "名称", prop: "moduleName", value: "" },
        { type: "input", title: "英文名", prop: "moduleNameEn", value: "" },
        { type: "input", title: "路径", prop: "actionUrl", value: "" },
        { type: "input", title: "菜单编码", prop: "moduleCode", value: "" },
        {
          type: "select",
          title: "图标",
          prop: "moduleIcon",
          value: "",
          options: [
            { label: "图标一", value: "0" },
            { label: "图标二", value: "1" }
          ]
        },
        { type: "input", prop: "sort", value: "", title: "排序值" },
        { type: "switch", prop: "isShow", value: "", title: "是否启用" },
        { type: "textarea", prop: "moduleDesc", value: "", title: "描述" },
      ],
      rightFrom: [
        //右侧修改信息表单对象
         { type: "input", title: "类型", prop: "moduleType", value: "" ,disabled: true},
        { type: "input", title: "名称", prop: "moduleName", value: "" },
        { type: "input", title: "编码", prop: "moduleCode", value: "" },
        { type: "input", title: "路由英文名", prop: "moduleNameEn", value: "" },
        {
          type: "select",
          title: "图标",  
          prop: "moduleIcon",
          value: "",
          options: [
            { label: "图标一", value: "0" },
            { label: "图标二", value: "1" }
          ]
        },
        { type: "input", prop: "sort", value: "", title: "排序值" },
        {
          type: "switch",
          prop: "isSensitivity",
          value: false,
          title: "是否敏感操作"
        },
        { type: "switch", prop: "isShow", value: true, title: "是否启用" },
        { type: "textarea", title: "描述", prop: "moduleDesc", value: "" },
      ],
      Addchildnodes: [
        //添加子节点表单对象
        {
          title: "上级节点",
          type: "input",
          prop: "prevNode",
          value: "",
          disabled: true
        },
        { type: "input", title: "名称", prop: "moduleName", value: "" },
        { type: "input", title: "菜单路径", prop: "actionUrl", value: "" },
        { type: "input", title: "路由英文名", prop: "moduleNameEn", value: "" },
        { type: "input", title: "菜单编码", prop: "moduleCode", value: "" },
        {
          type: "select",
          title: "节点类型",
          prop: "moduleType",
          value: "",
          options: [{ label: "子系统", value: 2 },{ label: "菜单", value: 3 }, { label: "按钮", value: 4 }]
        },
        {
          type: "select",
          title: "图标",
          prop: "icon",
          value: "",
          options: [
            { label: "图标一", value: "0" },
            { label: "图标二", value: "1" }
          ]
        },
        { type: "input", prop: "sort", value: "", title: "排序值" },
        {
          type: "switch",
          prop: "isSensitivity",
          value: 0,
          title: "是否敏感操作"
        },
        { type: "switch", prop: "isShow", value: true, title: "是否启用" }
      ],
      rules: {
        //验证对象
        minMultiple: [
          {
            required: true,
            message: "请输入名称"
          }
        ],
        mixBet: [
          {
            required: true,
            message: "请输入路径"
          }
        ],
        bet: [
          {
            required: true,
            message: "请输入路由英文名"
          }
        ],
        logOff: [
          {
            required: true,
            message: "请选择图标"
          }
        ],
        textarea: [
          {
            required: true,
            message: "请输入排序值"
          }
        ]
      },
      nodeTreeData: [], //节点树数据
      slelectifo: "", //当前选中节点名称
      parent: {},
      // menuType: "0", // 0 菜单 1 按钮
      dialogFormVisible: false, //弹框控制
      dialogFormVisible2: false,
      AddInsInfoParms: {},//添加更改节点表单对象
      TopMenuParms: {},//顶部菜单表单对象
      val: {}, //节点对象
      codeId: [], //当前复选框选中节点Id
      moduleType: null
    };
  },
  components: {},
  methods: {
    async init() {
      //节点树请求
      let res = await this.$api.QueryModuleTree({});
      if(res.code === 0){
              this.nodeTreeData = res.data;
      }
    },
    handel(val) {
      //菜单按钮选择控制
      this.menuType = val;
    },
    deselect() {
      //取消选择按钮
      this.slelectifo = "";
      this.data2[0].value = this.slelectifo;
    },
    cancel() {
      //关闭弹窗
      this.slelectifo = "";
      this.dialogFormVisible = false;
      this.dialogFormVisible2 = false;
    },
    async submitAdd() {
      //添加信息表单提交
        console.log(this.parent)
        this.AddInsInfoParms.created = "添加子节点";
        let addfrom = JSON.parse(JSON.stringify(this.AddInsInfoParms));
        if (addfrom.isShow === true) {
          addfrom.isShow = 0;
        } else {
          addfrom.isShow = 1;
        }
        if (addfrom.isSensitivity === false) {
          addfrom.isSensitivity = 1;
        } else {
          addfrom.isSensitivity = 0;
        }
        if (this.moduleType != 4) {
            let data = {
              parentId: this.parent.id,
              sysCode: "VLT_BMS",
              ...addfrom
            };
            let reslt = await this.$api.SaveModule({ data });
            if (reslt.code === 0) {
              this.AddInsInfoParms = {}
              this.dialogFormVisible = false;
              this.slelectifo = ""
              this.$refs.baseForm.resetForm();
              this.init();
            }
            
        } else {
          this.$alert("按钮类型不能添加子节点", "温馨提示！", {
            confirmButtonText: "确定",
            callback: action => {
              close();
            }
          });
        }
 
    },
    async submitModifine(val) {
      //更改信息表单提交
      if(this.slelectifo !=""){
       this.AddInsInfoParms.created = "更改子节点";
        let data = JSON.parse(JSON.stringify(this.AddInsInfoParms));
        data.moduleId = this.val.id
        if (data.isSensitivity) {
        data.isSensitivity = 0;
      } else {
        data.isSensitivity = 1;
      }
      if (data.isShow) {
        data.isShow = 0;
      } else {
        data.isShow = 1;
      }
      if(data.moduleType===" "){

      }
      data.moduleType = this.val.type
        let reslt = await this.$api.UpdateModule({ data });
        if (reslt.code === 0) {
          this.AddInsInfoParms = {}
          this.$refs.baseForm.resetForm();
          this.slelectifo=""
          this.init();
        }
      }else{
        this.open("请选择要更改的机构！")
      }

      console.log(val);
    },
    addChangeForm(val) {
      //添加节点change事件
      console.log(val, "添加节点change事件");
        Object.assign(this.AddInsInfoParms, val); 
    },
    ModifineChangeForm(val) {
      //更改节点信息change事件
        Object.assign(this.AddInsInfoParms, val);
    },
    addTopChangeForm(val) {
      //添加顶部菜单change事件
      Object.assign(this.TopMenuParms, val);
    },
    async addTopFromsubmit() {
      //添加顶部菜单提交请求
      this.TopMenuParms.created = "添加顶部菜单";
      let n = JSON.parse(JSON.stringify(this.TopMenuParms));
      console.log(n)
      let data = {
        parentId: null,
        sysCode: "VLT_BMS",
        moduleType: 1,
        ...n
      };
      let reslt = await this.$api.SaveModule({ data });
      if (reslt.code === 0) {
        this.TopMenuParms = {}
        this.$refs.TopMenubaseForm.resetForm()
        this.dialogFormVisible2 = false;
        this.init();
      }  
    },
    selectBtn(val) {
      //顶部按钮点击事件
      if (val.name === "添加子节点") {
        if (this.slelectifo == "") {
          this.open("请选择要添加子节点的机构！");
        } else {
          this.setchild = false;
          this.Addchildnodes[0].value = this.slelectifo;
          this.dialogFormVisible = true;
          // this.rightFrom[0].value = this.slelectifo;
        }
      }
      if (val.name === "添加顶部菜单") {
        this.dialogFormVisible2 = true;
      }
      if (val.name === "批量删除") {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            let arr = this.$refs.tree.getCheckedNodes();
            let data = arr.map(item => {
              return { moduleId: item.id };
            });
            let reslt = await this.$api.DeleteModule({ data });
            if (reslt.code === 0) {
              this.init();
              this.slelectifo=""
            }
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
      //触发弹框
    },
    open(val) {
      this.$alert(val, "温馨提示！", {
        confirmButtonText: "确定",
        callback: action => {
          close();
        }
      });
    },
    async getnowNodeifo(val, s) {
      //获取当前点击节点信息及详情
      console.log(val)
      this.parent = val;
      this.val = val;
      let res = await this.$api.QueryModuleDetail(val.id);
      console.log(res)
      this.slelectifo = val.text;
      if(res.code === 0){
      //   if (res.data.isSensitivity === 0) {
      //   res.data.isSensitivity = true;
      // } else {
      //   res.data.isSensitivity = false;
      // }
      // if (res.data.isShow === 0) {
      //   res.data.isShow = true;
      // } else {
      //   res.data.isShow = false;
      // }
      let n = Object.keys(res.data);
      console.log(n)
      this.moduleType = res.data.moduleType;
      let arr = this.rightFrom;
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < n.length; j++) {
          if (arr[i].prop ===n[j]) {
            if(arr[i].prop === "moduleType"){
              switch (res.data[n[j]]) {
                case 1:
                  arr[i].value = "项目根类型"
                   break;
                case 2:
                  arr[i].value = "子系统";
                  break;
                case 3:
                  arr[i].value = "菜单";
                  break;
                default:
                  arr[i].value = "按钮";
                  break;
              }
            }else{
              arr[i].value = res.data[n[j]];
            }
            
          }
        }
      }
      }
    },
    getCheckifo(res, val) {
      //复选框选中状态变化事件
      console.log(res, val);
    },

  },
  watch: {
    val: {
      handler: function(val, oldval) {
        this.$refs.tree.setChecked(val, true);
        this.$refs.tree.setChecked(oldval, false);
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    },
  },
}
</script>

<style lang="less">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.menuDialog {
  border-radius: 20px;
  .el-dialog__header {
    padding: 0;
  }
}
</style>