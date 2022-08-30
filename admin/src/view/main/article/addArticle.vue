<template>
  <div>
    <div class="article_container">
      <div class="top">
        <el-input
          placeholder="请输入文章标题"
          v-model="article.title"
        ></el-input>
        <el-button type="success" @click="handleOpenDrawer">发布</el-button>
      </div>
      <div class="mdEditor">
        <md-editor
          v-model="article.content"
          @on-upload-img="onUploadImg"
          @onHtmlChanged="HtmlChange"
        />
      </div>
    </div>
    <el-drawer
      direction="rtl"
      v-model="openDrawer"
      size="44%"
      :with-header="false"
    >
      <template #default>
        <div>
          <span class="title">发布文章</span>
          <div class="drawer_container">
            <div class="article_pic_outline">
              <div class="upload">
                <span>文章封面</span>
                <el-upload
                  name="file"
                  class="avatar-uploader"
                  action="http://localhost:8008/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img
                    v-if="article.firstPicture"
                    :src="article.firstPicture"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                  </el-icon>
                </el-upload>
              </div>
              <div class="outline">
                <span>编辑摘要</span>
                <el-input
                  v-model="article.contentOutline"
                  show-word-limit
                  :maxlength="80"
                  :rows="6"
                  type="textarea"
                  placeholder="请输入摘要"
                />
              </div>
            </div>
          </div>
          <div class="select">
            <span>添加分类</span>
            <el-select placeholder="请选择分类" v-model="article.category">
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.categoryname"
                :value="item.categoryname"
              />
            </el-select>
          </div>
          <div class="select">
            <span>添加标签</span>
            <el-select placeholder="请选择标签" v-model="arrayTags" multiple>
              <el-option
                v-for="item in tagList"
                :key="item.id"
                :label="item.tagname"
                :value="item.tagname"
              />
            </el-select>
          </div>
          <div class="switch">
            <span>置顶</span>
            <el-switch
              v-model="article.isTop"
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #dbdbdb;
              "
            />
          </div>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="openDrawer = false">取消</el-button>
          <el-button type="primary" @click="saveAsDraft">存为草稿</el-button>
          <el-button type="success" @click="savaArticle">确任并发布</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, UploadProps } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { uploadFile } from '../../../api/upload.api'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { getCategory } from '../../../api/category.api'
import { getTag } from '../../../api/tag.api'
import { careateArticle, updateArticle } from '../../../api/article.api'
import { useRoute, useRouter } from 'vue-router'

onMounted(() => {})
let arrayTags = ref()

const route = useRoute()
let row_title: any,
  roe_content: any,
  row_contentOutline: any,
  row_firstPicture: any,
  row_category: any,
  row_tags: any,
  row_status: any,
  row_isTop: any,
  row_htmlContent: any
if (route.params.id) {
  const {
    title,
    content,
    contentOutline,
    firstPicture,
    category,
    tags,
    status,
    isTop,
    htmlContent,
  } = route.params
  row_title = title
  roe_content = content
  row_contentOutline = contentOutline
  row_firstPicture = firstPicture
  row_category = category
  row_tags = tags
  row_status = status
  row_isTop = isTop
  row_htmlContent = htmlContent
  arrayTags.value = row_tags.split('-')
}
const article = reactive({
  title: row_title || '',
  content: roe_content || '',
  contentOutline: row_contentOutline || '',
  firstPicture: row_firstPicture || '',
  category: row_category || '',
  tags: row_tags || '',
  status: row_status || '草稿',
  isTop: row_isTop || false,
  htmlContent: row_htmlContent || '',
})

const openDrawer = ref(false)
const handleOpenDrawer = () => {
  article.title = article.title.trim()
  article.content = article.content.trim()
  if (article.title && article.content) {
    openDrawer.value = true
    article.contentOutline = article.content.slice(0, 80)
    getCategoryList()
    getTagList()
  } else {
    ElMessage({
      type: 'warning',
      message: '请输入标题和内容',
    })
    return
  }
}
// 头图图片上传成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  article.firstPicture = response.url
}
// md文档上传图片
const onUploadImg = async (files: any, callback: any) => {
  const res = await Promise.all(
    files.map((file: any) => {
      return new Promise(async (rev, rej) => {
        const form = new FormData()
        form.append('file', file)
        await uploadFile(form).then((res: any) => rev(res))
      })
    }),
  )
  callback(res.map((item) => item.url))
}
const categoryList = ref()
const getCategoryList = async () => {
  const data: any = await getCategory()
  categoryList.value = data
}

const tagList = ref()
const getTagList = async () => {
  const data: any = await getTag()
  tagList.value = data
}
const HtmlChange = (html: string) => {
  article.htmlContent = html
}

const router = useRouter()
// 保存文章
const savaArticle = async () => {
  if (
    !article.contentOutline ||
    !article.firstPicture ||
    !article.category ||
    !article.htmlContent ||
    !arrayTags.value
  ) {
    ElMessage({
      type: 'warning',
      message: '请在完善本页面内容',
    })
    return
  }
  if (arrayTags.value.length > 1) {
    article.tags = arrayTags.value.join('-')
  } else {
    article.tags = arrayTags.value[0]
  }
  article.status = '已发布'
  let data: any
  // 如果有路由传递过来的值就更新，否则就是创建
  if (route.params.id) {
    data = await updateArticle(+route.params.id, article)
  } else {
    data = await careateArticle(article)
  }
  openDrawer.value = false
  article.title = ''
  article.content = ''
  article.category = ''
  article.contentOutline = ''
  article.firstPicture = ''
  arrayTags.value = []
  if (data.message) {
    ElMessage({
      type: 'success',
      message: data.message,
    })
  }
  router.push('/management/article')
}
// 保存为草稿
const saveAsDraft = async () => {
  article.category = article.category || '暂未填写分类'

  article.firstPicture = article.firstPicture || ''
  article.status = '草稿'
  if (arrayTags.value.length > 1) {
    article.tags = arrayTags.value.join('-')
  } else if (arrayTags.value.length == 0) {
    article.tags = '暂未填写标签'
  } else {
    article.tags = arrayTags.value[0]
  }
  let data: any
  // 如果有路由传递过来的值就更新，否则就是创建
  if (route.params.id) {
    data = await updateArticle(+route.params.id, article)
  } else {
    data = await careateArticle(article)
  }
  openDrawer.value = false
  article.title = ''
  article.content = ''
  article.category = ''
  article.contentOutline = ''
  article.firstPicture = ''
  arrayTags.value = []
  if (data.message) {
    ElMessage({
      type: 'success',
      message: data.message,
    })
  }
  router.push('/management/article')
}
</script>

<style scoped>
.article_container {
  height: 100%;
  width: 100%;
  background-color: #fff;
}
.top {
  display: flex;
  height: 40px;
  width: 100%;
  align-items: center;
  padding: 10px;
  /* padding-left: 10px; */
  /* margin-top: 10px; */
  /* margin-bottom: 10px; */
}
.top .el-input {
  width: 60%;
  height: 40px;
  margin-right: 20px;
}
.mdEditor {
  width: 100%;
  height: 100%;
}
#md-editor-v3 {
  height: 600px;
}
.title {
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  height: 30px;
  line-height: 10px;
  border-bottom: 2px solid #f2f2f6;
}
.drawer_container {
  margin-top: 10px;
  width: 100%;
}
::v-deep .el-upload {
  width: 200px;
  height: 130px;
  border-radius: 5px;
  background-color: #f0f0f0;
}
.avatar-uploader-icon {
  font-size: 20px;
}
.article_pic_outline {
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
}
.article_pic_outline .upload {
  display: flex;
}
.upload span {
  margin: 10px;
}
.upload .avatar {
  width: 100%;
  height: 100%;
}
.outline {
  display: flex;
  margin-left: 20px;
}
.outline span {
  display: inline-block;
  width: 100px;
  margin: 10px;
}
.select {
  display: flex;
  width: 100%;
  margin: 20px;
}
.select span {
  width: 80px;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
}
.select .el-select {
  padding-right: 20px;
  width: 80%;
}
.switch {
  margin-top: 20px;
  height: 36px;
}
.switch span {
  margin: 20px;
}
</style>
