<template>
  <div class="vlt-card">
    <div class="operationManage">
      <searchBar :options="operationManageoptions" :total="999">
        <controlBar
          slot="extend-bar"
          @select="operationManageAddclick"
          :options="operationManageAddbtn"
        ></controlBar>
      </searchBar>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      operationManageoptions: [
        {
          type: "input",
          prop: "roleManageID",
          value: "",
          title: "账户ID",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "roleManageRoleName",
          value: "",
          title: "角色名称",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "roleManageStatus",
          value: "",
          title: "账户状态",
          placeholder: "请输入",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        {
          type: "select",
          prop: "roleManageUsername",
          value: "",
          title: "用户角色",
          placeholder: "请输入",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        {
          type: "input",
          prop: "roleManageCreater",
          value: "",
          title: "创建人",
          placeholder: "请输入"
        },
        {
          type: "datetime-range",
          prop: "roleManageCreateDate",
          value: "",
          title: "创建时间",
          options: ["start", "end"]
        }
      ],
      operationManageAddbtn: [{ name: "新增", type: "primary", icon: "plus" }]
    };
  },
  components: {},
  methods: {
    operationManageAddclick() {}
  }
};
</script>

<style lang="less" scoped>
</style>
