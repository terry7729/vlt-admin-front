<template>
  <div class="vlt-card">
    <div class="top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="表单名称">
          <el-input size="small"  v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input size="small"  v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-switch v-model="value1" active-text="启动" inactive-text="禁用"></el-switch>
        <el-form-item>
          <el-button size="small"  type="primary" @click="onSubmit">保存</el-button>
          <el-button type="primary" size="small" @click="showSettings = true">主屏设置</el-button>
          <el-button type="warning" size="small" @click="preview">预览</el-button>
        </el-form-item>
      </el-form>
      <div class="el-icon-delete del-bar" :class="{show: showDel}"></div>
    </div>
    <!-- <div class="bottom">
      <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <h3>表单控件</h3>
         
        </div>
      </el-col>
      <el-col :span="11">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    </div> -->
  <!-- new -->

  <el-row class="drag-form-container" :gutter="10">
    <!-- <div class="ct-header">
      <el-button type="primary" size="small" @click="showSettings = true">主屏设置</el-button>
      <el-button type="danger" size="small"  @click="saveConfig">保存配置</el-button>
      <el-button type="warning" size="small" @click="preview">预览</el-button>
    </div> -->
    <el-col :span="6">
      <div class="left-col" >
      <el-form label-width="80px" label-position="top" class="form-option-list">
        <form-component v-for="(item, index) in formTypeList" :key="index" :config="item" class="form-option-item"></form-component>
      </el-form>
      </div>
    </el-col>
    <el-col :span="12">
    <div class="center-col" >
      <drag-view 
        :boxList="boxList" 
        :styles="boxStyle"
        @update="updateConfig"
      >
      </drag-view>
    </div>
    </el-col>
    <el-col :span="6">
      <div class="right-col" ></div>
    </el-col>
  </el-row>  
    <setting 
      :showDialog="showSettings" 
      @close="showSettings = false"
      @confirm="confirmSetting"
    >
    </setting>
  </div>
</template>
<script>
import formTypeList from '@/views/systemManage/businessProcess/components/dragForm/config/formTypeList'
import formComponent from '@/views/systemManage/businessProcess/components/dragForm/formComponent'
import dragView from '@/views/systemManage/businessProcess/components/dragForm/dragView'
import setting from '@/views/systemManage/businessProcess/components/dragForm/setting'
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      value1: true,
      showDel: false,
      showSettings: false,
      config: null, // 保存配置
      screen: {
        col: 2,
        row: 4
      },
      // 所有表单列表
      formTypeList,
      // 表单渲染容器列表
      boxList: [],
      boxStyle: {},
      fromDragIndex: '' // 当前容器里拖拽的index，用于与目标容器对换表单
    };
  },
    created() {
    this.init(this.screen)
  },
  mounted() {
    const self = this;

    // 预览重新编辑 --> 模板编辑初始化
    const previewConfig = JSON.parse(localStorage.getItem('previewConfig')) || false;
    if (previewConfig) {
      this.init(previewConfig);
      this.boxList = previewConfig.list;
    }

    // 拖拽事件交互
    document.addEventListener("dragstart", function(event) {
      event.target.style.opacity = .5;
      self.dragFormType = event.target.dataset.formType;
      const target = self.findClass(event.target, 'form-box')
      if (target) {
        self.fromDragIndex = Number(target.dataset.index);
        if (!self.showDel) {
          self.showDel = true;
        }
      }
    }, false);
    document.addEventListener("dragend", function(event) {
      event.target.style.opacity = "";
    }, false);
    document.addEventListener("dragover", function(event) {
      event.preventDefault();
    }, false);
    document.addEventListener("dragenter", function(event) {
      const target = self.findClass(event.target, 'form-box');
      if (target) {
        target.classList.add('active');
      }
      const delBar = self.findClass(event.target, 'del-bar');
      if (delBar) {
        delBar.classList.add('active');
      }

    }, false);
    document.addEventListener("dragleave", function(event) {
      const target = self.findClass(event.target, 'form-box');
      if (target) {
        if (self.mouseOutEl(event.clientX, event.clientY, target)) {
          target.classList.remove('active');
        }
      }
      const delBar = self.findClass(event.target, 'del-bar');
      if (delBar) {
        if (self.mouseOutEl(event.clientX, event.clientY, delBar)) {
          delBar.classList.remove('active');
        }
      }
    }, false);
    document.addEventListener("drop", function(event) {
      event.preventDefault();
      self.showDel = false;
      const target = self.findClass(event.target, 'form-box');
      if (target) {
        target.classList.remove('active');
        // 互换位置
        if (self.fromDragIndex !== '') {
          const item1 = self.boxList[self.fromDragIndex];
          const item2 = self.boxList[target.dataset.index];
          // 互换下标
          const index1 = self.fromDragIndex;
          const index2 = target.dataset.index;
          item1.index = index2;
          item2.index = index1;
          self.$set(self.boxList, target.dataset.index, item1);
          self.$set(self.boxList, self.fromDragIndex, item2);
          self.fromDragIndex = '';
        } else {
          self.$set(self.boxList[target.dataset.index], 'type', self.dragFormType);
        }
      }
      // 清空当前容器表单
      const delBar = self.findClass(event.target, 'del-bar');
      if (delBar) {
        self.$set(self.boxList, self.fromDragIndex, {
          index: self.fromDragIndex
        });
        self.fromDragIndex = '';
      }
      self.saveConfig();
    }, false);
  },
  methods: {
    // 初始化
    init(config) {
      this.config = {
        ...config
      }
      let len = config.row * config.col;
      this.boxList = [];
      for (let i = 0; i < len; i++) {
        this.boxList.push({
          index: i // 容器下标
        })
      }
      const marginX = 1;
      Object.assign(this.boxStyle, {
        margin: '10px 1%',
        width: (100 - 1 * config.col * 2) / config.col + '%'
      });
    },
    confirmSetting(config) {
      this.init(config)
    },
    saveConfig() {
      this.$set(this.config, 'list', this.boxList);
      localStorage.setItem('previewConfig', JSON.stringify(this.config));
    },
    // 预览
    preview() {
      this.saveConfig();
      // this.$router.push({name: 'preview'})
    },
    // 更新渲染容器内表单配置
    updateConfig(config) {
      this.$set(this.boxList, config.index, config);
    },
    // 查找元素以及它父级是否含有className
    findClass(el, className) {
      if (el.classList) {
        if (el.classList.contains(className)) {
          return el;
        }
        return this.findClass(el.parentNode, className);
      }
      return false;
    },
    // 鼠标移出拖拽容器元素
    mouseOutEl(clientX, clientY, el) {
      if(clientX < el.getBoundingClientRect().left || 
        clientX > el.getBoundingClientRect().right - 1 ||
        clientY < el.getBoundingClientRect().top ||
        clientY > el.getBoundingClientRect().bottom - 1
      ) {
        return true;
      }
      return false;
    },
    onSubmit() {
      console.log("submit!");
    }
  },
  components: {
    formComponent,
    dragView,
    setting
  }
};
</script>
<style lang="less">
@import "./less/index.less";
.el-switch {
  padding: 20px 40px;
}
.top {
  position: relative;
  border: 1px solid #797979;
  // display: flex;
  // justify-content: space-between;
  text-align: center;
  // margin: -18px -16px;
  overflow: hidden;
  .del-bar{
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #F56C6C;
  font-size: 34px;
  color: #fff;
  z-index: 1000;
  justify-content: center;
  display: flex;
  align-items: center;
  opacity: 0.8;
  transform: translate(0, -60px);
  transition: transform 0.2s ease 0s;
  &.show{
    transform: translate(0, 0);
  }
  &.active{
    opacity: 1;
  }
}
}
.el-form.demo-form-inline.el-form--inline {
  margin: 10px auto 0;
  .el-form-item {
    margin-bottom: 10px;
  }
}
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 0px;
}
.bg-purple-dark {
  border: 1px solid #000;
}
.bg-purple {
  padding: 16px;
  border: 1px solid #000;
}
.bg-purple-light {
  border: 1px solid #000;
}
.grid-content {
  min-height: 500px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.bottom{
  position: relative;
  top:30px;
  left:0px;
}
.grid-content.bg-purple{
  display:flex;
  justify-content: space-between;
}
</style>