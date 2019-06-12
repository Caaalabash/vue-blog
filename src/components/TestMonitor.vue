<template>
  <main class="container">
    <el-table :data="tableData" style="width: 100%" v-bind="$attrs">
      <el-table-column v-for="column in thList" v-bind="column" />
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizeList"
      :page-size="currentPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </main>
</template>

<script>
  /**
   * el-table封装筛选和分页功能
   * @see 用于: 物品异常产出监控页
   * @prop {Array} sourceData 源数据, 通常为后端返回的所有数据, 所有不作为props识别的属性将作为 Table Attributes 绑定
   * @prop {Array} thList 表头信息数组, 其中每个对象都将作为 Table-column Attributes 绑定
   * @prop {Function} filterFn 过滤函数, 默认不过滤
   * @prop {Boolean} autonomy 是否自治, 如果为否, 翻页/调整页数大小时分别emit pageChange/sizeChange事件
   */
  export default {
    name: 'TestMonitor',
    props: {
      sourceData: {
        type: Array,
        default: () => Array.from({ length: 100 }, (v, idx) => ({ value: idx, group: idx % 4 }))
      },
      thList: {
        type: Array,
        default: () => [
          {
            label: '属性1',
            prop: 'value',
            width: 360
          },
          {
            label: '属性2',
            prop: 'group'
          }
        ]
      },
      autonomy: {
        type: Boolean,
        default: true
      },
      tableOptions: {
        type: Object,
        default: () => {  }
      },
      filterFn: {
        type: Function,
        default: row => row.group === 1
      }
    },
    data: () => ({
      currentPage: 1,
      currentPageSize: 30,
      pageSizeList: [10, 30, 60, 100]
    }),
    computed: {
      total() {
        return this.sourceData.length
      },
      tableData() {
        const start = (this.currentPage - 1) * this.currentPageSize
        return this.sourceData.filter(this.filterFn).slice(start, start + this.currentPageSize)
      }
    },
    methods: {
      handleSizeChange(size) {
        if (!this.autonomy) {
          this.$emit('sizeChange', size)
          return
        }
        this.currentPageSize = size
      },
      handleCurrentChange(value) {
        if (!this.autonomy) {
          this.$emit('pageChange', value)
          return
        }
        this.currentPage = value
      }
    }
  }
</script>

<style scoped>

</style>