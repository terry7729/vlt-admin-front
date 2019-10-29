<template>
  <div class="vlt-card">
    <panel-static title="用户信息">
      <base-info :infoList="destail"></base-info>
    </panel-static>
  </div>
</template>


<script>
export default {
  name:'userDetails',
 async created() {
    let id = this.$route.query.id
    let reslt =await this.$api.getUserDestils({data:id})
    console.log(reslt)
    if(reslt.code === 0){
        let arr = Object.keys(reslt.data)
        this.destail.forEach(item => {
            arr.forEach(i =>{
              if(item.prop === i){
                item.value = reslt.data[i]
              }
            })
        });

    }
    console.log(reslt)
  },
  data() {
    
    return {
      destail: [
        {
          title: "姓名",
          value: "超级管理员",
          prop:'userName'
        },
        {
          title: "手机号码",
          value: "138468,1413",
          prop:'mobile'
        },
        {
          title: "邮箱",
          value: "165685,6831@,qq.com",
          prop:'email'
        },
        {
          title: "所属机构",
          value: "超级管理员",
          prop:''
        },
        {
          title: "用户账号",
          value: "admin",
          prop:'account'
        },
        {
          title: "部门",
          value: "中心管理部",
          prop:'departName'
        },
        {
          title: "所属机构编码",
          value: "11530",
          prop:'insName'
        },
        {
          title: "用户状态",
          value: "启用",
           prop:'userStatus'
         },
        {
          title: "创建人",
          value: "sdfs",
          prop:'createBy'     
        },
       {
          title: "创建时间",
          value: "2.19,-2,-32",
          prop:'createTime'
        },
        {
          title: "用户角色",
          value: "A部门B部门,",
          prop:'roleName'
        },
        {
          title: "最近登陆次数",
          value: "100",
          prop:''
        },
        {
          title: "更新人",
          value: "sddde",
          prop:'updateBy'
        },
        {
          title: "更新时间",
          value: "2018-2,4-15-, 15-2-33",
          prop:'updateTime'
        },
        {
          title: "最近登陆时间",
          value: "2018-2,4-15-, 15-2-33",
          prop:''
        },
        {
          title: "最近登陆IP",
          value: "10.2.1,.44",      
          prop:''
       }
      ]
    };
  }
};
</script>

<style lang="less">
@import "./less/index.less";
</style>