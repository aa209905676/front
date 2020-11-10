<template>
  <div class="app-container" >
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"/>
    <el-tree
      ref="tree"
      :data="subjectList"
      :props="defaultProps"
      :filter-node-method="filterNode"
    />
  </div>
</template>

<script>
import subjectApi from '@/api/subject'

export default {
  data() {
    return {
      filterText: '', // 过滤文本
      subjectList: [], // 数据列表
      defaultProps: {// 属性列表数据属性的key
        children: 'children',
        label: 'title'
      }
    }
  },
  // 监听 filterText 的变化 val作为参数，被filterNode调用
  watch: {
    filterText(val) {
      // console.log('监听')
      this.$refs.tree.filter(val)
    }
  },

  created() {
    this.fetchNodeList()
  },
  methods: {
    fetchNodeList() {
      subjectApi.getNestedTreeList().then(response => {
        this.subjectList = response.data.items
      })
    },
    // 过滤节点
    filterNode(value, data) {
      if (!value) return true
      // 转小写 作用是为了忽略大小写
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  }
}
</script>

<style scoped>

</style>
