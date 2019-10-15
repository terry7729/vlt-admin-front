<template>
  <div class="vlt-card">
    <div class="roleManageExamine">
      <panel title="角色信息" :show="true">
        <base-Info :infoList="roleManageExamineData"></base-Info>
      </panel>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      roleManageExamineData: [
        { title: "用户角色", value: "", prop: "userrole" },
        { title: "角色权限", value: "", prop: "userauthority" },
        { title: "描述", value: "", prop: "describe" },
        { title: "创建人", value: "", prop: "createpeople" },
        { title: "创建时间", value: "", prop: "createdate" },
        { title: "更新人", value: "", prop: "updatepeople" },
        { title: "更新时间", value: "", prop: "updatetime" },
        { title: "角色状态", value: "", prop: "rolestatus" }
      ]
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
