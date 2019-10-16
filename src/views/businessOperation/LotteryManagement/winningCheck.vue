<template>
  <div class="vlt-card">中奖查询</div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      searchOptions: [
        { title: "账户昵称", type: "input", prop: "inputName", value: "" },
        { title: "手机号", type: "input", prop: "date1", value: "" },
        {
          title: "账户类型",
          type: "select",
          prop: "selectName",
          value: "",
          options: [
            {
              label: "识别客户",
              value: 1
            },
            {
              label: "会员客户",
              value: 2
            }
          ]
        },

        {
          title: "注册区域",
          type: "select",
          prop: "date4",
          value: "",
          options: [
            {
              label: "区域1",
              value: 3
            },
            {
              label: "区域2",
              value: 4
            }
          ]
        }
      ],
      tableData: [
        {
          num: 1,
          accountName: "flypig",
          phoneNum: "17620465151",
          balance: "18888",
          area: "深圳",
          time: "2019-10-14",
          type: ""
        }
      ]
    };
  },
  components: {},
  methods: {
    accountDetail(account) {
      this.$router.push({ path: "accountDetail", query: account });
    },
    search() {},
    pageSizeChange(size) {
      // this.PAGESIZE = size;
      // this.$emit("handleSizeChange", size);
    },
    pageCurrentChange(page) {
      // this.CURRENTPAGE = page;
      // this.$emit("handleCurrentChange", page);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
