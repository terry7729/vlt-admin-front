<template>
  <div class="vlt-card">
    <panel-static title="用户信息">
      <base-info :infoList="destail"></base-info>
    </panel-static>
  </div>
</template>


<script>
import moment from 'moment'
export default {
  name:'userDetails',
  data() {
    return {
      destail: [
        {title: "姓名",value: "",prop:'userName'},
        {title: "手机号码",value: "",prop:'mobile'},
        {title: "邮箱",value: "",prop:'email'},
        {
          title: "所属机构",
          value: "",
          prop:'insInfoList'
        },
        {
          title: "用户账号",
          value: "",
          prop:'account'
        },
        {
          title: "部门",
          value: "",
          prop:'deptInfoList'
        },
        {
          title: "所属机构编码",
          value: "",
          prop:'insCode'
        },
        {
          title: "用户状态",
          value: "",
           prop:'userStatus'
         },
        {
          title: "创建人",
          value: "",
          prop:'createBy'     
        },
       {
          title: "创建时间",
          value: "",
          prop:'createTime'
        },
        {
          title: "用户角色",
          value: "",
          prop:'roleInfoList'
        },
        {
          title: "最近登陆次数",
          value: "",
          prop:'loginCount'
        },
        {
          title: "更新人",
          value: "",
          prop:'updateBy'
        },
        {
          title: "更新时间",
          value: "",
          prop:'updateTime'
        },
        {
          title: "最近登陆时间",
          value: "",
          prop:'loginTime'
        },
        {
          title: "最近登陆IP",
          value: "",      
          prop:'loginIp'
       }
      ]
    };
  },
 async created() {
   const self = this
    let id = this.$route.query.id
    let reslt =await this.$api.getUserDestils({data:id})
    if(reslt.code === 0){
        
        let data =JSON.parse(JSON.stringify( reslt.data))
        data = {
          ...data.userLoginLogVo,
          ...data,
        }
        console.log(this.dataTreating(data.deptInfoList,"departmentName"))

        // return
        let arr = Object.keys(data)
        this.destail.forEach(item => {
          item.value = data[item.prop];
          if(item.prop =='userStatus') {
            item.value = self.change(data[item.prop])
          }else if(item.prop === "roleInfoList"){
            item.value = self.dataTreating(data[item.prop],'roleName')
          }else if(item.prop === "insInfoList"){
            item.value = self.dataTreating(data[item.prop],'insName')
          }else if(item.prop === "deptInfoList"){
            item.value = self.dataTreating(data[item.prop],"departmentName")
          }else if(item.prop === "updateTime" || item.prop === "createTime" || item.prop === "loginTime"){
            item.value = moment(data[item.prop]).format("YYYY-MM-DD HH:mm:ss")
          }else if(item.prop === "insCode"){
             item.value = self.dataTreating(data[item.prop],"insCode")
          }

        });

    }
    console.log(reslt)
  },

  methods: {
    change(val) {
      let options={
        0:'启用',
        1:'禁用'
      }
      return options[val]
    },
    dataTreating(val,name){
      let n ='';
      if(val != null && val.length>0){
        for(var i = 0 ; i<val.length ; i++){
          n += (val[i][name]+',')
        
        }
      }
       return n
    }
      
  },
};
</script>

<style lang="less">
@import "./less/index.less";
</style>