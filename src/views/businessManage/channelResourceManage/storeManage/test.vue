<template>
  <div class="vlt-card">
    <div class="vlt-edit-single">
      <h2 class="title">基本信息</h2>
      <div class="vlt-edit-wrap">
        
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "addStore",
  data() {
    return {
      options:[
        {label:'部门1',value:1,children:[{label:'部门1-1',value:1.1,children:[{label:'部门1-1-1',value:8},{label:'小花',value:545}]},{label:'人员1',value:6}]},
        {label: '人员1',value:9},
        {label: '人员2',value:8},
        {label: '人员3',value:7},
        {label:'部门2',value:17,children:[{label:'部门2-1',value:1.1},{label:'人员1',value:66 }]},

      ],
      selectedOption: '',
      params: {},
      insData: [], //  所属机构数据
      formData: [
        { title: "仓库名称", type: "input", prop: "nameX", value: "" },
        {
          title: "所属机构",
          type: "cascader",
          prop: "organId",
          value: "",
          options: [],
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            // multiple: true, // 多选
            checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
          }
        }
      ],
      formData2: [
        // { title: "仓库管理员", type: "select", prop: "adminId", options: [] },
        {
          title: "仓库管理员",
          type: "cascader",
          prop: "adminId",
          value: "",
          options: [],
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            // multiple: true, // 多选
            checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
          }
        },
        { title: "备注", type: "textarea", prop: "remark", value: "" }
      ],
      rules2: {
        nameX: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        organId: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        adminId: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        remark: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ]
      },
      typeX: "",      //仓库类型
      typeName: "",
      param: "",
      param2: "",
    };
  },
  components: {},
  created() {
    this.getInsData();
    // this.getAdminList()
  },
  methods: {
    // 获取所属机构列表
    getInsData() {
      const data = {};
      (async data => {
        let res = await this.$api.getInsList({ data });
        console.log(res)
        if (res && res.code == 0) {
          this.$set(this.formData[1], "options", res.data);
          this.insData = res.data;
        } else {
          self.$message.warning(res.msg)
        }
      })(data);
    },
    // 获取仓库管理员数据
    getAdminList(data) {
      (async data => {
        let res = await this.$api.getAdminList({ data });
        console.log('部门与管理员',res)
        let ins = res.data
          let array = [];
          // res.data.forEach(item => {
          //   let obj = {};
          //   obj.label = item.userName;
          //   obj.value = item.userId;
          //   array.push(obj);
          // });
          let arr = []
          for(let i = 0 ; i< ins.length ; i++){
            let person = ins[i].list
            for(let j = 0; j<person.length;j++) {
              let obj = {}
              obj.label = person[j].userName
              obj.value = person[j].userId
              arr.push(obj)
            }
          }
          console.log(arr)
          this.$set(this.formData2[0], "options", res.data);
      })(data);
    },
    handleChange(){

    },

    submit() {
      let data = {
        typeX: this.typeX
      };
      Object.assign(data, this.param, this.param2);
      this.createWare(data);
    },
    createWare(data) {
      (async data => {
        let res = await this.$api.createWare({ data });
        if (res && res.code == 0) {
          this.$message.success("新建成功");
          this.$router.push({ path: "storeManage" });
        }
      })(data);
    },
    cancel() {
      this.$router.back();
    },
    changeForm2(val) {
      this.param2 = val;
    },
    changeForm(val) {
      let type = {
        0: "中彩仓库",
        1: "省中心仓库",
        2: "地市仓库"
      };
      this.param = val;
      console.log("派发出来的参数", this.params);
      if (typeof val.organId == "number") {
        this.getAdminList(val.organId);
      }
      let array = [];
      let typeValue = "";
      let insArray = this.getInsArray(val.organId, "id", this.insData, "type");
      console.log("insArray", insArray);
      this.typeX = typeValue;
      this.typeName = insArray && type[insArray[0]];
      // console.log(this.typeName);
    },
    //数据级联
    getInsArray(id, key, data, keyBack) {
      // 传入id和key是一样胡  keyBack返回key
      const self = this;
      for (var i in data) {
        if (data[i][key] == id) {
          // return [data[i][key]]; //用于传id 返回id数组
          return [data[i][keyBack]]; //用于传id 返回code数组
        }
        if (data[i].children) {
          let ro = self.getInsArray(id, key, data[i].children, keyBack);
          if (ro !== undefined) {
            return ro.concat(data[i][keyBack]);
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
