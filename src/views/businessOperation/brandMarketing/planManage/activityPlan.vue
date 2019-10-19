<template>
  <div class="vlt-card active-plan">
    <el-steps :active="3" class="step-bar">
      <el-step title="模板选择" icon="el-icon-check"></el-step>
      <el-step title="模板预览" icon="el-icon-tickets"></el-step>
      <el-step title="创建计划" icon="el-icon-edit"></el-step>
    </el-steps>
    <div class="create-plan">
      <span>新建活动计划</span>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="活动内容" name="activeContent">
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
                      <el-checkbox-group
                        v-model="form.userGroup.type"
                        @change="handleCheckedChange"
                      >
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
                        <el-radio v-model="form.lobby" label="全部大厅">区域内全部大厅</el-radio>
                        <el-radio v-model="form.lobby" label="指定大厅">区域内指定大厅</el-radio>
                        <el-input
                          :disabled="form.lobby=='全部大厅'"
                          v-model="form.lobbyNum"
                          placeholder="请输入大厅编号"
                        ></el-input>
                      </div>
                    </el-form-item>

                    <el-form-item label="活动目标">
                      <div>
                        <el-checkbox label="活动期间累计充值" v-model="recharCheck"></el-checkbox>
                        <el-input v-model="form.recharTargrt" :disabled="!recharCheck"></el-input>
                        <el-checkbox label="活动期间累计消费" v-model="payCheck"></el-checkbox>
                        <el-input v-model="form.payTarget" :disabled="!payCheck"></el-input>
                      </div>
                    </el-form-item>

                    <el-form-item label="活动预算">
                      <el-input v-model="form.budget"></el-input>
                    </el-form-item>
                    <el-form-item label="是否发布消息">
                      <el-checkbox-group v-model="form.news">
                        <el-checkbox label="不发送"></el-checkbox>
                        <el-checkbox label="发送短信"></el-checkbox>
                        <el-checkbox label="终端/APP发送"></el-checkbox>
                        <el-checkbox label="发送短信与终端/APP推送"></el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="消息内容">
                      <el-input type="textarea" rows="3" v-model="form.remark"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </panel>
          </div>
        </section>

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

        <section class="comp-item">
          <panel title="活动规则" :show="true">
            <div class="active-rule">
              <el-form :model="createRule">
                <el-form-item v-for="item in createRule" :key="item.num" class="rule-item">
                  <el-select v-model="item.value" placeholder="充值">
                    <el-option v-for="option in ruleSelect" :key="option.index" :value="option"></el-option>
                  </el-select>
                  <el-input v-model="item.target" placeholder="输入目标金额"></el-input>
                  <span>赠送:&nbsp;</span>
                  <el-input v-model="item.give" placeholder="输入赠送金额"></el-input>
                </el-form-item>
              </el-form>
              <div class="add-rule">+新增规则</div>
            </div>
          </panel>
        </section>

        <section class="comp-item">
          <panel title="活动资金" :show="true">
            <div class="active-table">
              <el-button type="primary" size="small" @click="fundsInto">资金注入</el-button>
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
            <el-dialog title="资金注入" :visible.sync="fundsintoDialog" class="vlt-edit-single">
              <base-form
                :formData="fundsForm"
                labelWidth="140px"
                ref="baseForm"
                :rules="rule"
                direction="right"
                @change="changeBase"
                class="vlt-"
              ></base-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="fundsintoDialog = false">取 消</el-button>
                <el-button type="primary" @click="fundsEnter">确 定</el-button>
              </div>
            </el-dialog>
          </panel>
        </section>

        <section class="comp-item">
          <panel title="活动资源" :show="true">
            <div class="active-table">
              <el-button type="primary" size="small" @click="resourceCheck">资源选择</el-button>
              <el-table :data="resourceData" border style="width:680px">
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
            <el-dialog title="资金注入" :visible.sync="resourceDialog" class="vlt-edit-single">
              <el-table
                :data="resourceCheckData"
                border
                @select="selectChange"
                @select-all="selectAllChange"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="date" label="序号"></el-table-column>
                <el-table-column prop="name" label="资源ID"></el-table-column>
                <el-table-column prop="address" label="资源名称"></el-table-column>
                <el-table-column prop="date" label="资源分类"></el-table-column>
                <el-table-column prop="name" label="所属机构"></el-table-column>
                <el-table-column prop="address" label="存储仓"></el-table-column>
                <el-table-column prop="date" label="存量"></el-table-column>
                <el-table-column label="需求数量">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.num" :disabled="scope.row.isabled"></el-input>
                  </template>
                </el-table-column>
              </el-table>
              <div slot="footer" class="dialog-footer">
                <el-button @click="resourceDialog = false">取 消</el-button>
                <el-button type="primary" @click="resourceEnter">确 定</el-button>
              </div>
            </el-dialog>
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

        <div class="footer-btn">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button type="primary" size="small" @click="save">保存</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="审核流程" name="processInfo">
        <el-container class="process-info">
          <el-aside class="process-img" width="400px">
            <img src="../../../../assets/img/avatar.jpg" />
          </el-aside>
          <el-main class="process-form">
            <section class="comp-item">
              <div class="vlt-edit-single">
                <h2 class="title">新建申请</h2>
                <div class="vlt-edit-wrap">
                  <el-form
                    label-position="right"
                    label-width="90px"
                    :model="processForm"
                    ref="form"
                  >
                    <el-form-item label="处理人">
                      <el-input v-model="processForm.person"></el-input>
                    </el-form-item>
                    <el-form-item label="处理类型">
                      <el-input v-model="processForm.type"></el-input>
                    </el-form-item>
                    <el-form-item label="知会">
                      <el-input v-model="processForm.infoem"></el-input>
                    </el-form-item>
                    <el-form-item label="处理时限类型">
                      <el-input v-model="processForm.timeType"></el-input>
                    </el-form-item>
                    <el-form-item label="处理时限(天)">
                      <el-input v-model="processForm.time"></el-input>
                    </el-form-item>
                    <el-form-item label="任务类型">
                      <el-input v-model="processForm.taskType"></el-input>
                    </el-form-item>
                    <el-form-item label="消息提醒">
                      <el-input v-model="processForm.message"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </section>
          </el-main>
        </el-container>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      activeName: "activeContent",
      rule: { rule: "" },
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
      recharCheck: false,
      payCheck: false,
      form: {
        userGroup: { type: [], member: "" },
        area: "",
        lobbyNum: "",
        lobby: "全部大厅",
        recharTargrt: "",
        payTarget: "",
        budget: "",
        news: ["不发送"],
        remark: ""
      },
      ruleSelect: ["充值", "消费", "完成任务"],
      createRule: {
        one: {
          num: "1",

          target: "",
          give: "",
          value: ""
        },
        two: {
          num: "2",

          target: "",
          give: "",
          value: ""
        },
        three: {
          num: "3",

          target: "",
          give: "",
          value: ""
        }
      },
      tableData: [],
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
      processForm: {},
      fundsintoDialog: false,
      resourceDialog: false,
      fundsForm: [
        {
          type: "select",
          title: "注入方式",
          prop: "type",
          options: [
            { label: "发行经费注入", value: "0" },
            { label: "调节基金注入", value: "1" }
          ]
        },
        { type: "input", title: "游戏名称", prop: "name" },
        { type: "input", title: "注入金额", prop: "name" },
        {
          type: "select",
          title: "游戏所属机构",
          prop: "manage",
          options: [
            { label: "中彩", value: "2" },
            { label: "分中心", value: "3" }
          ]
        },
        { type: "textarea", title: "备注", prop: "all" }
      ],
      resourceData:[],
      resourceCheckData: [
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          tag: "公司",
          num: "",
          isabled: true
        }
      ]
    };
  },

  methods: {
    cancel() {
      this.$router.push({ path: "planManage" });
    },
    save() {
      this.$router.push({ path: "planManage" });
    },
    fundsInto() {
      this.fundsintoDialog = true;
    },
    fundsEnter() {
      this.fundsintoDialog = false;
    },
    resourceCheck() {
      this.resourceDialog = true;
    },
    resourceEnter() {
      this.resourceData = this.resourceCheckData;
      this.resourceDialog = false;
    },
    selectChange(select, row) {
      row.isabled = !row.isabled;
    },
    selectAllChange() {
      this.resourceData.forEach(item => (item.isabled = !item.isabled));
    },
    changeBase(val) {},
    handleClick() {},
    beforeRemove() {},
    handleExceed() {},
    handlePreview() {},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
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
@import "./less/activityPlan.less";
</style>