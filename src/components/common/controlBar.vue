<template>
  <div class="control-bar-comp">
    <el-button 
      size="small" 
      v-for="(item, index) in options" 
      :key="index" :icon="`el-icon-${item.icon}`"
      @click="select(item)"
      :type="item.type"
    >
      {{item.name}}
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'controlBar',
    props: {
      // 配置参数
      options: {
        default() {
          return [
            // {
            //   type: 'delete', // 按钮类型
            //   name: '按钮名称', // 按钮名称
            //   change() { // 点击执行
            //     console.log('clicked')
            //   }
            // }
          ]
        }
      },
    },
    data() {
      return {
        
      };
    },
    methods: {
      select(val) {
        this.$emit('select', val)
      }
    }
  }
</script>

<style lang="less" scoped>
  .control-bar-comp{
    margin: 10px 0;
    .el-button{
      margin: 0 5px;
    }
  }
</style>
