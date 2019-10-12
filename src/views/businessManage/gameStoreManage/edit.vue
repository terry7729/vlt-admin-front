<template>
    <div class="vlt-card store-edit">
        <h3>基础信息</h3>
        <el-row>
            <el-col :span="10" :offset="1">
                <el-form ref="form" :model="form" label-width="100px" size="medium">
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
                    



                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                    
                </el-form>
            </el-col>
        </el-row>

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
                faxaphone:''
            }
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
</style>