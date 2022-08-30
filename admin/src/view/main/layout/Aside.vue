<template>
  <div class="menu_container">
    <div class="title">
      <img src="../../../assets/vue.svg" alt="博客图片" />
      <span v-if="!collapse">博客管理后台</span>
    </div>
    <el-menu
      router
      :collapse="collapse"
      collapse-transition="false"
      background-color="#001428"
      :default-active="defaultPath"
      text-color="gainsboro"
      class="menu"
    >
      <el-menu-item index="/home">
        <el-icon><Link /></el-icon>
        <span> 控制台 </span>
      </el-menu-item>
      <el-sub-menu index="/management">
        <template #title>
          <el-icon><Notebook /></el-icon>
          <span>文章管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/management/addatricle"> 编写文章 </el-menu-item>
          <el-menu-item index="/management/article"> 文章列表 </el-menu-item>
          <el-menu-item index="/management/category"> 分类列表 </el-menu-item>
          <el-menu-item index="/management/tag"> 标签列表 </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="/link">
        <el-icon><Link /></el-icon>
        <span> 友链管理 </span>
      </el-menu-item>
      <el-menu-item index="/works">
        <el-icon><Reading /></el-icon>
        <span> 作品管理 </span>
      </el-menu-item>
      <el-menu-item index="/history">
        <el-icon><Calendar /></el-icon>
        <span> 建站日志 </span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { Notebook, Link, Calendar, Reading } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
defineProps({
  collapse: Boolean,
})

const route = useRoute()
const defaultPath = route.matched[route.matched.length - 1].path
</script>

<style scoped>
.menu_container {
  width: 100%;
}
.title {
  display: flex;
  height: 56px;
  color: gainsboro;
  justify-content: center;
  align-items: center;
}
.title img {
  width: 25px;
  height: 25px;
  /* margin-right: 5px; */
}
.title span {
  font-size: 20px;
  margin-left: 10px;
  font-weight: bolder;
}
::deep .menu {
  background-color: #545c64 !important;
}
.el-menu-item span,
.el-sub-menu span {
  font-size: 16px;
  font-weight: bolder;
}
.el-sub-menu span {
  color: #e6f2d7;
}
.menu_sub_title {
  font-size: 15px;
}
.menu_sub_title:hover {
  color: #e6f2d7;
}
.el-menu {
  width: 100%;
  /* padding: 5px; */
  border: 0 !important;
}
::v-deep .el-menu-item-group__title {
  display: none !important;
}

.el-menu-item {
  color: #e6f2d7;
}
.el-menu-item:hover {
  color: #c0c4cc;
}
.el-menu-item.is-active {
  transition: all 0.3s;
  border-radius: 10px;
  color: #e6f2d7;
  background-color: #18a058;
}
</style>
