<template>
  <div>
    <div class="link_container">
      <div class="top">
        <el-input
          placeholder="请输入友联名称"
          clearable
          class="search_input"
          v-model="searchData"
        />
        <el-button type="success" @click="searchInput">搜索</el-button>
        <el-button @click="resetLink">重置</el-button>
        <el-button type="success" @click="addLinkVisible = true">
          新建友联
        </el-button>
      </div>
      <div class="link_table">
        <el-table stripe :data="linkData" style="width: 100%">
          <el-table-column prop="avatar" label="logo" align="center">
            <template #default="scope">
              <el-avatar :src="scope.row.avatar"> </el-avatar>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" align="center" />
          <el-table-column prop="outline" label="简述" align="center" />
          <el-table-column prop="isValid" label="状态" align="center">
            <template #default="scope">
              <el-switch
                @click="handleSelectValid(scope.row)"
                v-model="scope.row.isValid"
                inline-prompt
                size="large"
                style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #dadada;
                "
                active-text="正常"
                inactive-text="其他"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="创建时间"
            align="center"
            :formatter="formatDate"
          />
          <el-table-column fixed="right" label="操作" align="center">
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                @click="editLink(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                type="warning"
                size="small"
                @click="removelink(scope.row)"
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
    <!-- 新建友链 -->
    <el-dialog v-model="addLinkVisible" title="添加友链" width="500px">
      <el-form :model="addLinkFormData" :rules="rules" ref="addLinkRef">
        <el-form-item label="网站logo" prop="avatar">
          <el-input
            v-model="addLinkFormData.avatar"
            placeholder="请输入网站logo"
          />
        </el-form-item>
        <el-form-item label="网站名称" prop="name">
          <el-input
            v-model="addLinkFormData.name"
            placeholder="请输入网站名称"
          />
        </el-form-item>
        <el-form-item label="网站URL" prop="url">
          <el-input
            v-model="addLinkFormData.url"
            placeholder="请输入网站链接"
          />
        </el-form-item>
        <el-form-item label="简述" prop="outline" label-width="75px">
          <el-input
            v-model="addLinkFormData.outline"
            type="textarea"
            placeholder="请输入简述"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addLinkVisible = false">取消</el-button>
          <el-button type="primary" @click="handlAddLink()"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 编辑友链 -->
    <el-dialog v-model="editLinkVisible" title="编辑友链" width="500px">
      <el-form :model="editLinkFormData" :rules="rules" ref="editLinkRef">
        <el-form-item label="网站logo" prop="avatar">
          <el-input
            v-model="editLinkFormData.avatar"
            placeholder="请输入网站logo"
          />
        </el-form-item>
        <el-form-item label="网站名称" prop="name">
          <el-input
            v-model="editLinkFormData.name"
            placeholder="请输入网站名称"
          />
        </el-form-item>
        <el-form-item label="网站URL" prop="url">
          <el-input
            v-model="editLinkFormData.url"
            placeholder="请输入网站链接"
          />
        </el-form-item>
        <el-form-item label="简述" prop="outline" label-width="75px">
          <el-input
            v-model="editLinkFormData.outline"
            type="textarea"
            placeholder="请输入简述"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editLinkVisible = false">取消</el-button>
          <el-button type="primary" @click="handleditLink()"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { linkType } from './config/types'
import {
  getLink,
  createdLink,
  deleteLinkById,
  updateLink,
} from '../../../api/link.api'
import { parseDate } from '../../../utils/parsedate'
import rules from './config/link.rules'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
onMounted(() => {
  getLinkList()
})

const linkData = ref<Array<linkType>>([])
// 获取
const pagination = reactive({
  page: 1,
  size: 7,
  total: 0,
})

const handleCurrentChange = (val: number) => {
  pagination.page = val
  getLinkList()
}

const getLinkList = async () => {
  const data: any = await getLink(
    searchData.value,
    pagination.page,
    pagination.size,
  )
  linkData.value = data.data
  pagination.total = data.total
}

const formatDate = (row: any) => {
  return parseDate(row.created_at)
}

const searchData = ref('')
const resetLink = () => {
  searchData.value = ''
  getLinkList()
}
// 通过名字查找
const searchInput = async () => {
  if (!searchData.value) {
    ElMessage({
      type: 'warning',
      message: '请输入友链名称',
    })
  }
  const data: any = await getLink(
    searchData.value,
    pagination.page,
    pagination.size,
  )
  pagination.total = data.total
  linkData.value = data.data
}
// 更新
const editLinkVisible = ref(false)
const editLinkFormData = reactive({
  id: '',
  name: '',
  avatar: '',
  url: '',
  outline: '',
})
const editLink = (row: any) => {
  editLinkVisible.value = true
  editLinkFormData.id = row.id
  editLinkFormData.avatar = row.avatar
  editLinkFormData.name = row.name
  editLinkFormData.outline = row.outline
  editLinkFormData.url = row.url
}
const editLinkRef = ref<FormInstance>()
const handleditLink = () => {
  editLinkFormData.name = editLinkFormData.name.trim()
  editLinkFormData.avatar = editLinkFormData.avatar.trim()
  editLinkFormData.url = editLinkFormData.url.trim()
  editLinkFormData.outline = editLinkFormData.outline.trim()
  editLinkRef.value?.validate(async (valid) => {
    if (valid) {
      const data: any = await updateLink(+editLinkFormData.id, {
        name: editLinkFormData.name,
        avatar: editLinkFormData.avatar,
        url: editLinkFormData.url,
        outline: editLinkFormData.outline,
      })
      getLinkList()
      editLinkVisible.value = false
      if (data.message) {
        ElMessage({
          type: 'success',
          message: data.message,
        })
      }
      editLinkFormData.name = ''
      editLinkFormData.avatar = ''
      editLinkFormData.url = ''
      editLinkFormData.outline = ''
    }
  })
}
// 点击更新状态
const handleSelectValid = async (row: any) => {
  const data: any = await updateLink(+row.id, row)
  if (data.message) {
    ElMessage({
      type: 'success',
      message: data.message,
    })
  }
}
//创建
const addLinkVisible = ref(false)
const addLinkFormData = reactive({
  name: '',
  avatar: '',
  url: '',
  outline: '',
})

const addLinkRef = ref<FormInstance>()
const handlAddLink = () => {
  addLinkFormData.name = addLinkFormData.name.trim()
  addLinkFormData.avatar = addLinkFormData.avatar.trim()
  addLinkFormData.url = addLinkFormData.url.trim()
  addLinkFormData.outline = addLinkFormData.outline.trim()
  addLinkRef.value?.validate(async (valid) => {
    if (valid) {
      const data: any = await createdLink(addLinkFormData)
      getLinkList()
      addLinkVisible.value = false
      if (data.message) {
        ElMessage({
          type: 'success',
          message: data.message,
        })
      }
      addLinkFormData.name = ''
      addLinkFormData.avatar = ''
      addLinkFormData.url = ''
      addLinkFormData.outline = ''
    }
  })
}
// 删除
const removelink = (row: any) => {
  ElMessageBox.confirm(`你确定要删除该友链吗`, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const data: any = await deleteLinkById(row.id)
      getLinkList()
      ElMessage({
        type: 'success',
        message: data.message,
      })
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
.link_container {
  background-color: #fff;
}
.top {
  display: flex;
  height: 40px;
  padding: 15px 10px 5px 10px;
}
.search_input {
  width: 200px;
  height: 30px;
  margin-right: 15px;
}
.link_table .el-table {
  border-top: 4px solid #f5f7f9;
}
.pagination {
  float: right;
  margin: 10px;
}
</style>
