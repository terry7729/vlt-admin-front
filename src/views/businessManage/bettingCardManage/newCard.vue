<template>
  <div class="vlt-card betting-new-card">
    <div class="vlt-edit-single">
      <h2 class="title">投注卡生成 - 新建卡片</h2>
      <div class="vlt-edit-wrap">
        <base-form
          :formData="formDatas"
          labelWidth="140px"
          ref="baseForm"
          :rules="rule"
          direction="right"
          @change="changeForm"
        ></base-form>
        <el-row class="vlt-edit-btn">
          <el-button
            type="primary"
            v-prevent="1000"
            size="medium"
            @click="submit('baseForm')"
            :loading="showLoading"
          >新建</el-button>
          <el-button size="medium" @click="close">取 消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "CreateCard",
  data() {
    return {
      showLoading: false,
      show: this.showForm,
      params: {
        batch: "",
        bettingCardId: 0,
        bettingCardType: 0,
        cardMakingQuantity: 0,
        createBy: "",
        createTime: "",
        insId: 0,
        insName: "",
        remark: "",
        status: 0,
        updateBy: "",
        updateTime: ""
      },
      formDatas: [
        {
          type: "cascader",
          prop: "insId",
          value: "",
          title: "所属机构",
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
          title: "投注卡类型",
          prop: "bettingCardType",
          options: [
            { label: "普通卡", value: 1 },
            { label: "会员卡", value: 2 },
            { label: "试玩卡", value: 3 }
          ]
        },
        {
          type: "input",
          title: "发卡数量",
          prop: "cardMakingQuantity",
          value: ""
        },
        { type: "textarea", title: "备注", prop: "remark" }
      ],
      rule: {
        insId: [{ required: true, message: "请选择所属机构", trigger: "change" }],
        bettingCardType: [
          { required: true, message: "请选择投注卡类型", trigger: "change" }
        ],
        cardMakingQuantity: [
          { required: false, validator: rules.numberVal, trigger: "blur" }
        ]
      },
      cascaderOptions: []
    };
  },
  created() {
    this.getInsData();
  },
  methods: {
    getInsData() {
      const self = this;
      const data = {};
      (async data => {
        let res = await self.$api.QueryInsTree({ data });
        if (res && res.code == 0) {
          let insList = res.data;
          insList.forEach(element => {
            element.children.forEach(item => {
              item.children && item.children.forEach(i => {
                delete i.children
              }) 
            })
          });
          self.$set(self.formDatas[0], "options", insList);
          self.cascaderOptions = res.data;
          // console.log("获取机构数据", self.cascaderOptions, res.data);

          // let arr = self.getInsArray(self.insId,'id', res.data, 'id') // 传入id 和对象
          // console.log('arrs', arr.reverse());
          // self.insArray.push(arr);
        } else {
          // self.$message.warning(res.msg)
        }
      })(data);
    },
    changeForm(val) {
      Object.assign(this.params, val);
    },
    handleClose() {
      console.log("close");
    },
    close() {
      this.$router.back();
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid === 'true') {
          (async ()=> {
            const _this = this;
            _this.showLoading = true;
            _this.params.cardMakingQuantity = _this.params.cardMakingQuantity != '' ? _this.params.cardMakingQuantity : 0
            console.log(_this.params);
            let data = _this.params;
            // console.log("提交的数据", data);
            // data.status = data.status ? 1 : 2;
            let result = await _this.$api.createCardGeneration({ data });
            // console.log("ressss", result);
            if (result.code == 0) {
              _this.showLoading = false;
              _this.$message({
                message: result.msg,
                type: "success"
              });
              setTimeout(() => {
                _this.$router.back();
              }, 1000);
            }
          })()
        }
      })
    },
    onSubmit() {
      console.log("formData", this.params);
      this.close();
    }
  }
};
</script>

<style lang="less">
// .betting-new-card {
//   .el-form-item {
//     &:nth-of-type(7),
//     &:nth-of-type(8) {
//       display: inline-block;
//       width: 200px;
//     }
//     &:nth-of-type(8) {
//       margin-left: 40px;
//     }
//   }
//   .el-input.cycle {
//     width: 50% !important;
//   }
//   .el-select.cycle-selection {
//     width: 40% !important;
//   }
// }
</style>

