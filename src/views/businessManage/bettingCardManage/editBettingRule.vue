<template>
  <!-- 新增规则 -->
  <el-dialog
    :visible.sync="show"
    width="50%"
    title=""
    :before-close="close"
    class="dialog-form-list"
  >
    <div class="vlt-card-edit">
      <!-- <h2 class="title">新增规则</h2> -->
      <div class="vlt-edit-wrap">
        <el-form label-position="right" label-width="90px" :model="form" ref="form">
          <base-form
            :formData="data2"
            labelWidth="100px"
            ref="baseForm"
            :rules="rules2"
            direction="right"
            @change="changeForm"
          ></base-form>
        </el-form>
        <el-row class="vlt-edit-btn" style="text-align: right">
          <el-button
            type="primary"
            v-prevent="1000"
            size="medium"
            @click="onSubmit"
            :loading="showLoading"
          >提交并保存</el-button>
          <el-button size="medium" @click="close">取消</el-button>
        </el-row>
      </div>
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";

export default {
  name: "editBettingRule",
  props: {
    oData: {
      type: Object,
      default: 0
    },
    insDatas: {
      type: Array
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showLoading: false,
      params: {},
      data2: [
        {
          type: "cascader",
          title: "所属机构",
          prop: "insId",
          value: '',
          options: [],
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            // multiple: true, // 多选
            checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
          }
        },
        {
          type: "select",
          title: "所选渠道",
          prop: "channelId",
          options: [
            { label: "广东苏宁易购渠道", value: "1" },
            { label: "广东天猫商城渠道", value: "2" }
          ]
        },
        {
          type: "input",
          title: "周期",
          prop: "circle",
          class: "cycle",
          value: ""
        },
        {
          type: "select",
          title: "",
          prop: "circleUnit",
          class: "cycle-selection",
          value: "day",
          options: [
            { label: "天", value: "day" },
            { label: "周", value: "week" },
            { label: "月", value: "month" },
            { label: "年", value: "year" }
          ]
        },
        { type: "input", title: "笔数", prop: "limitPenNum", value: "" },
        { type: "input", title: "限额", prop: "limitAmount", value: "" },
        { type: "input", title: "限制次数", prop: "limitNum", value: "" }
      ],
      rules2: {
        insId: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        circle: [
          { required: false, validator: rules.numberVal, trigger: "blur" }
        ],
        limitPenNum: [
          { required: false, validator: rules.numberVal, trigger: "blur" }
        ],
        limitAmount: [
          { required: false, validator: rules.numberVal, trigger: "blur" }
        ],
        limitNum: [
          { required: false, validator: rules.numberVal, trigger: "blur" }
        ]
      },
      form: {
        channelId: "1", //渠道id
        channelName: "张三", //渠道名称
        circle: "1", //周期
        circleUnit: "day", //周期单位
        createBy: "李四", // 创建人
        createTime: "", // 常见时间
        id: 0,
        insId: 0, //机构id
        insName: "中福彩", //机构名称
        limitAmount: 2580, //限额
        limitNum: 0, //限制次数
        limitPenNum: 0, //限制笔数
        status: 0, // 是否删除 1/是,2/否
        updateBy: "ss", // 更新人
        updateTime: "" // 更新时间
      },
      show: this.isShow,
      insList: this.insDatas
    };
  },
  watch: {
    isShow(value) {
      console.log('insDatas', this.insList);
      this.show = value;
      this.backfill(this.oData);
      this.backFillIns(this.oData.insId, this.insList);
    },
    oData: {
      handler(newValue, oldValue) {
        console.log("这是改变的数据", newValue);
        this.backfill(newValue);
      },
      deep: true
    },
    insDatas: {
      handler(newVal, oldValue) {
        this.insList = newVal;
        this.backFillIns(this.oData.insId, this.insList);
      },
      deep: true
    }
  },
  components: {},
  created () {
    console.log('过来的值为', this.insList);
  },
  methods: {
    backfill(newValue) {
      let arr = Object.keys(newValue);
      let aForm = this.data2;
      this.params.id =  this.oData.id;
      for (let i = 0; i < aForm.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (aForm[i].prop == arr[j]) {
            aForm[i].value = this.oData[arr[j]];
          }
        }
      }
    },
    backFillIns (data, list) {
      console.log(data, list);
      this.$set(this.data2[0], 'options', list)
      // this.data2[0].value = data
    },
     // 返回完整数组
    getInsArray(id, key, data, keyBack) { // 传入id和key是对应  keyBack是返回想要的key
      const self = this;
      for (var i in data) {
        if (data[i][key] == id) {
          return [data[i][keyBack]];
        }
        if (data[i].children) {
          let ro = self.getInsArray(id, key, data[i].children, keyBack);
          if (ro !== undefined) {
            return ro.concat(data[i][keyBack]);
          }
        }
      }
    },
    async submit() {
      const _this = this;
      // this.showLoading = true;
      let data = _this.params;
      console.log("发送的数据", data);
      // this.$refs.baseForm.validate((valid) => {
      //   if (valid == 'true') {
      //     console.log('true');
      //   } else {
      //     console.log('false');
      //   }
      // })
      let result = await _this.$api.updateBettingRules({ data });
      console.log("result", result);
      if (result.code == 0) {
        _this.showLoading = false;
        _this.$message({
          message: result.msg,
          type: "success"
        });
        setTimeout(() => {
          _this.close();
        }, 1000);
      }
    },

    close() {
      this.$refs.baseForm.resetForm();
      // setTimeout(() => {
        this.$emit("closeDia");
      // }, 3000);
    },
    onSubmit() {
      this.submit();
    },
    changeForm(val) {
      Object.assign(this.params, val);
      // console.log(',,,',  this.params);
    },
    changeSelect(val) {
      console.log(this.form, val);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style lang="less">
.dialog-form-list {
  .el-select {
    width: 100%;
  }

  .el-form-item {
    .el-cascader {
      width: 100%;
      .el-input {
        width: 100%;
        .el-input__inner {
          width: 100%;
          height: 40px;
          line-height: 40px;
        }
      }
    }
    &:nth-of-type(3),
    &:nth-of-type(4) {
      display: inline-block;
      // width: 200px;
      // .el-input {
      //   width: 100%;
      // }
    }
    &:nth-of-type(3) {
      width: 70%;
    }
    &:nth-of-type(4) {
      width: 30%;
      .el-form-item__content {
        margin-left: 40px !important;
      }
    }
  }
}
</style>
