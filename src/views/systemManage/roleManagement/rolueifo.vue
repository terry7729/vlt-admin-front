<template>
  <div  style="padding:16px 16px 66px 16px">
    <panel-static title="彩票信息">
      <base-info :infoList="infoList"></base-info>
    </panel-static>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      infoList: [
        { title: "用户角色", value: "", prop: "rolename" },
        { title: "角色权限", value: "", prop: "rolepower" },
        { title: "创建人", value: "", prop: "gameStatus" },
        { title: "角色状态", value: "", prop: "rolestatus" },
        { title: "角色类型", value: "", prop: "toletype" },
        { title: "更新人", value: "", prop: "updatepeplo" },
        { title: "创建时间", value: "", prop: "setuotime" },
        { title: "更新时间", value: "", prop: "officialEndSale" },
        { title: "描述", value: "", prop: "desc" }
      ]
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
