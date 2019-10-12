<template>
  <div class="vlt-card">
    <div class="search">
      <search-Bar :options="option"></search-Bar>
    </div>
    <div class="addlist">
      <el-button type="primary" icon="el-icon-plus" @click="add()">新建用户</el-button>
      <el-button>批量删除</el-button>
    </div>
    <div class="hint">
      <elTag :title="title"/>
    </div>
    <div class="from">
      <Tabel />
    </div>

  </div>
</template>

<script>
import elTag from '../../../components/common/tag'
import Tabel from '../../../components/common/tabel'
export default {
  name: "name",
  data() {
    return {
      title:{
        title:'用户角色搜索“中心管理部门”',
        num:10
        },
      option:[
        {
          title:'用户名称',
          prop:'user',
          type:'input',
          value:'',
          placeholder: '请输入' || ['请输入1', '请输入2'],
        },
        {
          title:'用户姓名',
          prop:'name',
          type:'input',
          value:'',
          placeholder: '请输入' || ['请输入1', '请输入2'],
        },
         {
          title:'用户姓别',
          prop:'set',
          type:'input',
          value:'',
          placeholder: '请输入' || ['请输入1', '请输入2'],
        },
        {
          title:'用户名称',
          prop:'select',
          type:'select',
          options:[
            {
            value:"beijing",
            label:'北京'
            },
             {
            value:"shanghai",
            label:'上海'
            }
          ],
          
          value:'',
          placeholder: '请输入' || ['请输入1', '请输入2'],
        }
      ]

    };
  },
  computed: {},
  created() {
    this.title.num = 330
    console.log(elTag)
  },
  mounted() {},
  components: {
    elTag,
    Tabel
  },
  methods: {
      add(){
          this.$router.push('userList/userDestails')
      }
  },
};
</script>


<style lang="less">
@import "./less/index.less";
</style>
