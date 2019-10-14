<template>
 <div >
    <div class="vlt-edit-wrap">
            <el-form
              label-position="right"
              label-width="90px"
              :model="form"
              :rules="rules"
              ref="form"
            >
              <el-form-item label="类型">
                <el-input v-model="form.singleAmount" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="名称" prop="minMultiple">
                <el-input v-model="form.minMultiple"></el-input>
              </el-form-item>
              <el-form-item label="路径" prop="mixBet">
                <el-input v-model="form.mixBet"></el-input>
              </el-form-item>
              <el-form-item label="路由英文名" prop="bet">
                <el-input v-model="form.bet"></el-input>
              </el-form-item>
              <el-form-item label="图标" prop="logOff">
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
              <el-form-item label="排序值" prop="cash">
                <el-input placeholder="请输入内容" v-model="form.textarea"></el-input>
              </el-form-item>
              <el-form-item label="是否敏感操作">
                <el-switch
                  style="display: block"
                  v-model="form.value1"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
              <el-form-item label="是否启用">
                <el-switch
                  style="display: block"
                  v-model="form.value2"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
            </el-form>
            <el-row class="vlt-edit-btn">
              <el-button
                type="primary"
                v-prevent="1000"
                size="medium"
                @click="save(form,'form')"
              >提交并保存</el-button>
              <el-button size="medium" @click="resestFrom('form')">重置</el-button>
            </el-row>
    </div>
 </div>
</template>

<script type="text/javascript">
export default {
 name: "",
 data() {
 return {
form: {
        singleAmount: "",
        minMultiple: "",
        mixBet: "",
        bet: "",
        logOff: "",
        textarea: "",
        value1: true,
        value2: true
      },
 }
 },
 components: {
 },
 methods: {
    save(val, formName) {
      console.log(val);
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resestFrom(formName) {
      this.$refs[formName].resetFields();
    },
 },
}
</script>

<style lang="less" scoped>
</style>
