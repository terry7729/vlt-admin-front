<template>
  <div class="vlt-card">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="渠道新建" name="first">
        <div class="vlt-edit-single">
          <el-form
            label-position="right"
            label-width="90px"
            :model="form"
            ref="form"
            class="device-add"
          >
            <!-- 基本信息 -->
            <h2 class="title">基本信息</h2>
            <div class="vlt-edit-wrap">
              <el-form-item label="所属机构">
                <el-cascader v-model="form.organ" :options="options" @change="handleChange"></el-cascader>
              </el-form-item>
              <el-form-item label="渠道类型">
                <el-select v-model="form.singlemoney" placeholder="请选择">
                  <el-option value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="渠道编号">
                <el-input v-model="form.Channelnum" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="渠道地址">
                <el-cascader
                  v-model="form.Channeladressdid"
                  :options="options"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>
              <el-form-item>
                <el-input v-model="form.Channeladressson" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <!-- 人员信息 -->
            <h2 class="title">人员信息</h2>
            <div class="vlt-edit-wrap">
              <el-form-item label="职位">
                <el-select v-model="form.job" placeholder="请选择">
                  <el-option value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="form.name" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input v-model="form.IDCard" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio v-model="form.sex" label="1">男</el-radio>
                <el-radio v-model="form.sex" label="2">女</el-radio>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="form.telephonenum" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="证件照">
                <el-upload action="#" list-type="picture-card" :auto-upload="false">
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                      >
                        <i class="el-icon-download"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
              </el-form-item>
            </div>
            <!-- 经营环境 -->
            <h2 class="title">经营环境</h2>
            <div class="vlt-edit-wrap">
              <el-form-item label="经营场所环境">
                <el-select v-model="form.environment" placeholder="请选择">
                  <el-option value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="站点面积">
                <el-input v-model="form.site " placeholder="请输入内容"></el-input>
              </el-form-item>
              <!-- 财务信息 -->
              <h2 class="title">财务信息</h2>
              <div class="vlt-edit-wrap">
                <el-form-item label="销售保证金">
                  <el-select v-model="form.Sales" placeholder="请选择">
                    <el-option value="1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="代销费费率">
                  <el-select v-model="form.Commission" placeholder="请选择">
                    <el-option value="1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="收款凭证">
                  <el-upload action="#" list-type="picture-card" :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                </el-form-item>
              </div>
              <!-- 销售游戏 -->
              <h2 class="title">销售游戏</h2>
              <div class="vlt-edit-wrap">
                <el-table :data="tableData" border>
                  <el-table-column prop="id" label="序号"></el-table-column>
                  <el-table-column prop="accountName" label="游戏名称"></el-table-column>
                  <el-table-column label="投注权限">
                    <template>
                      <el-switch
                        v-model="jurisdiction"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      ></el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column label="兑奖权限">
                    <template>
                      <el-switch
                        v-model="redeemjurisdiction"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      ></el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column prop="createDate" label="销售时间"></el-table-column>
                </el-table>
              </div>
              <!-- 发放设备 -->
              <h2 class="title">发放设备</h2>
              <div class="vlt-edit-wrap" style="overflow:hidden">
                <el-form-item label="设备1">
                  <div class="equipment_row">
                    <div class="equipment_row_one">
                      <el-select v-model="form.betgameone" placeholder="请选择">
                        <el-option value="1"></el-option>
                      </el-select>
                    </div>
                    <div class="equipment_row_one">
                      <el-select v-model="form.betgameonemodel" placeholder="请选择">
                        <el-option value="1"></el-option>
                      </el-select>
                    </div>
                  </div>
                </el-form-item>

                <el-form-item>
                  <div class="equipment_row">
                    <div class="equipment_row_one">
                      <el-select v-model="form.betgametwo" placeholder="请选择">
                        <el-option value="1"></el-option>
                      </el-select>
                    </div>
                    <div class="equipment_row_one">
                      <el-select v-model="form.betgametwomodel" placeholder="请选择">
                        <el-option value="1"></el-option>
                      </el-select>
                    </div>
                  </div>
                </el-form-item>

                <el-form-item>
                  <div class="equipment_row">
                    <div class="equipment_row_one">
                      <el-select v-model="form.betgamethree" placeholder="请选择">
                        <el-option value="1"></el-option>
                      </el-select>
                    </div>
                    <div class="equipment_row_one">
                      <el-select v-model="form.betgamethreemodel" placeholder="请选择">
                        <el-option value="1"></el-option>
                      </el-select>
                    </div>
                  </div>
                </el-form-item>
              </div>
              <!-- 其他事项 -->
              <h2 class="title">其他事项</h2>
              <div class="vlt-edit-wrap">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </div>
            </div>
          </el-form>
        </div>
        <el-row class="vlt-edit-btn send">
          <el-button type="primary" v-prevent="1000" size="medium" @click="save(form)">提交并保存</el-button>
          <el-button size="medium" @click="editShow = !editShow">取消</el-button>
        </el-row>
      </el-tab-pane>
      <!-- 渠道新建流程图 -->
      <el-tab-pane label="渠道新建流程图" name="second">
        <div class="show_case">
          <div class="processed">已处理</div>
          <div class="pending">待处理</div>
          <div class="untreated">未处理</div>
        </div>
        <div>
          <img :src="showimage" alt />
        </div>
        <div class="vlt-edit-single newchannel">
          <div class="newchannel_first_case">
            <!-- 渠道新建 -->
            <h2 class="title">渠道新建</h2>
            <div class="vlt-edit-wrap">
              <div class="newchannel_data">
                <span>处理人:</span>
                <span></span>
              </div>
              <div class="newchannel_data">
                <span>处理人类型:</span>
                <span></span>
              </div>
              <div class="newchannel_data">
                <span>处理时限类型:</span>
                <span></span>
              </div>
              <div class="newchannel_data">
                <span>处理时限:</span>
                <span></span>
              </div>
              <div class="newchannel_data">
                <span>任务类型:</span>
                <span></span>
              </div>
              <div class="newchannel_data">
                <span>消息提醒:</span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        organ: "",
        singlemoney: "",
        Channelnum: "",
        Channeladressdid: "",
        Channeladressson: "",
        job: "",
        name: "",
        IDCard: "",
        sex: "1",
        telephonenum: "",
        src: "",
        environment: "",
        site: "",
        Sales: "",
        Commission: "",
        voucherSrc: "",
        betgameone: "",
        betgameonemodel: "",
        betgametwo: "",
        betgametwomodel: "",
        betgamethree: "",
        betgamethreemodel: ""
      },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        }
      ],

      tableData: [
        {
          id: 1,
          accountName: "广东省",
          jurisdiction: "true",
          redeemjurisdiction: "true",
          createDate: "2019-02-25 01:50:06"
        },
        {
          id: 2,
          accountName: "广东省",
          jurisdiction: "上海市普陀区金沙江路 1518 弄",
          redeemjurisdiction: "2019-02-25 01:50:06",
          createDate: "自营"
        }
      ],
      jurisdiction: true,
      redeemjurisdiction: true,
      fileList: [],
      activeName: "first",
      dialogImageUrl: "",
      dialogVisible: true,
      disabled: true,
      showimage: ""
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange() {
      console.log(11);
    },
    changeBet(item) {
      console.log(item);
    },
    save(form) {
      console.log(form);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./less/index";
</style>