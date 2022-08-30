<template>
  <div class="link_container">
    <div class="message">以下排名不分先后</div>
    <div class="blog_container">
      <div
        class="link_item"
        v-for="item in linkList"
        :key="item.value"
        @click="toLinkUrl(item.url)"
      >
        <div class="blog">
          <img :src="item.avatar" />
          <div>
            <div class="title">{{ item.name }}</div>
            <div class="outline">{{ item.outline }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getLink } from '../api/index.ts'
onMounted(() => {
  getLinkData()
})
const linkList = ref()
const getLinkData = async () => {
  const data = await getLink()
  linkList.value = data.data
}

const toLinkUrl = (url) => {
  window.location.href = url
}
</script>

<style scoped>
.link_container {
  background-color: #ffff;
  width: 100%;
  padding: 10px;
  border-radius: 6px;
}
.blog_container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
}
.message {
  font-size: 35px;
  font-weight: bolder;
}
.link_item {
  width: 280px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  margin: 10px 10px 15px 10px;
  padding: 5px;
  transition: all 0.4s;
}
.link_item:hover {
  transition: all 0.5s;
  transform: scale(1.05, 1.05);
}
.link_item .blog {
  display: flex;
  align-items: center;
}
.blog img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}
.blog .title {
  line-height: 30px;
  font-size: 18px;
  color: #191919;
  margin-bottom: 10px;
  font-weight: bolder;
}
.blog .outline {
  font-size: 14px;
  color: gray;
}
</style>
