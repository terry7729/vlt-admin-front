<template>
  <el-form-item :label="config.title || '单选框'" :draggable="draggable" :data-form-type="config.type" :prop="rule ? config.field : ''">
    <el-radio-group v-model="form[config.field]">
      <el-radio label="选项1"></el-radio>
      <el-radio label="选项2"></el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script>
export default {
  name: 'formItem',
  props: {
    draggable: {
      default() {
        return true;
      }
    },
    config: {
      default() {
        return {}
      }
    },
    form: {
      default() {
        return {}
      }
    },
    rule: {
      default() {
        return false;
      }
    },
  }
}
</script>