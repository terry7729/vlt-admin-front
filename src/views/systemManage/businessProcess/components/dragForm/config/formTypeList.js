/*
说明：
1.该配置为所有表单模板类型名称
2.templates目录下的模板文件命名规则：el-${typeName}.vue
*/
export default [
  {
    type: 'input',
    name: '输入框',
  },
  {
    type: 'select',
    name: '选择器',
  },
  {
    type: 'date',
    name: '日期选择',
  },
  {
    type: 'switch',
    name: 'Switch 开关',
  },
  {
    type: 'checkbox',
    name: '多选框',
  },
  {
    type: 'radio',
    name: '单选框',
  },
  {
    type: 'textarea',
    name: '文本域',
  }
]

