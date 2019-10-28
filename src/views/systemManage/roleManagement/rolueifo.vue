<template>
  <div  style="padding:16px 16px 66px 16px">
    <panel-static title="角色信息">
      <base-info :infoList="infoList"></base-info>
    </panel-static>
  </div>
</template>

<script type="text/javascript">
import moment from 'moment'
export default {

  name: "rolueifo",
 async created() {
    let id = this.$route.query.id
    let reslt =  await this.$api.QueryRoleInfoDetail({data:id})//查询角色详情
    // this.infoList = reslt.data
     console.log('查询角色详情',reslt)
    if(reslt.code === 0){
    let arr  = Object.keys(reslt.data)
    let len = this.infoList
    for(var i = 0 ; i < len.length ; i++ ){
      for(var j = 0 ; j< arr.length ; j++){
        if(arr[j]===len[i].prop){
          if(arr[j] === 'createTime' || arr[j] === 'updateTime'){
           len[i].value = moment(reslt.data[arr[j]]).format("YYYY-MM-DD HH:mm:ss")
          }else{
            len[i].value = reslt.data[arr[j]]
          }
          
        }
      }
    }
    }
   
  },
  
  data() {
    return {
      infoList: [
        { title: "用户角色", value: "", prop: "rolename" },
        { title: "角色权限", value: "", prop: "moduleIds" },
        { title: "创建人", value: "", prop: "createBy" },
        { title: "角色状态", value: "", prop: "status" },
        { title: "角色类型", value: "", prop: "roleType" },
        { title: "更新人", value: "", prop: "updateBy" },
        { title: "创建时间", value: "", prop: "createTime" },
        { title: "更新时间", value: "", prop: "updateTime" },
        { title: "描述", value: "", prop: "roleDesc" }
      ]
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
