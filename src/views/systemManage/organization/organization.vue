<template>
  <div class="vlt-card" style="min-height:500px">
    <el-row type="flex" class="organi-left">
      <div>
        <el-row type="flex" :gutter="50">
          <el-col :span="24">
            <div class="organi-tree">
              <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
                :props="defaultProps"
              ></el-tree>
            </div>
          </el-col>
          <div class="organi-select">
            <el-dropdown placement="bottom-start" @command="handele" >
              <el-button size="mini">
                选择操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="刷新">刷新</el-dropdown-item>
                <el-dropdown-item command="添加机构">添加机构</el-dropdown-item>
                <el-dropdown-item command="添加部门">添加部门</el-dropdown-item>
                <el-dropdown-item command="展开所有">展开所有</el-dropdown-item>
               
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-row>
      </div>
      <el-col :span="16">
        <div class="organi-right" style="margin-left:200px;">
          <div class="Lotteryinfo">
            <section class="comp-item">
              <panel title="彩票信息" :show="true">
                <base-info :infoList="infoList"></base-info>
              </panel>
            </section>
          </div>
          <div class="departmentinfo" style="margin:40px 0 40px 0; ">
            <section class="comp-item">
              <panel title="部门信息" :show="true">
                
                <el-table
                  ref="singleTable"
                  :data="tableData"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  style="width: 100%"
                >
                  <el-table-column type="index" width="50" label="序号"></el-table-column>
                  <el-table-column property="date" label="部门名称" width="120"></el-table-column>
                  <el-table-column property="name" label="所属机构" width="120"></el-table-column>
                  <el-table-column property="address" label="上级部门"></el-table-column>
                  <el-table-column property="address" label="部门负责人"></el-table-column>
                  <el-table-column property="address" label="负责人电话"></el-table-column>
                  <el-table-column property="address" label="状态">
                    <template slot-scope="scope">
                      <el-switch v-model="tableData[scope.$index].isShow" @change="change" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column property="address" label="操作"></el-table-column>
                </el-table>
                <div style="padding:10px 0;">
                        <pagination></pagination> 
                </div>
                
              </panel>
            </section>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "name",
  data() {
    return {
      onoff: true,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isShow: true,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          isShow: false,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          isShow: false,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          isShow: true,
        }
      ],
      currentRow: null,

      infoList: [
        { title: "父机构", value: "", prop: "gameCode" },
        { title: "周期类型", value: "", prop: "cycleType" },
        { title: "游戏状态", value: "", prop: "gameStatus" },
        { title: "游戏名称", value: "", prop: "gameName" },
        { title: "游戏类型", value: "", prop: "officialEndSale" }
      ],
      options: [
        {
          value: "选项1",
          label: "刷新"
        },
        {
          value: "选项2",
          label: "添加机构"
        },
        {
          value: "选项3",
          label: "添加部门"
        },
        {
          value: "选项3",
          label: "展开所有"
        }
      ],
      value: "",
      data: [
        {
          id: 1,
          label: "中福彩",
          children: [
            {
              id: 4,
              label: "广东省",
              children: [
                {
                  id: 9,
                  label: "广州市"
                },
                {
                  id: 10,
                  label: "佛山市"
                },
                {
                  id: 11,
                  label: "深圳市"
                },
                {
                  id: 12,
                  label: "东莞市"
                },
                {
                  id: 13,
                  label: "惠州市"
                }
              ]
            },
            {
              id: 5,
              label: "河南省",
              children: [
                {
                  id: 14,
                  label: "郑州市"
                },
                {
                  id: 15,
                  label: "洛阳市"
                },
                {
                  id: 16,
                  label: "南阳市"
                },
                {
                  id: 17,
                  label: "汝阳市"
                },
                {
                  id: 18,
                  label: "驻马店市"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "体育彩票",
          children: [
            {
              id: 4,
              label: "广东省",
              children: [
                {
                  id: 9,
                  label: "广州市"
                },
                {
                  id: 10,
                  label: "佛山市"
                },
                {
                  id: 11,
                  label: "深圳市"
                },
                {
                  id: 12,
                  label: "东莞市"
                },
                {
                  id: 13,
                  label: "惠州市"
                }
              ]
            },
            {
              id: 5,
              label: "河南省",
              children: [
                {
                  id: 14,
                  label: "郑州市"
                },
                {
                  id: 15,
                  label: "洛阳市"
                },
                {
                  id: 16,
                  label: "南阳市"
                },
                {
                  id: 17,
                  label: "汝阳市"
                },
                {
                  id: 18,
                  label: "驻马店市"
                }
              ]
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  components: {},
  methods: {
    change(val) {
      console.log(val)
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
     handleClick() {
        alert('button click');
      },
      handele(val){
         this.$message('click on item ' + val);
      }
      
  }
};
</script>


<style lang="less">
@import "./less/index.less";
 .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
