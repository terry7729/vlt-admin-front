<template>
  <div class="vlt-card">
    <div class="ticketOffice">
      <el-container>
        <el-aside class="tree-list" style="padding:20px;width:380px">
          <div class="menu-btn">
            <control-bar
              slot="extend-bar"
              :options="ticketOfficeOptions"
              @select="ticketOfficeSelectBtn"
              position="left"
            ></control-bar>
          </div>
          <div class="menu-ipt">
            <div class="editorial">
              <tips-line>
                当前选择编缉：
                <span style="color:#40a9ff;font-size:14px;font-weight:700;padding:0 5px;">
                  {{ticketOfficeWriteData}}
                  <el-button
                    type="text"
                    style="font-size:12px;padding:0 5px;"
                    @click="ticketOfficeWriteData=''"
                  >取消选择</el-button>
                </span>
              </tips-line>
            </div>
            <div class="menu-tree">
              <el-tree
                :data="ticketOfficeData"
                show-checkbox
                node-key="id"
                :check-strictly="true"
                @node-click="ticketOfficeGetnowNodeifo"
                @check-change="ticketOfficeGetCheckifo"
                :default-expanded-keys="[1, 2]"
                :expand-on-click-node="false"
              ></el-tree>
            </div>
          </div>
        </el-aside>
        <el-main style="border-left:1px solid #ccc;">
          <el-table :data="ticketOfficeTableData" border>
            <el-table-column prop="ticketOfficeWriteId" label="序号"></el-table-column>
            <el-table-column prop="ticketOfficeWriteName" label="兑奖处名称"></el-table-column>
            <el-table-column prop="ticketOfficeWritePeople" label="负责人"></el-table-column>
            <el-table-column prop="ticketOfficeWriteContat" label="联系方式" min-width="100"></el-table-column>
            <el-table-column prop="ticketOfficeWriteAddress" label="兑奖地址" min-width="100"></el-table-column>
            <el-table-column prop="ticketOfficeWriteCreateDate" label="创建时间"></el-table-column>
            <el-table-column label="兑奖处状态" min-width="160">
              <template slot-scope="scope">
                <tableRowStatus
                  :scope="scope"
                  :tableData="ticketOfficeTableData"
                  idField="id"
                  statusField="status"
                  :rowName="scope.row.name"
                  :option="{
                enable:{
                  apiName:'apiName',
                  label:'启用',
                  value:0
                },
               disable:{
                  apiName:'apiName',
                  label:'冻结',
                  value:1
               },
               logout:{
                  apiName:'apiName',
                  label:'注销',
                  value:2
               }
              }"
                ></tableRowStatus>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="ticketOfficeWrite(scope.row.id)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
      <div>
        <el-dialog title="基础信息" :visible.sync="WritedialogFormVisible" width="600px">
          <div class="vlt-edit-single">
            <base-form
              :formData="WritedialogData"
              ref="baseForm"
              :rules="WritedialogRule"
              direction="right"
              @change="WritedialogchangeForm"
            ></base-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="WritedialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="WritedialogFormVisible = false">保 存</el-button>
          </div>
        </el-dialog>
        <el-dialog title="新增兑奖处" :visible.sync="AddDialogFormVisible" width="600px">
          <div class="vlt-edit-single">
            <base-form
              :formData="AddDialogData"
              ref="baseForm"
              :rules="AddDialogRule"
              direction="right"
              @change="AddDialogchangeForm"
            ></base-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="AddDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="AddDialogFormVisible = false">保 存</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import rules from "@/utils/rules.js";
export default {
  created() {},
  data() {
    return {
      //编辑弹窗表单验证
      WritedialogRule: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        all: [{ required: true, validator: rules.checkEmail, trigger: "blur" }]
      },
      //新增弹窗表单验证
      AddDialogRule: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        all: [{ required: true, validator: rules.checkEmail, trigger: "blur" }]
      },
      //编辑弹窗表单类型
      WritedialogData: [
        { type: "input", title: "兑奖处名称", prop: "ticketOfficeWriteName" },
        {
          type: "select",
          title: "机构区域",
          prop: "ticketOfficeWriteArea",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        { type: "input", title: "负责人", prop: "ticketOfficeWritePeople" },
        { type: "input", title: "联系方式", prop: "ticketOfficeWriteContat" },
        { type: "input", title: "兑奖地址", prop: "ticketOfficeWriteAddress" }
      ],
      //新增弹窗表单类型
      AddDialogData: [
        { type: "input", title: "兑奖处名称", prop: "ticketOfficeWriteName" },
        {
          type: "select",
          title: "机构区域",
          prop: "ticketOfficeWriteArea",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        { type: "input", title: "负责人", prop: "ticketOfficeWritePeople" },
        { type: "input", title: "联系方式", prop: "ticketOfficeWriteContat" },
        { type: "input", title: "兑奖地址", prop: "ticketOfficeWriteAddress" }
      ],
      //编辑弹窗默认为false
      WritedialogFormVisible: false,
      //新增弹窗默认为false
      AddDialogFormVisible: false,
      //表格数据
      ticketOfficeTableData: [
        {
          ticketOfficeWriteId: "1",
          ticketOfficeWriteName: "深圳市",
          ticketOfficeWritePeople: "张三",
          ticketOfficeWriteContat: "13679642584",
          ticketOfficeWriteAddress: "深圳市龙岗区",
          ticketOfficeWriteCreateDate: "2019-09-10"
        }
      ],
      //树形菜单数据
      ticketOfficeData: [
        {
          id: 1,
          label: "业务管理",
          type: 0,
          obj: {},
          children: [
            {
              id: 4,
              label: "二级 1-1",
              type: 0,
              obj: {},
              children: [
                {
                  id: 9,
                  obj: {},
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
          obj: {},
          children: [
            {
              id: 5,
              type: 0,
              obj: {},
              label: "二级 2-1"
            },
            {
              id: 6,
              type: 0,
              obj: {},
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          type: 0,
          obj: {},
          label: "业务监控",
          children: [
            {
              id: 7,
              obj: {},
              type: 0,
              label: "二级 3-1"
            },
            {
              id: 8,
              type: 0,
              obj: {},
              label: "二级 3-2"
            }
          ]
        },
        {
          id: 4,
          type: 0,
          label: "系统管理",
          obj: {},
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
              obj: {},
              label: "组织部门"
            },
            {
              id: 13,
              type: 0,
              obj: {},
              label: "角色管理"
            },
            {
              id: 14,
              type: 0,
              obj: {},
              label: "权限管理"
            },
            {
              id: 15,
              obj: {},
              type: 0,
              label: "用户管理"
            },
            {
              id: 16,
              obj: {},
              type: 0,
              label: "数据字典"
            },
            {
              id: 17,
              type: 0,
              obj: {},
              label: "菜单管理",
              children: [
                {
                  id: 20,
                  obj: {},
                  label: "系统菜单详情"
                },
                {
                  id: 21,
                  obj: {},
                  label: "系统菜单新增"
                },
                {
                  id: 22,
                  obj: {},
                  label: "系统菜单编缉"
                },
                {
                  id: 23,
                  obj: {},
                  label: "系统菜单删除"
                },
                {
                  id: 24,
                  obj: {},
                  label: "系统菜单状态设置"
                },
                {
                  id: 25,
                  obj: {},
                  label: "菜单查询"
                }
              ]
            }
          ]
        }
      ],
      //点击树形结构得到点击的数据
      ticketOfficeWriteData: "",
      //新增和刷新数据
      ticketOfficeOptions: [
        { name: "新增兑奖处", type: "primary", icon: "plus", id: 1 }, // type为按钮的五种颜色， icon为具体的图标
        { name: "刷新", type: "", icon: "refresh-right", id: 2 }
      ]
    };
  },
  methods: {
    //新增和刷新数据按钮
    ticketOfficeSelectBtn(val) {
      if (val.id == 1) {
        this.AddDialogFormVisible = true;
      } else if (val.id == 2) {
      }
      console.log(val);
    },
    ticketOfficeGetnowNodeifo(val) {
      //获取当前点击节点信息
      this.ticketOfficeWriteData = val.label;
      // if(val[obj]){

      // this.ifo = { ...val.obj };
      // // }
      // console.log();
      // console.log(val);
    },
    ticketOfficeGetCheckifo(...res) {
      //复选框选中状态变化事件递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
      console.log(res);
    },
    //点击编辑
    ticketOfficeWrite() {
      this.WritedialogFormVisible = true;
    },
    //编辑弹窗表单change事件
    WritedialogchangeForm() {},
    //新增弹窗表单change事件
    AddDialogchangeForm() {}
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
  .el-row {
    text-align: center;
  }
}
</style>