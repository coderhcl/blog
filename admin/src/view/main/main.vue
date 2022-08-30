<template>
  <div>
    <el-container class="container">
      <el-aside class="aside" :width="isCollapse ? '65px' : '210px'">
        <Aside :collapse="isCollapse"></Aside>
      </el-aside>
      <el-container>
        <el-header class="header">
          <Header @FlodChange="handleFlodChange"></Header>
        </el-header>
        <el-main class="main">
          <transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <router-view />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Aside from './layout/Aside.vue'
import Header from './layout/Header.vue'
import 'animate.css'
const isCollapse = ref<boolean>(false)
const handleFlodChange = (isFlod: boolean) => {
  isCollapse.value = isFlod
}
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
}
.aside {
  background-color: #001428;
  height: 100%;
  transition: width 0.5s;
}
.header {
  height: 60px;
  padding: 5px;
  box-shadow: 0px 0px 10px 0px #545c64;
}
.main {
  width: 100%;
  height: 100%;
  background-color: #f5f7f9;
}
</style>
