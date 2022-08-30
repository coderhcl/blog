<template>
  <div class="home_container">
    <div class="showNum">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>文章数</span>
              </div>
            </template>
            <div class="card_num">
              <el-icon :size="50" color="#409EFC"><Tickets /></el-icon>
              <span>{{ articleNum }}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>分类数</span>
              </div>
            </template>
            <div class="card_num">
              <el-icon :size="50" color="#5cdbd3"><DataAnalysis /></el-icon>
              <span>{{ categoryNum }}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>标签数</span>
              </div>
            </template>
            <div class="card_num">
              <el-icon :size="50" color="#ff85c0"><Connection /></el-icon>
              <span>{{ tagNum }}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>友联数</span>
              </div>
            </template>
            <div class="card_num">
              <el-icon :size="50" color="#fc8452"><Paperclip /></el-icon>
              <span>{{ linkNum }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="show_message">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>标签文章数量</span>
              </div>
            </template>
            <div class="pie_chart" v-if="pieData.length >= 1">
              <piechart :pieData="pieData"></piechart>
            </div>
          </el-card>
        </el-col>
        <el-col :span="14">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>最新文章</span>
              </div>
            </template>
            <div class="article_list">
              <div
                class="article_item"
                v-for="item in theNewFiveArticle"
                :key="item.id"
              >
                <div class="article_title">{{ item.title }}</div>
                <span class="article_time">{{
                  parseDate(item.created_at)
                }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  Tickets,
  DataAnalysis,
  Connection,
  Paperclip,
} from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import { getArticleAndSelect } from '../../../api/article.api'
import { getCategory } from '../../../api/category.api'
import { getLink } from '../../../api/link.api'
import { getTag } from '../../../api/tag.api'
import { parseDate } from '../../../utils/parsedate'
import piechart from './cpns/piechart.vue'
onMounted(() => {
  getArticleList()
  getCategoryList()
  getTagList()
  getLinkList()
})

// 获取文章数量
const articleNum = ref()
const tagsArray: any = []
let theNewFiveArticle = ref<any>()
const pieData: Array<any> = reactive<any>([])
const getArticleList = async () => {
  const data: any = await getArticleAndSelect({})
  articleNum.value = data.total
  // 获取最新五篇文章
  theNewFiveArticle.value = data.data.slice(0, 5)

  // TODO: 以下代码可以封装成一个函数
  // 获取图标数据以及处理数据
  data.data.map((v: any) => {
    tagsArray.push(v.tags)
  })
  // 获取图标数据{key:value}形式
  const temp: any = {}
  tagsArray.map((i: string) => {
    i.split('-').forEach((t: string) => {
      if (temp[t]) {
        temp[t]++
      } else {
        temp[t] = 1
      }
    })
  })
  for (const [key, value] of Object.entries(temp as Object)) {
    pieData.push({ name: key, value: value })
  }
}

// 获取分类数量
const categoryNum = ref()
const getCategoryList = async () => {
  const data: any = await getCategory()
  categoryNum.value = data.length
}

// 获取标签数量
const tagNum = ref()
const getTagList = async () => {
  const data: any = await getTag()
  tagNum.value = data.length
}

// 获取友链数量
const linkNum = ref()
const getLinkList = async () => {
  const data: any = await getLink()
  console.log('data', data)
  linkNum.value = data.data.length
}
</script>

<style scoped>
.showNum {
  height: 160px;
}
.card_num {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
.card_num span {
  font-size: 35px;
}
.card-header span {
  font-size: 20px;
}
.show_message {
  margin-top: 10px;
}
.article_item {
  margin-bottom: 20px;
  border-bottom: 1px solid #e4e7ed;
}
.article_title {
  font-size: 18px;
  margin-bottom: 10px;
}
.article_time {
  display: inline-block;
  font-size: 14px;
  color: #bbbbbb;
  margin-bottom: 10px;
}
.pie_chart {
  width: 100%;
  height: 400px;
}
</style>
