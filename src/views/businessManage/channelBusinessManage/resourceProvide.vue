<template>
  <div class="vlt-card">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="资源发放" name="1">
        <panel title="基本信息" :show="true" style="margin-bottom:15px">
          <div class="vlt-edit-single">
            <div class="vlt-edit-wrap">
              <base-form
                :formData="formData"
                labelWidth="90px"
                ref="baseForm"
                :rules="rules"
                direction="right"
                @change="changeForm"
              ></base-form>
            </div>
          </div>
        </panel>
        <panel title="发放物品" :show="true" style="margin-bottom:15px">
          <div class="table-wrap">
            <el-table :data="tableData" border class="table">
              <el-table-column label="序号" fixed type="index" width="60px"></el-table-column>
              <el-table-column label="物品名称" min-width="160px">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.goodsName" filterable placeholder="请选择">
                    <el-option
                      v-for="(item, index) in options"
                      :key="item.value"
                      @click.native="changeGoods(index)"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="物品型号" min-width="160px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.goodsModel" placeholder="请输入型号"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="物品序列号" min-width="200px">
                <template slot-scope="scope">
                  <el-input
                    type="textarea"
                    :rows="2"
                    v-model="scope.row.goodsCode"
                    placeholder="请输入序列号"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="物品数量（大）" min-width="160px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.num" placeholder="请输入数量"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="物品数量（小）" min-width="160px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.num" placeholder="请输入数量"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="单价（元）" min-width="100px">
                <template slot-scope="scope">{{scope.row.unitPrice}}</template>
              </el-table-column>
              <el-table-column label="金额（元）" min-width="100px">
                <template slot-scope="scope">{{scope.row.amount}}</template>
              </el-table-column>
              <el-table-column label="备注" min-width="200px">
                <template slot-scope="scope">
                  <el-input placeholder="请输入备注" v-model="scope.row.remark"></el-input>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="80px">
                <template slot-scope="scope">
                  <i class="el-icon-delete delete" @click="deleteGoods(scope.$index)"></i>
                </template>
              </el-table-column>
            </el-table>

            <el-button class="addGoods" @click="addGoods" icon="el-icon-plus">新增物品</el-button>
          </div>
          <div class="vlt-edit-single">
            <div class="vlt-edit-wrap">
              <base-form
                :formData="totalData"
                labelWidth="90px"
                :rules="rules"
                direction="right"
                @change="changeLaterForm"
              ></base-form>
            </div>
          </div>
        </panel>
        <panel title="其他附件" :show="true" style="margin-bottom:15px">
          <el-form label-position="right" label-width="90px" ref="form" class="device-form">
            <el-form-item label="附件上传">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </panel>
        <div class="submit-wrap">
          <el-row class="vlt-edit-btn">
            <el-button type="primary" size="medium" @click="submit">提交并保存</el-button>
            <el-button size="medium" @click="editShow = !editShow">取消</el-button>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="资源发放流程图" name="2"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
const resourceData = [
  {
    value: "选项1",
    label: "黄金糕",
    price: "1"
  },
  {
    value: "选项2",
    label: "双皮奶",
    price: "2"
  },
  {
    value: "选项3",
    label: "蚵仔煎",
    price: "3"
  },
  {
    value: "选项4",
    label: "龙须面",
    price: "4"
  },
  {
    value: "选项5",
    label: "北京烤鸭",
    price: "5"
  }
];
export default {
  name: "",
  rules: { rule: "" },
  watch: {
    tableData: {
      handler(newValue, oldValue) {
        // this.$emit("change", this.form)
        console.log("监听table的数据变化", newValue);
        // 计算价格
        newValue.forEach(item => {
          item.money = item.number * item.price;
        });
        let res = JSON.parse(JSON.stringify(newValue));
        let params = [];
        res.forEach(item => {
          // 删除不需要的参数
          delete item.options;
          // 保留你需要的参数
          // let param = (({goodsId, searl, max, min, price, money, remark}) =>({goodsId, searl, max, min, price, money, remark}))(item);
          params.push(item);
        });
        console.log("params", params);
      },
      // 深度监听 监听对象，数组的变化
      deep: true
    }
  },
  data() {
    return {
      totalData: [
        {
          title: "合计金额",
          type: "input",
          prop: "title",
          value: "",
          disabled: true
        },
        { title: "采购说明", type: "textarea", prop: "title", value: "" }
      ],
      formData: [
        { title: "单据编号", type: "input", prop: "documentNumber", value: "" },
        {
          title: "入库仓库",
          type: "select",
          prop: "entryWarehouseName",
          value: "",
          options: [
            { label: "仓库一", value: "仓库一" },
            { label: "仓库二", value: "仓库二" }
          ]
        },
        {
          title: "申请标题",
          type: "input",
          prop: "resourceApplyTitle",
          value: ""
        },
        {
          title: "申请日期",
          type: "datepicker",
          prop: "preReceivDate",
          value: ""
        }
      ],
      options: resourceData,
      tableData: [
        {
          goodsCode: "11",
          goodsModel: "22",
          amount: "33",
          goodsName: "还好",
          num: "55",
          unitPrice: "10",
          documentNumber: "330",
          remark: "",
          params: {}
        }
      ],
      tableForm: [
        { goodsId: "", model: "", number: "", price: "", money: "", remark: "" }
      ],
      activeName: "1",
      rules: {},
      form: {}
    };
  },
  methods: {
    async submit() {
      // this.form.params = this.tableForm;
      // console.log(this.form);
      // let data = {
      //   page: 1,
      //   pageSize: 10,
      //   param: {
      //     documentNumber: "2222"
      //   }
      // };
      // let res = await this.$api.channelResProvide({ data });
      // console.log(res);
    },

    changeForm(val) {
      this.form = val;
      console.log(val);
    },

    changeGoods(val, index) {
      console.log(this.tableData, val.row, val.$index);
      val.row.price = val.row.options[index].price;
      val.row.number = 1;
    },
    deleteGoods(index) {
      this.tableData.splice(index, 1);
    },
    addGoods() {
      let obj = {
        goodsId: "",

        model: "",
        searl: "",
        min: "",
        max: "",
        price: "0",
        money: "0",
        remark: ""
      };
      this.$set(this.tableData, this.tableData.length, obj);
    },
    handleClick() {},
    handlePreview() {},
    handleRemove() {},
    beforeRemove() {},
    handleExceed() {},
    changeLaterForm() {}
  }
};
</script>

<style lang="less" scoped>
@import "./less/index.less";
.table-wrap {
  padding: 10px;
  text-align: center;
}
.addGoods {
  width: 100%;
  max-width: 490px;
  margin: 10px 0 30px 20px;
}
.delete {
  font-size: 22px;
}
</style>
