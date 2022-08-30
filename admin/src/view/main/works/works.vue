<template>
  <div>
    <div class="histry_container">
      <div class="add_Works">
        <el-button type="success" plain class="btn" @click="openDialog"
          >添加作品</el-button
        >
      </div>

      <div class="works_table">
        <el-table :data="worksData" style="width: 100%">
          <el-table-column prop="name" label="名称" align="center" />
          <el-table-column prop="desc" label="描述" align="center" />
          <el-table-column
            prop="imgUrl"
            label="封面"
            align="center"
            width="300"
          >
            <template #default="scope">
              <el-image :src="scope.row.imgUrl" />
            </template>
          </el-table-column>

          <el-table-column
            prop="sourceUrl"
            label="源码链接"
            align="center"
            width="300"
          />

          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="150"
          >
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                @click="editWorks(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="warning"
                size="small"
                @click="removeWorks(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 添加 -->
    <el-dialog v-model="addWorksVisible" title="添加事件" width="500px">
      <el-form :model="addWorksFormData" :rules="rules" ref="addWorksRef">
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="addWorksFormData.name"
            placeholder="请输入作品名称"
          />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input
            v-model="addWorksFormData.desc"
            type="textarea"
            placeholder="请输入作品描述"
          />
        </el-form-item>
        <el-form-item label="封面" prop="imgUrl">
          <el-input
            v-model="addWorksFormData.imgUrl"
            placeholder="请输入封面url"
          />
        </el-form-item>
        <el-form-item label="链接" prop="sourceUrl">
          <el-input
            v-model="addWorksFormData.sourceUrl"
            placeholder="请输入作品链接url"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addWorksVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAddWorks"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog v-model="editWorksVisible" title="编辑事件" width="500px">
      <el-form :model="editWorksFormData" :rules="rules" ref="editWorksRef">
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="editWorksFormData.name"
            placeholder="请输入作品名称"
          />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input
            v-model="editWorksFormData.desc"
            type="textarea"
            placeholder="请输入作品描述"
          />
        </el-form-item>
        <el-form-item label="封面" prop="imgUrl">
          <el-input
            v-model="editWorksFormData.imgUrl"
            placeholder="请输入作品封面url地址"
          />
        </el-form-item>
        <el-form-item label="链接地址" prop="sourceUrl">
          <el-input
            v-model="editWorksFormData.sourceUrl"
            placeholder="请输入作品链接url地址"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editWorksVisible = false">取消</el-button>
          <el-button type="primary" @click="handlEditWorks()"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import {
  getWorks,
  createdWorks,
  deleteWorksById,
  updateWorks,
} from '../../../api/Works.api'
import { worksType } from './config/types'
import { parseDate } from '../../../utils/parsedate'
import rules from './config/works.rules'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
onMounted(() => {
  getWorksList()
})

let worksData = ref<Array<worksType>>([])

const getWorksList = async () => {
  const data: any = await getWorks()
  console.log('data', data)
  worksData.value = data.data
}

const addWorksRef = ref<FormInstance>()
const addWorksVisible = ref(false)
const addWorksFormData = reactive({
  name: '',
  desc: '',
  imgUrl: '',
  sourceUrl: '',
})
const openDialog = () => {
  addWorksVisible.value = true
}
const handleAddWorks = () => {
  // addWorksFormData.describe = addWorksFormData.describe.trim()
  addWorksFormData.name = addWorksFormData.name.trim()
  addWorksFormData.desc = addWorksFormData.desc.trim()
  addWorksFormData.imgUrl = addWorksFormData.imgUrl.trim()
  addWorksFormData.sourceUrl = addWorksFormData.sourceUrl.trim()
  addWorksRef.value?.validate(async (valid) => {
    if (valid) {
      const data: any = await createdWorks(addWorksFormData)
      getWorksList()
      addWorksVisible.value = false
      if (data.message) {
        ElMessage({
          type: 'success',
          message: data.message,
        })
      }
      addWorksFormData.name = ''
      addWorksFormData.desc = ''
      addWorksFormData.imgUrl = ''
      addWorksFormData.sourceUrl = ''
    }
  })
}

const removeWorks = async (row: any) => {
  ElMessageBox.confirm(`你确定要删除该作品吗`, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const data = await deleteWorksById(row.id)

      getWorksList()
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch((res) => {
      ElMessage({
        type: 'info',
        message: '操作已取消',
      })
    })
}

const editWorksVisible = ref(false)
const editWorksFormData = reactive({
  id: '',
  name: '',
  desc: '',
  imgUrl: '',
  sourceUrl: '',
})
const editWorks = (row: any) => {
  editWorksVisible.value = true
  editWorksFormData.id = row.id
  editWorksFormData.name = row.name
  editWorksFormData.desc = row.desc
  editWorksFormData.imgUrl = row.imgUrl
  editWorksFormData.sourceUrl = row.sourceUrl
}
const editWorksRef = ref<FormInstance>()

const handlEditWorks = () => {
  editWorksFormData.name = editWorksFormData.name.trim()
  editWorksFormData.desc = editWorksFormData.desc.trim()
  editWorksFormData.imgUrl = editWorksFormData.imgUrl.trim()
  editWorksFormData.sourceUrl = editWorksFormData.sourceUrl.trim()
  editWorksRef.value?.validate(async (valid) => {
    if (valid) {
      const data: any = await updateWorks(+editWorksFormData.id, {
        name: editWorksFormData.name,
        desc: editWorksFormData.desc,
        imgUrl: editWorksFormData.imgUrl,
        sourceUrl: editWorksFormData.sourceUrl,
      })
      getWorksList()
      editWorksVisible.value = false
      editWorksFormData.name = ''
      editWorksFormData.desc = ''
      editWorksFormData.imgUrl = ''
      editWorksFormData.sourceUrl = ''
      if (data.message) {
        ElMessage({
          type: 'success',
          message: data.message,
        })
      }
    }
  })
}
</script>

<style scoped>
.add_Works {
  background-color: #ffff;
  height: 50px;
  padding: 5px;
  display: flex;
  align-items: center;
}
.btn {
  margin-left: 5px;
  height: 40px;
}
.works_table {
  margin-top: 5px;
  height: 100%;
}
.works_table .el-image {
  height: 140px;
  width: 260px;
  border-radius: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
