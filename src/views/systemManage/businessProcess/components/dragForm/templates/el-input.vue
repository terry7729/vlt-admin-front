<template>
  <el-form-item :label="config.title || '输入框'" :draggable="draggable" :data-form-type="config.type" :prop="rule ? config.field : ''">
    <el-input v-model="form[config.field]" :placeholder="config.placeholder" :type="config.inputType"></el-input>
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