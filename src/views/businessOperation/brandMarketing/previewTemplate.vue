<template>
  <div class="vlt-card preview-template">
    <slot name="header">
      <h2 class="comp-title">促销推广活动模板1</h2>
    </slot>
    <section class="comp-item">
      <div class="vlt-edit-single">
        <panel title="基础信息" :show="true">
          <div class="vlt-edit-wrap">
            <base-form
              class="base-info"
              :formData="baseData"
              labelWidth="140px"
              ref="baseForm"
              :rules="rule"
              direction="right"
              @change="changeBase"
            ></base-form>
            <div class="base-later">
              <el-form
                label-position="right"
                label-width="90px"
                :model="form"
                ref="form"
                @change="changeLater"
              >
                <el-form-item label="适用群体" class="coll-check">
                  <el-checkbox-group v-model="form.userGroup.type" @change="handleCheckedChange">
                    <el-checkbox label="游客"></el-checkbox>
                    <el-checkbox label="新会员"></el-checkbox>
                    <el-checkbox label="老会员"></el-checkbox>
                  </el-checkbox-group>
                  <el-select v-model="form.userGroup.member" placeholder="请选择会员等级">
                    <el-option
                      v-for="item in memberLv"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item class="icon-local" label="活动区域">
                  <el-input prefix-icon="el-icon-location-outline" v-model="form.area"></el-input>
                </el-form-item>

                <el-form-item label="活动大厅">
                  <div>
                    <el-radio v-model="form.radio" label="全部大厅">区域内全部大厅</el-radio>
                    <el-radio v-model="form.radio" label="指定大厅">区域内指定大厅</el-radio>
                    <el-input
                      :disabled="form.radio=='全部大厅'"
                      v-model="form.lobbyNum"
                      placeholder="请输入大厅编号"
                    ></el-input>
                  </div>
                </el-form-item>

                <el-form-item label="活动目标">
                  <div>
                    <el-checkbox label="活动期间累计充值"></el-checkbox>
                    <el-input v-model="form.recharTargrt"></el-input>
                    <el-checkbox label="活动期间累计消费"></el-checkbox>
                    <el-input v-model="form.payTarget"></el-input>
                  </div>
                </el-form-item>

                <el-form-item label="活动预算">
                  <el-input v-model="form.budget"></el-input>
                </el-form-item>
              </el-form>
            </div>

            <slot name="addForm"></slot>
          </div>
        </panel>
      </div>
    </section>

    <slot name="upload-file">
      <section class="comp-item">
        <panel title="附件上传" :show="true">
          <div class="upload-module">
            <div class="upload-file">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
              >
                <span>上传附件：</span>
                <el-button size="small" type="primary">
                  <i class="el-icon-upload2"></i>上传文件
                </el-button>
                <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
              </el-upload>
            </div>
            <div class="upload-img">
              <span>上传广告图：</span>
              <el-upload
                class="upload-box"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>

            <div class="drag-upload">
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
              </el-upload>
            </div>
          </div>
        </panel>
      </section>
    </slot>

    <section class="comp-item">
      <panel title="活动规则" :show="true">
        <div class="active-rule">
          <el-form :model="createRule">
            <el-form-item v-for="item in createRule" :key="item.num" class="rule-item">
              <el-select v-model="item.value" placeholder="充值">
                <el-option v-for="option in item.options" :key="option.index" :value="option"></el-option>
              </el-select>
              <el-input v-model="createRule.target" placeholder="输入目标金额"></el-input>
              <span>赠送:&nbsp;</span>
              <el-input v-model="createRule.give" placeholder="输入赠送金额" class="last-rule"></el-input>
            </el-form-item>
          </el-form>
          <div class="add-rule">+新增规则</div>
        </div>
      </panel>
    </section>

    <section class="comp-item">
      <panel title="活动资金" :show="true">
        <div class="active-table">
          <el-button type="primary" size="small">资金注入</el-button>
          <el-table :data="tableData" border style="width:680px">
            <el-table-column prop="date" label="序号" width="80"></el-table-column>
            <el-table-column prop="name" label="游戏编号" width="80"></el-table-column>
            <el-table-column prop="address" label="游戏名称" width="80"></el-table-column>
            <el-table-column prop="date" label="游戏所属机构" width="100"></el-table-column>
            <el-table-column prop="name" label="注入方式" width="80"></el-table-column>
            <el-table-column prop="address" label="注入金额" width="80"></el-table-column>
            <el-table-column prop="date" label="操作">
              <el-button type="primary" size="mini">修改</el-button>
              <el-button type="danger" size="mini">删除</el-button>
            </el-table-column>
          </el-table>
          <div class="remark">
            <span>备注：</span>
            <el-input type="textarea" :rows="3" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </panel>
    </section>

    <section class="comp-item">
      <panel title="活动资源" :show="true">
        <div class="active-table">
          <el-button type="primary" size="small">资源选择</el-button>
          <el-table :data="tableData" border style="width:680px">
            <el-table-column prop="date" label="序号" width="80"></el-table-column>
            <el-table-column prop="name" label="游戏编号" width="80"></el-table-column>
            <el-table-column prop="address" label="游戏名称" width="80"></el-table-column>
            <el-table-column prop="date" label="游戏所属机构" width="100"></el-table-column>
            <el-table-column prop="name" label="注入方式" width="80"></el-table-column>
            <el-table-column prop="address" label="注入金额" width="80"></el-table-column>
            <el-table-column prop="date" label="操作">
              <el-button type="primary" size="mini">修改</el-button>
              <el-button type="danger" size="mini">删除</el-button>
            </el-table-column>
          </el-table>
          <div class="remark">
            <span>备注：</span>
            <el-input type="textarea" :rows="3" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </panel>
    </section>

    <section class="comp-item">
      <panel title="活动执行" :show="true">
        <div class="active-table">
          <el-button type="primary" size="small">资金注入</el-button>
          <el-table :data="tableData" border style="width:680px">
            <el-table-column prop="date" label="序号" width="80"></el-table-column>
            <el-table-column prop="name" label="游戏编号" width="80"></el-table-column>
            <el-table-column prop="address" label="游戏名称" width="80"></el-table-column>
            <el-table-column prop="date" label="游戏所属机构" width="100"></el-table-column>
            <el-table-column prop="name" label="注入方式" width="80"></el-table-column>
            <el-table-column prop="address" label="注入金额" width="80"></el-table-column>
            <el-table-column prop="date" label="操作">
              <el-button type="primary" size="mini">修改</el-button>
              <el-button type="danger" size="mini">删除</el-button>
            </el-table-column>
          </el-table>
          <div class="remark">
            <span>备注：</span>
            <el-input type="textarea" :rows="3" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </panel>
    </section>

    <section class="comp-item">
      <panel title="监控指标" :show="true">
        <div class="control-index">
          <span>
            <span>维度选择：</span>
            <span>
              <el-checkbox v-for="item in checkList" :key="item">{{item}}</el-checkbox>
            </span>
          </span>
          <div class="index-check">
            <p>指标选择：</p>
            <span class="item-check">
              <el-checkbox v-for="item in checkList2" :key="item">{{item}}</el-checkbox>
            </span>
          </div>
        </div>
      </panel>
    </section>
    <slot name="footer-btn"></slot>
  </div>
</template>

<script>
export default {
  name: "name",
  data() {
    return {
      baseData: [
        { type: "input", title: "活动名称", prop: "name" },
        {
          type: "select",
          title: "活动类型",
          prop: "type",
          options: [
            { label: "充值赠送", value: "0" },
            { label: "消费赠送", value: "1" }
          ]
        },
        { type: "datetime", prop: "time", value: "", title: "日期时间" },
        { type: "textarea", title: "活动简介", prop: "all" },
        {
          type: "select",
          title: "活动管理方",
          prop: "manage",
          options: [
            { label: "中彩", value: "2" },
            { label: "分中心", value: "3" }
          ]
        },
        {
          type: "select",
          title: "活动组织方",
          prop: "organ",
          options: [
            { label: "中彩", value: "4" },
            { label: "广东分中心", value: "5" }
          ]
        }
      ],
      form: {
        userGroup: { type: [], member: "" },
        area: "",
        lobbyNum: "",
        radio: "全部大厅",
        recharTargrt: "",
        payTarget: "",
        budget: ""
      },
      createRule: [
        {
          num: "1",
          options: ["充值", "消费", "完成任务"],
          target: "",
          give: "",
          value: ""
        },
        {
          num: "2",
          options: ["充值", "消费", "完成任务"],
          target: "",
          give: "",
          value: ""
        },
        {
          num: "3",
          options: ["充值", "消费", "完成任务"],
          target: "",
          give: "",
          value: ""
        }
      ],
      checkAll: false,
      checkedUser: [],

      isIndeterminate: true,
      rule: { rule: "" },
      radio: "1",
      checked: true,
      tableData: [{ data: 1 }],
      checkList: ["中心", "省级", "市级", "厅级"],
      checkList2: [
        "中心",
        "省级",
        "市级",
        "充值总额",
        "充值总订单数",
        "投注总额",
        "投注总订单数",
        "充值用户数",
        "投注用户数",
        "提现用户数",
        "每用户充值额",
        "用户数",
        "提现总额"
      ],
      member: {},
      memberLv: [
        {
          value: "选项1",
          label: "LV1"
        },
        {
          value: "选项2",
          label: "Lv2"
        },
        {
          value: "选项3",
          label: "Lv3"
        }
      ],
      ruleItem: [],
      options: [],
      value: ""
    };
  },

  methods: {
    beforeRemove() {},
    handleExceed() {},
    handlePreview() {},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    handleChange(val) {
      console.log(val);
    },
    changeBase(val) {},
    changeLater(val) {
      console.log("form参数", val);
    },

    handlePictureCardPreview(file) {},

    handleCheckedChange(value) {
      console.log(value);
    }
  },
  computed: {},
  created() {},
  mounted() {},
  components: {},
  updated() {}
};
</script>


<style lang="less" scoped >
.preview-template {
  h2 {
    height: 50px;
    background: white;
    text-indent: 25px;
    line-height: 50px;
  }
  .base-info {
    margin-left: 40px;
  }
  .upload-module {
    margin: 20px 0 20px 150px;
    .upload-file {
      width: 600px;
      .el-upload__tip {
        font-size: 14px;
        color: #aaa;
        position: relative;
        left: 65px;
      }
    }
  }
  .active-rule,
  .control-index {
    margin: 20px 0 20px 150px;
  }
  .base-later {
    margin-left: 100px;
  }

  .add-rule {
    width: 472px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 14px;
    border: 1px dashed #aaa;
  }
  .active-table {
    margin: 20px 0 20px 150px;
  }
  .index-check {
    margin-top: 15px;
    .item-check {
      display: inline-block;
      width: 800px;
      position: relative;
      top: -15px;
      left: 60px;
    }
  }
}
</style>