<template>
  <div class="vlt-card">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="渠道新建" name="first">
        <div class="list_Detail">
          <div class="list_Detail_title">
            <div class="blue_block"></div>
            <h3>基本信息</h3>
          </div>
          <div class="organ_cace">
            <span class="demonstration">所属机构:</span>
            <el-cascader v-model="value1" :options="options" @change="handleChange"></el-cascader>
          </div>
          <div class="organ_cace">
            <span class="demonstration">渠道类型:</span>
            <el-cascader v-model="value2" :options="options" @change="handleChange"></el-cascader>
          </div>
          <div class="demonnum">
            <span class="demonnum_title">渠道编号:</span>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="demonadress">
            <span class="demonadress_title">渠道地址:</span>
            <el-cascader v-model="value3" :options="options" @change="handleChange"></el-cascader>
          </div>
          <div class="demonadress_input">
            <el-input v-model="input2" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="list_Detail">
          <div class="list_Detail_title">
            <div class="blue_block"></div>
            <h3>人员信息</h3>
          </div>
          <div class="organ_cace">
            <span class="demonstration">职位:</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in selectoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="organ_cace">
            <span class="demonstration">渠道类型:</span>
            <el-cascader v-model="value2" :options="selectoptions" @change="handleChange"></el-cascader>
          </div>
          <div class="demonnum">
            <span class="demonnum_title">渠道编号:</span>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div class="demonadress">
            <span class="demonadress_title">渠道地址:</span>
            <el-cascader v-model="value3" :options="options" @change="handleChange"></el-cascader>
          </div>
          <div class="demonadress_input">
            <el-input v-model="input2" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="渠道新建流程图" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: "",
      input2: "",
      value1: [],
      value2: [],
      value3: [],
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        }
      ],
      selectoptions: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange() {
      console.log(11);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./less/index";
</style>