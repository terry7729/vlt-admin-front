<template>
    <div class="vlt-card store-check">
        <el-tabs v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane label="游戏详情" name="first">游戏详情</el-tab-pane>
            <el-tab-pane label="试玩记录" name="second">试玩记录</el-tab-pane>
            <el-tab-pane label="上市记录" name="third">上市记录</el-tab-pane>
            <el-tab-pane label="退市记录" name="fourth">退市记录</el-tab-pane>
            
        </el-tabs>
    </div>
</template>

<script>
export default {
    name:"check",
    data() {
        return {
            activeName: "first",
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