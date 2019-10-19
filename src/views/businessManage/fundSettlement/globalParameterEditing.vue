<template>
  <div class="vlt-card fund-edit">
    <el-form class="comp-item"  
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="140px"
      size="small"
      @change="changeForm">
      <div class="vlt-edit-over">
        <h2 class="title">基础信息</h2>
        <div class="vlt-edit-wrap fund-edit-double">
          <el-form-item label="代销费率">
            <el-input v-model="form.input1" placeholder="请输入"></el-input>
          </el-form-item>
           <el-form-item label="弃奖设置">
            <el-input v-model="form.input1" placeholder="请输入"></el-input>
            <p class="wraning">T(+1)天未兑奖视为弃奖，弃奖资金归入“公益金”</p>
          </el-form-item>
           <el-form-item label="游戏兑换比例">
            <el-input v-model="form.input1" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="生效时间">
            <el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
      </div>
      <div class="vlt-edit-over">
        <h2 class="title">返奖率-调节基金</h2>
        <div class="vlt-edit-wrap fund-edit-normal">
          <el-form-item label="返奖率：">
            <el-input v-model="form.input1" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="调节基金：">
            <el-input v-model="form.input2" placeholder="请输入"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="vlt-edit-over">
        <h2 class="title">发行经费</h2>
        <div class="vlt-edit-wrap fund-edit-normal">
          <el-form-item label="发行经费占比">
            <el-input v-model="form.input1" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="中福彩中心：">
            <el-input v-model="form.input2" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="省级福彩中心：">
            <el-input v-model="form.input2" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="市级福彩中心：">
            <el-input v-model="form.input2" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="销售厅：">
            <el-input v-model="form.input2" placeholder="请输入"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="vlt-edit-over">
        <h2 class="title">公益金</h2>
        <div class="vlt-edit-wrap fund-edit-normal">
          <el-form-item label="公益金占比：">
            <el-input v-model="form.input1" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="中福彩中心：">
            <el-input v-model="form.input2" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="省级福彩中心：">
            <el-input v-model="form.input2" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="市级福彩中心：">
            <el-input v-model="form.input2" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="销售厅：">
            <el-input v-model="form.input2" placeholder="请输入"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="vlt-edit-over">
        <h2 class="title">纳税</h2>
        <div class="vlt-edit-wrap add-wrap">
          <el-form-item>
            <el-input v-model="form.input1" placeholder="请输入"></el-input> 至
            <el-input v-model="form.input2" placeholder="请输入"></el-input> 税率：
            <el-input v-model="form.input2" placeholder="请输入"></el-input>
            <span class="btn-clear"><i class="el-icon-remove-outline"></i></span>
          </el-form-item>
            <p class="add-item"><i class="el-icon-plus"></i> 新增规则（左开右闭区间）</p>
        </div>
      </div>

      <el-form-item size="large" class="submit-item">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
 
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      form: {
        input1: "",
        input2: "",
        input3: "",
        date: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    changeForm () {
      console.log('ss');
    },
    onSubmit() {
      console.log(this.form);
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less">
.fund-edit {
  .el-form {
    .vlt-edit-over {
      width: 100%;
    }
    .vlt-edit-wrap {
      width: 100%;
      padding-left: 100px;
      .el-form-item {
        max-width: 400px;
        margin: 0 50px 20px 0;
      }
      &.fund-edit-double {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding-left: 70px;
        .el-form-item {
          max-width: 300px;
          margin: 0 50px 20px 0;
          &:nth-of-type(2) {
            max-width: 500px;
            padding-right: 200px;
          }
          .el-form-item__label {
            text-align: left;
          }
          .el-form-item__content {
            margin-left: 0 !important;
          }
          .wraning {
            position: absolute;
            left: 320px;
            bottom: 0;
            width: 400px;
          }
        }
      }
      &.add-wrap {
        width: 500px;
        margin-left: 100px;
        padding-left: 0;
        margin-right: 0;
        .el-form-item__content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-left: 0 !important;
          .btn-clear {
            font-size: 20px;
            color: #DCDFE6;
          }
        }
        .el-input {
          width: 80px;
        }
        .add-item {
          padding: 8px 10px;
          width: 400px;
          text-align: center;
          border: 1px dashed #ccc;
          cursor: pointer;
        }
      }
    }
    // .edit-item {
    //   width: 100%;
    //   display: flex;
    //   justify-content: flex-start;
    //   .el-form-item {
    //     flex: 32%;
    //     max-width: 300px;
    //     margin-right: 50px;
    //     .el-form-item__content {
    //       max-width: 300px;
    //     }
    //     // .el-date-editor {
    //     //   max-width: 300px;
    //     // }
    //   }
    // }
  }
  .submit-item {
    margin-top: 50px;
  }
}
</style>
