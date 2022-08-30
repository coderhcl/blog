<template>
  <div class="container_box">
    <!-- 头部 -->
    <b-header></b-header>
    <!-- 中间 -->
    <div class="container">
      <!-- 侧边栏 -->
      <div class="sideInfo">
        <side-info></side-info>
      </div>
      <!-- view视图 -->
      <div class="container_list">
        <nuxt-page></nuxt-page>
      </div>
    </div>
    <!-- 底部 -->
    <b-footer></b-footer>
  </div>
</template>

<script setup>
import {} from 'vue'
import BHeader from './BHeader.vue'
import BFooter from './BFooter.vue'
import SideInfo from '../components/SideInfo.vue'
</script>

<style scoped>
.container_box {
  background-color: #f5f6fa;
}
.container {
  width: 1320px;
  display: flex;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
.sideInfo {
  width: 340px;
  margin: 10px;
}
.container_list {
  flex: 1;
  margin: 10px;
}
</style>
