<template>
  <div class="control-bar-comp">
    <el-button size="small" icon="el-icon-delete">批量删除</el-button>
    <el-button size="small" icon="el-icon-document" type="primary">导出</el-button>
    <el-button size="small" icon="el-icon-printer" type="success">打印</el-button>
    <el-button size="small" type="warning" icon="el-icon-setting">刷新</el-button>
    <el-button size="small" icon="el-icon-circle-plus-outline" type="danger">新增</el-button>
  </div>
</template>

<script>
  export default {
    name: 'controlBar',
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
      
    }
  }
</style>
