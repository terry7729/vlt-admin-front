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
   const self = this;
    let id = this.$route.query.id
    let reslt =  await this.$api.QueryRoleInfoDetail({data:id})//查询角色详情
     console.log('查询角色详情',reslt)
      let res = await this.$api.QueryModuleTree();
      console.log(res,'角色新增')
      if(res.code === 0){
        this.isData = res.data
      }
    if(reslt.code === 0){
    // let arr  = Object.keys(reslt.data)
    // let len = this.infoList
    this.infoList.forEach(item => {
        item.value = reslt.data[item.prop]
        if(item.prop === "createTime" || item.prop === "updateTime"){
          item.value = moment(reslt.data[item.prop]).format("YYYY-MM-DD HH:mm:ss")
        }else if(item.prop === 'status'){
          item.value = self.statusChange(reslt.data[item.prop])
        }else if(item.prop === 'roleType'){
          item.value = self.typeChange(reslt.data[item.prop])
        }else if(item.prop === 'moduleIds'){
          let arr = JSON.parse(JSON.stringify(reslt.data[item.prop]))
          item.value = self.getModuleIds(arr)
        }
    });

    }
   
  },
  
  data() {
    return {
      isData : [],
      infoList: [
        { title: "用户角色", value: "", prop: "roleName" },
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
  methods: {
    statusChange(val){
      let options = {
        0:'启用',
        1:'冻结'
      }
      return options[val]
    },
    typeChange(val){
      let options ={
        1:'管理员',
        2:'子管理员',
        3:'普通角色'
      }
      return options[val]
    },
    getModuleIds(val){
      const self = this;
      let a=''
      console.log(val)
      let arr =  val.map(item=>{
      console.log( self.getInsArray(item,'id',self.isData,'text'))
       return self.getInsArray(item,'id',self.isData,'text')
      })
        console.log(arr[arr.length-1])
      if(self.isData.length > 0){
        return arr[arr.length-1].reverse()
      }else{
        return '对不起，未获取到权限列表！'
      }
    },
    getInsArray(id, key, data, keyBack) { // 传入id和key是一样胡  keyBack返回key
    const self = this;
    for (var i in data) {
      if (data[i][key] == id) {
        // return [data[i][key]]; //用于传id 返回id数组
          return [data[i][keyBack]]; //用于传id 返回code数组
      }
      if (data[i].children) {
      let ro = self.getInsArray(id, key, data[i].children, keyBack);
        if (ro !== undefined) {
        return ro.concat(data[i][keyBack]);
        }
      }
    }
  },

  }
};
</script>

<style lang="less" scoped>
</style>
