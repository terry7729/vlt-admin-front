<template>
  <div class="vlt-card">
    <div class="MemberEquityDetail">
      <panel-static title="会员权益详情" style="margin-top: 10px;">
        <base-info :infoList="MemberEquityDetailList"></base-info>
      </panel-static>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      MemberEquityDetailList: [
        { title: "权益ID", value: "", prop: "MemberEquityDetailID" },
        { title: "权益名称", value: "", prop: "MemberEquityDetailName" },
        { title: "权益编码", value: "", prop: "MemberEquityDetailNum" },
        { title: "最低级别", value: "", prop: "MemberEquityDetailRank" },
        { title: "权益状态", value: "", prop: "MemberEquityDetailStatus" },
        { title: "权益描述", value: "", prop: "MemberEquityDetailDescribe" },
        { title: "创建时间", value: "", prop: "MemberEquityDetailCreateDate" },
        { title: "更新时间", value: "", prop: "MemberEquityDetailUpdateDate" }
      ]
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
