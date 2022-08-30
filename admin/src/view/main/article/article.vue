<template>
  <div class="article_container">
    <div class="container_top">
      <el-button type="success" @click="toAddArticle">新建文章</el-button>
      <div class="search">
        <el-form :inline="true" ref="searchRef">
          <el-form-item label="标题">
            <el-input
              placeholder="请输入标题"
              v-model="searchInputData.title"
            />
          </el-form-item>
          <el-form-item label="状态">
            <el-select placeholder="选择状态" v-model="searchInputData.status">
              <el-option label="已发布" value="已发布" />
              <el-option label="草稿" value="草稿" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetInput">重置</el-button>
            <el-button type="success" @click="getSearchData">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="article_table">
      <el-table :data="articleData" style="width: 100%">
        <el-table-column prop="title" label="标题" align="center" width="300" />
        <el-table-column
          prop="category"
          label="分类"
          align="center"
          width="150"
        >
          <template #default="scope">
            <el-tag>{{ scope.row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签" align="center" width="180">
          <template #default="scope">
            <div
              v-for="item in scope.row.tags.split('-')"
              :key="item"
              class="tag"
            >
              <el-tag type="warning">{{ item }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="150">
          <template #default="scope">
            <el-tag
              :type="scope.row.status == '已发布' ? 'success' : 'danger'"
              >{{ scope.row.status }}</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column
          prop="isTop"
          label="是否置顶"
          align="center"
          width="150"
        >
          <template #default="scope">
            <el-switch
              @click="handleIsTop(scope.row)"
              v-model="scope.row.isTop"
              inline-prompt
              active-text="是"
              inactive-text="否"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="发布时间"
          align="center"
          :formatter="formatDate"
          width="180"
        />
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="editArticle(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="warning"
              size="small"
              @click="removeArticle(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        v-model:currentPage="pagination.page"
        :page-size="pagination.size"
        background="true"
        layout="total, prev, pager, next"
        :total="pagination.total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import {
  deleteArticle,
  getArticleAndSelect,
  updateArticle,
} from '../../../api/article.api'
import { parseDate } from '../../../utils/parsedate'
import { articleDataType } from './config/types'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
onMounted(() => {
  getArticleList()
})
const router = useRouter()
const toAddArticle = () => {
  router.push('/management/addatricle')
}
let articleData = ref<Array<articleDataType>>([])

let searchInputData = reactive({
  title: '',
  status: '',
})

const pagination = reactive({
  page: 1,
  size: 5,
  total: 0,
})
const searchRef = ref<FormInstance>()
const resetInput = () => {
  searchInputData.title = ''
  searchInputData.status = ''
  getArticleList()
}
// 搜索
const getSearchData = async () => {
  if (!searchInputData.title && !searchInputData.status) {
    ElMessage({
      type: 'warning',
      message: '请输入搜索标题',
    })
    return
  }

  const data: any = await getArticleAndSelect({
    title: searchInputData.title,
    status: searchInputData.status,
    page: pagination.page,
    size: pagination.size,
  })
  articleData.value = data.data
  pagination.total = data.total
}
const handleCurrentChange = (val: number) => {
  pagination.page = val
  getArticleList()
}

const getArticleList = async () => {
  const data: any = await getArticleAndSelect({
    title: searchInputData.title,
    ststus: searchInputData.status,
    page: pagination.page,
    size: pagination.size,
  })
  articleData.value = data.data
  pagination.total = data.total
}

const formatDate = (row: any) => {
  return parseDate(row.created_at)
}
const editArticle = (row: any) => {
  router.push({
    name: 'addAndEdit',
    params: row,
  })
}
const handleIsTop = async (row: any) => {
  const data: any = await updateArticle(row.id, row)
  if (data.message) {
    ElMessage({
      type: 'success',
      message: '操作成功',
    })
  }
  getArticleList()
}

const removeArticle = async (row: any) => {
  ElMessageBox.confirm(`你确定要删除${row.title}吗`, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const data: any = await deleteArticle(row.id)
      getArticleList()
      if (data.message) {
        ElMessage({
          type: 'success',
          message: data.message,
        })
      }
    })
    .catch((res) => {
      ElMessage({
        type: 'info',
        message: '操作已取消',
      })
    })
}
</script>

<style scoped>
.article_container {
  /* height: 100%; */
  width: 100%;
  background-color: #fff;
  padding: 20px;
}
.search {
  line-height: 50px;
}
.container_top {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search .el-select {
  width: 140px;
}
.article_table {
  margin-top: 10px;
}
.pagination {
  float: right;
  margin: 25px;
}
.tag {
  float: left;
  margin: 5px;
}
</style>
