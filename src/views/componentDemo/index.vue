<template>
  <!--组件展示demo-->
  <div class="component-container">
    <h1 class="headling">组件展示</h1>
    <section class="comp-item">
      <h4 class="comp-title">搜索框</h4>
      <search-bar class="search-bar-demo"
        @search="search"
        :options="searchOptions"
        :total="999"
        labelWidth="80px"
      >
      </search-bar>
    </section>
    <section class="comp-item">
      <h4 class="comp-title">展开框</h4>
      <panel title="彩票信息" :show="true">
        <base-info :infoList="infoList"></base-info>
      </panel>
    </section>
    <section class="comp-item">
      <h4 class="comp-title">展开框-编辑</h4>
      <panel-edit title="彩票信息" :show="true">
        <base-info :infoList="infoList" slot="info-content"></base-info>
      </panel-edit>
    </section>
  </div>
</template>

<script>
export default {
  name: 'componentDemo',
  data() {
    return {
      // 搜索组件配置
      searchOptions: [
        {type: 'input', prop: 'inputName', value: '', title: '输入框', placeholder: '请输入'},
        {
          type: 'select', prop: 'selectName', value: '', title: '选择框', placeholder: '请选择',
          options: [
            {
              label: '选项1',
              value: 1
            },
            {
              label: '选项2',
              value: 2
            }
          ]
        },
        {type: 'datepicker', prop: 'date1', value: '', title: '日期选择', placeholder: '请选择'},
        {type: 'datepicker-range', prop: 'date2', value: '', title: '日期选择', placeholder: ['开始日期', '结束日期']},
        {type: 'datetime', prop: 'date3', value: '', title: '日期时间', placeholder: '请选择'},
        {type: 'datetime-range', prop: 'date4', value: '', title: '日期时间', placeholder: ['开始时间', '结束时间']},
        {
          type: 'cascader', prop: 'cascader1', value: '', title: '级联选择', placeholder: '请选择',
          options: [{
            value: 'zhinan',
            label: '指南',
            children: [{
              value: 'shejiyuanze',
              label: '设计原则',
              children: [{
                value: 'yizhi',
                label: '一致'
              }, {
                value: 'fankui',
                label: '反馈'
              }, {
                value: 'xiaolv',
                label: '效率'
              }, {
                value: 'kekong',
                label: '可控'
              }]
            }, {
              value: 'daohang',
              label: '导航',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }]
          }, {
            value: 'zujian',
            label: '组件',
            children: [{
              value: 'basic',
              label: 'Basic',
              children: [{
                value: 'layout',
                label: 'Layout 布局'
              }, {
                value: 'color',
                label: 'Color 色彩'
              }, {
                value: 'typography',
                label: 'Typography 字体'
              }, {
                value: 'icon',
                label: 'Icon 图标'
              }, {
                value: 'button',
                label: 'Button 按钮'
              }]
            }, {
              value: 'form',
              label: 'Form',
              children: [{
                value: 'radio',
                label: 'Radio 单选框'
              }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
              }, {
                value: 'input',
                label: 'Input 输入框'
              }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
              }, {
                value: 'select',
                label: 'Select 选择器'
              }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
              }, {
                value: 'switch',
                label: 'Switch 开关'
              }, {
                value: 'slider',
                label: 'Slider 滑块'
              }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
              }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
              }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
              }, {
                value: 'upload',
                label: 'Upload 上传'
              }, {
                value: 'rate',
                label: 'Rate 评分'
              }, {
                value: 'form',
                label: 'Form 表单'
              }]
            }, {
              value: 'data',
              label: 'Data',
              children: [{
                value: 'table',
                label: 'Table 表格'
              }, {
                value: 'tag',
                label: 'Tag 标签'
              }, {
                value: 'progress',
                label: 'Progress 进度条'
              }, {
                value: 'tree',
                label: 'Tree 树形控件'
              }, {
                value: 'pagination',
                label: 'Pagination 分页'
              }, {
                value: 'badge',
                label: 'Badge 标记'
              }]
            }, {
              value: 'notice',
              label: 'Notice',
              children: [{
                value: 'alert',
                label: 'Alert 警告'
              }, {
                value: 'loading',
                label: 'Loading 加载'
              }, {
                value: 'message',
                label: 'Message 消息提示'
              }, {
                value: 'message-box',
                label: 'MessageBox 弹框'
              }, {
                value: 'notification',
                label: 'Notification 通知'
              }]
            }, {
              value: 'navigation',
              label: 'Navigation',
              children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
              }, {
                value: 'tabs',
                label: 'Tabs 标签页'
              }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
              }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
              }, {
                value: 'steps',
                label: 'Steps 步骤条'
              }]
            }, {
              value: 'others',
              label: 'Others',
              children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
              }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
              }, {
                value: 'popover',
                label: 'Popover 弹出框'
              }, {
                value: 'card',
                label: 'Card 卡片'
              }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
              }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
              }]
            }]
          }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
              value: 'axure',
              label: 'Axure Components'
            }, {
              value: 'sketch',
              label: 'Sketch Templates'
            }, {
              value: 'jiaohu',
              label: '组件交互文档'
            }]
          }]
        },
      ],
      infoList: [
        {title: '游戏编码', value: '', prop: 'gameCode'},
        {title: '周期类型', value: '', prop: 'cycleType'},
        {title: '游戏状态', value: '', prop: 'gameStatus'},
        {title: '游戏名称', value: '', prop: 'gameName'},
        {title: '游戏类型', value: '', prop: 'officialEndSale'}
      ],
    }
  },
  computed: {

  },
  created() {

  },
  mounted() {
    
  },
  methods: {
    search(form) {
      console.log('search', form)
    },
  },
  components: {

  }
}
</script>


<style lang="less">
@import './less/index.less';
</style>
