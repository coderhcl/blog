<template>
  <div class="bheader">
    <div class="container">
      <div class="left">
        <img src="../assets/img/logo.png" alt="" />
        <div class="link_list">
          <NuxtLink
            v-for="(menu, index) in defaultMenus"
            :key="menu.url"
            :to="menu.url"
            :exact="menu.exact"
            class="link"
            :class="defaltIndex === index ? 'link-bottom' : ''"
            @click="handleClick(index)"
          >
            {{ menu.name }}
          </NuxtLink>
        </div>
      </div>
      <div clsss="search">
        <input
          type="text"
          placeholder="请输入文章标题"
          class="search_input"
          v-model="searchInput"
        />
        <button class="search_btn" @click="searchArticle">搜索</button>
        <button class="reset_btn" @click="resetInput">重置</button>
      </div>
      <!-- <div v-else class="other_page">
        更多内容尽请期待... <span>(返回首页搜索文章哦！)</span>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import useStore from '../store/index'
import { getArticleAndSelect } from '../api/index.ts'
const store = useStore()
const route = useRoute()
const router = useRouter()
console.log('route', route.name)
const defaultMenus = [
  { name: '首页', url: '/', exact: true },
  { name: '归档', url: '/archive' },
  { name: '友联', url: '/link' },
  { name: '作品', url: '/project' },
  { name: '网站日志', url: '/history' },
]

const defaltIndex = ref(0)
const handleClick = (index) => {
  defaltIndex.value = index
}

const searchInput = ref('')
const searchArticle = async () => {
  if (route.name !== 'index') {
    router.push('/')
  }

  const data = await getArticleAndSelect({
    title: searchInput.value,
    page: 1,
    size: 4,
  })
  store.articleListData = data.data
  store.selectArtitleTotal = data.total
}

const resetInput = () => {
  searchInput.value = ''
  searchArticle()
}
</script>

<style scoped>
.bheader {
  height: 86px;
  box-shadow: 0 5px 10px -5px #dddee1;
  background-color: #ffffff;
}
.container {
  display: flex;
  width: 1280px;
  height: 100%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
}
.container img {
  display: inline-block;
  width: 200px;
  height: 60px;
}
.left {
  display: flex;
}
.link_list {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 50px;
}
.link-bottom {
  border-bottom: 3px solid #37c089;
}
.link {
  display: flex;
  text-decoration: none;
  font-size: 18px;
  font-weight: bolder;
  color: #0f172a;
  margin-right: 50px;
}

.search_input {
  width: 200px;
  height: 32px;
  background-color: #f3f4f6;
  color: #0f172a;
  border: 1px solid #37c089;
  border-radius: 4px 0 0 4px;
}
input {
  padding-left: 6px;
}
input:focus {
  outline: none;
}
input::-webkit-input-placeholder {
  font-size: 15px;
}
.search_btn {
  width: 60px;
  height: 34px;
  line-height: 30px;
  background-color: #37c089;
  color: #ffff;
  border: 1px solid #37c089;
  border-radius: 0 4px 4px 0;
}
.reset_btn {
  width: 60px;
  height: 34px;
  line-height: 30px;
  background-color: #ffff;
  color: #37c089;
  border: 1px solid rgb(209, 208, 208);
  border-radius: 4px;
  margin-left: 5px;
}
</style>
