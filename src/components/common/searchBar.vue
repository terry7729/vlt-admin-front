<template>
  <div class="search-bar-comp">
    <el-form :inline="true" :model="form" :label-width="labelWidth">
      <span v-for="(formItem, itemIndex) in _options" :key="itemIndex" class="form-item-line">
        <el-form-item :label="formItem.title" v-if="formItem.type === 'input'">
          <el-input size="small" v-model="form[formItem.prop]" :placeholder="`请输入${formItem.title}`"></el-input>
        </el-form-item>
        <el-form-item :label="formItem.title" v-if="formItem.type === 'select'">
          <el-select size="small" v-model="form[formItem.prop]" :placeholder="`请选择${formItem.title}`">
            <el-option :label="optionItem.label" :value="optionItem.value" v-for="(optionItem, optionIndex) in formItem.options" :key="optionIndex"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="formItem.title" v-if="formItem.type === 'datepicker'">
          <el-date-picker
            size="small"
            v-model="form[formItem.prop]"
            type="date"
            :placeholder="`请选择${formItem.title}`"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="formItem.title" v-if="formItem.type === 'datepicker-range'">
          <el-date-picker
            size="small"
            v-model="form[formItem.prop]"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="formItem.title" v-if="formItem.type === 'datetime'">
          <el-date-picker
            size="small"
            v-model="form[formItem.prop]"
            type="datetime"
            :placeholder="`请选择${formItem.title}`"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="formItem.title" v-if="formItem.type === 'datetime-range'">
          <el-date-picker
            size="small"
            v-model="form[formItem.prop]"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="formItem.title" v-if="formItem.type === 'year'">
          <el-date-picker
            size="small"
            v-model="form[formItem.prop]"
            type="year"
            :placeholder="`请选择${formItem.title}`"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="formItem.title" v-if="formItem.type === 'month'">
          <el-date-picker
            size="small"
            v-model="form[formItem.prop]"
            type="month"
            :placeholder="`请选择${formItem.title}`"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="formItem.title" v-if="formItem.type === 'cascader'">
          <el-cascader
            size="small"
            v-model="form[formItem.prop]"
            :value="formItem.value"
            :props="formItem.setProps"
            :options="formItem.options"
            :placeholder="`请选择${formItem.title}`"
          >
          </el-cascader>
        </el-form-item>
      </span>
      <el-form-item class="btn-wrap">
        <el-button size="small" type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
        <el-button size="small" @click="reset">重置</el-button>
        <el-button size="small" type="text" @click="onDrop" v-if="options.length > 2">
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
          //   ]
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
        _options: [],
        collapse: true,
      };
    },
    created() {
      // 初始化
      this._options = this.options.slice(0, 2);
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
        if (!this.collapse) {
          this._options = this.options;
        } else {
          this._options = this.options.slice(0, 2);
        }
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
    padding: 15px 0;
    .el-form{
      background-color: #fff;
      .el-button--text:hover {
        background-color: transparent;
        color: #57a3f3;
        border-color: transparent;
      }
      .el-button--text:focus {
        background-color: transparent;
        color: #57a3f3;
        border-color: transparent;
      }
    }
    .btn-wrap{
      padding-left: 30px;
      margin-bottom: 10px;
    }
    .el-button{
      margin: 0 8px 0 0;
    }
    .tips-item{
      height: 34px;
      line-height: 34px;
      background-color: #f0faff;
      border: 1px solid #abdcff;
      font-size: 12px;
      color: #515a6e;
      border-radius: 4px;
      padding: 0 10px;
      margin: 10px 0 0;
      display: flex;
      align-items: center;
      em{
        color: #2d8cf0;
        font-style: normal;
        padding: 0 3px;
      }
      i{
        vertical-align: middle;
        color: #2d8cf0;
        margin-right: 5px;
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
