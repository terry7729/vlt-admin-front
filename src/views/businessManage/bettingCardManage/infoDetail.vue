<template>
  <div class="vlt-card">
    <section class="comp-item">
      <panel-static title="基本信息">
        <base-info :infoList="infoList"></base-info>
      </panel-static>
      <panel-static title="客户信息" style="margin-top: 20px">
        <base-info :infoList="infoList2"></base-info>
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
        { title: "有效日期", value: "2019-05-05  ～  2019-10-10 ", prop: "date" },
        { title: "投注卡状态", value: "已激活", prop: "cardStatus" },
        { title: "开卡渠道", value: "xxxxxxxxxxx", prop: "cardOpeningChannel" }
      ],
      infoList2: [
        { title: "姓名", value: "xxxxxxxxxx", prop: "name" },
        { title: "性别", value: "男", prop: "gender" },
        { title: "年龄", value: "20", prop: "age" },
        { title: "地址", value: "xxxxxxxxxx", prop: "address" },
        { title: "身份证", value: "xxxxxxxxxx", prop: "IDCard" },
      ]
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
