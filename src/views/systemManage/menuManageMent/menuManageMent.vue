<template>
  <div class="vlt-card">
    <el-container>
      <el-aside class="tree-list" style="padding:20px;">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
           :default-expanded-keys="[1, 2]"
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => append(node,data)" v-if="node.data.type == 0" >添加</el-button>
              <el-button type="text" size="mini" @click="() => setFormData(node,data)"  v-if="node.level > 1">编缉</el-button>
              <el-button type="text" size="mini" @click="() => remove(node, data)" v-if="node.level >  1">删除</el-button>
            </span>
          </span>
        </el-tree>
      </el-aside>
      <el-main style="border-left:1px solid #ccc;padding-left:100px;">
        <div class="vlt-edit-single">
          <div class="vlt-edit-wrap">
            <el-form label-position="right" label-width="90px" :model="form" :rules="rules" ref="form">
              <el-form-item label="类型">
                <el-input v-model="form.singleAmount"></el-input>
              </el-form-item>
              <el-form-item label="名称" prop="minMultiple">
                <el-input v-model="form.minMultiple"></el-input>
              </el-form-item>
              <el-form-item label="路径" prop="mixBet">
                <el-input v-model="form.mixBet"></el-input>
              </el-form-item>
              <el-form-item label="路由英文名" prop="bet">
                <el-input v-model="form.bet"></el-input>
              </el-form-item>
              <el-form-item label="图标" prop="logOff">
                <el-select v-model="form.logOff" placeholder="请选择">
                  <el-option
                    v-for="item in logOffOption"
                    @click.native="changeLogOff(item)"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="排序值" prop="cash">
                <el-input placeholder="请输入内容" v-model="form.textarea"></el-input>
              </el-form-item>
              <el-form-item label="是否敏感操作">
                <el-switch
                  style="display: block"
                  v-model="form.value1"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                 
                ></el-switch>
                  </el-form-item>
              <el-form-item label="是否启用">
                <el-switch
                  style="display: block"
                  v-model="form.value2"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
            </el-form>
            <el-row class="vlt-edit-btn">
              <el-button type="primary" v-prevent="1000" size="medium" @click="save(form,'form')">提交并保存</el-button>
              <el-button size="medium" @click="resestFrom('form')">重置</el-button>
            </el-row>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
let id = 1000;

export default {
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        type:0,
        children: [
          {
            id: 4,
            label: "二级 1-1",
             type:0,
            children: [
              {
                id: 9,
                label: "三级 1-1-1",
                 type:0,
              },
              {
                id: 10,
                 type:0,
                label: "三级 1-1-2"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "一级 2",
         type:0,
        children: [
          {
            id: 5,
             type:0,
            label: "二级 2-1"
          },
          {
            id: 6,
             type:0,
            label: "二级 2-2"
          }
        ]
      },
      {
        id: 3,
         type:0,
        label: "一级 3",
        children: [
          {
            id: 7,
             type:0,
            label: "二级 3-1"
          },
          {
            id: 8,
             type:0,
            label: "二级 3-2"
          }
        ]
      }
    ];
    return {
      form: {
        singleAmount: "",
        minMultiple: "",
        mixBet: "",
        bet: "",
        logOff: "",
        textarea: "",
        value1:true,
        value2:true
      },
      rules:{
      minMultiple:[ {
          required:true,message:'请输入名称'
        }],
       mixBet: [ {
          required:true,message:'请输入路径'
        }],
       bet: [ {
          required:true,message:'请输入路由英文名'
        }],
        logOff: [{
          required:true,message:'请选择图标'
        }],
        textarea:[{
          required:true,message:'请输入排序值'
        }],
      },
      logOffOption: [],
      betOption: [],
      data: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data))
    };
  },

  methods: {
    append(node, data) {
      console.log(node,data)
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    setFormData(node, data) {
        console.log(node,data)
    },
    save(val,formName) {
      console.log(val)
       this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    resestFrom(formName){
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>