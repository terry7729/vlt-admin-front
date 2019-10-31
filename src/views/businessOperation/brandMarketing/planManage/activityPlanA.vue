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
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="活动内容" name="activeContent">
        <panel title="基础信息" :show="true" class="vlt-edit-single">
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
                <el-checkbox-group v-model="baseFormLater.group" @change="handleCheckedChange">
                  <el-checkbox label="游客"></el-checkbox>
                  <el-checkbox label="新会员"></el-checkbox>
                  <el-checkbox label="老会员"></el-checkbox>
                </el-checkbox-group>
                <el-select v-model="baseFormLater.level" placeholder="请选择会员等级">
                  <el-option
                    v-for="item in memberLv"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="活动区域">
                <el-input prefix-icon="el-icon-location-outline" v-model="baseFormLater.area"></el-input>
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

        <panel title="附件上传" :show="false">
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

        <panel title="活动规则" :show="false">
          <div class="active-rule">
            <el-form :model="createRuleForm">
              <el-form-item v-for="(item,index) in createRuleData" :key="index" class="rule-item">
                <el-select v-model="item.value" placeholder="充值">
                  <el-option v-for="(option,index) in item.options" :key="index" :value="option"></el-option>
                </el-select>
                <el-input v-model="item.target" placeholder="输入目标金额"></el-input>
                <span>赠送:&nbsp;</span>
                <el-input v-model="item.give" placeholder="输入赠送金额"></el-input>
                <el-button
                  v-if="index!==0"
                  type="text"
                  class="deleteRule"
                  @click="deleteRule(index)"
                >删除</el-button>
              </el-form-item>
            </el-form>
            <el-button class="add-rule" icon="el-icon-plus" @click="addRule">新增规则</el-button>
          </div>
        </panel>

        <panel title="活动资金" :show="false">
          <div class="active-table">
            <el-button type="primary" size="small" @click="fundsintoDialog=true">资金注入</el-button>
            <el-table :data="fundsData" border style="width:60%">
              <el-table-column label="序号" type="index"></el-table-column>
              <el-table-column prop="id" label="游戏编号"></el-table-column>
              <el-table-column prop="name" label="游戏名称"></el-table-column>
              <el-table-column prop="organ" label="游戏所属机构"></el-table-column>
              <el-table-column prop="type" label="注入方式"></el-table-column>
              <el-table-column prop="money" label="注入金额"></el-table-column>
              <el-table-column label="操作">
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
              :formData="fundsFormData"
              labelWidth="140px"
              ref="fundsForm"
              :rules="rule"
              direction="right"
              @change="changeFundsForm"
            ></base-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="fundsintoDialog = false">取 消</el-button>
              <el-button type="primary" @click="fundsEnter">确 定</el-button>
            </div>
          </el-dialog>
        </panel>

        <panel title="活动资源" :show="false">
          <div class="active-table">
            <el-button type="primary" size="small" @click="resourceDialog=true">资源选择</el-button>
            <el-table :data="resourceData" border style="width:60%">
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="id" label="资源ID"></el-table-column>
              <el-table-column prop="name" label="资源名称"></el-table-column>
              <el-table-column prop="type" label="资源分类"></el-table-column>
              <el-table-column prop="num" label="数量"></el-table-column>
              <el-table-column label="操作">
                <el-button type="primary" size="mini">修改</el-button>
                <el-button type="danger" size="mini">删除</el-button>
              </el-table-column>
            </el-table>
            <div class="remark">
              <span>备注：</span>
              <el-input type="textarea" :rows="3" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <el-dialog title="资源选择" :visible.sync="resourceDialog">
            <search-bar @search="resourceSearch" :options="searchOptions" labelWidth="80px"></search-bar>
            <el-table
              :data="resourceCheckData"
              border
              @select="selectChange"
              @select-all="selectAllChange"
            >
              <el-table-column type="selection"></el-table-column>
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="id" label="资源ID"></el-table-column>
              <el-table-column prop="name" label="资源名称"></el-table-column>
              <el-table-column prop="type" label="资源分类"></el-table-column>
              <el-table-column prop="organ" label="所属机构"></el-table-column>
              <el-table-column prop="store" label="存储仓"></el-table-column>
              <el-table-column prop="stock" label="存量"></el-table-column>
              <el-table-column prop="num" label="需求数量">
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

        <panel title="活动执行" :show="false">
          <div class="active-table">
            <el-button type="primary" size="small" @click="taskDialog=true">执行计划</el-button>
            <el-table :data="executeData" border style="width:65%">
              <el-table-column prop="num" label="执行编号"></el-table-column>
              <el-table-column prop="person" label="责任人"></el-table-column>
              <el-table-column prop="role" label="执行角色"></el-table-column>
              <el-table-column prop="name" label="执行计划名称"></el-table-column>
              <el-table-column prop="talk" label="执行计划说明"></el-table-column>
              <el-table-column prop="start" label="预期开始时间"></el-table-column>
              <el-table-column prop="end" label="预期结束时间"></el-table-column>
              <el-table-column label="操作">
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

        <panel title="监控指标" :show="false">
          <div class="control-index">
            <span>维度选择：</span>
            <el-checkbox-group v-model="targetCheck">
              <el-checkbox v-for="item in checkList" :key="item" :label="item">{{item}}</el-checkbox>
            </el-checkbox-group>

            <div class="index-check">
              <p style="width:60px">指标选择：</p>
              <el-checkbox-group v-model="targetCheck">
                <el-checkbox v-for="item in checkList2" :key="item" :label="item">{{item}}</el-checkbox>
              </el-checkbox-group>
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
import moment from "moment";
const typeData = ["充值", "消费", "完成任务"];
export default {
  name: "",
  data() {
    return {
      activeName: "activeContent",
      rule: { rule: "" },
      baseForm: {},
      baseFormLater: {
        group: [],
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
            { label: "充值赠送", value: "充值赠送" },
            { label: "消费赠送", value: "消费赠送" }
          ]
        },
        {
          type: "datetime-range",
          prop: "time",
          value: "",
          title: "日期时间",
          options: ["start", "end"]
        },
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
      createRuleForm: {},
      createRuleData: [
        {
          target: "",
          give: "",
          value: "",
          options: typeData
        }
      ],
      fundsintoDialog: false,
      fundsData: [
        {
          id: "9527",
          name: "泡泡龙",
          organ: "中彩",
          type: "游戏发行基金",
          money: "10万"
        }
      ],
      fundsForm: {},
      fundsFormData: [
        {
          type: "select",
          title: "注入方式",
          prop: "type",
          options: [
            { label: "发行经费注入", value: "发行经费注入" },
            { label: "调节基金注入", value: "调节基金注入" }
          ]
        },
        { type: "input", title: "游戏名称", prop: "name" },
        { type: "input", title: "注入金额", prop: "money" },
        {
          type: "select",
          title: "游戏所属机构",
          prop: "organ",
          options: [
            { label: "中彩", value: "中彩" },
            { label: "分中心", value: "分中心" }
          ]
        },
        { type: "textarea", title: "备注", prop: "remark" }
      ],
      resourceDialog: false,
      searchOptions: [
        { title: "资源名称", type: "input", prop: "name", value: "" },
        {
          title: "设备状态",
          type: "select",
          prop: "state",
          value: "",
          options: [
            {
              label: "活动礼品",
              value: "活动礼品"
            },
            {
              label: "宣传材料",
              value: "宣传材料"
            }
          ]
        }
      ],
      resourceData: [{ id: 9527, name: "海报", type: "宣传材料", num: 100 }],
      resourceCheckData: [
        {
          id: 9528,
          name: "海报",
          type: "宣传材料",
          organ: "中彩",
          store: "深圳仓",
          stock: 188,
          num: "",
          isabled: true
        },
        {
          id: 9529,
          name: "海报",
          type: "活动礼物",
          organ: "中彩",
          store: "深圳仓",
          stock: 888,
          num: "",
          isabled: true
        }
      ],
      taskDialog: false,
      executeData: [
        {
          num: "007",
          person: "李白",
          role: "渠道经理",
          name: "A计划",
          talk: "balabala",
          start: "19-10-25",
          end: "19-11-11"
        }
      ],
      taskData: [
        {
          type: "select",
          title: "责任人",
          prop: "person",
          options: [
            { label: "李白", value: "李白" },
            { label: "李黑", value: "李黑" }
          ]
        },

        {
          title: "执行角色",
          type: "select",
          prop: "role",
          value: "",
          options: [
            { label: "渠道经理", value: "渠道经理" },
            { label: "部门经理", value: "部门经理" }
          ]
        },
        { type: "input", title: "执行计划名称", prop: "name" },
        { type: "input", title: "执行计划说明", prop: "talk" },
        {
          type: "datetime",
          prop: "start",
          value: "",
          title: "预期开始时间"
        },
        { type: "datetime", prop: "end", value: "", title: "预期结束时间" }
      ],
      taskForm: {},
      targetCheck: [],
      checkList: ["中心", "省级", "市级", "厅级"],
      checkList2: [
        "充值总额",
        "充值总订单数",
        "投注总额",
        "投注总订单数",
        "提现总额",
        "活动预算使用分类汇总",
        "用户数",
        "充值用户数",
        "投注用户数",
        "提现用户数",
        "每用户充值额",
        "每户投注额",
        "每户提现额"
      ],
      processForm: {}
    };
  },

  methods: {
    addRule() {
      let obj = {
        target: "",
        give: "",
        value: "",
        options: typeData
      };
      this.$set(this.createRuleData, this.createRuleData.length, obj);
    },
    deleteRule(index) {
      this.createRuleData.splice(index, 1);
    },
    cancel() {
      this.$router.push({ path: "planManage" });
    },
    save() {
      this.$router.push({ path: "planManage" });
    },
    //资金注入
    fundsEnter() {
      this.fundsData.push(this.fundsForm);
      this.fundsintoDialog = false;
    },
    //资源选择
    resourceEnter() {
      for (let item of this.resourceCheckData) {
        if (item.isabled == false) {
          this.resourceData.push(item);
        }
      }
      this.resourceDialog = false;
    },
    selectChange(select, row) {
      row.isabled = !row.isabled;
    },
    selectAllChange() {
      this.resourceCheckData.forEach(item => {
        item.isabled = !item.isabled;
      });
    },
    //执行计划
    taskEnter() {
      this.taskForm.start = moment(this.taskForm.start).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      this.taskForm.end = moment(this.taskForm.start).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      this.executeData.push(JSON.parse(JSON.stringify(this.taskForm)));
      this.taskDialog = false;
    },

    //表单派出参数
    changeBaseForm(val) {
      this.baseForm = val;
    },
    changeFundsForm(val) {
      this.fundsForm = val;
    },
    changeTaskForm(val) {
      console.log(val);
      this.taskForm = val;
    },
    resourceSearch() {},
    tabClick() {},

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
@import "./less/index.less";
</style>