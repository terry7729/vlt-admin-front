<template>
  <div class="container-message">
    <p class="title">
      <img :src="icon" alt class="title-icon" /> <span>站内消息</span> 
      <el-link type="primary" :underline="false">主要链接</el-link>
    </p>
    <ul class="msg-list">
      <li v-for="item in list" :key="item.id">
        <p>{{item.title}}</p>
        <span>{{item.date}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
const LIST = {
  status: 200,
  data: [
    {
      id: 0,
      title: '[通知公告-F100908JKK]流程结束',
      date: '2019-09-30 00:00:00'
    },
    {
      id: 1,
      title: '[通知公告-F100908JKK]流程结束',
      date: '2019-09-30 00:00:00'
    },{
      id: 2,
      title: '[通知公告-F100908JKK]流程结束',
      date: '2019-09-30 00:00:00'
    },{
      id: 3,
      title: '[通知公告-F100908JKK]流程结束',
      date: '2019-09-30 00:00:00'
    },{
      id: 4,
      title: '[通知公告-F100908JKK]流程结束',
      date: '2019-09-30 00:00:00'
    }
  ]
}
export default {
  data() {
    return {
      list: [],
      icon: require("@/assets/img/u86.png")
    };
  },
  created () {
    this.$nextTick(() => {
      this.list = LIST.data
    })
  }
};
</script>

<style lang="less" scoped>
.container-message {
  margin-top: 20px;
  padding: 10px 20px 50px;
  border-radius: 4px;
  border: 1px solid #f2f2f2;
  box-sizing: border-box;
  .title {
    position: relative;
    &:before {
      content: '';
      display: block;
      position: absolute;
      left: -20px;
      height: 24px;
      width: 1px;
      background: #ffa847;
    }
    .title-icon {
      display: inline-block;
      vertical-align: middle;
      width: 24px;
      height: 24px;
    }
    span {
      display: inline-block;
      vertical-align: middle;
      margin-left: 10px;
    }
    .el-link {
      position: absolute;
      right: 20px;
      line-height: 24px;
      font-size: 12px;
    }
  }
  .msg-list {
    margin-top: 10px;
    padding-top: 20px;
    border-top: 1px solid #ededed;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      cursor: pointer;
      border-bottom: 1px dashed #FFA847;
      p {    
        color: #666666;
      }
    }
  }
}
</style>