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
        <div class="vlt-edit-single">
          <panel title="基础信息" :show="true">
            <div class="vlt-edit-wrap">
              <el-form label-width="140px" :model="baseForm" ref="baseForm">
                <base-form
                  class="base-info"
                  :formData="baseData"
                  labelWidth="140px"
                  ref="baseForm"
                  :rules="rule"
                  @change="changeBaseForm"
                ></base-form>
              </el-form>
              <el-form
                label-width="140px"
                :model="baseFormLater"
                ref="baseFormLater"
                class="base-later"
              >
                <el-form-item label="适用群体">
                  <el-checkbox-group
                    v-model="baseFormLater.group.type"
                    @change="handleCheckedChange"
                  >
                    <el-checkbox label="游客"></el-checkbox>
                    <el-checkbox label="新会员"></el-checkbox>
                    <el-checkbox label="老会员"></el-checkbox>
                  </el-checkbox-group>
                  <el-select v-model="baseFormLater.level" placeholder="请选择会员等级">
                    <el-option
                      v-for="item in memberLv"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="活动区域">
                  <el-input prefix-icon="el-icon-location-outline" v-model="baseForm.area" 请输入活动区域></el-input>
                </el-form-item>

                <el-form-item label="活动大厅">
                  <el-radio v-model="baseFormLater.lobby" label="全部大厅">区域内全部大厅</el-radio>
                  <el-radio v-model="baseFormLater.lobby" label="指定大厅">区域内指定大厅</el-radio>
                  <el-input
                    :disabled="baseFormLater.lobby=='全部大厅'"
                    v-model="baseFormLater.lobbyId"
                    placeholder="请输入大厅编号"
                  ></el-input>
                </el-form-item>

                <el-form-item label="活动目标">
                  <el-checkbox label="活动期间累计充值" v-model="recharCheck"></el-checkbox>
                  <el-input v-model="baseFormLater.rechar" :disabled="!recharCheck"></el-input>
                  <el-checkbox label="活动期间累计消费" v-model="payCheck"></el-checkbox>
                  <el-input v-model="baseFormLater.pay" :disabled="!payCheck"></el-input>
                </el-form-item>

                <el-form-item label="活动预算">
                  <el-input v-model="baseFormLater.budget" placeholder="请输入活动预算"></el-input>
                </el-form-item>

                <el-form-item label="是否发布消息">
                  <el-checkbox-group v-model="baseFormLater.news">
                    <el-checkbox label="不发送"></el-checkbox>
                    <el-checkbox label="发送短信"></el-checkbox>
                    <el-checkbox label="终端/APP发送"></el-checkbox>
                    <el-checkbox label="发送短信与终端/APP推送"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item label="消息内容">
                  <el-input
                    type="textarea"
                    rows="3"
                    v-model="baseFormLater.remark"
                    placeholder="请输入消息内容"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </panel>
        </div>

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

        <panel title="活动资金" :show="true">
          <div class="active-table">
            <el-button type="primary" size="small" @click="fundsInto">资金注入</el-button>
            <el-table :data="tableData" border style="width:60%">
              <el-table-column prop="date" label="序号"></el-table-column>
              <el-table-column prop="name" label="游戏编号"></el-table-column>
              <el-table-column prop="address" label="游戏名称"></el-table-column>
              <el-table-column prop="date" label="游戏所属机构"></el-table-column>
              <el-table-column prop="name" label="注入方式"></el-table-column>
              <el-table-column prop="address" label="注入金额"></el-table-column>
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

        <panel title="活动资源" :show="true">
          <div class="active-table">
            <el-button type="primary" size="small" @click="resourceCheck">资源选择</el-button>
            <el-table :data="resourceData" border style="width:60%">
              <el-table-column prop="date" label="序号"></el-table-column>
              <el-table-column prop="name" label="游戏编号"></el-table-column>
              <el-table-column prop="address" label="游戏名称"></el-table-column>
              <el-table-column prop="date" label="游戏所属机构"></el-table-column>
              <el-table-column prop="name" label="注入方式"></el-table-column>
              <el-table-column prop="address" label="注入金额"></el-table-column>
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
          <el-dialog title="资源选择" :visible.sync="resourceDialog" class="vlt-edit-single">
            <el-table
              :data="resourceCheckData"
              border
              @select="selectChange"
              @select-all="selectAllChange"
            >
              <el-table-column type="selection"></el-table-column>
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

        <panel title="活动执行" :show="true">
          <div class="active-table">
            <el-button type="primary" size="small" @click="executePlan">执行计划</el-button>
            <el-table :data="tableData" border style="width:60%">
              <el-table-column prop="date" label="执行编号"></el-table-column>
              <el-table-column prop="name" label="责任人"></el-table-column>
              <el-table-column prop="address" label="执行角色"></el-table-column>
              <el-table-column prop="date" label="执行计划名称"></el-table-column>
              <el-table-column prop="name" label="执行计划说明"></el-table-column>
              <el-table-column prop="address" label="预期开始时间"></el-table-column>
              <el-table-column prop="address" label="预期结束时间"></el-table-column>
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
          <el-dialog title="任务分配" :visible.sync="taskDialog" class="vlt-edit-single">
            <div class="vlt-edit-double">
              <div class="vlt-edit-wrap">
                <base-form
                  :formData="taskData"
                  ref="taskForm"
                  labelWidth="140px"
                  :rules="rule"
                  direction="top"
                  @change="changeTaskForm"
                ></base-form>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="taskDialog = false">取 消</el-button>
              <el-button type="primary" @click="taskEnter">确 定</el-button>
            </div>
          </el-dialog>
        </panel>

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
      baseForm: {
        name: "",
        type: "",
        time: "",
        intro: "",
        manage: "",
        organ: ""
      },
      baseFormLater: {
        group: { type: [] },
        area: "",
        level: "",
        lobbyId: "",
        lobby: "全部大厅",
        rechar: "",
        pay: "",
        budget: "",
        news: ["不发送"],
        remark: ""
      },
      baseData: [
        { type: "input", title: "活动名称", prop: "name" },
        {
          type: "select",
          title: "活动类型",
          prop: "type",
          options: [
            { label: "", value: "充值赠送" },
            { label: "", value: "消费赠送" }
          ]
        },
        { type: "datetime", prop: "time", value: "", title: "日期时间" },
        { type: "textarea", title: "活动简介", prop: "intro" },
        {
          type: "select",
          title: "活动管理方",
          prop: "manage",
          options: [
            { label: "", value: "中彩" },
            { label: "", value: "分中心" }
          ]
        },
        {
          type: "select",
          title: "活动组织方",
          prop: "organ",
          options: [
            { label: "", value: "中彩" },
            { label: "", value: "广东分中心" }
          ]
        }
      ],
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
      recharCheck: "",
      payCheck: "",
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
      processForm: {},
      fundsintoDialog: false,
      resourceDialog: false,
      taskDialog: false,
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
      resourceData: [],
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
      ],
      taskData: [
        {
          type: "select",
          title: "责任人",
          prop: "person",
          options: [
            { label: "李白", value: "0" },
            { label: "李黑", value: "1" }
          ]
        },

        {
          title: "执行角色",
          type: "select",
          prop: "roles",
          value: "",
          options: [
            { label: "渠道经理", value: "0" },
            { label: "部门经理", value: "1" }
          ]
        },
        { type: "input", title: "执行计划名称", prop: "name" },
        { type: "input", title: "执行计划说明", prop: "txt" },
        {
          type: "datetime",
          prop: "dateStart",
          value: "",
          title: "预期开始时间"
        },
        { type: "datetime", prop: "dateEnd", value: "", title: "预期结束时间" }
      ],

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
    //资金注入
    fundsInto() {
      this.fundsintoDialog = true;
    },
    fundsEnter() {
      this.fundsintoDialog = false;
    },
    //资源选择
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
      this.resourceCheckData.forEach(item => (item.isabled = !item.isabled));
    },
    //执行计划
    executePlan() {
      this.taskDialog = true;
    },
    taskEnter() {
      this.taskDialog = false;
    },
    changeBaseForm(val) {
      console.log(val);
    },

    changeLaterForm(val) {
      // console.log(val);
    },
    changeTaskForm() {},
    changeBase() {},
    //附件上传
    beforeRemove() {},
    handleExceed() {},
    handlePreview() {},
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {},
    handleCheckedChange(value) {
      // console.log(value);
    },

    handleClick() {}
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