<template>
  <div class="vlt-card">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="资源采购" name="1">
        <panel title="基本信息" :show="true" style="margin-bottom:15px">
          <div class="vlt-edit-single">
            <div class="vlt-edit-wrap">
              <base-form :formData="formData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
            </div>
          </div>
        </panel>
        <panel title="采购物品" :show="true" style="margin-bottom:15px">
          <div class="tr">
            <el-button type="primary" size="small" @click="addGoods">导入</el-button>
          </div>
          <div class="table-wrap">
            <el-table :data="tableData" border class="table">
              <el-table-column label="序号" fixed  type="index" width="60px"></el-table-column>
              <el-table-column label="物品名称" min-width="160px">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.goodsId" filterable placeholder="请选择">
                    <el-option
                      v-for="(item, index) in scope.row.options"
                      :key="item.value"
                      @click.native="changeGoods(scope, index)"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="物品型号" min-width="160px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.model" placeholder="请输入型号"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="物品序列号" min-width="200px">
                <template slot-scope="scope">
                  <el-input type="textarea"
                    :rows="2" v-model="scope.row.searl" placeholder="请输入序列号"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="物品数量（大）" min-width="160px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.max" placeholder="请输入数量"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="物品数量（小）" min-width="160px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.min" placeholder="请输入数量"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="单价（元）" min-width="100px">
                <template slot-scope="scope">
                  {{scope.row.price}}
                </template>
              </el-table-column>
              <el-table-column label="金额（元）" min-width="100px">
                <template slot-scope="scope">
                  {{scope.row.money}}
                </template>
              </el-table-column>
              <el-table-column label="备注" min-width="200px">
                <template slot-scope="scope">
                  <el-input
                    placeholder="请输入备注"
                    v-model="scope.row.remark">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="80px">
                <template slot-scope="scope">
                  <i class="el-icon-delete delete" @click="deleteGoods(scope.$index)"></i>
                </template>
              </el-table-column>
            </el-table>
            <el-button class="addGoods" @click="addGoods" icon="el-icon-plus">新增物品</el-button>
          </div>
          <div class="vlt-edit-single">
            <div class="vlt-edit-wrap">
              <base-form :formData="totalData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
            </div>
          </div>
        </panel>
        <panel title="其他附件" :show="true" style="margin-bottom:15px">
          <el-form label-position="right" 
            label-width="90px" 
            ref="form"
            class="device-form">
            <el-form-item  label="附件上传">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </panel>
        <div class="submit-wrap">
          <el-row class="vlt-edit-btn">
            <el-button type="primary" size="medium" @click="submit">提交并保存</el-button>
            <el-button size="medium" @click="editShow = !editShow">取消</el-button>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="资源采购流程图" name="2">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
const resourceData =  [{
          value: '选项1',
          label: '黄金糕',
          price: '1'
        }, {
          value: '选项2',
          label: '双皮奶',
          price: '2'
        }, {
          value: '选项3',
          label: '蚵仔煎',
          price: '3'
        }, {
          value: '选项4',
          label: '龙须面',
          price: '4'
        }, {
          value: '选项5',
          label: '北京烤鸭',
          price: '5'
        }];
export default {
  name: "",
  data() {
    return {
      totalData: [
        {title:'合计金额', type: 'input', prop: 'title', value: '', disabled: true},
        {title:'采购说明', type: 'textarea', prop: 'title', value: ''},
      ],
      formData: [
        {title:'申请标题', type: 'input', prop: 'title', value: ''},
        {title:'入库仓库', type: 'select', prop: 'pull', value: '', options:[{label:'仓库一',value:'1'},{label:'仓库二',value:'2'}]},
        {title:'采购员', type: 'input', prop: 'name', value: ''},
        {title:'到货日期', type: 'datepicker', prop: 'date', value: ''},
      ],
      tableData: [
        {goodsId:'', options:resourceData,model:'',searl:'', min:'', max:'',price:'0',money:'0',remark:''}
      ],
      tableForm: [
        {goodsId:'',model: '',number:'',price:'',money:'',remark:''}
      ],
      activeName: '1',
      rules: {},
    }
  },
  watch: {
    tableData: {
      handler(newValue, oldValue) {
        // this.$emit("change", this.form)
        console.log('监听table的数据变化', newValue)
        // 计算价格
        newValue.forEach(item => {
          item.money = item.number*item.price;
        });
        let res = JSON.parse(JSON.stringify(newValue));
        let params = []
        res.forEach((item)=>{
          // 删除不需要的参数
          delete item.options
          // 保留你需要的参数
          // let param = (({goodsId, searl, max, min, price, money, remark}) =>({goodsId, searl, max, min, price, money, remark}))(item);
          params.push(item)
        })
        console.log('params', params)
      },
      // 深度监听 监听对象，数组的变化
      deep: true
    },
  },
  methods: {
    select() {},
    changeGoods(val, index) {
      console.log(this.tableData, val.row, val.$index)
      val.row.price = val.row.options[index].price;
      val.row.number = 1;
    },
    deleteGoods(index) {
      this.tableData.splice(index, 1);
    },
    addGoods() {
      let obj = {
        goodsId: '', 
        options: resourceData,
        model: '',
        searl: '', 
        min: '', 
        max: '',
        price: '0',
        money: '0',
        remark: ''}
      this.$set(this.tableData, this.tableData.length, obj);
    },
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
.table-wrap{
  padding: 10px;
  text-align: center;
}
.addGoods{
  width: 100%;
  max-width: 490px;
  margin: 10px 0 30px 20px;
}
.delete{
  font-size: 22px;
}
.tr{
  padding: 10px 10px 0;
  text-align: right;
}
</style>
