<template>
  <div class="vlt-card">
    <div class="operationManage">
      <searchBar :options="operationManageoptions" @search="search" :total="999">
        <controlBar
          slot="extend-bar"
          @select="operationManageAddclick"
          :options="operationManageAddbtn"
          position="left"
        ></controlBar>
      </searchBar>
      <el-table :data="operationManageTableData" border style="width: 100%; margin-top: 10px">
        <el-table-column prop="operationManageNum" label="序号"></el-table-column>
        <el-table-column prop="operationManageBelong" label="所属渠道"></el-table-column>
        <el-table-column prop="operationManageName" label="账户名"></el-table-column>
        <el-table-column prop="operationManageID" label="账户ID"></el-table-column>
        <el-table-column prop="operationManagetelephone" label="手机号"></el-table-column>
        <el-table-column prop="operationManageRoleName" label="角色名称"></el-table-column>
        <el-table-column prop="operationManageCreater" label="创建人"></el-table-column>
        <el-table-column prop="operationManageCreateDate" label="创建时间"></el-table-column>
        <el-table-column label="账户状态" min-width="140" prop="operationManageStatus">
          <template slot-scope="scope">
            <tableRowStatus
              :scope="scope"
              :tableData="operationManageTableData"
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
            <el-button type="primary" size="mini" @click="operationManageWrite(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" @click="operationManageLook(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <tablePaging :total="99" :currentPage="1" :pageSize="10"></tablePaging>
      <el-dialog title="新增账号" :visible.sync="dialogFormVisible">
        <div class="vlt-edit-single">
          <base-form
            :formData="operationManageWriteData"
            ref="baseForm"
            :rules="operationManageWriteRule"
            direction="right"
            @change="operationManageWritechangeForm"
          ></base-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button :plain="true" type="primary" @click="save">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "",
  data() {
    return {
      //编辑弹框默认为false
      dialogFormVisible: false,
      // 表格数据
      operationManageTableData: [
        {
          operationManageNum: 1,
          operationManageBelong: "广东省",
          operationManageName: "上海市普陀区金沙江路 1518 弄",
          operationManageID: "赵",
          operationManagetelephone: "自营",
          operationManageRoleName: "赵",
          operationManageCreater: "13800131358",
          operationManageCreateDate: "13800131358",
          roleManageCreateDate: "13800131358"
        },
        {
          operationManageNum: 2,
          operationManageBelong: "广东省",
          operationManageName: "上海市普陀区金沙江路 1518 弄",
          operationManageID: "赵",
          operationManagetelephone: "自营",
          operationManageRoleName: "赵",
          operationManageCreater: "13800131358",
          operationManageCreateDate: "13800131358",
          roleManageCreateDate: "13800131358"
        }
      ],
      //搜索框类型
      operationManageoptions: [
        {
          type: "input",
          prop: "roleManageID",
          value: "",
          title: "账户ID",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "roleManageRoleName",
          value: "",
          title: "角色名称",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "roleManageStatus",
          value: "",
          title: "账户状态",
          placeholder: "请输入",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        {
          type: "select",
          prop: "roleManageUsername",
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
          type: "datetime-range",
          prop: "roleManageCreateDate",
          value: "",
          title: "创建时间",
          options: ["start", "end"]
        }
      ],
      //按钮类型
      operationManageAddbtn: [{ name: "新增", type: "primary", icon: "plus" }],
      //表单验证
      operationManageWriteRule: {
        operationManageBelong: [
          { required: true, message: "请选择所属渠道", trigger: "change" }
        ],
        operationManageName: [
          { required: true, message: "请输入账户名称", trigger: "blur" }
        ],
        operationManageRoleName: [
          { required: true, message: "请选择账户角色", trigger: "change" }
        ],
        operationManagetelephone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        operationManageIDCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        operationManageAdress: [
          { required: true, message: "请输入联系地址", trigger: "blur" }
        ],
        operationManageLimit: [
          {
            type: "array",
            required: true,
            message: "请选择账号权限",
            trigger: "change"
          }
        ]
      },
      // 编辑弹框表单类型
      operationManageWriteData: [
        {
          type: "select",
          title: "所属渠道",
          prop: "operationManageBelong",
          value: "",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        {
          type: "input",
          title: "账户名称",
          prop: "operationManageName",
          value: ""
        },
        {
          type: "select",
          title: "账户角色",
          prop: "operationManageRoleName",
          value: "",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        {
          type: "input",
          title: "手机号",
          value: "",
          prop: "operationManagetelephone"
        },
        {
          type: "input",
          title: "身份证号",
          value: "",
          prop: "operationManageIDCard"
        },
        {
          type: "input",
          title: "联系地址",
          value: "",
          prop: "operationManageAdress"
        },
        {
          type: "input",
          title: "账户密码",
          value: "",
          prop: "operationManagePassword",
          disabled: true,
          placeholder: "初始密码为123456"
        },
        {
          type: "cascader-multiple",
          prop: "operationManageLimit",
          value: "",
          title: "账号权限",
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
      ]
    };
  },
  components: {},
  methods: {
    //点击查询
    search(formData) {
      console.log(formData);
    },
    //新增按钮
    operationManageAddclick() {
      this.$router.push("operationAccountAdd");
    },
    //点击编辑
    operationManageWrite(row) {
      this.dialogFormVisible = true;
      // row = this.operationManageWriteData[0].prop;
      let n = Object.keys(row);
      let arr = this.operationManageWriteData;
      //console.log(n);
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < n.length; j++) {
          if (arr[i].prop === n[j]) {
            arr[i].value = row[n[j]];
          }
        }
      }
      //console.log(this.operationManageWriteData[0]);
    },
    //点击查看
    operationManageLook(row) {
      this.$router.push({
        path: "operationAccountExamine",
        query: { id: row.operationManageNum }
      });
      //console.log(row);
      //this.eventBus.$emit("send", row);
    },
    operationManageWritechangeForm() {},
    //点击保存
    save() {
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>
