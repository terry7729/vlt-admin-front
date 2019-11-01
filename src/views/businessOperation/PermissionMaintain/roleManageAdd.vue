 <template>
  <div class="vlt-card">
    <div class="roleManageAdd">
      <div class="vlt-edit-double">
        <h2 class="title">新增角色</h2>
        <div class="vlt-edit-wrap">
          <base-form
            :formData="roleManageAddData"
            ref="baseForm"
            labelWidth="140px"
            :rules="roleManageAddRules"
            direction="top"
            @change="roleManageAddChangeForm"
          ></base-form>
          <el-row class="el-form-item vlt-edit-btn">
            <el-button
              type="primary"
              v-prevent="1000"
              size="medium"
              @click="roleManageAddSubmit"
            >提交并保存</el-button>
            <el-button size="medium" @click="roleManageAddCancel">取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

 <script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "",
  data() {
    return {
      //新增表单类型
      roleManageAddData: [
        { type: "input", title: "用户角色", value: "", prop: "roleName" },
        // {
        //   type: "select",
        //   title: "角色状态",
        //   prop: "status",
        //   value: "",
        //   options: [
        //     {
        //       label: "启动",
        //       value: 1
        //     },
        //     {
        //       label: "冻结",
        //       value: 2
        //     },
        //     {
        //       label: "注销",
        //       value: 3
        //     }
        //   ]
        // },
        {
          type: "cascader-multiple",
          prop: "sysCode",
          value: [],
          title: "角色权限",
          placeholder: "请选择",
          setProps: {
            label: "moduleName",
            value: "id",
            children: "childModules",
            multiple: true,
            checkStrictly: true
          },
          options: []
        },
        {
          type: "radio",
          prop: "isManager",
          title: "是否为负责人",
          value: 2,
          options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
        },
        { type: "textarea", title: "描述", value: "", prop: "remark" }
      ],
      // 新增表单验证
      roleManageAddRules: {
        accountname: [
          { required: true, message: "请输入用户角色", trigger: "blur" }
        ],
        accounttype: [
          { required: true, message: "请输入角色类型", trigger: "blur" }
        ],
        // accountStatus: [
        //   { required: true, message: "请选择角色状态", trigger: "change" }
        // ],
        accountauthority: [
          {
            required: true,
            message: "请至少选择一个角色权限",
            trigger: "change"
          }
        ]
      },
      param: null
    };
  },
  components: {},
  async created() {
    //初始获取渠道权限列表数据
    let result = await this.$api.channelLimit();
    console.log(result);
    if (result.code === 0 && result) {
      this.roleManageAddData[1].options = result.data;
    }
  },

  methods: {
    //表单change事件
    roleManageAddChangeForm(val) {
      this.param = val;
      this.param.sysCode = this.param.sysCode.join(",");

      console.log(this.param);
    },
    //表单提交
    async roleManageAddSubmit() {
      let data = this.param;
      let resul = await this.$api.roleAdd({ data });
      if (resul.code === 0 && resul) {
        this.$router.push("roleManage");
      }
    },
    //表单取消
    roleManageAddCancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
