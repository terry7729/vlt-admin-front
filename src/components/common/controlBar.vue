<template>
  <div class="control-bar-comp">
    <span v-for="(item, index) in options" :key="index">
      <el-button size="small" icon="el-icon-delete" v-if="item.type === 'delete'" @click="item.change">批量删除</el-button>
      <el-button size="small" icon="el-icon-document" type="primary" v-if="item.type === 'export'" @click="item.change">导出</el-button>
      <el-button size="small" icon="el-icon-printer" type="success" v-if="item.type === 'print'" @click="item.change">打印</el-button>
      <el-button size="small" type="warning" icon="el-icon-setting" v-if="item.type === 'refresh'" @click="item.change">刷新</el-button>
      <el-button size="small" icon="el-icon-circle-plus-outline" type="danger" v-if="item.type === 'add'" @click="item.change">新增</el-button>
    </span>
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
