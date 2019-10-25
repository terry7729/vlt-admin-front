<template>
  <div class="vlt-card">
    <div class="roleManageExamine">
      <panel-static title="角色信息" :show="true">
        <base-Info :infoList="roleManageExamineData"></base-Info>
      </panel-static>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      // 表格数据
      roleManageExamineData: [
        { title: "用户角色", value: "", prop: "roleName" },
        { title: "角色权限", value: "", prop: "roleTypes" },
        { title: "描述", value: "", prop: "remark" },
        { title: "是否为经理", value: "", prop: "isManager" },
        { title: "创建人", value: "", prop: "createBy" },
        { title: "创建时间", value: "", prop: "createTime" },
        { title: "更新人", value: "", prop: "updateBy" },
        { title: "更新时间", value: "", prop: "updateTime" },
        { title: "角色状态", value: "", prop: "status" }
      ]
    };
  },
  components: {},
  async created() {
    let id = this.$route.query.id;
    let result = await this.$api.roleDetail(id);
    //console.log(result);
    result.data.roleTypes = result.data.roleTypes.join(",");
    console.log(result);
    let arr = Object.keys(result.data);
    let ExamineData = this.roleManageExamineData;
    for (var i = 0; i < ExamineData.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (ExamineData[i].prop === arr[j]) {
          ExamineData[i].value = result.data[arr[j]];
        }
      }
    }

    console.log(result);
  },
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
