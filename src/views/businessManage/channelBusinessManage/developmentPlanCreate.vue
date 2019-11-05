<template>
  <div class="vlt-card">
    <div class="vlt-edit-single">
      <h2 class="title">基础信息</h2>
      <div class="vlt-edit-wrap">
        <base-form
          ref="baseForm"
          :formData="formData"
          :rules="rules"
          direction="right"
          labelWidth="150px"
          @change="changeForm"
          v-if="showPro"
        ></base-form>

        <base-form
          ref="baseForm"
          :formData="formDataCity"
          :rules="rules"
          direction="right"
          labelWidth="150px"
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
        // {title: '省市层级', type: 'select', prop: 'insLevel', value: [],
        //   options: [
        //     {
        //       label: 1,
        //       value: 1
        //     },{
        //       label: 2,
        //       value: 2
        //     }
        //   ]
        // },
        {
          title: "省属新建销售厅数量",
          type: "input",
          prop: "newSellingHall",
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
          prop: "sellingMachine",
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
          prop: "cooperationHall",
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
          prop: "cooperationMachine",
          value: ""
        },
        {
          title: "市合作厅投注数量",
          type: "input",
          prop: "cityCooperationMachine",
          value: ""
        },
        { title: "发展预算", type: "input", prop: "developBudget", value: "" },
        { title: "计划说明", type: "textarea", prop: "planDesc", value: "" }
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
          value: "",
          title: "所属机构",
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
        insLevel: 2
      },
      rules: {
        planDate: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        insId: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        newSellingHall: [{ required: true, validator: rules.checkEmptyNumber, trigger: "blur" }],
        sellingMachine: [{ required: true, validator: rules.checkEmptyNumber, trigger: "blur" }],
        cooperationHall: [{ required: true, validator: rules.checkEmptyNumber, trigger: "blur" }],
        cooperationMachine: [{ required: true, validator: rules.checkEmptyNumber, trigger: "blur" }],
        developBudget:[{ required: true, validator: rules.checkEmptyNumber, trigger: "blur" }]
      },
      cascaderOptions: [],
      listTree: []
    };
  },
  mounted() {},
  created() {
    // 拿到用户insInfo, insLevel
    const insData = this.$route.query;
    // 用户所在机构
    if (insData.insLevel == 1) {
      // 省级用户 调省查市接口
      // 市级数据 不能输入
      let data = {
        insId: insData.insId,
        planDate: new Date().getFullYear()
      };
      this.formData[0].value = '' + new Date().getFullYear()
      this.getProvinceCityPlan(data);
    } else {
      let data = {
        insId: "61",
        planDate: new Date().getFullYear()
      };
      this.showPro = false;
      this.formData[0].value = '' + new Date().getFullYear()
      // 只需要市级数据  省级不用
      // this.getProvinceCityPlan(data)
    }
    this.getUserInsInfoList();
    // 获取所属机构数据
    this.getInsData(insData);
  },
  methods: {
    getUserInsInfoList() {
      const _this = this;
      (async data => {
        let res = await _this.$api.getUserInsInfoList({});
        // 返回的data 有0 时 表示有计划列表的权限 那么计划列表的tab显示，反之隐藏，
        // 同理 有一级的时候 则显示省级的数据，市级亦是如此
        if (res.data) {
          console.log("获取的机构。。。", res);
          _this.listTree = res.data;
          console.log(_this.listTree);
        }
      })();
    },
    // 省级用户查询市级数据
    getProvinceCityPlan(data) {
      const self = this;
      (async data => {
        let res = await self.$api.getProvinceCityPlan({ data });
        console.log("获取省级的数据", res);
        if (res && res.code == 0) {
          if (res.data != null) {
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
            console.log("请先添加市级数据");
          }
        } else {
          self.$message.warning(res.msg);
        }
      })(data);
    },
    // 获取机构数据
    getInsData(insData) {
      const self = this;
      const data = {};
      (async data => {
        let res = await self.$api.QueryInsTree({ data });
        if (res && res.code == 0) {
          let newData = res.data;
          console.log('res.data', res.data);
          if (insData.insLevel == 1) {
            // 筛选到省级 只显示选择省级的数据
            // res.data.forEach(item => {
            //   let prov = item.children.filter(a => {
            //     if (a.id == insData.insId) {
            //       return a;
            //     }
            //   });
            //   item.children = prov;
            // });
            res.data.forEach(item => {
                delete item.children
              // item.children.forEach(ele => {
              //   delete ele.children
              //   // ele.children && ele.children.forEach(el => {
              //   //   delete el.children
              //   // })
              // });
            });
            self.$set(self.formData[1], "options", res.data);
            // self.formData[1].value = insData.insId;
          } else {
            let prov = res.data.filter(a => {
              if (a.id == insData.insId) {
                console.log('a', a);
                return a;
              }
            })
            prov.forEach(item => {
              delete item.children
            })

            newData = prov;
            console.log(insData.insLevel);
            self.$set(self.formDataCity[1], "options", newData);
          }

          // console.log("res", self.formData[1], res.data);
          self.cascaderOptions = res.data;
        } else {
          // self.$message.warning(res.msg)
        }
      })(data);
    },
    // 新建发展计划
    createDevelopPlan() {
      const self = this;
      this.params.insLevel = parseInt(this.$route.query.insLevel);
      const data = this.params;
      console.log("请求的数据", data);
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
<style lang="less">
.el-cascader-panel {
  #cascader-menu-1956-3 {
    display: none !important;
  }
}
</style>
<style lang="less" scoped>
@import "./less/index.less";
</style>
