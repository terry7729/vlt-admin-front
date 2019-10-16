<template>
  <div class="vlt-card">
    <div class="role-search">
      <search-bar
        class="search-bar-demo"
        @search="search"
        :options="option"
        :total="999"
        labelWidth="80px"
      >
        <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
      </search-bar>
    </div>
    <div class="role-table">
      <el-table :data="tableData" border style="width: 100%; margin-top: 10px;">
        <el-table-column type="index" prop="date" label="序号"></el-table-column>
        <el-table-column prop="date" label="用户角色"></el-table-column>
        <el-table-column prop="name" label="角色描述"></el-table-column>
        <el-table-column prop="province" label="创建人"></el-table-column>
        <el-table-column prop="city" label="角色类型"></el-table-column>
        <el-table-column prop="address" label="创建时间"></el-table-column>

        <el-table-column label="角色状态" align="center">
          <template slot-scope="scope">
            <table-row-status
              statusField="status"
              idField="id"
              :scope="scope"
              :tableData="tableData"
              :rowName="scope.row.name"
              :option="{
                'enable': {
                  apiName: 'apiName', // 接口名称
                  label: '启用', // 按钮文字
                  value: 0 // 接口字段传值
                },
                'disable': {
                  apiName: 'apiName',
                  label: '冻结',
                  value: 1
                },
                'logout': {
                  apiName: 'apiName',
                  label: '注销',
                  value: -1
                }
              }"
            ></table-row-status>
          </template>
        </el-table-column>
        <el-table-column prop="zip" label="操作" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handelifo">查看</el-button>
            <el-button type="success" size="mini" @click="handelskip(scope.row)">编缉</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagintion">
        <table-paging
          :current-page="1"
          :page-size="10"
          :total="100"
          @handleSizeChange="pageSizeChange"
          @handleCurrentChange="pageCurrentChange"
        ></table-paging>
      </div>
    </div>
    <div class="role-dialog">
      <el-dialog :visible.sync="dialogFormVisible" width="600px" custom-class="roleDialog">
        <!-- <roleifometion></roleifometion> -->
        <div class="vlt-edit-single">
          <h2 class="title">角色信息</h2>
          <div class="vlt-edit-wrap">
            <base-form
              :formData="data2"
              labelWidth="90px"
              ref="baseForm"
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

export default {
  name: "roleList",
  data() {
    return {
      dialogFormVisible: false,
      controlOptions: [
        //按钮组
        { name: "新建计划", type: "primary", icon: "plus" } // type为按钮的五种颜色， icon为具体的图标
      ],
      data2: [
        { type: "input", title: "用户角色", prop: "userRole", value: "12" },
        { type: "input", title: "角色类型", prop: "roleType", value: "12" },
        { type: "input", title: "角色状态", prop: "roleStatus", value: "12" },
        {
          type: "cascader-multiple",
          prop: "rolepower",
          value: "",
          title: "角色权限",
          placeholder: "请选择",
          options: [
            {
              value: "1",
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
        { type: "textarea", title: "描述", prop: "describe", value: "12" }
      ],
      option: [
        //搜索框组
        {
          title: "用户角色",
          prop: "userRole",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          title: "创建人",
          prop: "createrMan",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          title: "角色状态",
          prop: "rolueStatus",
          type: "select",
          options: [
            {
              value: "beijing",
              label: "北京"
            },
            {
              value: "shanghai",
              label: "上海"
            }
          ],
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          type: "datetime-range",
          prop: "createTime",
          value: "",
          title: "创建时间",
          placeholder: ["开始时间", "结束时间"]
        }
      ],
      currentPage4: 4,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: [],
      //新建按钮点击
      newcreate:false,
      parms:{}
    };
  },
  computed: {},
  created() {},
  mounted() {},
  components: {
   
  },
  methods: {
    handelifo() {
      this.$router.push("roleList/roleifometion");
    },
    pageSizeChange(val) {
      //每页显示条数
      console.log(val);
    },
    pageCurrentChange(val) {
      //当前显示页数
      console.log(val);
    },
    handelskip(val) {
      this.dialogFormVisible = true;
      this.newcreate = 0;
      // this.$router.push("roleList/roleDestails");
    },
    selectBtn(val) {
      //新增删除事件
      if (val.name === "新建计划") {
        this.newcreate = 1;
        this.dialogFormVisible= true;
      }
   
    },
    search(val) {
      //搜索事件
      console.log(val);
    },
    submit(val) {//表单提交
      if(this.newcreate){
        //点击新建按钮提交
         this.parms.created = true;
      }else{
        //点击编缉按钮提交
        this.parms.created = false;
      }
      console.log(this.parms);

    },
    //弹框事件
    cancel() {
      this.dialogFormVisible = false;
    },
    changeForm(val) {
      Object.assign(this.parms,val)
      
    }
  }
};
</script>


<style lang="less">
@import "./less/index.less";

.roleDialog {
  border-radius: 20px;
  .el-dialog__header {
    padding: 0;
  }
}
</style>
