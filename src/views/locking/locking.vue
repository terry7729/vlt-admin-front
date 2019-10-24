<template>
  <div class="locking-container">
    <div class="login-bd">
      <el-avatar class="avatar" :src="avatar" v-if="avatar"></el-avatar>
      <el-avatar icon="el-icon-user-solid" class="avatar" v-else></el-avatar>
      <div class="form-item">
        <el-input class="input-box" v-model="password" type="password" size="small" @keyup.enter.native="submit"></el-input>
        <el-button class="enter-btn" icon="el-icon-right" size="small" @click="submit"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import storage from '@/utils/storage'


export default {
  name: 'locking',
  data() {
    return {
      password: '',
      avatar: require('@/assets/img/avatar.jpg')
    }
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    showMessage(msg) {
      this.$message.closeAll();
      this.$message({
        message: msg,
        type: 'warning'
      });
    },
    submit() {
      if (!this.password.trim()) {
        this.showMessage('请输入密码');
        return;
      }
      this.$router.back();
      storage.remove('locked');
    }
  }
}
</script>


<style lang="less">
@import './less/locking.less';
</style>
