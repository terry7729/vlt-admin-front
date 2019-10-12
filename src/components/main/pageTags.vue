<template>
  <div class="page-tags-con">
    <div class="tags-scroller">
      <div class="tags-list">
        <el-tag
          :class="{current:current==index}"
          v-for="(tag, index) in tags"
          :key="index"
          :closable="closable"
          :type="tag.type"
          @click="tab(index)"
          @close="close(index)"
        >
          {{tag.name}}
        </el-tag>
      </div>
    </div>
    <el-dropdown class="right-dropdown" trigger="click" size="small">
      <el-button class="right-btn" type="primary" size="mini">
        标签选项
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>关闭当前</el-dropdown-item>
        <el-dropdown-item>关闭所有</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

export default {
  name: 'pageTags',
  data() {
    return {
      current: 0,
      closable: true,
      tags: [
        { name: '标签一', type: 'info' },
        { name: '标签二', type: 'info' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'info' },
        { name: '标签一', type: 'info' },
        { name: '标签二', type: 'info' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'info' },
        { name: '标签一', type: 'info' },
        { name: '标签二', type: 'info' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'info' },
        { name: '标签一', type: 'info' },
        { name: '标签二', type: 'info' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'info' },
        { name: '标签五', type: 'info' }
      ]
    }
  },
  created () {
    
  },
  mounted () {
    
  },
  watch: {
    tags(val) {
      if (val.length === 1) this.closable = false;
    }
  },
  methods: {
    tab(index) {
      this.current = index;
    },
    close(index) {
      this.tags.splice(index, 1)
    }
  }
}
</script>

<style lang="less">
  .page-tags-con{
    padding: 5px 10px;
    position: relative;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    .tags-scroller{
      overflow: hidden;
    }
    .tags-list{
      white-space: nowrap;
      word-break: keep-all;
      margin-right: 90px;
      
    }
    .el-tag{
      cursor: pointer;
      background-color: #fff;
      margin-right: 4px;
      position: relative;
      overflow: hidden;
      &:before{
        content: "";
        width: 12px;
        height: 12px;
        background-color: #e8eaec;
        float: left;
        border-radius: 100%;
        margin-top: 9px;
        margin-right: 7px;

      }
      &.current{
        &:before{
          background-color: #409eff;
        }
      }
    }

    .right-dropdown{
      position: absolute;
      padding: 7px;
      background-color: #fff;
      right: 0;
      top: 0;
      box-shadow: -3px 0 15px 3px rgba(0,0,0,.1);
    } 
    .right-btn{
      padding: 7px;
      width: auto;
    }
  }
</style>