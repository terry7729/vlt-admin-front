<template>
  <div class="vlt-card menu-container">
    <el-container>
      <el-aside class="tree-list" style="padding:20px;width:380px">
        <div class="menu-btn">
          <!--顶部按钮-->
          <control-bar :options="controlOptions" @select="operation"></control-bar>
        </div>
        <div class="menu-ipt">
          <div class="menu-tree">
            <!--树形结构-->
            <el-tree
              ref="tree"
              :data="menuData"
              show-checkbox
              node-key="id"
              @check-change="checkChange"
              :default-expanded-keys="expandedKeys"
              :expand-on-click-node="true"
              :props="{
                children: 'children',
                value: 'id',
                label: 'text'
              }"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                    type="text"
                    size="mini"
                    @click.stop="edit(node, data)">
                    编辑
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    v-if="data.type != 4"
                    @click.stop="add(node, data)">
                    新增
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click.stop="() => remove(node, data)">
                    删除
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </el-aside>
      <el-main style="border-left:1px solid #ccc;">
        <div class="vlt-edit-single">
          <div class="vlt-edit-wrap">
            <base-form
              :formData="menuTypeForm"
              ref="menuTypeForm"
              :rules="rules"
              direction="right"
              @change="menuTypeFormChange"
              labelWidth="110px"
            ></base-form>
            <base-form
              :formData="form"
              ref="baseForm"
              :rules="rules"
              direction="right"
              labelWidth="110px"
            ></base-form>
            <el-row class="vlt-edit-btn">
              <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
              <el-button size="medium" @click="cancel">取消</el-button>
            </el-row>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      menuType: 0,
      isEdit: false,
      menuData: [],
      expandedKeys: [],
      controlOptions: [
        //顶部按钮
        { name: "添加根节点", type: "primary", icon: "", id: 1 },
        { name: "批量删除", type: "", icon: "", id: -1 },
      ],
      // 1: 根节点 2: 子系统 3: 菜单 4: 按钮
      config: {
        '1': [
          { type: "input", title: "名称", prop: "moduleName", value: "" },
          { type: "input", title: "路由名称", prop: "moduleCode", value: "" },
          { type: "switch", prop: "isShow", value: 1, title: "是否启用" },
          { type: "textarea", title: "描述", prop: "moduleDesc", value: "" },
        ],
        '2': [
          { type: "input", title: "名称", prop: "moduleName", value: "" },
          { type: "input", title: "子系统名称", prop: "sysCode", value: "" },
          { type: "input", title: "路由名称", prop: "moduleCode", value: "" },
          { type: "input", prop: "sort", value: "", title: "排序值" },
          {
            type: "switch",
            prop: "isSensitivity",
            value: 0,
            title: "是否敏感操作"
          },
          { type: "switch", prop: "isShow", value: 1, title: "是否启用" },
          { type: "textarea", title: "描述", prop: "moduleDesc", value: "" },
        ],
        '3': [
          { type: "input", title: "名称", prop: "moduleName", value: "" },
          { type: "input", title: "路由名称", prop: "moduleCode", value: "" },
          {
            type: "input",
            title: "图标类名",  
            prop: "moduleIcon",
            value: "",
            placeholder: 'CSS图标类名'
          },
          { type: "input", prop: "sort", value: "", title: "排序值" },
          {
            type: "switch",
            prop: "isSensitivity",
            value: 0,
            title: "是否敏感操作"
          },
          { type: "switch", prop: "isShow", value: 1, title: "是否启用" },
          { type: "textarea", title: "描述", prop: "moduleDesc", value: "" },
        ],
        '4': [
          { type: "input", title: "名称", prop: "moduleName", value: "" },
          { type: "input", title: "按钮名称", prop: "moduleCode", value: "" },
          {
            type: "switch",
            prop: "isSensitivity",
            value: 0,
            title: "是否敏感操作"
          },
          { type: "switch", prop: "isShow", value: 1, title: "是否启用" },
          { type: "textarea", title: "描述", prop: "moduleDesc", value: "" },
        ]
      },
      menuTypeForm: [{ type: "select", title: "类型", prop: "moduleType", value: 1,
        options: [
          {
            value: 1,
            label: '根节点',
          },
          {
            value: 2,
            label: '子系统',
          },
          {
            value: 3,
            label: '菜单',
          },
          {
            value: 4,
            label: '按钮',
          }
        ]
      },],
      form: [],
      rules: {
        moduleType: [
          {
            required: true,
            message: "请选择菜单类型",
            trigger: 'change'
          }
        ],
        moduleName: [
          {
            required: true,
            message: "请输入名称"
          }
        ],
        sysCode: [
          {
            required: true,
            message: "请输入子系统名称"
          }
        ],
        moduleCode: [
          {
            required: true,
            message: "请输入路由名称"
          }
        ],
        sort: [
          {
            required: true,
            message: "请输入排序值"
          }
        ],
      },
    };
  },
  watch: {
    menuData(menuData) {
      this.setCtrlBtnStatus()
      if (!menuData.length) {
        this.menuType = 1;
      }
    },
    menuType(val) {
      this.form = this.config[val];
      // 设置菜单类型选择项
      const menuTypeForm = this.menuTypeForm[0];
      this.$set(menuTypeForm, 'value', val);
      menuTypeForm.options.forEach(item => {
        this.$set(item, 'disabled', false);
      })
      const options = menuTypeForm.options;
      switch (val) {
        case 1:
          this.$set(options[1], 'disabled', true);
          this.$set(options[2], 'disabled', true);
          this.$set(options[3], 'disabled', true);
          break;
        case 2:
          this.$set(options[0], 'disabled', true);
          this.$set(options[2], 'disabled', true);
          this.$set(options[3], 'disabled', true);
          break;
        case 3:
          this.$set(options[0], 'disabled', true);
          this.$set(options[1], 'disabled', true);
          break;
        case 4:

          break;
      }
    }
  },
  created() {
    (async () => {
      await this.getMenuList();
      if (!this.menuData.length) {
        this.menuType = 1;
        this.form = this.config[1];
        return;
      }
      this.currentMenu = this.menuData[0];
      this.menuType = 2;
      this.form = this.config[2];
      // 设置默认展开
      this.expandedKeys = [this.menuData[0].id];
      if (this.currentMenu.children && this.currentMenu.children.length) {
        this.expandedKeys.push(this.currentMenu.children[0].id)
      }
    })()
  },
  mounted() {
    
  },
  
  methods: {
    async getMenuList() {
      let res = await this.$api.QueryModuleTree();
      if(res && res.code === 0){
        this.menuData = res.data || [];
        this.setCtrlBtnStatus();
      }
    },
    // 获取菜单详情
    async getMenuDetail(id) {
      const res = await this.$api.QueryModuleDetail({
        data: id
      });
      if (res && res.code == 0) {
        this.form.forEach(item => {
          this.$set(item, 'value', res.data[item.prop])
        })
        this.menuTypeForm.forEach(item => {
          this.$set(item, 'value', res.data[item.prop])
        })
      }
    },
    // 设置头部按钮状态
    setCtrlBtnStatus() {
      if (this.$refs.tree.getCheckedKeys().length) {
        this.$set(this.controlOptions[1], 'disabled', false);
      } else {
        this.$set(this.controlOptions[1], 'disabled', true);
      }
      if (this.menuData.length) {
        this.$set(this.controlOptions[0], 'disabled', true);
      } else {
        this.$refs.tree.getCheckedKeys().length = 0;
        this.$set(this.controlOptions[0], 'disabled', false);
      }
    },
    submit() {
      this.$refs.baseForm.validate(async val => {
        if (val === 'true') {
          const data = {
            ...this.$refs.baseForm.form,
            moduleType: this.menuType
          };
          let apiName = 'SaveModule';
          let message = '新增成功'
          if (this.isEdit) {
            data.moduleId = this.currentMenu.id;
            apiName = 'UpdateModule';
            message = '编辑成功'
          }
          if (this.menuType !== 1) {
            data.parentId = this.currentMenu.id;
          }
          const res = await this.$api[apiName]({
            message,
            data
          });
          if (res && res.code == 0) {
            // 无请求更新tree
            // 新增/编辑根节点
            if (this.menuType === 1) {
              if (this.isEdit) {
                this.$set(this.menuData[0], 'text', data.moduleName);
              } else {
                this.menuData = [res.data];
              }
              return;
            }
            // 新增/编辑子系统、菜单、按钮
            if (this.isEdit) {
              this.$set(this.currentMenu, 'text', data.moduleName);
            } else {
              this.$refs.tree.append(res.data, data.parentId)
            }
            return;
          }
        }
      });
    },
    cancel() {
      if (this.currentMenu) {
        this.getMenuDetail(this.currentMenu.id);
      }
      this.$refs.baseForm.resetForm();
    },
    checkChange() {
      this.setCtrlBtnStatus();
    },
    menuTypeFormChange(form) {
      this.menuType = form.moduleType;
    },
    // 清空表单数据
    clearForm() {
      this.form.forEach(item => {
        item.value = '';
        if (item.prop === 'isShow') {
          item.value = 1;
        }
      })
      this.$refs.baseForm.resetForm();
    },
    // 新增
    async add(node, data) {
      this.isEdit = false;
      this.currentMenu = data;
      this.menuType = data.type;
      switch (data.type) {
        case 1:
          this.menuType = 2;
          break;
        case 2:
          this.menuType = 3;
          break;
      }
      this.clearForm();
      this.$set(this.menuTypeForm[0], 'disabled', false)
    },
    // 编辑
    async edit(node, data) {
      this.getMenuDetail(data.id);
      this.isEdit = true;
      this.currentMenu = data;
      this.menuType = data.type;
      this.$set(this.menuTypeForm[0], 'disabled', true)
    },
    
    // 移除
    remove(node, data) {
      this.$confirm("此操作将永久删除该节点, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(async () => {
        let moduleIdList, nodes;
        if (data) {
          moduleIdList = [data.id];
          nodes = [node];
          // 获取子节点id
          (function find(_data) {
            const children = _data.children || [];
            if (children.length) {
              children.forEach((item, i) => {
                moduleIdList.push(children[i].id)
                find(children[i]);
              })
            } else {
              return false;
            }
          })(data)
        } else {
          moduleIdList = this.$refs.tree.getCheckedKeys();
          nodes = this.$refs.tree.getCheckedNodes();
        }
        let res = await this.$api.DeleteModule({
          message: '删除成功',
          data: {
            moduleIdList
          }
        });
        if (res && res.code == 0) {
          nodes.forEach(item => {
            this.$refs.tree.remove(item);
          })
        }
      }).catch(() => {
        console.log('已取消删除')
      })
    },
    // 操作
    operation(val) {
      if (val.id === -1) {
        this.remove();
        return;
      }
      this.menuType = val.id
    }
  }
}
</script>

<style lang="less">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.menu-container {
  .vlt-edit-wrap{
    padding: 0;
  }
  .menu-btn{
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 15px;
  }
}
</style>