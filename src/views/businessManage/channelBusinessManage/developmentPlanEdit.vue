<template>
  <div class="vlt-card">
    <div class="vlt-edit-single">
      <h2 class="title">编辑年度发展计划</h2>
      <div class="vlt-edit-wrap">
        <base-form
          ref="baseForm"
          :formData="formData"
          :rules="rules"
          direction="right"
          labelWidth="140px"
          @change="changeForm"
          v-if="showPro"
        ></base-form>
        <base-form
          ref="baseForm"
          :formData="formDataCity"
          :rules="rules"
          direction="right"
          labelWidth="140px"
          @change="changeForm"
          v-else
        ></base-form>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import moment from "moment";
import { getCascaderCheckedItem } from "@/utils/getCascaderCheckedItem.js";
import rules from "@/utils/rules.js";

export default {
  name: "",
  data() {
    return {
      showPro: true,
      formData: [
        {
          title: "计划年份",
          type: "datepicker",
          prop: "planDate",
          dateType: "year",
          value: ""
        },
        {
          title: "所属机构",
          type: "cascader",
          prop: "insId",
          value: [],
          options: [],
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            // multiple: true, // 多选
            checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
          }
        },
        // 作为省市层级筛选， 后边等数据好了 删除
        {
          title: "省市层级",
          type: "select",
          prop: "insLevel",
          value: [],
          options: [
            {
              label: 1,
              value: 1
            },
            {
              label: 2,
              value: 2
            }
          ]
        },
        {
          title: "省属新建销售厅数量",
          type: "input",
          prop: "provinceNewSellingHall",
          value: ""
        },
        {
          title: "市属新建销售厅数量",
          type: "input",
          prop: "cityNewSellingHall",
          value: ""
        },
        {
          title: "省属销售厅投注机数量",
          type: "input",
          prop: "provinceSellingMachine",
          value: ""
        },
        {
          title: "市属销售厅投注机数量",
          type: "input",
          prop: "citySellingMachine",
          value: ""
        },
        {
          title: "省合作厅数量",
          type: "input",
          prop: "provinceCooperationHall",
          value: ""
        },
        {
          title: "市合作厅数量",
          type: "input",
          prop: "cityCooperationHall",
          value: ""
        },
        {
          title: "省合作厅投注数量",
          type: "input",
          prop: "provinceCooperationMachine",
          value: ""
        },
        {
          title: "市合作厅投注数量",
          type: "input",
          prop: "cityCooperationMachine",
          value: ""
        },
        {
          title: "发展预算",
          type: "input",
          prop: "developBudget",
          value: ""
        },
        { title: "计划说明", type: "textarea", prop: "planDesc", value: "说明" }
      ],
      formDataCity: [
        {
          title: "计划年份",
          type: "datepicker",
          prop: "planDate",
          dateType: "year",
          value: ""
        },
        {
          type: "cascader",
          prop: "insId",
          value: "61",
          title: "所属机构",
          options: [
            {
              value: "1",
              label: "中福彩",
              children: [
                {
                  value: "60",
                  label: "湖南",
                  children: [
                    {
                      value: "61",
                      label: "长沙市"
                    }
                  ]
                }
              ]
            }
          ]
        },
        // 作为省市层级筛选， 后边等数据好了 删除
        {
          title: "省市层级",
          type: "select",
          prop: "insLevel",
          value: [],
          options: [
            {
              label: 1,
              value: 1
            },
            {
              label: 2,
              value: 2
            }
          ]
        },
        {
          title: "市属新建销售厅数量",
          type: "input",
          prop: "newSellingHall",
          value: ""
        },
        {
          title: "市属销售厅投注机数量",
          type: "input",
          prop: "sellingMachine",
          value: ""
        },
        {
          title: "市合作厅数量",
          type: "input",
          prop: "cooperationHall",
          value: ""
        },
        {
          title: "市合作厅投注数量",
          type: "input",
          prop: "cooperationMachine",
          value: ""
        },
        { title: "发展预算", type: "input", prop: "developBudget", value: "" },
        { title: "计划说明", type: "textarea", prop: "planDesc", value: "" }
      ],
      params: {
        insLevel: "2"
      },
      rules: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        all: [{ required: true, validator: rules.checkEmail, trigger: "blur" }]
      },
      cascaderOptions: [],
      isPrivice: true
    };
  },
  created() {
    // 用户所在机构
    if (this.isPrivice) {
      // 省级用户 调省查市接口
      // 市级数据 不能输入
      let data = {
        insId: "60",
        planDate: "2019"
      };
      this.getProvinceCityPlan(data);
    } else {
      let data = {
        insId: "61",
        planDate: "2019"
      };
      this.showPro = false;
      // 只需要市级数据  省级不用
      // this.getProvinceCityPlan(data)
    }
    // 获取所属机构数据
    this.getInsData();
    this.$nextTick(() => {
      const routerQuery = this.$route.query;
      if (routerQuery && routerQuery.id) {
        const data = {
          id: routerQuery.id,
          insLevel: routerQuery.insLevel
        };
        this.getQueryDevelopPlanInfo(data);
      }
    })
  },
  methods: {
    // 获取信息 回填到输入框中， 如果此数据是省级数据  则市级数据显示但输入框不能修改， 如果是市级数据 则隐藏省级的数据填写
    getQueryDevelopPlanInfo(data) {
      const self = this;
      (async data => {
        let res = await self.$api.getQueryDevelopPlanInfo({ data });
        if (res && res.code == 0) {
          console.log('sssssss', res);
          // 根据返回 返回的数据判断是否是省级所属机构， 然后根据回填数据
          let dataList= this.isPrivice ? this.formData : formDataCity;
          let dataArr = Object.keys(res.data);
          for (let i = 0; i < dataList.length; i++ ) {
            for(let j = 0; j < dataArr.length; j++) {
              if (dataList[i].prop == dataArr[j]) {
                // console.log(res.data[dataArr[j]]);
                dataList[i].value = res.data[dataArr[j]]
              }
            }
          }
          console.log(dataList);
        } else {
          self.$message.warning(res.msg);
        }
      })(data);
    },
    // 省级用户查询市级数据
    getProvinceCityPlan(data) {
      const self = this;
      (async data => {
        let res = await self.$api.getProvinceCityPlan({ data });
        if (res && res.code == 0) {
          console.log("res", res.data);
          // self.$set(self.formData[1], 'options', res.data)
          // self.formData[1].options = res.data;
          self.cascaderOptions = res.data;
          // 遍历把市的值填到输入框中
          self.formData.forEach(item => {
            if (
              item.prop == "cityNewSellingHall" ||
              item.prop == "citySellingMachine" ||
              item.prop == "cityCooperationHall" ||
              item.prop == "cityCooperationMachine"
            ) {
              item.value = res.data[item.prop];
              item.disabled = true;
            }
          });
        } else {
          self.$message.warning(res.msg);
        }
      })(data);
    },
    // 获取机构数据
    getInsData() {
      const self = this;
      const data = {};
      (async data => {
        let res = await self.$api.QueryInsTree({ data });
        if (res && res.code == 0) {
          // console.log("res", res.data);
          self.$set(self.formData[1], "options", res.data);
          // self.formData[1].options = res.data;
          self.cascaderOptions = res.data;
        } else {
          // self.$message.warning(res.msg)
        }
      })(data);
    },
    // 新建发展计划
    createDevelopPlan() {
      const self = this;
      const data = this.params;
      (async data => {
        let res = await self.$api.createDevelopPlan({ data });
        if (res && res.code == 0) {
          self.$message.success("提交成功");
          setTimeout(() => {
            self.$router.push({ name: "developmentPlan" });
          }, 500);
        } else {
          // self.$message.warning(res.msg)
        }
      })(data);
    },
    changeForm(val) {
      // console.log('派发出来的参数', val)
      this.params = Object.assign(this.params, val);
      // console.log('派发出来的参数',this.params);
      if (this.params.planDate) {
        this.params.planDate = moment(this.params.planDate).format("YYYY");
      }

      // const instArr = getCascaderCheckedItem(val.insCode, 'id', this.cascaderOptions)
      // console.log(instArr)
    },
    submit() {
      const self = this;
      console.log("提交的参数", this.params);
      self.$refs.baseForm.validate(val => {
        console.log(val);
        self.createDevelopPlan();
      });
    },
    changeSelect(val) {
      console.log(this.form, val);
    },
    cancel() {}
  }
};
</script>

<style lang="less" scoped>
@import "./less/index.less";
</style>
