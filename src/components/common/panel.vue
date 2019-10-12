<template>
  <!-- 收缩面板 -->
  <div class="panel">
    <div @click="toggle" class="panel-hd">
      <i :class="[isShow?'el-icon-caret-bottom':'el-icon-caret-right']" class="panel-caret"></i>
      <h2 class="title">{{title}}</h2>
      <span class="tips">{{tips}}</span>
      <span class="text blue">{{collapseName}}&nbsp;<i :class="[isShow?'el-icon-arrow-up':'el-icon-arrow-down']"></i></span>
    </div>
    <div class="panel-bd">
      <el-collapse-transition>
        <div v-show="isShow" class="content">
          <slot></slot>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    // 面板标题
    title: {
      type: String,
      default: ''
    },
    // 温馨提示
    tips: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: false,
      collapseName: this.show == true ? '收缩' : '展开'
    }
  },
  created () {
    this.isShow = this.show;
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow;
      this.collapseName = this.isShow?'收缩':'展开'
    }
  }
}
</script>

<style lang="less" scoped>
  .panel{
    border: 1px solid #e4e4e4;
    border-radius: 6px;
    background-color: #fff;
    &-caret{
      font-size: 20px;
      margin-right: 3px;
      color: #000A12;
    }
    &-hd{
      padding: 0 15px 0 10px;
      height: 50px;
      background-color: #fff;
      border-bottom: 1px solid #e4e4e4;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
      cursor: pointer;
      .title{
        font-weight: normal;
        font-size: 14px;
        color: #000A12;
        flex: auto;
      }
      .tips{
        // flex: 1;
      }
      .text{
        font-size: 12px;
        padding: 0 5px;
        cursor: pointer;
      }
    }
    &-bd{
      background-color: #fff;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      .content{
        color: #666;
        font-size: 12px;
      }
    }
  }
</style>