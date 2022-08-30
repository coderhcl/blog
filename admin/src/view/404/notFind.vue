<template>
  <div class="not_find">
    <img src="../../assets/404.png" alt="404 not-find" />
    <el-result
      icon="error"
      title="未查询到该页面"
      sub-title="请检查访问地址或点击返回页面"
    >
      <template #extra>
        <el-button type="primary" @click="toHome">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const toHome = () => {
  router.push('/home')
}
</script>

<style scoped>
.not_find {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 300px;
}
.not_find img {
  width: 400px;
  height: 400px;
}
</style>
