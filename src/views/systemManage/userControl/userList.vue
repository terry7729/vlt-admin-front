<template>
  <div class="vlt-card">
    <div class="addlist">
      <el-button type="primary" icon="el-icon-plus" @click="add()">新建用户</el-button>
      <el-button>批量删除</el-button>
    </div>
    <div class="hint">
      <elTag :title="title"/>
    </div>
    <div class="from">
      <Tabel />
    </div>

  </div>
</template>

<script>
import elTag from '../../../components/common/tag'
import Tabel from '../../../components/common/tabel'
export default {
  name: "name",
  data() {
    return {
      title:{
        title:'用户角色搜索“中心管理部门”',
        num:10
        },

    };
  },
  computed: {},
  created() {
    this.title.num = 330
    console.log(elTag)
  },
  mounted() {},
  components: {
    elTag,
    Tabel
  },
  methods: {
      add(){
          this.$router.push('userList/userDestails')
      }
  },
};
</script>


<style lang="less">
@import "./less/index.less";
</style>
