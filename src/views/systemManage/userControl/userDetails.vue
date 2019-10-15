<template>
  <div class="vlt-card">
    <cell title="用户信息">
      <base-info :infoList="destail"></base-info>
    </cell>
  </div>
</template>


<script>
export default {
  data() {
    return {
      destail: [
        {
          title: "姓名",
          value: "超级管理员",
          prop:''
        },
        {
          title: "手机号码",
          value: "138468,1413",
          prop:''
        },
        {
          title: "邮箱",
          value: "165685,6831@,qq.com",
          prop:''
        },
        {
          title: "所属机构",
          value: "超级管理员",
          prop:''
        },
        {
          title: "用户账号",
          value: "admin",
          prop:''
        },
        {
          title: "部门",
          value: "中心管理部",
          prop:''
        },
        {
          title: "所属机构编码",
          value: "11530",
          prop:''
        },
        {
          title: "用户状态",
          value: "启用",
           prop:''
         },
        {
          title: "创建人",
          value: "sdfs",
          prop:''     
        },
       {
          title: "创建时间",
          value: "2.19,-2,-32",
          prop:''
        },
        {
          title: "用户角色",
          value: "A部门B部门,",
          prop:''
        },
        {
          title: "最近登陆次数",
          value: "100",
          prop:''
        },
        {
          title: "更新人",
          value: "sddde",
          prop:''
        },
        {
          title: "更新时间",
          value: "2018-2,4-15-, 15-2-33",
          prop:''
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