<template>
  <div class="vlt-card">
    <el-container>
      <el-aside class="tree-list" style="padding:20px;width:380px">
        <div class="menu-btn">
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
          <bounced-message ref="bounde" :data="data2.slice(1,9)"></bounced-message>
        </div>
      </el-main>
    </el-container>
    <div class="bouncedMessage">
      <el-dialog :visible.sync="dialogFormVisible" width="600px" custom-class="menuDialog">
        <bounced-message title="添加子节点" @closediaog="handelbounced" ref="bounde" :data="data2"></bounced-message>
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
import bouncedMessage from "./bouncedMessage";
let id = 1000;

export default {
  async created() {
    let n = await Post.axios("/menulist");
    console.log(n);
    this.date = n.data.data;
  },
  data() {
    return {
      dialogFormVisible2: false,
      topMnu: [//添加顶部菜单
        { title: "类型", type: "input", prop: "type", value: "菜单页面", disabled: true },
        { type: "input", title: "名称", prop: "name", value: "" },
        { type: "input", title: "英文名", prop: "english", value: "" },
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
        { type: "switch", prop: "date3", value: "", title: "是否启用" }
      ],
      data2: [
        {
          title: "上级节点",
          type: "input",
          prop: "father",
          value: "",
          disabled: true
        },
        { title: "类型", type: "input", prop: "type", value: "" },
        { type: "input", title: "名称", prop: "name", value: "" },
        { type: "input", title: "路径", prop: "path", value: "" },
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
      date: [],
      slelectifo: "", //当前选中节点名称
      parent: "",
      ifo: {},
      dialogFormVisible: false,
      controlOptions: [
        { name: "添加子节点", type: "primary", icon: "", id: 1 }, // type为按钮的五种颜色， icon为具体的图标
        { name: "添加顶部菜单", type: "", icon: "", id: 2 },
        { name: "批量删除", type: "", icon: "", id: 3 }
      ],
      form: {
        singleAmount: "",
        minMultiple: "",
        mixBet: "",
        bet: "",
        logOff: "",
        textarea: "",
        value1: true,
        value2: true
      },
      rules: {
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
      logOffOption: [],
      betOption: [],
      parms:{}
    };
  },
  components: {
    bouncedMessage
  },
  methods: {
    deselect() {
      // alert(2)
      this.slelectifo = "";
      this.data2[0].value = this.slelectifo;
    },
    cancel(){//关闭弹窗
      this.dialogFormVisible2 = false;
    },
    submit(){//表单提交

    },
    changeForm(val){
      Object.assign(this.parms,val)
    },
    handelbounced(val) {
      //弹框的取消按钮事件
      console.log(val);
      this.dialogFormVisible = val;
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
    resestFrom(formName) {
      this.$refs[formName].resetFields();
    },
    selectBtn(val) {
      //按钮点击事件
      console.log(val);
      if (val.id === 1) {
        if (this.slelectifo == "") {
          this.open();
        } else {
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
      console.log(val);
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
    }
    //
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