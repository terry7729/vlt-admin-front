<template>
<!-- 型号管理设备查看页面 -->
 <div class="vlt-card basic-info">
   <panel-static title="设备类型查看" style="margin-bottom:20px">
      <base-info :infoList="typeInfoList"></base-info>
   </panel-static>
   <panel-static title="设备型号信息">
      <base-info :infoList="modelInfoList"></base-info>
      <div class="base-info">
        <span class="picture">图片:</span>
        <el-image class="image" style="width: 100px; height: 100px" :src="url" fit="contain"></el-image>
        <el-image class="image" style="width: 100px; height: 100px" :src="url" fit="contain"></el-image>
        <el-image class="image" style="width: 100px; height: 100px" :src="url" fit="contain"></el-image>
        <el-image class="image" style="width: 100px; height: 100px" :src="url" fit="contain"></el-image>
      </div>
   </panel-static>
 </div>
</template>

<script type="text/javascript">
export default {
 name: "modelEquipmentCheck",
 data() {
 return {
   url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
   typeInfoList: [
      { title: "设备名称", value: "", prop: "goodsName" },
      { title: "设备单位", value: "", prop: "deviceUnit" },
      { title: "是否标配", value: "", prop: "isStandard" },
      { title: "是否回收", value: "", prop: "isRecovery" },
      { title: "备注", value: "", prop: "remark" }
    ],
  modelInfoList:[
      { title: "设备型号", value: "", prop: "deviceModel" },
      { title: "设备单价", value: "", prop: "unitPrice" },
      { title: "供应商", value: "", prop: "providerId" },
      { title: "厂家信息", value: "", prop: "manufactorInfo" },
      { title: "预警上限", value: "", prop: "upperLimit" },
      { title: "预警下限", value: "", prop: "lowerLimit" },
      { title: "备注", value: "", prop: "remark" }
  ],
  imgUrlList:[]

}
},
components: {
},
created(){
  this.modelDetail()
},
methods: {
  async modelDetail(){
    const self = this
    const data = self.$route.query.id
    let isRecovery ={
      1:'是',
      2:'否'
    }
    let isStandard ={
      1:'是',
      2:'否'
    }
    console.log(data)
    let res = await self.$api.modelCheck({data})
    console.log(res)
    if(res && res.code == 0){
      this.imgUrlList.push(res.data.goodsModelVo.files)
      console.log(this.imgUrlList)
      this.typeInfoList.forEach(item =>{
        item.value = res.data[item.prop]
        if(item.prop == 'isStandard'){
          item.value = isStandard[res.data.isStandard]
        }
        if(item.prop == 'isRecovery'){
          item.value = isRecovery[res.data.isRecovery]
        }
      })
      this.modelInfoList.forEach(item =>{
        item.value = res.data.goodsModelVo[item.prop]
      })
    }
  }
},
}
</script>

<style lang="less">
.basic-info{
  .base-info{
    position: relative;
  .image{
    margin-left: 58px;
    margin-top: -24px
  }
  .picture{
    position: absolute;
  }
  }
  
}
</style>
