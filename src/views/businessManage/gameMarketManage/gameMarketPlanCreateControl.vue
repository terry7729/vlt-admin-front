<template>
  <div class="wrap">
    <panel title="游戏规则" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-double">
        <div class="vlt-edit-wrap">
          <base-form :formData="gameData" labelWidth="90px" ref="baseForm" :rules="rules" direction="top" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="投注规则" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-double">
        <div class="vlt-edit-wrap">
          <base-form :formData="betData" labelWidth="90px" ref="baseForm" :rules="rules" direction="top" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="单次加注金额配置" :show="true" style="margin-bottom:15px">
      <el-form label-position="top" label-width="100px" ref="form"
        :model="eachBetForm"
        :rules="rules"
        class="eachBet-form">
        <el-form-item v-for="(item,index) in eachBetData" :key="index" :label="`${item.title}${index+1}`">
          <el-input v-model="eachBetForm[item.prop]" :placeholder="item.placeholder?`${item.placeholder}`:`请输入${item.title}`"></el-input> 
          <el-button v-if="index!==0" type="text" class="delete" @click="deleteBetMoney(index)">删除</el-button>
        </el-form-item>
      </el-form>
      <el-button class="add-btn" @click="addBetMoney" icon="el-icon-plus">新 增</el-button>
    </panel>
    <panel title="资金规则" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-double">
        <div class="vlt-edit-wrap">
          <base-form :formData="fundsData" labelWidth="90px" ref="baseForm" :rules="rules" direction="top" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="风控规则" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-double">
        <div class="vlt-edit-wrap">
          <base-form :formData="riskData" labelWidth="90px" ref="baseForm" :rules="rules" direction="top" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="自定义设置" :show="true" style="margin-bottom:15px">
      <el-button class="add-btn" @click="addBetMoney" icon="el-icon-plus">新 增</el-button>
    </panel>
    <panel title="信息发布设置" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-single">
        <div class="vlt-edit-wrap">
          <base-form :formData="publishData" labelWidth="90px" ref="baseForm" :rules="rules" direction="top" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <el-row class="vlt-edit-btn">
      <el-button size="medium" @click="prev" class="cancel">上一步</el-button>
      <el-button type="primary" v-prevent="1000" size="medium" @click="next">下一步</el-button>
    </el-row>
  </div>
</template>

<script type="text/javascript">

export default {
  name: "",
  data() {
    return {
      gameData: [
        {title: '游戏状态', type: 'select',  prop: 'gameStatus', value: '', options:[{label: '试玩',value: '1'},{label: '上市',value: '2'}]},
        {title: '消费模式', type: 'select',  prop: 'salesModel', value: '', options:[{label: '账户金额',value: '1'},{label: '试玩积分',value: '2'}]},
        {title: '游戏奖池', type: 'select',  prop: 'status', value: '', options:[{label: '无奖池',value: '0'},{label: '单奖池',value: '1'},{label: '多奖池',value: '2'}]},
        {title: '兑奖权限', type: 'select',  prop: 'salesModel', value: '', options:[{label: '启用',value: '1'},{label: '禁用',value: '2'}]},
        {title: '销售权限', type: 'select',  prop: 'status', value: '', options:[{label: '启用',value: '0'},{label: '禁用',value: '1'}]},
        {title: 'Jackpot比率', type: 'input',  prop: 'phoneNumber', value: ''},
        {title: '返奖比率', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '调节基金比率', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '奖池比率', type: 'input',  prop: 'email', value: ''},
        {title: '游戏兑换比例', type: 'input',  prop: 'rate', value: '',placeholder: '示例1:100 请用英文符号“ : ”'},
        {title: '防沉迷', type: 'select',  prop: 'statusa', value: {label: '启用',value: '0'}, options:[{label: '启用',value: '0'},{label: '禁止',value: '1'}]},
        {title: '游戏规则介绍', type: 'textarea',  prop: 'textarea', value: ''},
        {title: '单次时长', type: 'input',  prop: 'faxaphone', value: ''},
        {title: '单日限额', type: 'input',prop: 'address', value: ''},
      ],
      betData: [
        {title: '单注最小金额', type: 'input',  prop: 'phoneNumber', value: ''},
        {title: '最小投注数', type: 'input',  prop: 'email', value: ''},
        {title: '单注最大金额', type: 'input',  prop: 'phoneNumber', value: ''},
        {title: '最大投注数', type: 'input',  prop: 'email', value: ''},
      ],
      eachBetData: [
        {title: '单次加注金额', type: 'input',  prop: 'eachAdd', value: ''},
      ],
      fundsData: [
        {title: '总发行经费占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '总公益金占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '中福彩发行费占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '中福彩公益金占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '省福彩发行费占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '省福彩公益金占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '市福彩发行费占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '市福彩公益金占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '销售厅发行费占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '销售厅公益金占比', type: 'input',  prop: 'eachAdd', value: ''},
      ],
      riskData: [
        {title: '最低中奖金额', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最低返奖率', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最高中奖金额', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最高返奖率', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最低奖池金额', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最低销量', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最高奖池金额', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最高销量', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最低开机率', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最低在线数量', type: 'input',  prop: 'eachAdd', value: ''},
      ],
      publishData: [
        {title: '发布标题', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '选择机构', type: 'cascader-multiple',  prop: 'eachAdd', value: '',options: [
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
        {title: '发布时间', type: 'datetime-range',  prop: '', value: '', options:['start', 'end']},
        {title: '发布内容', type: 'textarea',  prop: 'eachAdd', value: ''},
      ],
      eachBetForm: {},
      gameForm: {},
      rules: {},
      params: {}
    }
  },
  components: {
  },
  methods: {
    deleteBetMoney(index) {
      this.eachBetData.splice(index, 1)
      console.log('删除', this.deviceData)
    },
    addBetMoney() {
      let cloneData = JSON.parse(JSON.stringify(this.eachBetData[0]))
      cloneData.prop = `${cloneData.eachAdd}${this.eachBetData.length}`
      this.$set(this.eachBetData, this.eachBetData.length, cloneData);
    },
    changeForm(val) {
      Object.assign(this.params, val)
      console.log('派发出来的参数', this.params)
    },
    prev() {
      this.$emit('prev', this.params)
    },
    next() {
      this.$emit('next', this.params)
    }
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
.add-btn{
  width: 100%;
  max-width: 350px;
  margin: 0 0 30px 16px;
}
.delete{
  margin-left: 20px;
}
  .vlt-edit-btn{
    text-align: right;
    margin: 40px 0 40px;
    .el-button{
      width: 120px;
    }
    .cancel{
      margin: 0 50px 0 0;
    }
  }
  .wrap{
    max-width: 900px;
    margin: 0 auto;
  }
</style>
