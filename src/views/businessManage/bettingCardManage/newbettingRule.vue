<template>
  <!-- 新增投注卡规则 -->
  <div class="vlt-card add-bettingCard">
    <div class="vlt-edit-single">
      <h2 class="title">新增规则</h2>
      <div class="vlt-edit-wrap">
        <el-form label-position="right" label-width="90px" :model="form" ref="form">
          <base-form
            :formData="data2"
            labelWidth="140px"
            ref="baseForm"
            :rules="rules2"
            direction="right"
            @change="changeForm"
          ></base-form>
        </el-form>
        <el-row class="vlt-edit-btn">
          <el-button
            type="primary"
            v-prevent="1000"
            size="medium"
            @click="submit('baseForm')"
            :loading="showLoading"
          >提交并保存</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";

export default {
  name: "CreateRule",
  data() {
    return {
      showLoading: false,
      params: {
        channelId: "",
        channelName: "",
        circle: "",
        circleUnit: "",
        createBy: "",
        createTime: "",
        id: 0,
        insId: 0,
        insName: "",
        limitAmount: 0,
        limitNum: 0,
        limitPenNum: 0,
        status: 0,
        updateBy: "",
        updateTime: ""
      },
      data2: [
        {
          type: "cascader",
          title: "所属机构",
          prop: "insId",
          value: "",
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            // multiple: true, // 多选
            checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
          },
          options: []
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
        { type: "input", title: "周期", prop: "circle", class: "cycle" },
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
        { type: "input", title: "笔数", prop: "limitPenNum" },
        { type: "input", title: "限额", prop: "limitAmount" },
        { type: "input", title: "限制次数", prop: "limitNum" }
      ],

      rules2: {
        insId: [
           { required: true, message: '请选择所属机构', trigger: 'change' }
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
      insDatas: [],
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
      }
    };
  },
  created() {
    this.getInsData();
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid === 'true') {
          (async () => {
            const _this = this;
            _this.showLoading = true;
            // _this.params.insId;
          //  let insType =  _this.$formMethods.getInsArray(_this.params.insId, 'id', this.insDatas, 'type')[0];
          //   console.log(insType);
            let data = _this.params;
            data.status = data.status ? 1 : 2;

             _this.showLoading = false;
            let result = await _this.$api.createBettingRulesList({ data });
            if (result.code == 0) {
              _this.showLoading = false;
              _this.$message({
                message: result.msg,
                type: "success"
              });
              setTimeout(() => {
                _this.$router.back();
              }, 1000);
            } else {
              _this.showLoading = false;
            }
          })();
        } else {
          return false;
        }
      });
    },

    // 获取机构列表
    getInsData() {
      const self = this;
      const data = {};
      (async data => {
        let res = await self.$api.queryUserAndInsTree({ data });
        if (res && res.code == 0) {
          console.log("res", res.data);
          let insList = res.data;
          insList.forEach(element => {
            element.children.forEach(item => {
              item.children && item.children.forEach(i => {
                delete i.children
              }) 
            })
          });
          self.$set(self.data2[0], "options", insList);
          self.insDatas = res.data;
          // self.formData[1].options = res.data;
          // self.cascaderOptions = res.data;
        } else {
          // self.$message.warning(res.msg)
        }
      })(data);
    },
    cancel() {
      this.$router.back();
    },
    changeForm(val) {
      Object.assign(this.params, val);
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
.add-bettingCard {
  .vlt-edit-single {
    .el-form-item {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        display: inline-block;
        width: 200px;
      }
      &:nth-of-type(4) {
        margin-left: 40px;
      }
    }
    .el-input.cycle {
      width: 50% !important;
    }
    .el-select.cycle-selection {
      width: 40% !important;
    }
  }
}
</style>
