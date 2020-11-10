<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true">
      <el-autocomplete
        v-model="searchObj.name"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        class="inline-input"
        placeholder="讲师"
        value-key="name"
      />

      <el-form-item>
        <el-select v-model="searchObj.level" clearable placeholder="头衔">
          <el-option value="1" label="高级讲师"/>
          <el-option value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="入驻时间">
        <el-date-picker
          v-model="searchObj.joinDateBegin"
          placeholder="开始时间"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker
          v-model="searchObj.joinDateEnd"
          placeholder="结束时间"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
        <el-button type="danger" @click="removeBatch()">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="list"
      border
      stripe
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        type="index"
        label="#"
        width="50">
        <template slot-scope="scope">
          {{ (page - 1 ) * limit + scope.$index +1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="80" />
      <el-table-column prop="level" label="头衔" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level === 1" type="warning">高级讲师</el-tag>
          <el-tag v-if="scope.row.level === 2" type="danger">首席讲师</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="资历" />
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column prop="joinDate" label="入驻时间" width="160" />
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini">编辑</el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            @click="removeById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table-column></el-table>
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size ="limit"
      :page-sizes="[1,5,10,15,20]"
      :size-change="limit"
      style="padding: 30px 0"
      layout="total,prev, pager, next,sizes,->,jumper"
      @current-change="changeCurrentPage"
      @size-change="changPageSzie"/>
  </div>
</template>

<script>
import teacherApi from '@/api/teacher'
export default {
  // 定义数据模型
  data() {
    return {
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 5, // 每页记录数
      searchObj: {}, // 查询条件
      multipleSelection: []// 批量删除选中的记录列表
    }
  },

  // 页面渲染成功后获取数据
  created() {
    this.fetchData()
  },

  // 定义方法
  methods: {
    fetchData() {
      // 调用api
      teacherApi.PageList(this.page, this.limit, this.searchObj).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    // 改变页码
    changeCurrentPage(page) {
      console.log('page=' + this.page)
      this.page = page
      this.fetchData()
    },
    // 改变页面记录数
    changPageSzie(limit) {
      this.limit = limit
      this.fetchData()
    },
    // 清空查询条件
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },
    // 删除
    removeById(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 确定
        .then(() => {
          teacherApi.removeById(id).then(response => {
          // 刷新页面
            this.fetchData()
            this.$message({
              message: response.message,
              type: 'success'
            })
          })
        })
      // 取消删除
        .catch((err) => {
          if (err === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        })
    },
    // 当选择框发生变化 触发该方法
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },
    removeBatch() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择要删除的记录！')
        return
      }

      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // 确定
        .then(() => {
          // 定义一个List
          const idList = []
          // 循环遍历 将值存入list
          this.multipleSelection.forEach(item => {
            idList.push(item.id)
          })
          teacherApi.removeBatch(idList)
            .then(response => {
            // 刷新页面
              this.fetchData()
              this.$message({
                message: response.message,
                type: 'success'
              })
            })
        })
        // 取消删除
        .catch((err) => {
          if (err === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        })
    },
    querySearch(queString, callback) {
      teacherApi.selectListBykey(queString).then(response => {
        callback(response.data.nameList)
      })
    }
  }
}
</script>
