<template>
  <div class="vlt-card  vlt-edit-single">
    <div class="vlt-edit-wrap">
      <el-form label-position="right" label-width="90px" :model="form" ref="form">
        <base-form
          :formData="data2"
          labelWidth="140px"
          ref="baseForm"
          :rules="rules1"
          direction="right"
          @change="changeForm"
        ></base-form>
      </el-form>
      <el-row class="vlt-edit-btn">
        <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交</el-button>
        <el-button type="primary" v-prevent="1000" size="medium" @click="save">保存</el-button>
        <el-button size="medium" @click="cancel">取消</el-button>
      </el-row>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "equipmentDetail",
  data() {
    return {
      form: {
        name: "",
        type: "",
        coding: "",
        location: "",
        useStatus: "",
        accessoryStatus: "",
        storageTime: ''
      },
      params: {},
      data2: [
        { type: "input", title: "配件名称", prop: "device" },
        { type: "input", title: "配件型号", prop: "type" },
        { type: "input", title: "配件编码", prop: "coding" },
        { type: "input", title: "存放位置", prop: "location" },
        { type: "input", title: "使用状态", prop: "useStatus" },
        { type: "input", title: "配件状态", prop: "accessoryStatus" },
        { type: "input", title: "入库时间", prop: "storageTime" }
      ],
      rules1: {
      },
      setData: {
            id: 0,
            device: 'xxx',
            type: 'xxx',
            coding: 'xxx',
            location: '中彩仓库',
            useStatus: '运行中',
            accessoryStatus: '正常',
            storageTime: '2019-09-09'
      }
    };
  },
  created () {
    this.init();
  },
  components: {},
  methods: {
    init () {
      let _item = this.data2;
      let arr = Object.keys(this.setData);
      for (let i = 0; i < _item.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (_item[i].prop == arr[j]) {
            // console.log(_item[i]);
            _item[i].value = this.setData[arr[j]];
          }
        }
      }
    },
    submit() {},
    cancel() {},
    save() {},
    changeForm(val) {
      Object.assign(this.params, val);
      console.log("派发出来的参数", this.params);
    }
  }
};
</script>

<style lang="less" scoped>
.vlt-card {
  padding: 20px;
}
</style>
