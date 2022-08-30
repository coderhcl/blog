<template>
  <div class="project_container">
    <h1>小作品</h1>
    <div class="projet">
      <div class="item" v-for="item in worksList" :key="item.id">
        <img :src="item.imgUrl" alt="" />
        <div class="message">
          <h2 class="title">{{ item.name }}</h2>
          <span class="outline">{{ item.desc }}</span>
          <button @click="toSourceUrl(item.sourceUrl)">预览</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getWorks } from '../api/index.ts'

onMounted(() => {
  getworksData()
})
const worksList = ref()

const getworksData = async () => {
  const data = await getWorks()
  worksList.value = data.data
}

const toSourceUrl = (sourceUrl) => {
  window.location.href = sourceUrl
}
</script>

<style scoped>
.project_container {
  background-color: #ffff;
  padding: 20px;
}
.projet {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}
.item {
  width: 420px;
  height: 200px;
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.4s;
}
.item img {
  position: absolute;
  display: inline-block;
  width: 420px;
  height: 200px;
  border-radius: 10px;
}
.message {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  left: 60px;
  top: 10px;
  color: #ffff;
  width: 300px;
  height: 180px;
}
.message .title {
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 24px;
  color: #ffff;
}
.message .outline {
  color: #ffff;
  display: block;
  text-align: center;
  margin-bottom: 20px;
}
.message button {
  width: 74px;
  height: 36px;
  border: 0;
  border-radius: 6px;
  background-color: #37c089;
  font-size: 16px;
  color: #ffff;
}
.item:hover {
  opacity: 0.9;
  cursor: pointer;
  transition: all 0.4s;
  transform: scale(1.02);
}
</style>
