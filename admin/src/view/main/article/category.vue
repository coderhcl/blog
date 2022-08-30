<template>
  <div class="category_container">
    <div class="card_left">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>添加分类</span>
          </div>
        </template>
        <el-form
          label-width="70px"
          :rules="rules"
          :model="categoryData"
          ref="categoryRef"
        >
          <el-form-item label="分类名" prop="categoryname">
            <el-input v-model="categoryData.categoryname" />
          </el-form-item>
          <el-button type="success" @click="addCategory">保存</el-button>
        </el-form>
      </el-card>
    </div>
    <div class="card_right">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>所有分类</span>
          </div>
        </template>
        <el-tag
          class="category"
          closable
          type="success"
          v-for="item in categoryList"
          :key="item.id"
          @close="handleClose(item.id)"
        >
          {{ item.categoryname }}
        </el-tag>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import rules from './config/category.rules'
import {
  getCategory,
  deleteCategoryById,
  createCategory,
} from '../../../api/category.api'
import { onMounted, reactive, ref } from 'vue'
import { catecoryType } from './config/types'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'

onMounted(() => {
  getCategoryList()
})

// 获取分类数据
let categoryList = ref<Array<catecoryType>>()
const getCategoryList = async () => {
  const data: any = await getCategory()
  categoryList.value = data
}

const categoryData = reactive({
  categoryname: '',
})
const categoryRef = ref<FormInstance>()
const addCategory = () => {
  categoryRef.value?.validate(async (valid) => {
    if (valid) {
      const data: any = await createCategory(categoryData)
      if (data.message) {
        ElMessage({
          type: 'success',
          message: data.message,
        })
      }
      getCategoryList()
      categoryData.categoryname = ''
    }
  })
}

// 删除分类数据
const handleClose = async (id: number) => {
  ElMessageBox.confirm('你确定要删除该分类吗', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const data = await deleteCategoryById(id)
      getCategoryList()
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
</script>

<style scoped>
.category_container {
  display: flex;
}
.card_left {
  width: 380px;
}
.card_right {
  margin: 0 10px;
  flex: 1;
}
.category {
  height: 30px;
  margin: 5px;
}
</style>
