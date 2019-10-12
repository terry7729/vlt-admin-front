<template>
  <div class="vlt-card">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    </el-tabs>
    <div class="vlt-edit-single">
      <h2 class="title">编辑</h2>
      <div class="vlt-edit-wrap">
        <el-form
          label-position="right"
          label-width="90px"
          :model="form"
          ref="form"
          class="device-add"
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
          <el-button type="primary" size="medium" @click="save">提交并保存</el-button>
          <el-button size="medium" @click="editShow = !editShow">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "channelList",
  data() {
    return {
      activeName: "first",
      form: {
        singleAmount: "",
        minMultiple: "",
        mixBet: '',
        bet: '',
        logOff: '',
        textarea: '',
      }
    };
  },
  created() {},
  methods: {
    handleClick() {},
    add() {
      console.log("a");
    }
  },
  components: {}
};
</script>


<style lang="less" scoped>
@import "./less/index.less";
</style>
