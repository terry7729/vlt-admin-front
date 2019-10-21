<template>
  <el-form-item :label="config.title || '开关'" :draggable="draggable" :data-form-type="config.type" :prop="rule ? config.field : ''">
    <el-switch v-model="form[config.field]" :active-text="determine" :inactive-text="negative" ></el-switch>
 
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
  },
  data () {
    return {
      negative: '否',
      determine: '是',
      
    }
  },
  watch: {
    config (newVal, oldVal) {
      console.log('newVal....', newVal);
      this.negative = newVal.switch.negative
      this.determine = newVal.switch.determine;
    }
  },
}
</script>
