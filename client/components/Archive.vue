<template>
  <div class="archive_container">
    <div class="box">
      <div class="year">2022年</div>
      <div
        class="article_list"
        v-for="item in articleList"
        :key="item.id"
        @click="toArticleDetails(item.id)"
      >
        <div class="item" v-if="item.created_at.includes('2022')">
          <span class="month">{{ parseDate(item.created_at, 'MM-DD') }}</span>
          <span class="title">{{ item.title }}</span>
        </div>
      </div>
      <div class="year">2021年</div>
      <div
        class="article_list"
        v-for="item in articleList"
        :key="item.id"
        @click="toArticleDetails(item.id)"
      >
        <div class="item" v-show="item.created_at.includes('2021')">
          <span class="month">{{ parseDate(item.created_at, 'MM-DD') }}</span>
          <span class="title">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getArticleAndSelect } from '../api/index.ts'
import { parseDate } from '../utils/parsedate'
import useStore from '../store/index'
const store = useStore()
onMounted(() => {
  getArticleList()
})
const articleList = ref()

const getArticleList = async () => {
  const { data } = await getArticleAndSelect()
  articleList.value = data
  store.allArticleData = data
}

const router = useRouter()
const toArticleDetails = (id) => {
  router.push({
    path: `/article/`,
    query: {
      id: id,
    },
  })
}
</script>

<style scoped>
.archive_container {
  width: 100%;
  padding: 20px 20px 20px 20px;
  background-color: #ffff;
  border-radius: 6px;
}
.box {
  margin-bottom: 20px;
}
.year {
  width: 100px;
  font-size: 30px;
  border-bottom: 10px solid #ebeff4;
  color: #191919;
  margin-bottom: 10px 5px;
}
.article_list .item {
  height: 50px;
  line-height: 50px;
  margin-left: 20px;
  margin-bottom: 10px;
}

.article_list .month {
  display: inline-block;
  font-size: 18px;
  color: gray;
  margin-right: 18px;
}

.article_list .title {
  color: gray;
  font-size: 20px;
  transition: all 0.5s;
}
.article_list .title:hover {
  padding: 5px;
  cursor: pointer;
  background-color: #37c089;
  color: #ffff;
  font-size: 25px;
  transition: all 0.5s;
  border-radius: 10px;
}
</style>
