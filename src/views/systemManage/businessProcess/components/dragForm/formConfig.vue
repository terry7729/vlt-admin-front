<template>
  <div class="mixin-form" :append-to-body="true">
    <el-row v-if="formType.type !==''">
      <el-col :span="24">
        <h3 class="title">{{formType.name}}</h3>
      </el-col>
      <el-form :model="form" ref="form" label-width="80px" label-position="top">
        <div
          v-if="formType.type === 'input' || formType.type === 'textarea' || formType.type === 'switch' || formType.type === 'date'"
        >
          <el-form-item label="字段名称" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="表单字段" prop="field">
            <el-input v-model="form.field"></el-input>
          </el-form-item>
          <el-form-item label="placehoder" prop="placeholder">
            <el-input v-model="form.placeholder"></el-input>
          </el-form-item>
          <el-form-item label="字段类型" prop="type">
            <el-select v-model="form.inputType" placeholder="请选择" @change="changesd">
              <el-option
                v-for="item in selectType.inputSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div
          v-if="formType.type === 'select'|| formType.type === 'checkbox' || formType.type === 'radio'"
        >
          <el-form-item label="表单名称" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="表单字段" prop="field">
            <el-input v-model="form.field"></el-input>
          </el-form-item>
          <el-form-item label="选项名称" prop="label">
            <el-input v-model="form.label"></el-input>
          </el-form-item>
          <el-form-item label="选项字段" prop="value">
            <el-select v-model="form.inputType" placeholder="请选择" @change="changesd">
              <el-option
                v-for="item in selectType.inputSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <el-row class="conf-btn">
        <el-col :span="24">
          <el-button type="primary" size="small" @click="confirm">确认修改</el-button>
          <el-button size="small" @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import selectType from '@/views/systemManage/businessProcess/components/dragForm/config/selectType';
import formTypeList from "@/views/systemManage/businessProcess/components/dragForm/config/formTypeList";
export default {
  name: "formConfig",
  props: {
    config: {
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      configs: {},
      form: {
        title: "",
        field: "",
        value: "",
        label: "",
        placeholder: "",
        inputType: ""
      },
      selectType,
      formTypeList,
      formType: {
        name: "字段名称",
        type: ""
      }
    };
  },
  watch: {
    formType() {
      console.log(this.form);
    }
  },
  created() {},
  mounted() {
    this.getInfo();
    // console.log("右框", this.form);
    this.eventBus.$on("showFieldConfig", config => {
      this.configs = config;
    });
  },
  computed: {},
  methods: {
    getInfo() {
      const _this = this;
      _this.eventBus.$on("showFieldConfig", info => {
        if (_this.formTypeList) {
          for (let i = 0; i < _this.formTypeList.length; i++) {
            if (info.type == _this.formTypeList[i].type) {
              _this.formType.type = _this.formTypeList[i].type;
              _this.formType.name = _this.formTypeList[i].name;
            }
          }
        }
      });
    },
    confirm() {
      Object.assign(this.form, this.configs);
      console.log(this.form,this.configs);
      this.$emit("changeForm", JSON.parse(JSON.stringify(this.form)));
      this.$refs["form"].resetFields();
      console.log(this.form,this.configs);
    },
    reset () {
      
    },
    changesd (value) {
      console.log(value);
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.mixin-form {
  padding: 10px;
  .title {
    line-height: 2;
    margin: auto -10px;
    text-indent: 10px;
    border-bottom: 1px solid #8a8a8a;
  }
  .conf-btn {
    margin-top: 20px;
  }
}
.mb10 {
  margin-bottom: 10px !important;
}
</style>
