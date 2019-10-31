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
              :default-expanded-keys="[1, 2]"
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
              :formData="form"
              ref="baseForm"
              :rules="rules"
              direction="right"
              @change="treeChange"
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
      isEdit: false,
      menuData: [],
      controlOptions: [
        //顶部按钮
        { name: "添加根节点", type: "primary", icon: "", id: 1 },
        { name: "添加子系统", type: "warning", icon: "", id: 2 },
        { name: "批量删除", type: "", icon: "", id: 3 },
      ],
      form: [
        //右侧修改信息表单对象
        { type: "select", title: "类型", prop: "moduleType", value: '',
          options: [
            {
              value: 1,
              label: '根节点',
              disabled: true,
            },
            {
              value: 2,
              label: '子系统',
              disabled: true,
            },
            {
              value: 3,
              label: '菜单'
            },
            {
              value: 4,
              label: '按钮'
            }
          ]
        },
        { type: "input", title: "名称", prop: "moduleName", value: "" },
        { type: "input", title: "子系统编码", prop: "sysCode", value: "", disabled: true},
        { type: "input", title: "菜单编码", prop: "moduleCode", value: "" },
        { type: "input", title: "路由英文名", prop: "moduleNameEn", value: "",
          placeholder: '前端路由名称'
        },
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
          value: false,
          title: "是否敏感操作"
        },
        { type: "switch", prop: "isShow", value: true, title: "是否启用" },
        { type: "textarea", title: "描述", prop: "moduleDesc", value: "" },
      ],
      rules: {
        //验证对象
        minMultiple: [
          {
            required: true,
            message: "请输入名称"
          }
        ],
        mixBet: [
          {
            required: true,
            message: "请输入路径"
          }
        ],
        bet: [
          {
            required: true,
            message: "请输入路由英文名"
          }
        ],
        logOff: [
          {
            required: true,
            message: "请选择图标"
          }
        ],
        textarea: [
          {
            required: true,
            message: "请输入排序值"
          }
        ]
      },
      

    };
  },
  watch: {
    menuData() {
      this.setCtrlBtnStatus()
    }
  },
  created() {
    this.getMenuList();
  },
  mounted() {},
  
  methods: {
    async getMenuList() {
      //节点树请求
      let res = await this.$api.QueryModuleTree();//菜单树查询
      if(res && res.code === 0){
        this.menuData = res.data;
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
        this.$set(this.form[0], 'disabled', true);
      }
    },
    // 设置头部按钮状态
    setCtrlBtnStatus() {
      if (this.menuData.length) {
        this.$set(this.controlOptions[0], 'disabled', true);
      } else {
        this.$set(this.controlOptions[1], 'disabled', true);
      }
      if (this.$refs.tree.getCheckedKeys().length) {
        this.$set(this.controlOptions[2], 'disabled', false);
      } else {
        this.$set(this.controlOptions[2], 'disabled', true);
      }
    },
    async submit() {
      // let reslt = await this.$api.UpdateModule({ data }); //更改节点
      const data = {
        ...this.$refs.baseForm.form
      };
      let apiName = 'SaveModule';
      let message = '新增成功'
      if (!this.isEdit) {
        
      } else {
        data.moduleId = this.currentMenuId;
        console.log(data.parentId)
        apiName = 'UpdateModule';
        message = '编辑成功'
      }
      const res = await this.$api[apiName]({
        message,
        data
      });
      if (res && res.code == 0) {
        this.getMenuList();
      }
    },
    cancel() {
      this.getMenuDetail(this.currentMenuId);
    },

    checkChange() {
      console.log('getCheckedKeys', this.$refs.tree.getCheckedKeys())
      this.setCtrlBtnStatus();
    },

    treeChange(val) {
      //更改节点信息change事件
      console.log("更改节点信息change事件", val);
    },
    // 新增
    async add(node, data) {
      this.isEdit = false;
      this.currentMenuId = data.id;
    },
    // 编辑
    async edit(node, data) {
      this.getMenuDetail(data.id);
      this.isEdit = true;
      this.currentMenuId = data.id;
      switch (data.type) {
        // 根节点
        case 1:
          
          break;
        // 子系统
        case 2:
          this.$set(this.controlOptions[2], 'value', 2);
          break;
        // 菜单
        case 3:
          break;
        // 按钮
        case 4:
          break;
      }
    },
    remove(node, data) {
      this.$confirm("此操作将永久删除该节点, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(async () => {
        if (data) {
          this.$refs.tree.setChecked(data, true, true);
        }
        let moduleIdList = this.$refs.tree.getCheckedKeys();
        let res = await this.$api.DeleteModule({
          message: '删除成功',
          data: {
            moduleIdList
          }
        });
        if (res && res.code === 0) {
          this.getMenuList()
        }
      })
    },
    // 操作
    operation(val) {
      switch (val.id) {
        // 添加根节点
        case 1:
          this.$set(this.form[0], 'disabled', true);
          this.$set(this.form[0], 'value', 1);
          this.$set(this.form[2], 'destroy', true);
          break;
        // 添加子系统
        case 2:
          this.$set(this.form[0], 'disabled', true);
          this.$set(this.form[0], 'value', 2);
          break;
        // 批量删除
        case 3:
          this.remove();
          break;
      }
    }

  },
  components: {},
  
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