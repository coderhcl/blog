<template>
  <div class="side_box">
    <div class="user">
      <img src="../assets/img/logo.png" alt="" class="avatar" />
      <span class="name">稀盐酸</span>
      <span class="message"
        >擅长js vue nodejs等单词拼写！！擅长js vue nodejs等单词拼写！！擅长js
        vue nodejs等单词拼写！！</span
      >
    </div>
    <div class="daysay">
      <span class="title">每日一言</span>
      <span class="message">{{ msgText }} —— {{ msgform }}</span>
    </div>
    <div class="category">
      <div class="item">
        <div class="title">文章</div>
        <span>
          {{ articleNum }}
        </span>
      </div>
      <div class="item">
        <span class="title">分类</span>
        <span>{{ categoryNum }}</span>
      </div>
      <div class="item">
        <span class="title">标签</span>
        <span>{{ tagNum }}</span>
      </div>
    </div>
    <div class="tag">
      <span class="title">标签</span>
      <div class="tag_item" v-for="item in tagList" :key="item.id">
        <span class="item" @click="selecByTagName(item.tagname)">{{
          item.tagname
        }}</span>
      </div>
    </div>
    <div class="blog_message">
      <span class="title">站点信息</span>
      <span class="start">
        开始时间：{{ parseDate(startTime, 'YYYY年 MM月 DD日') }}
      </span>
      <span class="runtime">已运行：{{ days }}天</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { getCategory, getTag, getArticleByTagName } from '../api/index.ts'
import { parseDate } from '../utils/parsedate'
import useStore from '../store/index'
import Cookie from 'js-cookie'
const store = useStore()

onMounted(() => {
  getDayMsg()
  getCategoryList()
  getTagList()
})
const msgText = computed(() => {
  return store.dayMsgText
})
const msgform = computed(() => {
  return store.dayMsgFrom
})

const getDayMsg = () => {
  if (store.dayMsgText === '') {
    axios
      .get('https://v1.hitokoto.cn')
      .then(({ data }) => {
        store.dayMsgText = data.hitokoto
        store.dayMsgFrom = data.from
      })
      .catch(console.error)
  }
}

const categoryNum = ref(0)
const tagNum = ref(0)
const tagList = ref()
const articleNum = ref(0)
const getCategoryList = async () => {
  const data = await getCategory()
  store.category = data
  categoryNum.value = data.length
}
const getTagList = async () => {
  const data = await getTag()
  tagList.value = data
  tagNum.value = data.length
}
articleNum.value = computed(() => {
  return store.articleTotal || Number(Cookie.get('articleNum'))
})

const selecByTagName = async (name) => {
  const data = await getArticleByTagName(name)
  store.articleListData = data.data
  store.selectArtitleTotal = data.total
}

const startTime = new Date('2022-08-20')
const nowTime = new Date()
const days = Math.floor((nowTime - startTime) / (24 * 3600 * 1000))
</script>

<style scoped>
.side_box {
  width: 340px;
  /* padding: 10px; */
}
.side_box .user {
  display: flex;
  flex-flow: column;
  align-items: center;
  background-color: #ffff;
  padding: 20px;
  border-radius: 6px;
}
.avatar {
  width: 100px;
  height: 100px;
  display: inline-block;
  border-radius: 50%;
  margin: 0 auto;
}
.user .name {
  font-size: 18px;
  color: #191919;
  margin-top: 18px;
  font-weight: bolder;
}
.user .message {
  font-size: 16px;
  color: gray;
  margin-top: 18px;
  font-weight: bolder;
}
.daysay {
  margin-top: 15px;
  border-radius: 6px;
  padding: 10px;
  background-color: #ffff;
}
.daysay .title {
  display: block;
  padding-top: 5px;
  width: 70px;
  border-top: 2px solid #6b7280;
  color: #6b7280;
  font-weight: bolder;
}
.daysay .message {
  display: inline-block;
  color: #374178;
  margin-top: 10px;
}
.category {
  margin-top: 15px;
  height: 100px;
  background-color: #ffff;
  display: flex;
  align-items: center;
}
.category .item {
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 50px;
  flex: 1;
}
.category .item .title {
  font-size: 20px;
  font-weight: bolder;
  color: #374151;
  margin-bottom: 15px;
}
.tag {
  margin-top: 15px;
  border-radius: 6px;
  background-color: #ffff;
  padding: 10px;
}
.tag .title {
  display: block;
  padding-top: 5px;
  width: 40px;
  border-top: 2px solid #6b7280;
  color: #6b7280;
  font-weight: bolder;
  margin-bottom: 5px;
}
.tag_item {
  display: inline-block;
  margin: 5px;
  flex-wrap: wrap;
  background-color: #f5f6fa;
}
.tag_item .item {
  display: inline-block;
  height: 40px;
  padding: 0 15px;
  line-height: 40px;
  border-radius: 6px;
  color: gray;
  transition: all 0.4s;
}
.tag_item .item:hover {
  cursor: pointer;
  background-color: #37c089;
  color: #ffff;
  font-size: 18px;
  transition: all 0.4s;
}
.blog_message {
  background-color: #ffff;
  margin-top: 15px;
  padding: 10px;
}
.blog_message .title {
  display: block;
  padding-top: 5px;
  width: 70px;
  border-top: 2px solid #6b7280;
  color: #6b7280;
  font-weight: bolder;
}
.blog_message .start {
  display: block;
  padding: 5px;
  margin-top: 10px;
}
.blog_message .runtime {
  display: block;
  padding: 5px;
  margin-top: 10px;
}
</style>
