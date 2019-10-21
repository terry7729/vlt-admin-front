<template>
  <div class="vlt-card">
    <section class="comp-item">
      <panel-static title="基本信息">
        <base-info :infoList="infoList"></base-info>
      </panel-static>
      <panel-static title="客户信息" style="margin-top: 20px">
        <base-info :infoList="infoList2"></base-info>
      </panel-static>
      <panel-static title="绑定记录" style="margin-top: 20px">
        <el-table :data="tableDatas.tableData" border style="width: 100%" class="table-box">
          <el-table-column
            v-for="(item,key) in tableDatas.tableKey"
            :key="key"
            :prop="item.value"
            :label="item.label"
            :width="item.width"
          ></el-table-column>
        </el-table>
      </panel-static>
    </section>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "infoDetail",
  data() {
    return {
      infoList: [
        { title: "批次", value: "xxxxxxxxxx", prop: "batch" },
        { title: "投注卡类型", value: "xxxxx", prop: "cardType" },
        { title: "所属机构", value: "广东省", prop: "affiliation" },
        { title: "投注卡编号", value: "xxxxxxxxxx", prop: "cardNumber" },
        {
          title: "有效日期",
          value: "2019-05-05  ～  2019-10-10 ",
          prop: "date"
        },
        { title: "投注卡状态", value: "已激活", prop: "cardStatus" },
        { title: "开卡渠道", value: "xxxxxxxxxxx", prop: "cardOpeningChannel" }
      ],
      infoList2: [
        { title: "姓名", value: "xxxxxxxxxx", prop: "name" },
        { title: "性别", value: "男", prop: "gender" },
        { title: "年龄", value: "20", prop: "age" },
        { title: "地址", value: "xxxxxxxxxx", prop: "address" },
        { title: "身份证", value: "xxxxxxxxxx", prop: "IDCard" }
      ],
      tableDatas: {
        tableData: [
          {
            id: 0,
            name: '张三',
            tel: '13800138000',
            gender: '男',
            idCard: '44090119009',
            age: '20',
            bindingTime: '2019-05-05 ',
            unbindingTime: '2019-05-05 ',
            cumulativeConsumption: '10,000.00'
          },
          {
            id: 1,
            name: '张三',
            tel: '13800138000',
            gender: '男',
            idCard: '44090119009',
            age: '20',
            bindingTime: '2019-05-05 ',
            unbindingTime: '2019-05-05 ',
            cumulativeConsumption: '10,000.00'
          },
          {
            id: 2,
            name: '张三',
            tel: '13800138000',
            gender: '男',
            idCard: '44090119009',
            age: '20',
            bindingTime: '2019-05-05 ',
            unbindingTime: '2019-05-05 ',
            cumulativeConsumption: '10,000.00'
          },
          {
            id: 3,
            name: '张三',
            tel: '13800138000',
            gender: '男',
            idCard: '44090119009',
            age: '20',
            bindingTime: '2019-05-05 ',
            unbindingTime: '2019-05-05 ',
            cumulativeConsumption: '10,000.00'
          },
          {
            id: 4,
            name: '张三',
            tel: '13800138000',
            gender: '男',
            idCard: '44090119009',
            age: '20',
            bindingTime: '2019-05-05 ',
            unbindingTime: '2019-05-05 ',
            cumulativeConsumption: '10,000.00'
          }
        ],
        tableKey: [
          {
            label: "序号",
            value: "id",
            width: "80"
          },
          {
            label: "姓名",
            value: "name",
            width: "80"
          },
          {
            label: "手机号码",
            value: "tel",
            width: "120"
          },
          {
            label: "性别",
            value: "gender",
            width: "50"
          },
          {
            label: "身份证",
            value: "idCard",
            width: ""
          },
          {
            label: "年龄",
            value: "age",
            width: "50"
          },
          {
            label: "绑定时间",
            value: "bindingTime",
            width: ""
          },
          {
            label: "解绑时间",
            value: "unbindingTime",
            width: ""
          },
          {
            label: "累计消费",
            value: "cumulativeConsumption",
            width: ""
          },
        ]
      }
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.tips-name {
  display: block;
  margin: 20px auto;
  font-size: 14px;
  color: #666;
  font-weight: 600;
}
</style>
