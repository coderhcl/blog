<template>
  <div>
    <div class="histry_container">
      <div class="add_history">
        <el-button type="success" plain class="btn" @click="openDialog"
          >添加事件</el-button
        >
      </div>

      <div class="history_table">
        <el-table stripe :data="historyData" style="width: 100%" border>
          <el-table-column
            prop="date"
            sortable
            label="日期"
            align="center"
            :formatter="formatDate"
          />
          <el-table-column prop="describe" label="事件" align="center" />
          <el-table-column fixed="right" label="操作" align="center">
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                @click="editHistory(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="warning"
                size="small"
                @click="removeHistory(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 添加 -->
    <el-dialog v-model="addHistoryVisible" title="添加事件" width="500px">
      <el-form :model="addHistoryFormData" :rules="rules" ref="addHistoryRef">
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="addHistoryFormData.date"
            type="date"
            placeholder="选择时间"
          />
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input
            v-model="addHistoryFormData.describe"
            type="textarea"
            placeholder="请输入事件"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addHistoryVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAddHistory"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog v-model="editHistoryVisible" title="编辑事件" width="500px">
      <el-form :model="editHistoryFormData" :rules="rules" ref="editHistoryRef">
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="editHistoryFormData.date"
            type="date"
            placeholder="选择时间"
          />
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input
            v-model="editHistoryFormData.describe"
            type="textarea"
            placeholder="请输入事件"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editHistoryVisible = false">取消</el-button>
          <el-button type="primary" @click="handlEditHistory()">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import {
  getHistory,
  createHistory,
  deleteHistoryById,
  updateHistory,
} from '../../../api/history.api'
import { historyType } from './config/types'
import { parseDate } from '../../../utils/parsedate'
import rules from './config/history.rules'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
onMounted(() => {
  getHistoryList()
})

let historyData = ref<Array<historyType>>([])

const getHistoryList = async () => {
  const data: any = await getHistory()
  historyData.value = data
}

const formatDate = (row: any) => {
  return parseDate(row.date, 'YYYY-MM-DD')
}

const addHistoryRef = ref<FormInstance>()
const addHistoryVisible = ref(false)
const addHistoryFormData = reactive({
  date: '',
  describe: '',
})
const openDialog = () => {
  addHistoryFormData.describe = ''
  addHistoryVisible.value = true
}
const handleAddHistory = () => {
  addHistoryFormData.describe = addHistoryFormData.describe.trim()
  addHistoryRef.value?.validate(async (valid) => {
    if (valid) {
      const data: any = await createHistory(addHistoryFormData)
      getHistoryList()
      addHistoryVisible.value = false
      if (data.message) {
        ElMessage({
          type: 'success',
          message: data.message,
        })
      }
      addHistoryFormData.date = ''
      addHistoryFormData.describe = ''
    }
  })
}

const removeHistory = async (row: any) => {
  ElMessageBox.confirm(`你确定要删除该事件吗`, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const data = await deleteHistoryById(row.id)

      getHistoryList()
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

const editHistoryVisible = ref(false)
const editHistoryFormData = reactive({
  id: '',
  date: '',
  describe: '',
})
const editHistory = (row: any) => {
  editHistoryVisible.value = true
  editHistoryFormData.id = row.id
  editHistoryFormData.date = row.date
  editHistoryFormData.describe = row.describe
}
const editHistoryRef = ref<FormInstance>()

const handlEditHistory = () => {
  editHistoryFormData.describe = editHistoryFormData.describe.trim()
  editHistoryRef.value?.validate(async (valid) => {
    if (valid) {
      const data: any = await updateHistory(+editHistoryFormData.id, {
        date: editHistoryFormData.date,
        describe: editHistoryFormData.describe,
      })
      getHistoryList()
      editHistoryVisible.value = false
      editHistoryFormData.describe = ''
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
.add_history {
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
.history_table {
  margin-top: 5px;
  height: 100%;
}
</style>
