<template>
  <li>
    <template v-for="item in menuData">
      <el-menu-item :index="item.url" :key="item.id" v-if="!item.childResources || !item.childResources.length" @click="to(item.url)"
        :class="item.className"
      >
        <i :class="[item.icon && 'iconfont', item.icon]"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <el-submenu :index="item.name" v-else :key="item.id" :class="item.className">
        <div class="submenu-title" slot="title">
          <i :class="[item.icon && 'iconfont', item.icon]"></i>
          <span class="title">{{item.name}}</span>
        </div>
        <menu-tree :menuData="item.childResources"></menu-tree>
      </el-submenu>
    </template>
  </li>
</template>

<script>
  export default {
    props: ['menuData'],
    name: 'menuTree',
    data() {
      return {
        
      }
    },
    created() {
      
    },
    methods: {
      to(name) {
        this.$router.push({
          name
        }); 
      }
    }
  }
</script>

<style lang="less" scoped>
  
</style>

