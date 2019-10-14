<template>
  <div class="vlt-card">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#ddd"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="width:300px"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-arrow-down"></i>
          <span>节点信息</span>
        </template>
        <el-menu-item-group>
          <el-form label-position="right" label-width="80px" :model="formLabelAlign">
            <el-form-item label="名称">
              <el-input v-model="input" placeholder="游戏发行申请" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="处理类型">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                   placeholder="请输入内容"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="处理人">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                   placeholder="请输入内容"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="知会">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                   placeholder="请输入内容"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务类型">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                   placeholder="请输入内容"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="表单字段">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options" 
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                   placeholder="请输入内容"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }]
    };
  },
  components: {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    labelPosition: "top",
    formLabelAlign: {
      name: "",
      region: "",
      type: ""
    }
  }
};
</script>

<style lang="less" scoped>
  
</style>
