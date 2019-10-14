<template>
  <div class="vlt-card">
    <el-container>
      <el-aside class="tree-list" style="padding:20px;width:380px">
        <div class="menu-btn">
          <control-bar :options="controlOptions" @select="selectBtn"></control-bar>
        </div>
        <div class="menu-ipt">
          <div class="editorial">
            <tips-line>
              当前选择编缉：
              <span style="color:#40a9ff;font-size:14px;font-weight:700;padding:0 5px;">
                {{slelectifo}}
                <el-button type="text" style="font-size:12px;padding:0 5px;">取消选择</el-button>
              </span>
            </tips-line>
          </div>
          <div class="menu-tree">
            <el-tree
              :data="data"
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
          <bounced-message :obj="ifo"></bounced-message>
          <!-- <div class="vlt-edit-wrap">
            <el-form
              label-position="right"
              label-width="90px"
              :model="form"
              :rules="rules"
              ref="form"
            >
              <el-form-item label="类型">
                <el-input v-model="form.singleAmount" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="名称" prop="minMultiple">
                <el-input v-model="form.minMultiple"></el-input>
              </el-form-item>
              <el-form-item label="路径" prop="mixBet">
                <el-input v-model="form.mixBet"></el-input>
              </el-form-item>
              <el-form-item label="路由英文名" prop="bet">
                <el-input v-model="form.bet"></el-input>
              </el-form-item>
              <el-form-item label="图标" prop="logOff">
                <el-select v-model="form.logOff" placeholder="请选择">
                  <el-option
                    v-for="item in logOffOption"
                    @click.native="changeLogOff(item)"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="排序值" prop="cash">
                <el-input placeholder="请输入内容" v-model="form.textarea"></el-input>
              </el-form-item>
              <el-form-item label="是否敏感操作">
                <el-switch
                  style="display: block"
                  v-model="form.value1"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
              <el-form-item label="是否启用">
                <el-switch
                  style="display: block"
                  v-model="form.value2"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
            </el-form>
            <el-row class="vlt-edit-btn">
              <el-button
                type="primary"
                v-prevent="1000"
                size="medium"
                @click="save(form,'form')"
              >提交并保存</el-button>
              <el-button size="medium" @click="resestFrom('form')">重置</el-button>
            </el-row>
          </div>-->
        </div>
      </el-main>
    </el-container>
    <div class="bouncedMessage">
      <el-dialog
        title="添加子节点"
        :visible.sync="dialogFormVisible"
        width="500px"
        custom-class="menuDialog"
      >
        <bounced-message></bounced-message>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import bouncedMessage from "./bouncedMessage";
let id = 1000;

export default {
  data() {
    const data = [
      {
        id: 1,
        label: "业务管理",
        type: 0,
        children: [
          {
            id: 4,
            label: "二级 1-1",
            type: 0,
            children: [
              {
                id: 9,
                label: "三级 1-1-1",
                type: 0
              },
              {
                id: 10,
                type: 0,
                label: "三级 1-1-2"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "业务运营",
        type: 0,
        children: [
          {
            id: 5,
            type: 0,
            label: "二级 2-1"
          },
          {
            id: 6,
            type: 0,
            label: "二级 2-2"
          }
        ]
      },
      {
        id: 3,
        type: 0,
        label: "业务监控",
        children: [
          {
            id: 7,
            type: 0,
            label: "二级 3-1"
          },
          {
            id: 8,
            type: 0,
            label: "二级 3-2"
          }
        ]
      },
      {
        id: 4,
        type: 0,
        label: "系统管理",
        children: [
          {
            id: 11,
            type: 0,
            label: "组织架构",
            obj: {
              type: "页面菜单",
              name: "组织架构",
              path: "XXXXXXX",
              english: "organization",
              icon: "el-icon-right",
              sort: 1,
              switch: false,
              switch2: false
            }
          },
          {
            id: 12,
            type: 0,
            label: "组织部门"
          },
          {
            id: 13,
            type: 0,
            label: "角色管理"
          },
          {
            id: 14,
            type: 0,
            label: "权限管理"
          },
          {
            id: 15,
            type: 0,
            label: "用户管理"
          },
          {
            id: 16,
            type: 0,
            label: "数据字典"
          },
          {
            id: 17,
            type: 0,
            label: "菜单管理",
            children: [
              {
                id: 20,
                label: "系统菜单详情"
              },
              {
                id: 21,
                label: "系统菜单新增"
              },
              {
                id: 22,
                label: "系统菜单编缉"
              },
              {
                id: 23,
                label: "系统菜单删除"
              },
              {
                id: 24,
                label: "系统菜单状态设置"
              },
              {
                id: 25,
                label: "菜单查询"
              }
            ]
          }
        ]
      }
    ];
    return {
      slelectifo: "",
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
      data: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data))
    };
  },
  components: {
    bouncedMessage
  },
  methods: {
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
        this.setchild = false;
        this.dialogFormVisible = true;
        // this.open(); //触发弹框
      }
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
  .el-row {
    text-align: center;
  }
}
/* .el-dialog{
  width:600px;
}
.el-input{
  width:400px;
}
.el-row{
  text-align: center;
}
.el-form-item__label{
  width:110px !important;
} */
</style>