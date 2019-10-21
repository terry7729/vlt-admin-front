<template>
  <div class="page-tags-con">
    <div class="tags-scroller">
      <div class="tags-list">
        <el-tag
          :class="{current:$route.name == tag.routerName}"
          v-for="(tag, index) in routerTags"
          :key="index"
          :closable="closable"
          type="info"
          @click="to(tag)"
          @close="close(tag)"
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
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'pageTags',
  data() {
    return {
      closable: true
    }
  },
  watch: {
    routerTags(val) {
      if (val.length === 1) {
        this.closable = false;
        return;
      };
      this.closable = true;
    },
    $route(to, from) {
      this.setRouterTags({
        name: to.meta.title,
        routerName: to.name
      })
    }
  },
  computed: {
    ...mapGetters(['routerTags'])
  },
  created () {
    this.setRouterTags({
      name: this.$route.meta.title,
      routerName: this.$route.name
    })
  },
  mounted () {
    
  },
  destroyed() {
    this.clearRouterTags();
  },
  methods: {
    to(item) {
      this.$router.push({
        name: item.routerName
      })
    },
    close(item) {
      console.log('remove')
      this.removeRouterTags(item)
    },

    ...mapActions(['setRouterTags', 'removeRouterTags', 'clearRouterTags'])
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