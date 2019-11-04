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
    // this.loginOut();
    storage.set('locked', true);
  },
  mounted() {

  },
  methods: {
    showMessage(msg) {
      this.$message.closeAll();
      this.$message.error(msg);
    },
    async loginOut() {
      const self = this;
      const res = await self.$api.getLogOut();
      if (res && res.code == 0) {
        
      }
    },
    async submit() {
      if (!this.password.trim()) {
        this.showMessage('请输入密码');
        return;
      }
      const res = await this.$api.getLogin({
        data: {
          account: storage.get('userInfo').account,
          password: this.password
        }
      });
      if (res && res.code === 0) {
        storage.set("token", res.data.token);
        storage.set("userInfo", res.data);
        this.$router.back();
        storage.remove('locked');
      }
    }
  }
}
</script>


<style lang="less">
@import './less/locking.less';
</style>
