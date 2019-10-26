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
              <el-table-column prop="id" label="序号" fixed width="60px"></el-table-column>
              <el-table-column label="物品名称" min-width="160px">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.goodsName" filterable placeholder="请选择">
                    <el-option
                      v-for="(item, index) in options"
                      :key="item.value"
                      @click.native="changeGoods(index,scope.row)"
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
              <el-table-column label="物品数量" min-width="160px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.num" placeholder="请输入数量"></el-input>
                </template>
              </el-table-column>
              <!-- <el-table-column label="物品数量（小）" min-width="160px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.num" placeholder="请输入数量"></el-input>
                </template>
              </el-table-column>-->
              <el-table-column prop="unitPrice" label="单价（元）" min-width="100px"></el-table-column>
              <el-table-column prop="amount" label="金额（元）" min-width="100px"></el-table-column>
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
import { now } from "moment";
const resourceData = [
  {
    value: "001",
    label: "柜员机",
    unitPrice: "100"
  },
  {
    value: "002",
    label: "投注机",
    unitPrice: "200"
  },
  {
    value: "003",
    label: "显示屏",
    unitPrice: "300"
  }
];
export default {
  name: "",
  data() {
    return {
      formData: [
        {
          title: "单据编号",
          type: "input",
          prop: "documentNumber",
          value: "2222"
        },
        {
          title: "入库仓库",
          type: "select",
          prop: "entryWarehouseName",
          value: "",
          options: [
            { label: "仓库一", value: "101" },
            { label: "仓库二", value: "102" }
          ]
        },
        {
          title: "申请标题",
          type: "input",
          prop: "resourceApplyTitle",
          value: "资源发放申请"
        },
        {
          title: "操作类型",
          type: "input",
          prop: "oplType",
          value: "资源发放",
          disabled: true
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
          id: "1",
          goodsName: "",
          goodsModel: "",
          goodsCode: "",
          num: "",
          unitPrice: "",
          amount: "",
          remark: ""
        }
      ],
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
      activeName: "1",

      rules: { rule: "" },
      form: {}
    };
  },
  watch: {
    tableData: {
      // 深度监听 监听对象，数组的变化
      handler(newValue, oldValue) {
        newValue.forEach(item => {
          item.amount = item.unitPrice * item.num;
        });
        let params = JSON.parse(JSON.stringify(newValue));
        console.log(params);
      },

      deep: true
    }
  },
  methods: {
    async submit() {
      console.log(this.form);
      let time = new Date().toLocaleDateString();
      console.log(time);
      let data = {
        checkStatus: 1,
        entryWarehouseId: "101",
        entryWarehouseName: "深圳仓",
        operStatus: 2,
        oplType: 3,
        ownUserId: "111",
        ownUserName: "天天",
        preReceivDate: time,
        resourceApplyTitle: "发放",
        resourceWareStatus: 2,
        totalMoney: 200,
        documentNumber: "2222",
        warehouseGoodsInfoList: [
          {
            amount: 100,
            createBy: "33",
            createTime: time,
            documentNumber: "2222",
            goodsCode: "777",
            goodsModel: "model1",
            goodsName: "柜员机",
            goodsType: 0,
            id: 1,
            num: 1,
            remark: "",
            unitPrice: 100
          },
          {
            amount: 100,
            createBy: "33",
            createTime: time,
            documentNumber: "2222",
            goodsCode: "888",
            goodsModel: "model2",
            goodsName: "投注机",
            goodsType: 0,
            id: 2,
            num: 1,
            remark: "",
            unitPrice: 100
          }
        ]
      };
      let res = await this.$api.channelResProvide({ data });
      console.log(res);
    },

    changeForm(val) {
      this.form = val;
    },

    //选择、添加、删除物品
    changeGoods(index, row) {
      row.unitPrice = this.options[index].unitPrice;
      row.num = 1;
    },
    deleteGoods(index) {
      this.tableData.splice(index, 1);
    },
    addGoods() {
      let obj = {
        id: "",
        goodsName: "",
        goodsModel: "",
        goodsCode: "",
        num: "",
        unitPrice: 2,
        amount: "",
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
