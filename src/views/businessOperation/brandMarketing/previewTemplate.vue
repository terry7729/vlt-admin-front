<template>
  <div class="vlt-card preview-template">
    <h2>促销推广活动模板1</h2>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item class="coll-item" title="基础信息" name="1">
        <div class="coll-content">
          <p class="icon-txt">收缩</p>

          <el-form class="coll-form" size="small" label-width="100px" :model="formLabelAlign">
            <el-form-item label="活动名称">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="活动类型">
              <el-select v-model="formLabelAlign.region" placeholder="请选择">
                <el-option label="区域一" value='1'></el-option>
                <el-option label="区域二" value='2'></el-option>
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
              <el-select v-model="formLabelAlign.region" placeholder="请选择">
                <el-option label="区域一" value="3"></el-option>
                <el-option label="区域二" value="4"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="活动组织方">
              <el-select v-model="formLabelAlign.region" placeholder="请选择">
                <el-option label="区域一" value='5'></el-option>
                <el-option label="区域二" value='6'></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="适用群体" class="coll-check">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="allUser"
                @change="handleCheckAllChange"
              >全选</el-checkbox>

              <el-checkbox-group v-model="userLists" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="user in userLists" :label="user" :key="user">{{user}}</el-checkbox>
              </el-checkbox-group>
              <el-select v-model="formLabelAlign.region" placeholder="请选择会员等级">
                <el-option label="区域一" value='7'></el-option>
                <el-option label="区域二" value='8'></el-option>
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
                <label>活动期间累计充值</label>
                <el-input></el-input>
              </div>
            </el-form-item>

            <el-form-item label="活动预算">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>

      <el-collapse-item class="coll-item" title="附件上传" name="2">
        <div class="coll-content">
          <p class="icon-txt">收缩</p>

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
            <el-progress :percentage="100" status="success" :strokewidth="strokeWidth"></el-progress>
          </div>

          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </el-collapse-item>

      <el-collapse-item class="coll-item" title="活动规则" name="3">
        <div class="coll-content">
          <p class="icon-txt">收缩</p>
          <el-form :model="formLabelAlign" class="coll-form active-rule">
            <el-form-item class="rule-item">
              <el-select></el-select>
              <el-input placeholder="审批人"></el-input>
              <label>活动期间累计充值:</label>
              <el-input class="last-rule"></el-input>
            </el-form-item>
            <el-form-item class="rule-item">
              <el-select></el-select>
              <el-input placeholder="审批人"></el-input>
              <label>活动期间累计充值:</label>
              <el-input class="last-rule"></el-input>
            </el-form-item>

            <el-form-item class="rule-item">
              <el-select></el-select>
              <el-input placeholder="审批人"></el-input>
              <label>活动期间累计充值:</label>
              <el-input class="last-rule"></el-input>
            </el-form-item>
            <el-form-item class="rule-item">
              <el-select></el-select>
              <el-input placeholder="审批人"></el-input>
              <label>活动期间累计充值:</label>
              <el-input class="last-rule"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>

      <el-collapse-item class="coll-item" title="活动资金" name="4">
        <div class="coll-content">
          <p class="icon-txt">收缩</p>
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
      </el-collapse-item>

      <el-collapse-item class="coll-item" title="活动资源" name="5">
        <div class="coll-content">
          <p class="icon-txt">收缩</p>
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
      </el-collapse-item>

      <el-collapse-item class="coll-item" title="活动执行" name="6">
        <div class="coll-content">
          <p class="icon-txt">收缩</p>
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
      </el-collapse-item>

      <el-collapse-item class="coll-item" title="监控指标" name="7">
        <div class="coll-content">
          <p class="icon-txt">收缩</p>
          <div>
            <span>维度选择：</span>
            <span>
              <el-checkbox v-for="item in checkList" :key="item">{{item}}</el-checkbox>
            </span>
          </div>
          <div class="index-check">
            <p>指标选择：</p>
            <span class="item-check">
              <el-checkbox v-for="item in checkList2" :key="item">{{item}}</el-checkbox>
            </span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
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
      strokeWidth:3,
      isIndeterminate: "",
      allUser: false,
      userLists: ["游客", "新会员", "老会员"],
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
      ]
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleCheckedCitiesChange() {},
    beforeRemove() {},
    handleExceed() {},
    handleCheckAllChange() {},
    handlePreview() {}
  },
  computed: {},
  created() {},
  mounted() {},
  components: {}
};
</script>


<style lang="less" >
@import "./less/index.less";
</style>