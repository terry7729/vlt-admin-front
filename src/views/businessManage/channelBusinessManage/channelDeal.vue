<template>
  <div>
    <div class="vlt-card">
      <h2 class="title">业务办理</h2>
      <div class="vlt-card-wrap">
        <div class="vlt-card-item"
          v-for="(item,index) in data" 
          :key="index">
          <div class="vlt-card-box" @click="select(item)">{{item.title}}</div>
        </div>
      </div>
    </div>
    <div class="vlt-card">
      <h2 class="title">权限控制</h2>
      <div class="vlt-card-wrap">
        <div class="vlt-card-item" v-for="(item,index) in permissionData" :key="index">
          <div class="vlt-card-box" @click="select(item)">{{item.title}}</div>
        </div>
      </div>
    </div>
    <div class="vlt-card">
      <h2 class="title">渠道资源</h2>
      <div class="vlt-card-wrap">
        <div class="vlt-card-item" v-for="(item,index) in  resourceData" :key="index">
          <div class="vlt-card-box" @click="select(item)">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

export default {
  name: "",
  data() {
    return {
      data: [
        {title: '渠道新建'},
        {title: '渠道变更'},
        {title: '渠道迁址及关停'},
        {title: '渠道过户'},
        {title: '渠道增机'},
        {title: '渠道退机'},
        {title: '渠道移机'},
      ],
      permissionData: [
        {title: '销售权限'},
        {title: '费率调整'},
        {title: '资金权限'},
      ],
      resourceData: [
        {title: '资源采购'},
        {title: '资源申请'},
        {title: '资源发放'},
        {title: '资源调拨'},
        {title: '资源报废'},
      ]
    }
  },
  components: {
  },
  methods: {
    select(val) {
      if(val.title=='渠道新建') {
        this.$router.push({path:'./channelCreate',query:{id:123}})
      } else if(val.title=='销售权限') {
        this.$router.push({path:'./channelSalesPermission',query:{id:123}})
      } else if(val.title=='资金权限') {
        this.$router.push({path:'./channelFundsPermission',query:{id:123}})
      } else if(val.title=='资源采购') {
        this.$router.push({path:'./resourcePurchase',query:{id:1}})
      } else if(val.title=='资源申请') {
        this.$router.push({path:'./resourceApply',query:{id:2}})
      } else if(val.title=='资源发放') {
        this.$router.push({path:'./resourceProvide',query:{id:3}})
      } 
    }
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
.title{
  border-bottom: 1px solid #e8eaec;
  padding: 14px 16px;
  line-height: 20px;
  font-size: 14px;
  color: #444444;
  font-weight: 700;
}
.vlt-card{
  margin-bottom: 20px;
}
.vlt-card-wrap{
  display: flex;
  flex-wrap: wrap;
}
.vlt-card-item{
  flex: 15%;
  max-width: 170px;
  height: 200px;
  padding: 25px 10px;
}
.vlt-card-box{
  width: 100%;
  height: 100%;
  border: 1px solid #e8eaec;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
