<template>
  <div class="vlt-card info-edit">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="公告模板" name="template">
        <section class="comp-item">
          <div class="vlt-edit-single">
            <div class="vlt-edit-wrap form-detail">
              <h3>基本信息</h3>
              <el-form label-width="90px" :model="form" ref="form">
                <base-form
                  :formData="baseInfo"
                  labelWidth="140px"
                  ref="baseForm"
                  :rules="rule"
                  direction="right"
                  :disabled="disabled"
                  @change="changeForm"
                ></base-form>
              </el-form>
            </div>
          </div>
        </section>
      </el-tab-pane>
      <el-tab-pane label="公告模板流程图" name="processImg">
        <div class="process-img">
          <img src="../../../assets/img/avatar.jpg" alt />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      rule: { rule: "" },
      activeName: "template",
      disabled: true,
      title:123,
      form: {
      
      },
      baseInfo: [
        { type: "input", title: "推送标题", prop: "title", disabled: false },
        {
          type: "select",
          title: "选择模板",
          prop: "template",
          disabled: true,
          options: [
            { label: "模板1", value: "0" },
            { label: "模板2", value: "1" }
          ]
        },
        {
          type: "select",
          title: "选择机构",
          prop: "organ",
          disabled: false,
          options: [
            { label: "全国", value: "2" },
            { label: "广东省", value: "3" }
          ]
        },
        {
          type: "datepicker-range",
          prop: "time",
          value: "",
          title: "发布时间",
          disabled: false,
          options: ["start", "end"]
        },

        { type: "textarea", title: "备注内容", prop: "all", disabled: false }
      ]
    };
  },
  components: {},
  methods: {
    changeForm(val) {
      this.form=val;
      console.log(this.form)
    },
    handleClick() {}
  },
  created() {
    if (this.$route.query.id) {
      for (let item of this.baseInfo) {
        item.disabled = true;
     
      }
    }
  }
};
</script>

<style lang="less" scoped>
.info-edit {
  .process-img {
    margin-left: 150px;
  }
}
</style>
