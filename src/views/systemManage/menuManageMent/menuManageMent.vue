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
          <div class="menu-tree" v-if="date">
             <!--树形结构-->
            <el-tree
              ref="tree"
              :data="date"
              show-checkbox
              node-key="id"
              :check-strictly="true"
              @node-click="getnowNodeifo"
              @check-change="getCheckifo"
              :default-expanded-keys="[1, 2]"
              :expand-on-click-node="false"
            ></el-tree>
          </div>
        </div>
      </el-aside>
      <el-main style="border-left:1px solid #ccc;padding-left:100px;">
        <div class="vlt-edit-single">
          <div class="vlt-edit-wrap">
             <!--右侧表单-->
            <el-form>
              <el-form-item label="类型" label-width="110px">
                <el-select v-model="menuType" placeholder="请选择" @change="handel">
                  <el-option
                    v-for="item in option"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <base-form
              v-if="menuType==0"
              :formData="data2.slice(1,9)"
              ref="baseForm"
              :rules="rules"
              direction="right"
              @change="changeForm"
              labelWidth="110px"
            ></base-form>
            <base-form v-else
              :formData="data3"
              ref="baseForm"
              :rules="rules"
              direction="right"
              @change="changeForm"
              labelWidth="110px"
            ></base-form>
            <el-row class="vlt-edit-btn">
              <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
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
            <el-form>
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
            </el-form>
            <base-form
              :formData="menuType==='1'?data3:data2"
              ref="baseForm"
              :rules="rules"
              direction="right"
              @change="changeForm"
              labelWidth="110px"
            ></base-form>
            <el-row class="vlt-edit-btn">
              <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
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
              ref="baseForm"
              :rules="rules"
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
import Post from "../../../utils/ajax";
let id = 1000;
export default {
  async created() {
    let n = await Post.axios("/menulist");
    this.date = n.data.data;
  },
  mounted() {

  },
  data() {
    return {
     
      option: [//类型选择
        { label: "菜单", value: "0" },
        { label: "按钮", value: "1" }
      ],
      controlOptions: [//顶部按钮
        { name: "添加子节点", type: "primary", icon: "", id: 1 }, // type为按钮的五种颜色， icon为具体的图标
        { name: "添加顶部菜单", type: "", icon: "", id: 2 },
        { name: "批量删除", type: "", icon: "", id: 3 }
      ],
      topMnu: [//添加顶部菜单表单
        { type: "input", title: "名称", prop: "name", value: "" },
        { type: "input", title: "英文名", prop: "english", value: "" },
        {
          type: "select",
          title: "图标",
          prop: "icon",
          value: "ddd",
          options: [
            { label: "图标一", value: "0" },
            { label: "图标二", value: "1" }
          ]
        },
        { type: "input", prop: "sort", value: "", title: "排序值" },
        { type: "switch", prop: "date3", value: "", title: "是否启用" }
      ],
      data2: [//类别为菜单时的表单对象
        {
          title: "上级节点",
          type: "input",
          prop: "father",
          value: "",
          disabled: true
        },
        { type: "input", title: "名称", prop: "name", value: "" },

        { type: "input", title: "路由英文名", prop: "english", value: "" },
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
          prop: "date2",
          value: "",
          title: "是否敏感操作",
          option: ["start", "end"]
        },
        { type: "switch", prop: "date3", value: "", title: "是否启用" }
      ],
      data3: [//类型为按钮时的表单对象
        {
          title: "名称",
          type: "input",
          prop: "type",
          value: "按钮"
        },
        {
          type: "switch",
          prop: "date2",
          value: "",
          title: "是否敏感操作",
          option: ["start", "end"]
        },
        { type: "switch", prop: "date3", value: "", title: "是否启用" }
      ],
      rules: {//验证对象
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
      date: [],
      slelectifo: "", //当前选中节点名称
      parent: "",
      menuType: "0", // 0 菜单 1 按钮
      dialogFormVisible: false, //弹框控制
      dialogFormVisible2: false,
      parms: {},
      parms2: {},
      val: {}, //节点对象
      addStatus: "", //表单提交状态
      falg:false
    };
  },
  components: {},
  methods: {
    handel(val){
      this.menuType = val;
    },
    deselect() {
      // alert(2)
      this.slelectifo = "";
      this.data2[0].value = this.slelectifo;
    },
    cancel() {
      //关闭弹窗
      this.dialogFormVisible = false;
      this.dialogFormVisible2 = false;
    },
    submit() {
      //表单提交
      // if (this.menuType === "0") {
      //   if (this.addStatus === "添加子节点") {
      //     this.parms.created = "添加子节点";
      //     console.log(this.parms)
      //   } else {
      //     this.parms.created = "修改节点信息";
      //     console.log(this.parms)
      //   }
      // } else {
      //   if (this.addStatus === "添加子节点") {
      //     this.parms2.created = "添加子节点按钮";
      //       console.log('按钮', this.parms2)
      //   } else {
      //     this.parms2.created = "修改节点按钮信息";
      //     console.log('按钮', this.parms2)
      //   }
      // }

   
    },
    changeForm(val) {
      
      if (this.menuType === "0") {
        Object.assign(this.parms, val);
      } else {
        console.log(val)
        Object.assign(this.parms2)
       
      }
    },
    save(val, formName) {
      console.log(val);
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    selectBtn(val) {
      //按钮点击事件
      console.log(val);
      if (val.id === 1) {
        if (this.slelectifo == "") {
          this.open();
        } else {
          this.clearIput(this.data2||data3)
          this.addStatus = "添加子节点";
          this.setchild = false;
          this.dialogFormVisible = true;
          this.data2[0].value = this.slelectifo;
        }
      }
      if (val.id === 2) {
        this.dialogFormVisible2 = true;
      }
      //触发弹框
    },
    open() {
      this.$alert("请选择要添加机构的上级节点！", "温馨提示！", {
        confirmButtonText: "确定",
        callback: action => {
          close();
        }
      });
    },
    getnowNodeifo(val, s) {
      //获取当前点击节点信息
      this.val = val;
      this.slelectifo = val.label;
      let n = Object.keys(val.obj);
      let arr = this.data2;
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < n.length; j++) {
          if (arr[i].prop == n[j]) {
            arr[i].value = val.obj[n[j]];
          }
        }
      }
    },
    getCheckifo(...res) {
      //复选框选中状态变化事件递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
      console.log(res);
    },
     clearIput(val){
      for(var i = 0 ; i < val.length ; i++){
        val[i].value = ''
      }
    }
    //
  },
  watch: {
    val: {
      handler: function(val, oldval) {
        this.$refs.tree.setChecked(val, true);
        this.$refs.tree.setChecked(oldval, false);
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
  }
};
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