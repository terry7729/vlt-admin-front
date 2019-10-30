<template>
  <div class="table-paging-comp" :class="'align-'+position" v-if="PAGESIZE < TOTAL">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 50]"
      :current-page="CURRENTPAGE"
      :page-size="PAGESIZE"
      :total="TOTAL"
      layout="total, sizes, prev, pager, next, jumper"
      >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'tablePaging',
    props: {
      // 位置
      position: {
        default: 'right'
      },
      total: { // 总页数
        type: Number,
        default: 0
      },
      currentPage: { // 当前页
        type: Number,
        default: 1
      },
      pageSize: { // 每页显示条数
        type: Number,
        default: 10 // 默认10条
      }
    },
    data() {
      return {
        CURRENTPAGE: this.currentPage,
        TOTAL: this.total,
        PAGESIZE: this.pageSize
      };
    },
    watch: {
      total(val) {
        this.TOTAL = val;
      },
      currentPage(val) {
        this.CURRENTPAGE = val;
      },
    },
    methods: {
      handleSizeChange(size) {
        this.PAGESIZE = size
        this.$emit('handleSizeChange', size)
      },
      handleCurrentChange(page) {
        this.CURRENTPAGE = page
        this.$emit('handleCurrentChange', page)
      }
    },

  }
</script>

<style lang="less" scoped>
  .table-paging-comp{
    padding: 10px;
    &.align-right{
      text-align: right;
    }
    &.align-center{
      text-align: center;
    }
    &.align-left{
      text-align: left;
    }
  }
</style>
