<template>
  <el-dialog
    title="提示"
    :visible.sync="show"
    width="30%"
    :before-close="handleClose"
    class="dialog-form"
  >
    <span>弹出表单</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/javascript">
export default {
  name: "dialogForm",
  props: {
    showForm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: this.showForm
    };
  },
  watch: {
    showForm (value) {
      this.show = value
    } 
  },
  components: {},
  methods: {
    handleClose () {
      console.log('close');
    },
    close () {
      console.log();
      this.$emit('closeDia');
    },
    submit () {
      console.log();
    }
  }
};
</script>

<style lang="less" scoped>
</style>
