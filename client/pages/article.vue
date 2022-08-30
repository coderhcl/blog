<template>
  <div class="article_detail" v-if="articleMessage">
    <div class="container">
      <h2 class="title">{{ articleMessage.title }}</h2>
      <div class="message">
        <span>{{ parseDate(articleMessage.created_at) }}</span>
        <span>分类： {{ articleMessage.category }}</span>
        <span>标签： {{ articleMessage.tags }}</span>
      </div>
      <div class="first_pic">
        <img :src="articleMessage.firstPicture" alt="" />
      </div>
      <div
        id="md-preview"
        class="md-preview default-theme content"
        ref="refmd"
        v-html="articleMessage.htmlContent"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getArticleById } from '../api/index'
import 'highlight.js/styles/atom-one-dark.css'
import { parseDate } from '../utils/parsedate'
onMounted(() => {
  getArticleDetail()
})
const route = useRoute()
const { id } = route.query
const articleMessage = ref()
const getArticleDetail = async () => {
  const data = await getArticleById(id)
  articleMessage.value = data.data
}
</script>

<style scoped>
.article_detail {
  display: flex;
}
.container {
  background-color: #ffff;
  border-radius: 6px;
  padding: 20px;
}
.container .title {
  font-size: 40px;
  line-height: 70px;
}
.container .message {
  color: gray;
  height: 50px;
  line-height: 40px;
}
.message span {
  margin-right: 30px;
}
.first_pic img {
  width: 100%;
  /* height: 300px; */
  margin: 0 auto;
  margin-bottom: 30px;
}
.content {
  width: 80%;
}
.container_right {
  width: 18%;
  height: 100%;
  margin-left: 10px;
  background-color: #ffff;
}
</style>
