<template>
  <div>
    <div v-if="articleListData">
      <div
        class="article_container"
        v-for="item in articleListData"
        :key="item.id"
        @click="toArticleDetails(item.id)"
      >
        <img :src="item.firstPicture" alt="" />
        <div class="article_message">
          <div class="top_message">
            <span>{{ parseDate(item.created_at, 'YYYY-MM-DD') }}</span>
            <span>{{ item.category }}</span>
            <span>{{ item.tags }}</span>
          </div>
          <div class="article_title">
            <span>{{ item.title }}</span>
          </div>
          <div class="article_outline">
            <span>
              {{ item.contentOutline }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="paginationTotal">
      <el-pagination
        :currentPage="pagination.page"
        :page-size="pagination.size"
        :background="true"
        layout=" prev, pager, next"
        :total="paginationTotal"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { getArticleAndSelect } from '../api/index.ts'
import { parseDate } from '../utils/parsedate'
import useStore from '../store/index'
import Cookie from 'js-cookie'

onMounted(() => {
  getArticleList()
})
const store = useStore()

const pagination = reactive({
  page: 1,
  size: 4,
})
// articleListData
let articleListData = computed(() => {
  return store.articleListData
})
let paginationTotal = computed(() => {
  return store.selectArtitleTotal
})
const getArticleList = async () => {
  const res = await getArticleAndSelect(pagination)
  const all = await getArticleAndSelect({})
  store.allArticleData = all.data
  store.articleTotal = all.total
  Cookie.set('articleNum', all.total)
  store.articleListData = res.data
  store.selectArtitleTotal = res.total
  sessionStorage.setItem('allArticleData', JSON.stringify(all.data))
}

const handleCurrentChange = (val) => {
  pagination.page = val
  getArticleList()
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
.article_container {
  width: 100%;
  height: 200px;
  display: flex;
  border-radius: 10px;
  background-color: #ffff;
  margin-bottom: 20px;
  transition: all 0.5s;
}
.article_container:hover {
  cursor: pointer;
  transition: all 0.5s;
  transform: scale(1.01, 1.01);
}
.article_container img {
  border-radius: 10px 0 0 10px;
  height: 100%;
  width: 380px;
}
.article_message {
  flex: 1;
  padding: 15px;
}
.top_message span {
  display: inline-block;
  margin-right: 20px;
  height: 30px;
  line-height: 30px;
  color: gray;
  margin-top: 10px;
}
.article_title {
  height: 70px;
  width: 100%;
  line-height: 70px;
  font-size: 26px;
  font-weight: bolder;
  overflow: hidden;
  color: #191919;
}
.article_outline span {
  color: gray;
}

.el-pagination {
  float: right;
}
/* :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #37c089 !important;
} */
</style>
