<template>
 <div class="vlt-card equipmentDetail-page">
      <panel-static title="基础信息">
        <div class="vlt-edit-single">
          <div class="vlt-edit-wrap">
            <base-info :infoList="infoList"></base-info>
            <el-row class="vlt-edit-btn">
             <el-button type="primary" v-prevent="1000" size="medium" @click="submit">确定</el-button>
             <el-button size="medium" @click="cancel('form')">取消</el-button>
            </el-row>
          </div>
        </div>
      </panel-static>
 </div>
</template>

<script type="text/javascript">
export default {
 name: "equipmentDetail",
 data() {
 return {
   infoList: [
        { title: "设备名称", value: "12454646465464611313", prop: "equipmentName" },
        { title: "设备型号", value: "", prop: "equipmentType" },
        { title: "设备编码", value: "", prop: "equipmentCode" },
        { title: "存放位置", value: "", prop: "depositLocation" },
        { title: "使用状态", value: "", prop: "useState" },
        { title: "设备状态", value: "", prop: "equipmentState" },
        { title: "入库时间", value: "", prop: "putStoreTime" }
      ],
   
 }
 },
 components: {
 },
 methods: {
   submit() {
     this.$router.back();

   },
   cancel() {
     this.$router.back();
   },
   
 },
}
</script>

<style lang="less">
.equipmentDetail-page{
  p{width: 392px;height: 40px;border-radius: 5px}
  .title{
    border-bottom:none;
  }
  .base-info{
    padding: 0px 40px
  }
  .base-info .info-list{
    flex-flow: column
  }
  .base-info .info-list .content{
    font-size: 16px;
    border: 1px solid rgb(233, 228, 228);
    padding: 8px 10px;
  }
  .vlt-edit-btn{
    margin-top: 20px;
  }
}
</style>
