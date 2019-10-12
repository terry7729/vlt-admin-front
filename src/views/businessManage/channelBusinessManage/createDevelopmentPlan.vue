<template>
  <div class="vlt-card">
    <div class="vlt-edit-single">
      <h2 class="title">基础信息</h2>
      <div class="vlt-edit-wrap">
          <el-form
            label-position="right"
            label-width="90px"
            :model="form"
            ref="form"
          >
            <el-form-item label="单注金额">
              <el-input v-model="form.singleAmount"></el-input>
            </el-form-item>
            <el-form-item label="最小倍数">
              <el-input v-model="form.minMultiple"></el-input>
            </el-form-item>
            <el-form-item label="最小注数">
              <el-input v-model="form.mixBet"></el-input>
            </el-form-item>
            <el-form-item label="投注权限" prop="bet">
              <el-select v-model="form.bet" placeholder="请选择">
                <el-option
                  v-for="item in betOption"
                  @click.native="changeBet(item)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="注销权限" prop="logOff">
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
            <el-form-item label="兑奖权限" prop="cash">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="form.textarea"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-row class="vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="save">提交并保存</el-button>
            <el-button size="medium" @click="editShow = !editShow">取消</el-button>
          </el-row>
        </div>
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
        mixBet: '',
        bet: '',
        logOff: '',
        textarea: '',
      },
    }
  },
  components: {
  },
  methods: {
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
</style>
