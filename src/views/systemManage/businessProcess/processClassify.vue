<template>
  <div class="vlt-card">
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[1]"
            :default-checked-keys="[1]"
            :props="defaultProps"
            style="width:300px"
          ></el-tree>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple" style="background: rgba(247, 247, 247, 1);">
          <panel :title="title">
            <div id="p1">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item>
                  <span>类型名称:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <el-input v-model="formLabelAlign.name" style="width:250px"></el-input>
                </el-form-item>
                <el-form-item>
                  <span>上级类别:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <el-input v-model="formLabelAlign.region" style="width:250px"></el-input>
                </el-form-item>
                <el-form-item>
                  <span>状态:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <el-input v-model="formLabelAlign.type" style="width:250px"></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" @click="modify(scope.row.id)">修改</el-button>
              <el-button type="info">重置</el-button>
            </div>
          </panel>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      title: "类别信息",
      data: [
        {
          id: 1,
          label: "游戏管理",
          children: [
            {
              id: 5,
              label: "游戏发行"
            },
            {
              id: 6,
              label: "游戏退市"
            },
            {
              id: 7,
              label: "游戏配置"
            }
          ]
        },
        {
          id: 2,
          label: "渠道业务",
          children: [
            {
              id: 8,
              label: "游戏发行"
            }
          ]
        },
        {
          id: 3,
          label: "营销活动",
          children: [
            {
              id: 9,
              label: "游戏发行"
            }
          ]
        },
        {
          id: 4,
          label: "责任彩票",
          children: [
            {
              id: 10,
              label: "游戏发行"
            }
          ]
        },
        {
          id: 5,
          label: "资金参数",
          children: [
            {
              id: 11,
              label: "游戏发行"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      options: [
        {
          value: "选项1",
          label: "刷新"
        },
        {
          value: "选项4",
          label: "添加一级类别"
        },
        {
          value: "选项5",
          label: "添加子类别"
        },
        {
          value: "选项5",
          label: "展开所有"
        }
      ],
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      }
    };
  },
  methods: {
    modify(id){
      this.$router.push({
        path:"processClassify/processClassifyModify",
        query: {id}
      })
    }
  }
};
</script>

<style lang="less" scoped>
.select {
  width: 250px;
  position: relative;
  top: -200px;
  left: 250px;
}
#p1 {
  text-align: center;
  padding:20px;
} 
</style>
