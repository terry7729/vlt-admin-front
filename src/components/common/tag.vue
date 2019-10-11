<template>
    <div>
        <el-tag size="medium"><i class="el-icon-info"></i><span>{{title.title}}</span>共搜索到<span class="span-item">{{title.num}}</span>条数据</el-tag>
    </div>
</template>


<script>
export default {
    name:'tag',
    props:['title']
}
</script>

<style lang="less">
     .el-tag--medium {
        height: 38px;
        line-height: 38px;
        width: 100%;
        color: #515a6e;
        i{
            color: #2d8cf0;
            padding-right:5px;
        }
        .span-item{
            color:#2d8cf0;
            padding: 0 4px;
        }
    }   
</style>