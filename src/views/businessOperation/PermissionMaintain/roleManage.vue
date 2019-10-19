<template>
  <div class="vlt-card">
    <div class="roleManage">
      <!-- 搜索 -->
      <searchBar :options="roleManageoptions" :total="999">
        <!-- 新增按钮 -->
        <controlBar
          slot="extend-bar"
          @select="roleManageAddclick"
          :options="roleManageAddbtn"
          position="left"
        ></controlBar>
      </searchBar>
      <!-- 表格 -->
      <el-table :data="roleManagetableData" border style="width: 100%; margin-top: 10px">
        <el-table-column prop="roleManageId" label="序号"></el-table-column>
        <el-table-column prop="roleManageName" label="用户角色"></el-table-column>
        <el-table-column prop="roleManageAuthority" label="角色权限"></el-table-column>
        <el-table-column prop="roleManageDescribe" label="描述"></el-table-column>
        <el-table-column prop="roleManageCreater" label="创建人"></el-table-column>
        <el-table-column prop="roleManageCreateDate" label="创建时间"></el-table-column>
        <el-table-column label="角色状态" min-width="110" prop="accountStatus">
          <template slot-scope="scope">
            <tableRowStatus
              :scope="scope"
              :tableData="roleManagetableData"
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
        <el-table-column label="操作" min-width="140">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="roleManageAuthority(scope.row.id)">权限设置</el-button>
            <el-button type="primary" size="mini" @click="roleManageWrite(scope.row.id)">编辑</el-button>
            <el-button type="primary" size="mini" @click="roleManageLook(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <tablePaging
        :total="99"
        :currentPage="1"
        :pageSize="10"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></tablePaging>
      <!-- 编辑弹框 -->
      <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
        <div class="vlt-edit-single">
          <base-form
            :formData="roleManageWriteData"
            ref="baseForm"
            :rules="roleManageWriteRule"
            direction="right"
            @change="changeForm"
          ></base-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
        </div>
      </el-dialog>
      <div>
        <!-- 权限设置弹框 -->
        <el-dialog title="权限设置" :visible.sync="AuthoritydialogFormVisible">
          <div class="vlt-edit-single">
            <base-form
              :formData="roleManageAuthorityWriteData"
              ref="baseForm"
              :rules="roleManageAuthorityWriteRule"
              direction="right"
              @change="AuthoritychangeForm"
            ></base-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="AuthoritydialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="AuthoritydialogFormVisible = false">保 存</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "",
  data() {
    return {
      // 权限设置弹框默认为false
      AuthoritydialogFormVisible: false,
      // 编辑弹框表单验证
      roleManageWriteRule: {
        roleManageName: [
          { required: true, message: "请输入用户角色", trigger: "blur" }
        ],
        accountType: [
          { required: true, message: "请输入角色类型", trigger: "blur" }
        ],
        accountStatus: [
          { required: true, message: "请选择角色状态", trigger: "change" }
        ],
        roleManageAuthority: [
          { required: true, message: "请选择角色权限", trigger: "change" }
        ]
      },
      // 权限设置弹框表单验证
      roleManageAuthorityWriteRule: {
        roleManageAuthority: [
          { required: true, message: "请选择角色权限", trigger: "change" }
        ]
      },
      // 编辑弹框表单类型
      roleManageWriteData: [
        { type: "input", title: "用户角色", prop: "roleManageName" },
        { type: "input", title: "角色类型", prop: "accountType" },
        {
          type: "select",
          title: "角色状态",
          prop: "accountStatus",
          option: [
            {
              label: "专用存款账户",
              value: "0"
            },
            {
              label: "专用存款账户2",
              value: "1"
            }
          ]
        },

        {
          type: "cascader-multiple",
          prop: "roleManageAuthority",
          value: "",
          title: "角色权限",
          placeholder: "请选择",
          options: [
            {
              value: "zhinan",
              label: "指南",
              children: [
                {
                  value: "shejiyuanze",
                  label: "设计原则",
                  children: [
                    {
                      value: "yizhi",
                      label: "一致"
                    },
                    {
                      value: "fankui",
                      label: "反馈"
                    },
                    {
                      value: "xiaolv",
                      label: "效率"
                    },
                    {
                      value: "kekong",
                      label: "可控"
                    }
                  ]
                },
                {
                  value: "daohang",
                  label: "导航",
                  children: [
                    {
                      value: "cexiangdaohang",
                      label: "侧向导航"
                    },
                    {
                      value: "dingbudaohang",
                      label: "顶部导航"
                    }
                  ]
                }
              ]
            },
            {
              value: "zujian",
              label: "组件",
              children: [
                {
                  value: "basic",
                  label: "Basic",
                  children: [
                    {
                      value: "layout",
                      label: "Layout 布局"
                    },
                    {
                      value: "color",
                      label: "Color 色彩"
                    },
                    {
                      value: "typography",
                      label: "Typography 字体"
                    },
                    {
                      value: "icon",
                      label: "Icon 图标"
                    },
                    {
                      value: "button",
                      label: "Button 按钮"
                    }
                  ]
                },
                {
                  value: "form",
                  label: "Form",
                  children: [
                    {
                      value: "radio",
                      label: "Radio 单选框"
                    },
                    {
                      value: "checkbox",
                      label: "Checkbox 多选框"
                    },
                    {
                      value: "input",
                      label: "Input 输入框"
                    },
                    {
                      value: "input-number",
                      label: "InputNumber 计数器"
                    },
                    {
                      value: "select",
                      label: "Select 选择器"
                    },
                    {
                      value: "cascader",
                      label: "Cascader 级联选择器"
                    },
                    {
                      value: "switch",
                      label: "Switch 开关"
                    },
                    {
                      value: "slider",
                      label: "Slider 滑块"
                    },
                    {
                      value: "time-picker",
                      label: "TimePicker 时间选择器"
                    },
                    {
                      value: "date-picker",
                      label: "DatePicker 日期选择器"
                    },
                    {
                      value: "datetime-picker",
                      label: "DateTimePicker 日期时间选择器"
                    },
                    {
                      value: "upload",
                      label: "Upload 上传"
                    },
                    {
                      value: "rate",
                      label: "Rate 评分"
                    },
                    {
                      value: "form",
                      label: "Form 表单"
                    }
                  ]
                },
                {
                  value: "data",
                  label: "Data",
                  children: [
                    {
                      value: "table",
                      label: "Table 表格"
                    },
                    {
                      value: "tag",
                      label: "Tag 标签"
                    },
                    {
                      value: "progress",
                      label: "Progress 进度条"
                    },
                    {
                      value: "tree",
                      label: "Tree 树形控件"
                    },
                    {
                      value: "pagination",
                      label: "Pagination 分页"
                    },
                    {
                      value: "badge",
                      label: "Badge 标记"
                    }
                  ]
                },
                {
                  value: "notice",
                  label: "Notice",
                  children: [
                    {
                      value: "alert",
                      label: "Alert 警告"
                    },
                    {
                      value: "loading",
                      label: "Loading 加载"
                    },
                    {
                      value: "message",
                      label: "Message 消息提示"
                    },
                    {
                      value: "message-box",
                      label: "MessageBox 弹框"
                    },
                    {
                      value: "notification",
                      label: "Notification 通知"
                    }
                  ]
                },
                {
                  value: "navigation",
                  label: "Navigation",
                  children: [
                    {
                      value: "menu",
                      label: "NavMenu 导航菜单"
                    },
                    {
                      value: "tabs",
                      label: "Tabs 标签页"
                    },
                    {
                      value: "breadcrumb",
                      label: "Breadcrumb 面包屑"
                    },
                    {
                      value: "dropdown",
                      label: "Dropdown 下拉菜单"
                    },
                    {
                      value: "steps",
                      label: "Steps 步骤条"
                    }
                  ]
                },
                {
                  value: "others",
                  label: "Others",
                  children: [
                    {
                      value: "dialog",
                      label: "Dialog 对话框"
                    },
                    {
                      value: "tooltip",
                      label: "Tooltip 文字提示"
                    },
                    {
                      value: "popover",
                      label: "Popover 弹出框"
                    },
                    {
                      value: "card",
                      label: "Card 卡片"
                    },
                    {
                      value: "carousel",
                      label: "Carousel 走马灯"
                    },
                    {
                      value: "collapse",
                      label: "Collapse 折叠面板"
                    }
                  ]
                }
              ]
            },
            {
              value: "ziyuan",
              label: "资源",
              children: [
                {
                  value: "axure",
                  label: "Axure Components"
                },
                {
                  value: "sketch",
                  label: "Sketch Templates"
                },
                {
                  value: "jiaohu",
                  label: "组件交互文档"
                }
              ]
            }
          ]
        },
        { type: "textarea", title: "描述", prop: "describe" }
      ],
      //权限设置弹框表单
      roleManageAuthorityWriteData: [
        {
          type: "cascader-multiple",
          prop: "accountAuthority",
          value: "",
          title: "角色权限",
          placeholder: "请选择",
          options: [
            {
              value: "zhinan",
              label: "指南",
              children: [
                {
                  value: "shejiyuanze",
                  label: "设计原则",
                  children: [
                    {
                      value: "yizhi",
                      label: "一致"
                    },
                    {
                      value: "fankui",
                      label: "反馈"
                    },
                    {
                      value: "xiaolv",
                      label: "效率"
                    },
                    {
                      value: "kekong",
                      label: "可控"
                    }
                  ]
                },
                {
                  value: "daohang",
                  label: "导航",
                  children: [
                    {
                      value: "cexiangdaohang",
                      label: "侧向导航"
                    },
                    {
                      value: "dingbudaohang",
                      label: "顶部导航"
                    }
                  ]
                }
              ]
            },
            {
              value: "zujian",
              label: "组件",
              children: [
                {
                  value: "basic",
                  label: "Basic",
                  children: [
                    {
                      value: "layout",
                      label: "Layout 布局"
                    },
                    {
                      value: "color",
                      label: "Color 色彩"
                    },
                    {
                      value: "typography",
                      label: "Typography 字体"
                    },
                    {
                      value: "icon",
                      label: "Icon 图标"
                    },
                    {
                      value: "button",
                      label: "Button 按钮"
                    }
                  ]
                },
                {
                  value: "form",
                  label: "Form",
                  children: [
                    {
                      value: "radio",
                      label: "Radio 单选框"
                    },
                    {
                      value: "checkbox",
                      label: "Checkbox 多选框"
                    },
                    {
                      value: "input",
                      label: "Input 输入框"
                    },
                    {
                      value: "input-number",
                      label: "InputNumber 计数器"
                    },
                    {
                      value: "select",
                      label: "Select 选择器"
                    },
                    {
                      value: "cascader",
                      label: "Cascader 级联选择器"
                    },
                    {
                      value: "switch",
                      label: "Switch 开关"
                    },
                    {
                      value: "slider",
                      label: "Slider 滑块"
                    },
                    {
                      value: "time-picker",
                      label: "TimePicker 时间选择器"
                    },
                    {
                      value: "date-picker",
                      label: "DatePicker 日期选择器"
                    },
                    {
                      value: "datetime-picker",
                      label: "DateTimePicker 日期时间选择器"
                    },
                    {
                      value: "upload",
                      label: "Upload 上传"
                    },
                    {
                      value: "rate",
                      label: "Rate 评分"
                    },
                    {
                      value: "form",
                      label: "Form 表单"
                    }
                  ]
                },
                {
                  value: "data",
                  label: "Data",
                  children: [
                    {
                      value: "table",
                      label: "Table 表格"
                    },
                    {
                      value: "tag",
                      label: "Tag 标签"
                    },
                    {
                      value: "progress",
                      label: "Progress 进度条"
                    },
                    {
                      value: "tree",
                      label: "Tree 树形控件"
                    },
                    {
                      value: "pagination",
                      label: "Pagination 分页"
                    },
                    {
                      value: "badge",
                      label: "Badge 标记"
                    }
                  ]
                },
                {
                  value: "notice",
                  label: "Notice",
                  children: [
                    {
                      value: "alert",
                      label: "Alert 警告"
                    },
                    {
                      value: "loading",
                      label: "Loading 加载"
                    },
                    {
                      value: "message",
                      label: "Message 消息提示"
                    },
                    {
                      value: "message-box",
                      label: "MessageBox 弹框"
                    },
                    {
                      value: "notification",
                      label: "Notification 通知"
                    }
                  ]
                },
                {
                  value: "navigation",
                  label: "Navigation",
                  children: [
                    {
                      value: "menu",
                      label: "NavMenu 导航菜单"
                    },
                    {
                      value: "tabs",
                      label: "Tabs 标签页"
                    },
                    {
                      value: "breadcrumb",
                      label: "Breadcrumb 面包屑"
                    },
                    {
                      value: "dropdown",
                      label: "Dropdown 下拉菜单"
                    },
                    {
                      value: "steps",
                      label: "Steps 步骤条"
                    }
                  ]
                },
                {
                  value: "others",
                  label: "Others",
                  children: [
                    {
                      value: "dialog",
                      label: "Dialog 对话框"
                    },
                    {
                      value: "tooltip",
                      label: "Tooltip 文字提示"
                    },
                    {
                      value: "popover",
                      label: "Popover 弹出框"
                    },
                    {
                      value: "card",
                      label: "Card 卡片"
                    },
                    {
                      value: "carousel",
                      label: "Carousel 走马灯"
                    },
                    {
                      value: "collapse",
                      label: "Collapse 折叠面板"
                    }
                  ]
                }
              ]
            },
            {
              value: "ziyuan",
              label: "资源",
              children: [
                {
                  value: "axure",
                  label: "Axure Components"
                },
                {
                  value: "sketch",
                  label: "Sketch Templates"
                },
                {
                  value: "jiaohu",
                  label: "组件交互文档"
                }
              ]
            }
          ]
        }
      ],
      // 编辑弹框默认为false
      dialogFormVisible: false,
      // roleManageCurrentPage: 1,
      // 表格数据
      roleManagetableData: [
        {
          roleManageId: 1,
          roleManageName: "广东省",
          roleManageAuthority: "上海市普陀区金沙江路 1518 弄",
          roleManageDescribe: "赵",
          roleManageCreater: "自营",
          principalName: "赵",
          roleManageCreateDate: "13800131358"
        }
      ],
      // 搜索表单类型
      roleManageoptions: [
        {
          type: "select",
          prop: "roleManageName",
          value: "",
          title: "用户角色",
          placeholder: "请输入",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        {
          type: "input",
          prop: "roleManageCreater",
          value: "",
          title: "创建人",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "accountStatus",
          value: "",
          title: "角色状态",
          placeholder: "请输入",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        {
          type: "datetime-range",
          prop: "roleManageCreateDate",
          value: "",
          title: "创建时间",
          placeholder: ["开始时间", "结束时间"]
        }
      ],
      // 新增按钮类型
      roleManageAddbtn: [{ name: "新增", type: "primary", icon: "plus" }]
    };
  },
  components: {},
  methods: {
    // 新增按钮
    roleManageAddclick() {
      this.$router.push("roleManageAdd");
    },
    // 权限设置按钮
    roleManageAuthority() {
      this.AuthoritydialogFormVisible = true;
    },
    // 编辑按钮
    roleManageWrite() {
      this.dialogFormVisible = true;
    },
    // 查看按钮
    roleManageLook() {
      this.$router.push("roleManageExamine");
    },

    // 表单change事件
    changeForm() {},
    // 权限表单change事件
    AuthoritychangeForm() {},
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
