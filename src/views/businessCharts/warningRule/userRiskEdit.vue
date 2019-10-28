<template>
  <div class="vlt-card">
    <!-- <div class="vlt-edit-single">
          <el-form ref="form" :model="form" label-width="100px" size="medium">
          <h2 class="title">告警监控基础信息</h2>
          <div class="vlt-edit-wrap">
            <el-form-item label="告警源：">
                <el-input v-model="form.name" placeholder="请输入告警源"></el-input>
            </el-form-item>
            <el-form-item label="描述：">
                <el-input type="textarea" v-model="form.desc" placeholder="请输入描述"></el-input>
                
            </el-form-item>
            <el-form-item label="警报等级：">
                <el-select v-model="form.state" placeholder="请选择" width="100px">
                    <el-option label="储备" value="shanghai"></el-option>
                    <el-option label="试玩" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="告警次数：">
                <el-input v-model="form.name" placeholder="请输入告警次数"></el-input>
            </el-form-item>
            <el-form-item label="最新时间：">
                <el-input v-model="form.name" placeholder="请输入最新时间"></el-input>
            </el-form-item>
            <el-form-item label="告警历时：">
                <el-input v-model="form.developersName" placeholder="请输入游戏开发商名称"></el-input>
            </el-form-item>
            <el-form-item label="通知状态：">
                <el-select v-model="form.type" placeholder="请选择通知状态" width="100px">
                    <el-option label="已通知" value="gailu"></el-option>
                    <el-option label="未通知" value="jiangzu"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="处理状态：">
                <el-select v-model="form.type" placeholder="请选择" width="100px">
                    <el-option label="已处理" value="gailu"></el-option>
                    <el-option label="未处理" value="jiangzu"></el-option>
                </el-select>
            </el-form-item>                  
          </div>          
        </el-form>
          <el-row class="vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="save">提交</el-button>
            <el-button size="medium" @click="editShow = !editShow">取消</el-button>
          </el-row>
    </div>-->
    <section class="comp-item">
      <div class="vlt-edit-single">
        <h2 class="title">用户风险指标新增</h2>
        <div class="vlt-edit-wrap">
          <el-form label-position="right" label-width="90px" :model="form" ref="form">
            <base-form
              :formData="data2"
              labelWidth="140px"
              ref="baseForm"
              :rules="rules2"
              direction="right"
              @change="changeForm"
            ></base-form>
          </el-form>
          <el-row class="vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
            <el-button size="medium" @click="">取消</el-button>
          </el-row>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import rules from "@/utils/rules.js";
export default {
  name: "warningWatchEdit",
  data() {
    return {
      params:{},
      data2: [
        { type: "input", title: "单日投注限额", prop: "test" },               
        { type: "input", title: "单日投注次数限制", prop: "test" },
        { type: "input", title: "单日游戏时长限制", prop: "test" },      
      ],
      rules2: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        all: [{ required: true, validator: rules.checkEmail, trigger: "blur" }]
      },
      form: {   
        softwareDesc: "",
        newCharacter: ""
      },
      options: [
        {
          value: "guangdong",
          label: "广东省",
          children: [
            {
              value: "shenzhen",
              label: "深圳市 ",
              children: [
                {
                  value: "nanshna",
                  label: "南山区"
                }
              ]
            }
          ]
        }
      ],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    submit() {
      console.log(this.form);
    },
    save() {
      console.log(1);
    },
    changeForm(val) {
        console.log(val)
      Object.assign(this.params, val);
      console.log("派发出来的参数", this.params);
    }
  },created() {
    
  },
};
</script>

<style lang="less" scoped>
// h3{
//     border-bottom: 1px solid rgb(167, 164, 164);
//     padding-bottom: 8px;
//     margin: 10px 0 40px 30px;
// }
// .address{
//   margin-top: 15px;
// }
.vlt-edit-btn {
    margin-left: 380px;
}
</style>