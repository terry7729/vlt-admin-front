<template>
  <div class="vlt-edit-single wrap">
    <div class="vlt-edit-wrap">
      <el-form label-position="right" 
        label-width="90px" 
        ref="form"
        class="baseInfo">
        <base-form :formData="baseData" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        <!-- <el-form-item label="试玩工具">
          <el-radio v-model="radio" label="1">试玩投注卡</el-radio>
          <div class="flex-wrap">
            <el-radio v-model="radio" label="2">会员积分</el-radio>
            <el-input v-model="input" placeholder="请输入积分兑换比例"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="试玩群体">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="0">全部用户</el-checkbox>
            <el-checkbox label="1">新游玩用户</el-checkbox>
            <el-checkbox label="2">新会员</el-checkbox>
            <el-checkbox label="3" >老会员</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="会员等级">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <base-form :formData="channelData" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        <el-form-item label="试玩渠道">
          <el-radio v-model="radio" label="1">区域内全部大厅</el-radio>
          <div class="flex-wrap">
            <el-radio v-model="radio" label="2">区域内指定大厅</el-radio>
            <el-input v-model="textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入大厅编号，多个大厅以“；”相隔"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="试玩终端">
          <el-radio v-model="radio" label="1">大厅内全部终端</el-radio>
          <div class="flex-wrap">
            <el-radio v-model="radio" label="2">大厅内指定终端</el-radio>
            <el-input v-model="textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入终端编号，多个终端以“；”相隔"></el-input>
          </div>
        </el-form-item> -->
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="next">提交并保存</el-button>
          <el-button size="medium" @click="back" class="cancel">取 消</el-button>
        </el-row>
      </el-form>
      </div>
  </div>
</template>

<script type="text/javascript">

export default {
  name: "",
  data() {
    return {
      baseData: [
        {title: '变更计划名称', type: 'input',  prop: 'name', value: '', placeholder: '请输入试玩计划名称'},
        {title: '生效时间', type: 'datetime-range',  prop: '', value: '', options:['start', 'end']},
        {title: '计划简介', type: 'textarea',  prop: 'desc', value: '', placeholder: '请输入试玩计划简介'},
        {title: '变更游戏', type: 'select',  prop: 'developersName', value: '', options:[{label: '网易',value: '0'},{label: '腾讯',value: '1'},{label: '盛大',value: '2'}]},
      ],
      channelData: [
        {title: '试玩区域', type: 'cascader-multiple',  prop: '', value: '', options: [
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
          ]},
      ],
      rules: {},
      radio: 1,
      options: [{label:'男', value:'1'},{label:'女',value:'2'}],
      checkList: [],
      textarea: '',
    }
  },
  methods: {
    changeForm() {

    },
    next(val) {
      this.$emit('next', val)
    }
  },
}
</script>

<style lang="less" scoped>
  .vlt-edit-wrap{
    width: 100%;
    margin: 0 30px;
  }
  .vlt-edit-btn{
    text-align: right;
    margin: 60px 30px 20px;
  }
  .flex-wrap{
    display: flex;
    align-items: center;
  }
</style>
