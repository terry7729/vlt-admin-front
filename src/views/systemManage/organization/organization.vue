<template>
  <div class="vlt-card organizati" style="min-height:500px">
    <el-container>
      <el-aside class="organi-left" style="width:330px;">
        <div class="organi-btn">
          <control-bar :options="(len>0) ? controlOptions :controlOptionstwo" @select="selectBtn"></control-bar>
        </div>
        <el-col :span="18">
          <div class="organi-tree">
            <el-tree
              :data="nodeTreeData"
              :props="setProps"
              show-checkbox
              node-key="id"
              @node-click="getnowNodeifo"
              :default-expanded-keys="[1,2]"
              :default-expand-all="false"
              ref="attrList"
              :expand-on-click-node="true"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span class="freeze">
                  <el-button type="text" size="mini" @click.stop="() => append(node, data)">新增</el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click.stop="() => remove(node, data)"
                    v-if="(data.id != 1)"
                  >{{data.status === 0 ? '解除' : '冻结'}}</el-button>
                </span>
              </span>
            </el-tree>
            <!--添加删除功能-->
          </div>
        </el-col>
      </el-aside>

      <el-main style="padding:0 40px;border-left:1px solid #ccc;margin-left:20px;">
        <div class="organi-right" style="margin-left:30px;">
          <div class="Lotteryinfo">
            <section class="comp-item">
              <panel-edit title="机构信息" @edit="changeOrganizationIfo" :show="true">
                <base-info :infoList="AgencyInformation"></base-info>
              </panel-edit>
            </section>
          </div>
          <div class="departmentinfo" style="margin:40px 0 40px 0; ">
            <section class="comp-item">
              <panel title="部门信息" :show="true">
                <tips-line>
                  共搜索到
                  <span style="color:#57a3f3;padding:0 4px">{{total}}</span>条数据
                </tips-line>
                <!-- 提示信息!-->
                <el-table
                  ref="singleTable"
                  :data="tableList"
                  highlight-current-row
                  style="width: 100%"
                  border
                >
                  <el-table-column type="index" width="50" label="序号"></el-table-column>
                  <el-table-column property="departmentName" label="部门名称" width="120"></el-table-column>
                  <el-table-column property="insName" label="所属机构" width="120"></el-table-column>
                  <el-table-column property="parentName" label="上级部门"></el-table-column>
                  <el-table-column property="principal" label="部门负责人"></el-table-column>
                  <el-table-column property="principalMobile" label="负责人电话"></el-table-column>
                  <el-table-column property="status" label="状态">
                    <template slot-scope="scope">
                      <el-switch
                        v-model="scope.row.status"
                        active-color="#13ce66"
                        @change="switchChange(scope.row)"
                      ></el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column property="address" label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" @click="derparModifine(scope.row)">修改</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="padding:10px;" v-if="total">
                  <!-- 分页!-->
                  <table-paging
                    :current-page="1"
                    :page-size="pageSize"
                    :total="total"
                    @handleSizeChange="pageSizeChange"
                    @handleCurrentChange="pageCurrentChange"
                  ></table-paging>
                </div>
              </panel>
            </section>
          </div>
        </div>
      </el-main>
    </el-container>
    <!--弹出框-->
    <el-dialog
      title
      :visible.sync="dialogFormVisible"
      custom-class="organiDialog"
      @close="hadnelClose"
    >
      <div class="vlt-edit-single">
        <h2 class="title">添加部门信息</h2>
        <div class="vlt-edit-wrap">
          <el-form>
            <base-form
              :formData="this.addOrChange === '更改部门信息'?AddDepartment.slice(1,6):AddDepartment"
              labelWidth="110px"
              ref="DepartmentBaseForm"
              :rules="rules2"
              direction="right"
              @change="DepartmentChangeForm"
            ></base-form>
          </el-form>
          <el-row class="vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="DepartmentSubmit">提交并保存</el-button>
            <el-button size="medium" @click="departmenCancel">取消</el-button>
          </el-row>
        </div>
      </div>
    </el-dialog>
    <!--弹出框2-->
    <el-dialog
      title
      :visible.sync="dialogFormVisible2"
      custom-class="organiDialog"
      @close="hadnelClose"
    >
      <div class="vlt-edit-single">
        <h2 class="title">添加机构信息</h2>
        <div class="vlt-edit-wrap">
          <base-form
            :formData="this.addOrChange==='更改机构信息'?OrganizationChange:OrganizationAdd"
            labelWidth="110px"
            ref="OrganizationBaseForm"
            :rules="rules2"
            direction="right"
            @change="OrganizationChangeForm"
          ></base-form>

          <el-row class="vlt-edit-btn">
            <el-button
              type="primary"
              v-prevent="1000"
              size="medium"
              @click="OrganizationSubmit"
            >提交并保存</el-button>
            <el-button size="medium" @click="OrganizationCancel">取消</el-button>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import rules from "../../../utils/rules";
import moment from "moment";
export default {
  name: "organization",
  computed: {},
  created() {
    this.init();
  },
  data() {
    return {
      setProps: {
        label: "text",
        value: "id",
        children: "children"
      },
      rules2: {
        //验证表单对象
        section: { required: true, message: "部门不能为空" }
      },
      controlOptions: [
        //顶部按钮
        { name: "添加部门", type: "primary", icon: "plus",disabled:false, id: 2 },
        { name: "刷新", type: "", icon: "refresh-right", id: 3 }
      ],
       controlOptionstwo: [
        //顶部按钮
        { name: "添加部门", type: "primary", icon: "plus",disabled:true, id: 2 },
        { name: "刷新", type: "", icon: "refresh-right", id: 3 }
      ],
      AddDepartment: [
        //添加部门表单对象
        {
          type: "cascader",
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            checkStrictly: true
          },
          title: "上级部门",
          prop: "parentId",
          value: "",
          placeholder: "请选择",
          options: []
        },
        { type: "input", title: "部门名称", prop: "departmentName", value: "" },
        { type: "input", title: "部门负责人", prop: "principal", value: "" },
        {
          type: "input",
          title: "负责人电话",
          prop: "principalMobile",
          value: ""
        },
        { type: "switch", title: "状态", prop: "status", value: 1 },
        { type: "textarea", title: "备注", prop: "remark", value: "" }
      ],
      OrganizationChange: [
        //更改机构表单对象
        { title: "机构名称", type: "input", prop: "insName", value: "" },
        { title: "机构编码", type: "input", prop: "insCode", value: "" },
        { title: "机构责任人", type: "input", prop: "principal", value: "" },
        { title: "备注", type: "textarea", prop: "remark", value: "" }
      ],
      OrganizationAdd: [
        //添加机构表单对象
        {
          title: "父机构",
          type: "input",
          prop: " parent",
          disabled: true,
          value: ""
        },
        {
          title: "父机构编码",
          type: "input",
          disabled: true,
          prop: "parentInsCode",
          value: ""
        },
        { title: "机构名称", type: "input", prop: "insName", value: "" },
        { title: "机构编码", type: "input", prop: "insCode", value: "" },
        {
          title: "区域",
          type: "cascader",
          setProps: {
            label: "text",
            value: "code",
            children: "children",
            checkStrictly: true
          },
          prop: "regionCode",
          value: "",
          placeholder: "请选择",
          options: []
        },
        { type: "switch", title: "状态", prop: "status", value: true },
        { type: "textarea", title: "备注", prop: "remark", value: "" }
      ],
      AgencyInformation: [
        //机构信息
        {
          title: "父机构",
          value: "",
          type: "input",
          prop: "parentInsName",
          disabled: true
        },
        { title: "区域名称", value: "", type: "input", prop: "regionName" },
        {
          title: "父机构编码",
          value: "",
          type: "input",
          prop: "parentInsCode"
        },
        { title: "区域编码", value: "", type: "input", prop: "regionCode" },
        { title: "机构名称", value: "", type: "input", prop: "insName" },
        { title: "机构状态", value: "", type: "switch", prop: "status" },
        { title: "机构编码", value: "", type: "input", prop: "insCode" },
        { title: "备注", value: "", type: "textarea", prop: "remark" },
        {
          title: "创建人",
          value: "",
          type: "input",
          prop: "createBy",
          disabled: true
        },
        {
          title: "创建时间",
          value: "",
          type: "input",
          prop: "createTime",
          disabled: true
        },
        {
          title: "修改人",
          value: "",
          type: "input",
          prop: "modifierBy",
          disabled: true
        },
        {
          title: "修改时间",
          value: "",
          type: "input",
          prop: "modifierTime",
          disabled: true
        }
      ],
      tableList: [], //部门信息展示列表
      pageSize: 10, //每页显示条数
      page: 1, //当前页数
      total: 0,
      slelectifo: "", //当前选中机构名称
      dialogFormVisible2: false, //弹框二控制
      dialogFormVisible: false, //弹框一控制
      DepartmenParams: {}, //部门信息表单对象,
      OrganizationParams: {}, //机构信息表单
      addOrChange: null,
      nodeTreeData: [], //树形结构数据
      val: {}, //当前点击的节点data
      parentId: -1,
      departmenIfo: {},
      insparentId: 0,
      len:0
    };
  },
  mounted() {},
  components: {},
  methods: {
    async init() {
      let reslt = await this.$api.QueryInsTree(); //机构树菜单
      console.log("机构树菜单", reslt);
      if (reslt.code === 0 && reslt.data != null) {
        this.nodeTreeData = reslt.data;
        this.len = reslt.data.length
      }
      let res = await this.$api.FindRegionTreeRoots(); //区域树查询
      console.log("区域树查询", res);
      if (res.code === 0) {
        this.region = res.data;
        this.OrganizationAdd[4].options = res.data;
      }
    },
    departmenCancel() {
      //弹出框取消按钮
      this.dialogFormVisible = false;
      this.DepartmenParams = {};
    },
    OrganizationCancel() {
      //弹出框取消按钮2
      this.close = true;
      this.OrganizationParams = {};
      this.dialogFormVisible2 = false;
    },
    append(node, data) {
      //机构新增
      console.log(node, data);
      this.addOrChange = "添加机构";
      this.insparentId = data;
      this.dialogFormVisible2 = true;
      this.OrganizationAdd[0].value = data.text;
      this.OrganizationAdd[1].value = data.code;
    },
    switchChange(val){
      console.log(val)
             let ifo;
        if(!val.status){
          ifo = "此操作会冻结此部门，请确认是否冻结此部门？"
        }else{
          ifo = "此操作会解冻结此部门，认确认是否要解冻结此部门？"
        }
         this.$confirm(ifo, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
                 let data = {
                    status:Number(val.status),
                    departmentId:val.departmentId
                  }
                  console.log(data)
                  let reslt = await this.$api.UpdateDeptInfo({data})
                  console.log('更改角色状态',reslt)
                  if(reslt.code === 0){
                      this.subsidiaryOrgan()
                       this.$message({
                        type: "success",
                        message: val.status?"部门解冻成功!":"部门冻结成功"
                      });
                  }
          })
          .catch(() => {
            this.subsidiaryOrgan()
            this.$message({
              type: "info",
              message: "取消更改"
            });
          });
    },
    getId(date) {
      //获取当前点击节点所有子节点Id
      const self = this;
      let arr = [],
        arr2 = [];
      arr.push(date.id);
      if (date.children) {
        date.children.forEach(item => {
          arr.push(item.id);
          if (item.children) {
            item.children.forEach(i => {
              arr2.push(i.id);
              self.getId(i);
            });
          }
        });
      }
      return arr.concat(arr2);
    },

    async remove(node, date) {
      //机构状态冻结
      const self = this
      console.log(date)
      console.log(this.getId(date))
    

      this.$confirm(date.status?'此操作将冻结该机构, 是否继续?':'您确认要解冻此机构？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          console.log(node, date);
          let data = {
            insIdList: self.getId(date),
            status: Number(!date.status)
          };
          let reslt = await this.$api.UpdateInsInfoStatus({ data }); //更新机构状态
          console.log(reslt);
          if (reslt.code === 0) {
              this.init();
              this.$message({
                type: 'success',
                message: date.status?'冻结成功!':'启用成功'
              });
          } 
        }).catch(() => {
          this.subsidiaryOrgan();
          this.$message({
            type: 'info',
            message: date.status?'取消冻结':'取消解冻'
          });          
        });
    },
    hadnelClose() {
      //关闭弹框时置空当前选中节点信息
      this.slelectifo = "";
      this.AgencyInformation.forEach(item => {
        item.value = "";
      });
    },
    DepartmentChangeForm(val) {
      //部门表单对象
      console.log("部门表单对象", val);
      Object.assign(this.DepartmenParams, val);
    },
    OrganizationChangeForm(val) {
      //机构表单对象
      console.log(val);
      Object.assign(this.OrganizationParams, val);
    },
    pageSizeChange(val) {
      //每页显示条数
      this.pageSize = val;
      this.subsidiaryOrgan();
    },
    pageCurrentChange(val) {
      //当前显示页数
      this.subsidiaryOrgan(val);
    },
    open(val) {
      this.$alert(val, "温馨提示！", {
        confirmButtonText: "确定",
        callback: action => {
          close();
          this.slelectifo = "";
        }
      });
    },
    async subsidiaryOrgan(num) {
      //部门分页控制
      let data = {
        param: { insId: this.val.id },
        pageSize: this.pageSize,
        page: num || 1
      };
      let resl = await this.$api.QueryDeptInfoPage({ data }); //部门分页查询
      console.log("部门分页查询1", resl);
      let obj = JSON.parse(JSON.stringify(resl.data.records));
      // console.log("部门分页查询2", obj);
      if (resl.code === 0) {
        let arr2 = resl.data.records;
        obj.forEach(item => {
          item.status = !!item.status;
        });
        this.tableList = obj;
        this.page = resl.data.pages;
        this.pageSize = resl.data.size;
        this.total = resl.data.total;
      }
    },
    async DepartmentSubmit() {
      if (this.addOrChange === "更改部门信息") {
        // this.DepartmenParams.created = "更改部门信息";
        let data = JSON.parse(JSON.stringify(this.DepartmenParams));
        console.log(this.departmenIfo)
        // return
        data.departmentId = this.departmenIfo.departmentId;

        let reslt = await this.$api.UpdateDeptInfo({ data }); //更新部门信息
        console.log("更新部门信息", reslt);
        if (reslt.code === 0) {
          this.subsidiaryOrgan();
          this.dialogFormVisible = false;
          this.$refs.DepartmentBaseForm.resetForm(); //表单重置
          this.DepartmenParams = {}; //表单对象重置为空
        }
      } else if (this.addOrChange === "添加部门") {
        if (Object.keys(this.val).length != 0) {
          // this.DepartmenParams.created = "添加部门";
          let data = JSON.parse(JSON.stringify(this.DepartmenParams));
          data.insId = this.val.id;
          delete data.parent;
          console.log(data);
          if (data.parentId.length === 0) {
            data.parentId = "";
          }
          data.status = Number(data.status);

          let reslt = await this.$api.AddDeptInfo({ data }); //添加部门
          console.log(reslt);
          if (reslt.code === 0) {
            this.subsidiaryOrgan();
            this.dialogFormVisible = false;
            this.$refs.DepartmentBaseForm.resetForm();
            this.DepartmenParams = {};
          }
        } else {
          this.open("请选择要添加部门的机构！");
        }
      }
    },
    async OrganizationSubmit() {
      if (this.addOrChange === "更改机构信息") {
        let data = JSON.parse(JSON.stringify(this.OrganizationParams));
        data.insId = this.val.id;
        data.parentId = this.parentId;
        delete data.parent;
        let rest = await this.$api.UpdateInsInfo({ data }); //修改机构信息
        console.log("修改机构信息", rest);
        if (rest.code === 0) {
          this.dialogFormVisible2 = false;
          this.OrganizationParams = {};
          this.init();
        }
      } else if (this.addOrChange === "添加机构") {
        let data = JSON.parse(JSON.stringify(this.OrganizationParams));
        data.parentId = this.insparentId.id;
        if (this.insparentId.status === 1) {
          data.status = 1;
        } else {
          data.status = Number(!data.status);
        }
        console.log(this.val.status);
        let reslt = await this.$api.AddInsInfo({ data }); //添加机构
        if (reslt.code === 0) {
          this.$refs.OrganizationBaseForm.resetForm();
          this.OrganizationParams = {};
          this.dialogFormVisible = false;
          this.dialogFormVisible2 = false;
          this.init();
        }
      }
    },

    async selectBtn(val) {
      console.log(this.slelectifo);
      if (val.name === "添加部门") {
        //添加部门
        this.AddDepartment.forEach(item => {
          item.value = "";
        });
        if (this.slelectifo != "") {
          this.addOrChange = "添加部门";
          this.dialogFormVisible = true;
          let res = await this.$api.FindDeptTreeRoots({ data: this.val.id }); //部门树查询
          console.log("部门树查询", res);
          if (res.code === 0) {
            this.AddDepartment[0].options = res.data;
          }
        } else {
          this.open("请选择需要添加部门的机构！");
        }
      }
      if (val.name === "刷新") {
        this.init();
        // this.val ={}
        this.tableList = [];
        // this.subsidiaryOrgan(0)
        this.hadnelClose();
      }
    },

    changeOrganizationIfo() {
      //更改机构信息
      console.log(this.val);
      if (Object.keys(this.val).length === 0) {
        this.open("请选择要编缉的机构");
      } else if (this.val.status === 0) {
        console.log(this.val);
        this.dialogFormVisible2 = true;
        this.addOrChange = "更改机构信息";
      } else {
        this.open("对不起，启用状态不可编缉！");
      }
    },
    derparModifine(val) {
      this.dialogFormVisible = true;
      this.addOrChange = "更改部门信息";
      this.departmenIfo = val;
      let arr = Object.keys(val);
      console.log(val);
      let changeDepartment = this.AddDepartment.slice(1, 6);
      changeDepartment.forEach(item => {
        arr.forEach(i => {
          if (item.prop === i) {
            console.log(i);
            if (item.prop === "status") {
              if (val[i]) {
                item.value = 1;
              } else {
                item.value = 0;
              }
            } else {
              item.value = val[i];
            }
          }
        });
      });
    },

    async getnowNodeifo(val, s) {
      //获取当前点击节点信息 s为当前节点node
      console.log(val, s);
      try {
        this.val = val;
        let reslt = await this.$api.QueryInsInfo({ data: val.id }); //查询机构详情
        console.log("查询机构详情", reslt);
        if (reslt.code === 0) {
          let arr = Object.entries(reslt.data);
          let obj = arr.map(([key, val]) => {
            if (
              (key === "createTime" && val != null) ||
              (key === "modifierTime" && val != null)
            ) {
              return { [key]: moment(val).format("YYYY-MM-DD HH:mm:ss") };
            } else if (key === "status") {
              if (val === 1) {
                return { [key]: "启用" };
              } else {
                return { [key]: "冻结" };
              }
            } else {
              return { [key]: val };
            }
          });
          this.slelectifo = reslt.data.insName;
          this.parentId = reslt.data.parentId;
          //当前节点父节点信息
          this.addValue(obj, this.AgencyInformation);
          this.addValue(obj, this.OrganizationChange);
          this.subsidiaryOrgan(); //分页控制
        }
      } catch (err) {
        console.log("抛出异常为：", err);
      }
    },

    addValue(val, data) {
      //value数值回填
      for (var i = 0; i < val.length; i++) {
        for (var j = 0; j < data.length; j++) {
          if (Object.keys(val[i])[0] === data[j].prop) {
            data[j].value = Object.values(val[i])[0];
          }
        }
      }
    }
  },
  watch: {
    val: {
      handler: function(val, oldval) {
        this.$refs.attrList.setChecked(val, true);
        this.$refs.attrList.setChecked(oldval, false);
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
  }
};
</script>


<style lang="less">
@import "./less/index.less";
.organiDialog {
  width: 600px;
  border-radius: 10px;
  .el-dialog__header {
    padding: 0;
  }
}

.freeze {
  padding-left: 20px;
}
.custom-tree-node {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.organizati {
  .el-col-18 {
    width: 100%;
  }
}
</style>
