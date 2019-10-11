<template>
    <div style="padding: 25px;" class="store-check">
        <el-tabs  @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
            
        </el-tabs>
    </div>
</template>

<script>
export default {
    name:"check",
    data() {
        return {
            
        }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
}
</script>

<style lang="less" scoped>
.store-check{
    background: white;
    margin:30px 20px;
    border-radius: 8px;
    
}
.el-tabs__content{
    background: #000;
}
</style>