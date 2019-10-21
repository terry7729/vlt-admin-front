<template>
  <div>
    <el-form ref="form" label-width="80px" label-position="top" class="form-view-container">
      <div class="form-box" v-for="(item, index) in boxList" :key="index" :data-index="index" :style="styles">
        
        <el-button type="text" size="small" v-if="item.type" @click="getCurrentConfig(item)">配置</el-button>
        <form-component :config="item"></form-component>
      </div>
    </el-form>
    <form-config-dia 
      :config="currentConfig"
      :showDialog="showFieldConfig" 
      @close="showFieldConfig = false"
      @confirm="confirmConfig"
    >
    </form-config-dia>
  </div>
</template>

<script>
import formComponent from './formComponent'
import formConfigDia from '@/views/systemManage/businessProcess/components/dragForm/formConfigDia'
export default {
  name: 'formView',
  props: {
    boxList: { // 容器列表
      default() {
        return []
      }
    },
    styles: {
      default() {
        return {}
      }
    } 
  },
  data() {
    return {
      showFieldConfig: false,
      currentConfig: {}
    }
  },
  mounted() {
    // console.log('slslsls', this.boxList);
  },
  watch: {
    boxList (newVal, oldVal) {
      console.log('boxList', newVal);
    }
  },
  methods: {
    confirmConfig(config) {
      this.$emit('update', JSON.parse(JSON.stringify(config)));
    },
    getCurrentConfig(config) {
      this.currentConfig = config;
      // this.showFieldConfig = true;
      this.eventBus.$emit('showFieldConfig', this.currentConfig)
      // console.log('this.currentConfig', this.currentConfig);
    }
  },
  components: {
    formComponent,
    formConfigDia
  }
}
</script>

<style lang="less">
  .form-view-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .form-box{
      width: 48%;
      box-sizing: border-box;
      height: 100px;
      border: 1px solid #dfdfdf;
      margin: 1% 1% 0;
      position: relative;
      .el-form-item{
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        background: #fff;
        //  border: 1px solid #409EFF;
      }
      &.active{
        background-color: #f2f2f2;
        border: 1px solid #409EFF;
        .el-form-item{
        //  border: 1px solid #409EFF;
        }
      }
      .el-button{
        position: absolute;
        right: 10px;
        top: 0;
      }
    }
  }
</style>
