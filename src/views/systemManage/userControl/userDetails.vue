<template>
    <div style="padding: 25px; margin:15px; background:#fff">
        <div class="user-destail">
          
            <div class="user-list">
                <div class="user-title">
                    <span>用户信息</span>
                </div>
                <ul class="user-ifo">
                    <li v-for="(item,index) in destail" :key="index">
                        <p class="title">{{item.title}}</p>
                        <p class="ifo">{{item.ifo}}</p>
                    </li>
                   
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            destail:[
                {
                    title:'姓名',
                    ifo:'超级管理员'
                },
                 {
                    title:'手机号码',
                    ifo:'1384681413'
                },
                 {
                    title:'邮箱',
                    ifo:'1656856831@qq.com'
                },
                 {
                    title:'所属机构',
                    ifo:'超级管理员'
                },
                 {
                    title:'用户账号',
                    ifo:'admin'
                },
                 {
                    title:'部门',
                    ifo:'中心管理部'
                },
                 {
                    title:'所属机构编码',
                    ifo:'11530'
                },
                 {
                    title:'用户状态',
                    ifo:'启用'
                },
                 {
                    title:'创建人',
                    ifo:'sdfs'
                },
                 {
                    title:'创建时间',
                    ifo:'2.19-2-32'
                },
                 {
                    title:'用户角色',
                    ifo:'A部门B部门'
                },
                 {
                    title:'最近登陆次数',
                    ifo:'100'
                },
                {
                    title:'更新人',
                    ifo:'sddde'
                },{
                    title:'更新时间',
                    ifo:'2018-24-15- 15-2-33'
                },{
                    title:'最近登陆时间',
                    ifo:'2018-24-15- 15-2-33'
                },{
                    title:'最近登陆IP',
                    ifo:'10.2.1.44'
                },
            ]
        }
    },
}
</script>

<style lang="less">
@import "./less/index.less";
    
</style>