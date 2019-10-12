<template>
    <div class="vlt-card store-edit">
        <div class="vlt-edit-single">
          <el-form ref="form" :model="form" label-width="100px" size="medium">
          <h2 class="title">基础信息</h2>
          <div class="vlt-edit-wrap">
            <el-form-item label="游戏名称：">
                <el-input v-model="form.name" placeholder="请输入游戏名称"></el-input>
            </el-form-item>
            <el-form-item label="游戏类型：">
                <el-select v-model="form.type" placeholder="请选择" width="100px">
                    <el-option label="概率型" value="gailu"></el-option>
                    <el-option label="奖组型" value="jiangzu"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="游戏状态：">
                <el-select v-model="form.state" placeholder="请选择" width="100px">
                    <el-option label="储备" value="shanghai"></el-option>
                    <el-option label="试玩" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="游戏奖池：">
                <el-select v-model="form.state" placeholder="请选择" width="100px">
                    <el-option label="无奖池" value="shanghai"></el-option>
                    <el-option label="有奖池" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="游戏简介">
                <el-input type="textarea" v-model="form.desc" placeholder="请输入游戏简介"></el-input>
            </el-form-item>
            <el-form-item label="开发商名称：">
                <el-input v-model="form.developersName" placeholder="请输入游戏开发商名称"></el-input>
            </el-form-item>
            <el-form-item label="联系人：">
                <el-input v-model="form.linkMan" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：">
                <el-input v-model="form.phoneNumber" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱：">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="传真电话：">
                <el-input v-model="form.faxaphone" placeholder="请输入传真号码 如0755-56654444"></el-input>
            </el-form-item>
            <el-form-item label="联系地址：">
                <el-cascader placeholder="试试搜索：广东" :options="options" filterable></el-cascader>
                <el-input v-model="form.address" placeholder="请输入详细地址" class="address"></el-input>
            </el-form-item>
          </div>
          <h2 class="title">上传游戏包</h2>
          <div class="vlt-edit-wrap">
                      <el-form-item label="游戏名称：">
                          <el-input v-model="form.name" placeholder="请输入游戏名称"></el-input>
                      </el-form-item>
                      <el-form-item label="游戏类型：">
                          <el-select v-model="form.type" placeholder="请选择" width="100px">
                              <el-option label="概率型" value="shanghai"></el-option>
                              <el-option label="奖组型" value="beijing"></el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="游戏状态：">
                          <el-select v-model="form.state" placeholder="请选择" width="100px">
                              <el-option label="储备" value="shanghai"></el-option>
                              <el-option label="试玩" value="beijing"></el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="游戏奖池：">
                          <el-select v-model="form.state" placeholder="请选择" width="100px">
                              <el-option label="无奖池" value="shanghai"></el-option>
                              <el-option label="有奖池" value="beijing"></el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="游戏简介">
                          <el-input type="textarea" v-model="form.desc" placeholder="请输入游戏简介"></el-input>
                      </el-form-item>
                      <el-form-item label="开发商名称：">
                          <el-input v-model="form.developersName" placeholder="请输入游戏开发商名称"></el-input>
                      </el-form-item>
                      <el-form-item label="联系人：">
                          <el-input v-model="form.linkMan" placeholder="请输入姓名"></el-input>
                      </el-form-item>
                      <el-form-item label="手机号码：">
                          <el-input v-model="form.phoneNumber" placeholder="请输入手机号码"></el-input>
                      </el-form-item>
                      <el-form-item label="电子邮箱：">
                          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                      </el-form-item>
                      <el-form-item label="传真电话：">
                          <el-input v-model="form.faxaphone" placeholder="请输入传真号码 如0755-56654444"></el-input>
                      </el-form-item>
                          <el-form-item label="单选可搜索">
                          <el-cascader placeholder="试试搜索：指南" :options="options" filterable></el-cascader>
                      </el-form-item>
          </div>
        </el-form>
          <el-row class="vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="save">提交并保存</el-button>
            <el-button size="medium" @click="editShow = !editShow">取消</el-button>
          </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name:"edit",
    data(){
        return{
            form: {
                name: '',
                type: '',
                state:'',
                pond:'',
                desc: '',
                developersName:'',
                linkMan:'',
                phoneNumber:'',
                email:'',
                faxaphone:'',
                address:''
            },
            options:[
              {value:"guangdong",label:'广东省',
                children:[
                  {value:'shenzhen',label:'深圳市 ',
                    children:[{
                      value:'nanshna',label:'南山区'
                    }]
                  }
                ]
              },
            ]
        }
    },
    methods:{
        onSubmit(){
            console.log(this.form)
        }
    }
}
</script>

<style lang="less" scoped>
h3{
    border-bottom: 1px solid rgb(167, 164, 164);
    padding-bottom: 8px;
    margin: 10px 0 40px 30px;
}
.address{
  margin-top: 15px;
}
</style>