<template>
  <!-- 添加和修改章节表单 -->
  <el-dialog :visible="dialogVisible" title="添加章节" @close="close()">
    <el-form :model="chapter" label-width="120px">
      <el-form-item label="章节标题">
        <el-input v-model="chapter.title"/>
      </el-form-item>
      <el-form-item label="章节排序">
        <el-input-number v-model="chapter.sort" :min="0"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close()">取 消</el-button>
      <el-button type="primary" @click="saveOrUpdate()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import chapterApi from '@/api/chapter'
// 引入组件
import ChapterForm from '@/views/course/components/Chapter/Form'
export default {
  components: { ChapterForm },
  data() {
    return {
      dialogVisible: false, // 是否显示对话框
      chapter: { // 章节对象
        sort: 0
      }
    }
  },

  methods: {
    // 开启对话框
    open(chapterId) {
      this.dialogVisible = true
      if (chapterId) {
        chapterApi.getById(chapterId).then(response => {
          this.chapter = response.data.item
        })
      }
    },
    // 关闭对话框
    close() {
      this.dialogVisible = false
      this.resetForm()
    },
    // 重置表单 还原到之前的状态
    resetForm() {
      this.chapter = {
        sort: 0 }
    },
    saveOrUpdate() {
      // 如果没有id 则保存
      if (!this.chapter.id) {
        this.save()
      } else {
        this.update()
      }
    },

    save() {
      this.chapter.courseId = this.$parent.$parent.courseId
      chapterApi.save(this.chapter).then(res => {
        // 返回信息
        this.$message.success(res.message)
        // 关闭组件
        this.close()
        // 刷新
        this.$parent.fetchNodeList()
      })
    },

    update() {
      chapterApi.updateById(this.chapter).then(res => {
        this.$message.success(res.message)
        // 关闭组件
        this.close()
        // 刷新
        this.$parent.fetchNodeList()
      })
    }
  }
}
</script>

<style scoped>

</style>
