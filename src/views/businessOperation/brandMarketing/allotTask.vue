<template>
  <div class="vlt-card allot-task">
    <section class="comp-item">
      <div class="vlt-edit-double">
        <div class="vlt-edit-wrap">
          <el-form
            label-position="top"
            label-width="90px"
            :model="form"
            ref="form"
            class="device-add"
          >
            <el-form-item label="活动编号">
              <el-select v-model="form.logOff" placeholder="请选择">
                <el-option
                  v-for="item in logOffOption"
                  @click.native="changeLogOff(item)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="执行编号">
              <el-select v-model="form.logOff" placeholder="请选择">
                <el-option
                  v-for="item in logOffOption"
                  @click.native="changeLogOff(item)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="执行人">
              <el-select v-model="form.logOff" placeholder="请选择">
                <el-option
                  v-for="item in logOffOption"
                  @click.native="changeLogOff(item)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务名">
              <el-input v-model="form.mixBet"></el-input>
            </el-form-item>
            <el-form-item label="任务描述">
              <el-input v-model="form.mixBet"></el-input>
            </el-form-item>
            <el-form-item></el-form-item>

            <el-form-item class="formTime" label="生效时间">
              <el-date-picker v-model="form.satartTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>

            <el-form-item class="formTime" label="截止时间">
              <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>

            <el-row class="el-form-item vlt-edit-btn">
              <el-button type="primary" v-prevent="1000" size="medium" @click="save">提交并保存</el-button>
              <el-button size="medium" @click="editShow = !editShow">取消</el-button>
            </el-row>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      logOffOption: [],
      form: {
        singleAmount: "",
        minMultiple: "",
        mixBet: "",
        bet: "",
        logOff: "",
        textarea: "",
        satartTime: "",
        endTime: ""
      }
    };
  },
  methods: {
    save() {
      this.$router.push({ path: "executionManage" });
    },
    changeLogOff() {}
  },
  components: {}
};
</script>

<style lang="less" >
@import "./less/allotTask";
</style>
