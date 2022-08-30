<template>
  <div class="tag_container">
    <div class="add_tag">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>添加标签</span>
          </div>
        </template>
        <el-form :model="tagFormData" :rules="rules" ref="tagRef">
          <el-form-item label="标签名" prop="tagname">
            <el-input v-model="tagFormData.tagname" />
          </el-form-item>
        </el-form>
        <el-button type="success" class="savebtn" @click="addTag">
          保存
        </el-button>
      </el-card>
    </div>
    <div class="tag_list">
      <el-card class="tag_card">
        <template #header>
          <div class="card-header">
            <span>所有标签</span>
          </div>
        </template>
        <el-tag
          class="tag_item"
          closable
          type="warning"
          v-for="item in tagList"
          :key="item.id"
          @close="removeTag(item)"
        >
          {{ item.tagname }}
        </el-tag>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { getTag } from '../../../api/tag.api'
import { creaeTag, updateTag, deleteTagById } from '../../../api/tag.api'
import { tagType } from './config/types'
import rules from './config/tag.rules'

onMounted(() => {
  getTagList()
})

const tagList = ref<Array<tagType>>()
const getTagList = async () => {
  const data: any = await getTag()
  tagList.value = data
}

const tagFormData = reactive({
  tagname: '',
})
const tagRef = ref<FormInstance>()
const addTag = () => {
  tagRef.value?.validate(async (valid) => {
    if (valid) {
      const data: any = await creaeTag(tagFormData)
      getTagList()
      tagFormData.tagname = ''
      if (data.message) {
        ElMessage({
          type: 'success',
          message: data.message,
        })
      }
    }
  })
}

const editTagFormData = reactive({
  id: '',
  tagname: '',
})
const editTagVisible = ref(false)
const handleEditTag = async (data: any) => {
  editTagVisible.value = true
  editTagFormData.id = data.id
  editTagFormData.tagname = data.tagname
}

const editTagRef = ref<FormInstance>()
const handleUpdateTag = () => {
  editTagRef.value?.validate(async (valid) => {
    if (valid) {
      const data: any = await updateTag(+editTagFormData.id, {
        tagname: editTagFormData.tagname,
      })
      getTagList()
      editTagFormData.tagname = ''
      editTagVisible.value = false
      if (data.message) {
        ElMessage({
          type: 'success',
          message: data.message,
        })
      }
    }
  })
}

const removeTag = async (tagItem: any) => {
  ElMessageBox.confirm(`你确定要删除 ${tagItem.tagname} 标签吗`, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const data = await deleteTagById(tagItem.id)
      getTagList()
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
.tag_container {
  width: 100%;
  display: flex;
}
.add_tag {
  width: 380px;
  padding: 10px;
}
.tag_list {
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  /* background-color: aqua; */
}
.tag_card {
  width: 100%;
  margin: 10px;
}
.savebtn {
  margin-left: 10px;
}
.tag_item {
  height: 30px;
  margin: 5px;
}
</style>
