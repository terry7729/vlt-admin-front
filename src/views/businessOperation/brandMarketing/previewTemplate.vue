<template>
  <div class="vlt-card preview-template">
    <slot name="header">
      <h2 class="comp-title">促销推广活动模板1</h2>
    </slot>

    <section class="comp-item coll-item">
      <panel title="基础信息" :show="true">
        <div>
          <el-form class="coll-form" size="small" label-width="100px" :model="formLabelAlign">
            <el-form-item label="活动名称">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="活动类型">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
              <el-date-picker
                v-model="formLabelAlign.type"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="活动简介">
              <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="formLabelAlign.name"></el-input>
            </el-form-item>

            <el-form-item label="活动管理方">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="活动组织方">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="适用群体" class="coll-check">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >全选</el-checkbox>

              <el-checkbox-group v-model="checkedUser" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="user in userList" :label="user" :key="user">{{user}}</el-checkbox>
              </el-checkbox-group>

              <el-select v-model="value" placeholder="请选择会员等级">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item class="icon-local" label="活动区域">
              <el-input v-model="formLabelAlign.name"></el-input>
              <i class="el-icon-location-outline"></i>
            </el-form-item>

            <el-form-item label="活动区域">
              <div>
                <el-radio v-model="radio" label="1">区域内全部大厅</el-radio>
              </div>
              <span class="active-lobby">
                <el-radio v-model="radio" label="2">区域内指定大厅</el-radio>
                <el-input placeholder="请输入大厅编号"></el-input>
              </span>
            </el-form-item>

            <el-form-item label="活动目标">
              <div class="active-target">
                <el-checkbox v-model="checked"></el-checkbox>
                <label>活动期间累计充值</label>
                <el-input></el-input>
              </div>
              <div class="active-target">
                <el-checkbox v-model="checked"></el-checkbox>
                <label>活动期间累计消费</label>
                <el-input></el-input>
              </div>
            </el-form-item>

            <el-form-item label="活动预算">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <slot name="addForm"></slot>
          </el-form>
        </div>
      </panel>
    </section>

    <slot name="upload-file">
      <section class="comp-item coll-item">
        <panel title="附件上传" :show="true" >
          <div class="coll-form">
            <div class="upload-file">
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
              <el-progress :percentage="60" :stroke-width="strokeWidth"></el-progress>
              <el-progress :percentage="70" :stroke-width="strokeWidth"></el-progress>
              <el-progress :percentage="100" status="success" :stroke-width="strokeWidth"></el-progress>
            </div>

            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
        </panel>
      </section>
    </slot>

    <section class="comp-item coll-item">
      <panel title="活动规则" :show="true">
        <div>
          <el-form :model="formLabelAlign" class="coll-form active-rule">
            <el-form-item class="rule-item">
              <el-select v-model="value" placeholder="充值">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input placeholder="审批人"></el-input>
              <label>赠送:</label>
              <el-input class="last-rule"></el-input>
            </el-form-item>
            <el-form-item class="rule-item">
              <el-select v-model="value" placeholder="消费">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input placeholder="审批人"></el-input>
              <label>赠送:</label>
              <el-input class="last-rule"></el-input>
            </el-form-item>
            <el-form-item class="rule-item">
              <el-select v-model="value" placeholder="完成任务">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input placeholder="审批人"></el-input>
              <label>赠送:</label>
              <el-input class="last-rule"></el-input>
            </el-form-item>
            <el-form-item class="rule-item">
              <el-select v-model="value" placeholder="完成任务">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input placeholder="审批人"></el-input>
              <label>赠送:</label>
              <el-input class="last-rule"></el-input>
            </el-form-item>
          </el-form>
          <div class="add-rule">+新增规则</div>
        </div>
      </panel>
    </section>

    <section class="comp-item coll-item">
      <panel title="活动资金" :show="true" >
        <div class="coll-form">
          <el-button type="primary" size="small">资金注入</el-button>
          <el-table :data="tableData" border style="width:650px">
            <el-table-column prop="date" label="序号" width="80"></el-table-column>
            <el-table-column prop="name" label="游戏编号" width="80"></el-table-column>
            <el-table-column prop="address" label="游戏名称" width="80"></el-table-column>
            <el-table-column prop="date" label="游戏所属机构" width="100"></el-table-column>
            <el-table-column prop="name" label="注入方式" width="80"></el-table-column>
            <el-table-column prop="address" label="注入金额" width="80"></el-table-column>
            <el-table-column prop="date" label="操作" width="150">
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

    <section class="comp-item coll-item">
      <panel title="活动资源" :show="true" >
        <div class="coll-form">
          <el-button type="primary" size="small">资源选择</el-button>
          <el-table :data="tableData" border style="width:650px">
            <el-table-column prop="date" label="序号" width="80"></el-table-column>
            <el-table-column prop="name" label="游戏编号" width="80"></el-table-column>
            <el-table-column prop="address" label="游戏名称" width="80"></el-table-column>
            <el-table-column prop="date" label="游戏所属机构" width="100"></el-table-column>
            <el-table-column prop="name" label="注入方式" width="80"></el-table-column>
            <el-table-column prop="address" label="注入金额" width="80"></el-table-column>
            <el-table-column prop="date" label="操作" width="150">
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

    <section class="comp-item coll-item">
      <panel title="活动执行" :show="true">
        <div class="coll-form">
          <el-button type="primary" size="small">资金注入</el-button>
          <el-table :data="tableData" border style="width:650px">
            <el-table-column prop="date" label="序号" width="80"></el-table-column>
            <el-table-column prop="name" label="游戏编号" width="80"></el-table-column>
            <el-table-column prop="address" label="游戏名称" width="80"></el-table-column>
            <el-table-column prop="date" label="游戏所属机构" width="100"></el-table-column>
            <el-table-column prop="name" label="注入方式" width="80"></el-table-column>
            <el-table-column prop="address" label="注入金额" width="80"></el-table-column>
            <el-table-column prop="date" label="操作" width="150">
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

    <section class="comp-item coll-item">
      <panel title="监控指标" :show="true">
        <div class="coll-form">
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
      activeNames: ["1"],
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      checkAll: false,
      checkedUser: [],
      userList: ["游客", "新会员", "老会员"],
      isIndeterminate: true,
      strokeWidth: 3,
      radio: "1",
      checked: true,
      dialogImageUrl: "",
      dialogVisible: false,
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
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        }
      ],
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

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleCheckAllChange(val) {
      this.checkedUser = val ? userOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.userList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.userList.length;
    }
  },
  computed: {},
  created() {},
  mounted() {},
  components: {}
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

  .coll-item {
    position: relative;
    .coll-form {
      .icon-local {
        position: relative;

        i {
          position: absolute;
          top: 8px;
          left: 5px;
        }
      }
    }
  }
}

</style>