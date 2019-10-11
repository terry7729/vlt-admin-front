<template>
  <div class="preview-template">
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
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
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
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="活动组织方">
              <el-select v-model="formLabelAlign.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
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
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
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
                <el-input  placeholder="请输入大厅编号"></el-input>
              </span>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>

      <el-collapse-item title="反馈 Feedback" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
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
      allUser: false,
      userLists: ["游客", "新会员", "老会员"],
      radio: "1"
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  },
  computed: {},
  created() {},
  mounted() {},
  components: {}
};
</script>


<style lang="less" scoped>
// @import "./less/index.less";

.preview-template {
    // padding: 25px;

    h2 {
        height: 50px;
        background: white;
        // padding: 25px;
        text-indent: 25px;
        line-height: 50px;
    }

    .coll-item {
        font-size: 12px;
        position: relative;
    
        .icon-txt {
            color: blue;
            font-size: 14px;
            position: absolute;
            top: 10px;
            left: 1190px;
        }

        .coll-content {
            .coll-form {
                margin-left: 150px;
                input {
                    width: 400px;
                }

                .el-textarea__inner {
                    width: 400px;
                }
                .icon-local{
                    position: relative;
                    i{
                        position: absolute;
                        top: 8px;
                        left: 5px;

                    }
                }
                .active-lobby{
                   
                    .el-input{
                        width: 100px;
                        display: inline-block;
                        input{
                        width: 100px;
                       
                        }
                        
                    }
                   
                }
            
            }

        }

        .el-collapse-item__header {

            font-size: 16px;
            font-weight: 600;
            text-indent: 50px;
        }

    }

}
</style>