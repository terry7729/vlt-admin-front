<template>
  <div class="search-bar-comp">
    <el-form :inline="true" :model="form" :label-width="labelWidth">
      <span v-for="(formItem, itemIndex) in options" :key="itemIndex" class="form-item-line">
        <el-form-item :label="formItem.title" v-if="formItem.type === 'input'">
          <el-input size="small" v-model="form[formItem.prop]" :placeholder="formItem.placeholder"></el-input>
        </el-form-item>
        <el-form-item :label="formItem.title" v-if="formItem.type === 'select'">
          <el-select size="small" v-model="form[formItem.prop]" :placeholder="formItem.placeholder">
            <el-option :label="optionItem.label" :value="optionItem.value" v-for="(optionItem, optionIndex) in formItem.options" :key="optionIndex"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="formItem.title" v-if="formItem.type === 'datepicker'" v-show="!collapse">
          <el-date-picker
            size="small"
            v-model="form[formItem.prop]"
            type="date"
            :placeholder="formItem.placeholder"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="formItem.title" v-if="formItem.type === 'datepicker-range'" v-show="!collapse">
          <el-date-picker
            size="small"
            v-model="form[formItem.prop]"
            type="daterange"
            :start-placeholder="formItem.placeholder[0]"
            :end-placeholder="formItem.placeholder[1]"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="formItem.title" v-if="formItem.type === 'datetime'" v-show="!collapse">
          <el-date-picker
            size="small"
            v-model="form[formItem.prop]"
            type="datetime"
            :placeholder="formItem.placeholder"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="formItem.title" v-if="formItem.type === 'datetime-range'" v-show="!collapse">
          <el-date-picker
            size="small"
            v-model="form[formItem.prop]"
            type="datetimerange"
            :start-placeholder="formItem.placeholder[0]"
            :end-placeholder="formItem.placeholder[1]"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="formItem.title" v-if="formItem.type === 'cascader'" v-show="!collapse">
          <el-cascader
            size="small"
            v-model="form[formItem.prop]"
            :options="formItem.options"
          >
          </el-cascader>
        </el-form-item>
      </span>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
        <el-button size="small" @click="reset">重置</el-button>
        <el-button size="small" type="text" @click="onDrop">
          {{collapse ? '展开' : '收起'}}
          <i :class="[collapse ? 'el-icon-arrow-down' : 'el-icon-arrow-up']"></i>
        </el-button>
      </el-form-item>
    </el-form>
    <!--拓展插槽-->
    <slot name="extend-bar"></slot>
    <p class="tips-item" v-if="total">
      <i class="el-alert__icon el-icon-info"></i>
      <span>
        共搜索到<em>{{total}}</em>条数据
      </span>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'searchBar',
    props: {
      // 配置参数
      options: {
        default() {
          return [
          //   {
          //     title: '表单名称', // 表单名
          //     prop: 'name', // 表单字段
          //     type: 'input', // 表单类型
          //     value: '', // 表单字段值
          //     options: [{ // select类型表单选项
          //       value: '', // 字段值
          //       label: '' // 字段名
          //     },
          //   ],
          //   placeholder: '请输入' || ['请输入1', '请输入2'],
          // }
        ]}
      },
      // 标签宽度
      labelWidth: {
        default: '70px'
      },
      // 搜索结果条数
      total: {
        default: 0
      },
    },
    data() {
      return {
        form: {
          
        },
        collapse: true,
      };
    },
    created() {
      // 初始化
      this.options.forEach(item => {
        this.$set(this.form, item.prop, item.value)
      })
    },
    methods: {
      onSubmit() {
        let formData = {};
        for (let key in this.form) {
          if (this.form[key] !== '') formData[key] = this.form[key];
        }
        this.$emit('search', formData)
      },
      onDrop() {
        this.collapse = !this.collapse;
      },
      reset() {
        for (let key in this.form) {
          this.form[key] = '';
        }
      }
    }
  }
</script>

<style lang="less">
  .search-bar-comp{
    .el-form{
      padding: 15px 15px 0;
      background-color: #f7f7f7;
    }
    .el-button{
      margin: 0 5px;
    }
    .tips-item{
      height: 32px;
      line-height: 32px;
      background-color: rgba(230, 243, 252, 1);
      border: 1px solid rgba(212, 240, 252, 1);
      font-size: 12px;
      color: #515a6e;
      border-radius: 4px;
      padding: 0 10px;
      margin: 10px 0;
      em{
        color: #2d8cf0;
        font-style: normal;
        padding: 0 3px;
      }
      i{
        vertical-align: middle;
        color: #2d8cf0;
        padding-right: 5px;
      }
    }
    .form-item-line{
      display: inline-block;
      vertical-align: top;
      .el-form-item{
        margin-bottom: 10px;
      }
      *{
        font-size: 12px;
      }
    }
    .el-input__inner{
      width: 240px;
    }
    .el-input{
      width: auto;
    }
  }
</style>
