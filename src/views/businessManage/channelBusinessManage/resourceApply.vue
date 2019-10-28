<template>
  <div class="vlt-card">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="资源申请" name="1">
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
        <panel title="申请物品" :show="true" style="margin-bottom:15px">
          <div class="tr">
            <el-button type="primary" size="small" @click="intoGoods">导入</el-button>
          </div>
          <div class="table-wrap">
            <el-table :data="tableData" border class="table">
              <el-table-column prop="id" label="序号" fixed width="60px">
                <template slot-scope="scope">{{scope.row.id=scope.row.goodsModel}}</template>
              </el-table-column>
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
      <el-tab-pane label="资源申请流程图" name="2"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import moment, { now } from "moment";
const resourceData = [
  {
    value: "1",
    label: "柜员机",
    unitPrice: 100
  },
  {
    value: "2",
    label: "投注机",
    unitPrice: 200
  },
  {
    value: "3",
    label: "显示屏",
    unitPrice: 300
  }
];
export default {
  name: "",
  data() {
    return {
      formData: [
        {
          title: "申请标题",
          type: "input",
          prop: "resourceApplyTitle",
          value: "资源申请"
        },

        {
          title: "申请日期",
          type: "datetime",
          prop: "preReceivDate",
          value: ""
        }
      ],
      options: resourceData,
      tableData: [
        {
          id: "",
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
          prop: "totalMoney",
          value: "",
          disabled: true
        },
        { title: "申请说明", type: "textarea", prop: "title", value: "" }
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
        newValue.forEach((item, index) => {
          item.amount = item.unitPrice * item.num;
        });
        let num = 0;
        for (let i = 0; i < newValue.length; i++) {
          num = num + newValue[i].amount;
        }
        this.totalData[0].value = num;

        let params = JSON.parse(JSON.stringify(newValue));
      },

      deep: true
    }
  },
  methods: {
    async submit() {
      const self = this;
      let totalMoney = self.totalData[0].value;
      let time = moment(self.form.preReceivDate).format("YYYY-MM-DD HH:mm:ss");
      let data = {
        attachId: "1",
        cDate: time,
        cUserId: "1",
        cUserName: "1",
        checkStatus: 0,
        entryWarehouseId: "1",
        entryWarehouseName: "1",
        mDate: time,
        mUserId: "22",
        mUserName: "333",
        operStatus: 0,
        oplType: 2,
        outWarehouseId: "111",
        outWarehouseName: "222",
        ownUserId: "333",
        ownUserName: "11",
        preReceivDate: time,
        remark: "",
        resourceApplyDirect: 1,
        resourceApplyTitle: "333",
        resourceWareStatus: 0,
        totalMoney: totalMoney,
        warehouseGoodsInfoList: self.tableData
      };
      console.log(data);
      let res = await this.$api.channelResApply({ data });
      console.log(res);
      if (res.code === 0) {
        alert(res.msg);
      }
    },

    changeForm(val) {
      this.form = val;
    },
    changeLaterForm(val) {},

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
        unitPrice: "",
        amount: "",
        remark: ""
      };
      this.$set(this.tableData, this.tableData.length, obj);
    },
    intoGoods() {},
    handleClick() {},
    handlePreview() {},
    handleRemove() {},
    beforeRemove() {},
    handleExceed() {}
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
.tr {
  padding: 10px 10px 0;
  text-align: right;
}
</style>
