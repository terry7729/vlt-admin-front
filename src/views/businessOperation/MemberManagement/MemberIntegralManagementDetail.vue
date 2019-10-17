<template>
  <div class="vlt-card">
    <div class="MemberIntegraDetail">
      <panel-static title="会员积分详情" style="margin-top: 10px;">
        <base-info :infoList="MemberIntegraDetailList"></base-info>
      </panel-static>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      MemberIntegraDetailList: [
        { title: "规则ID", value: "", prop: "MemberIntegraDetailID" },
        { title: "规则名称", value: "", prop: "MemberIntegraDetailName" },
        { title: "额度", value: "", prop: "MemberIntegraDetailLimit" },
        { title: "积分类型", value: "", prop: "MemberIntegraDetailType" },
        { title: "积分", value: "", prop: "MemberIntegraDetailIntegral" },
        { title: "规则描述", value: "", prop: "MemberIntegraDetailDescribe" },
        { title: "操作员ID", value: "", prop: "MemberIntegraDetailOperatorId" },
        {
          title: "操作员名称",
          value: "",
          prop: "MemberIntegraDetailOperatorName"
        },
        { title: "创建时间", value: "", prop: "MemberIntegraDetailCreateDate" },
        { title: "更新时间", value: "", prop: "MemberIntegraDetailUpdateDate" }
      ]
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
