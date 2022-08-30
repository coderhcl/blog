<template>
  <div class="history">
    <h1>网站更新日志</h1>
    <div class="history_container">
      <el-timeline>
        <el-timeline-item
          v-for="item in historyList"
          :key="item.id"
          :timestamp="parseDate(item.date, 'YYYY-MM-DD')"
          placement="top"
          center
        >
          <el-card>
            <p>{{ item.describe }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import { getHistory } from '../api/index.ts'
import { parseDate } from '../utils/parsedate'

onMounted(() => {
  getHistoryList()
})
const historyList = ref()
const getHistoryList = async () => {
  const data = await getHistory()
  historyList.value = data
}
</script>

<style scoped>
.history {
  background-color: #ffff;
  padding: 20px;
}
.history_container {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
}

.el-card {
  width: 700px;
}
.el-card p {
  line-height: 30px;
  font-size: 18px;
}
.el-card:hover {
  background-color: #37c089;
  color: #ffff;
  transition: all 0.4s;
  transform: scale(1.02, 1.02);
}
</style>
