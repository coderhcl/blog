<template>
  <div class="header_container">
    <div class="header_left">
      <!-- 缩放图标 -->
      <div @click="handleFoldClick" class="flod_icon">
        <el-icon v-if="isFlod"><Expand /></el-icon>
        <el-icon v-else><fold /></el-icon>
      </div>
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item
            v-for="breadCrumbItem in breadCrumbList"
            :key="breadCrumbItem.path"
          >
            {{ breadCrumbItem.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!-- 用户头像 -->
    <div class="user_avatar">
      <el-dropdown>
        <el-avatar> {{ username }} </el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="userLogout">退出登录</el-dropdown-item>
            <el-dropdown-item @click="openPasswordForm"
              >修改密码</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <el-dialog
    class="pwd_dialog"
    v-model="passwordFormVisible"
    title="修改密码"
    width="360px"
  >
    <el-input
      v-model="userInputPassword"
      show-password
      placeholder="请输入密码"
      :prefix-icon="Lock"
    />
    <el-input
      v-model="userInputPasswordConfirm"
      show-password
      placeholder="请确认密码"
      :prefix-icon="Edit"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="passwordFormVisible = false">取消</el-button>
        <el-button type="success" @click="handlePasswordChange">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Expand, Fold } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Lock, Edit } from '@element-plus/icons-vue'
import { changeUserPwd } from '../../../api/login.api'

const isFlod = ref<boolean>(false)
const handleFoldClick = () => {
  isFlod.value = !isFlod.value
  emit('FlodChange', isFlod.value)
}
const emit = defineEmits(['FlodChange'])

const route = useRoute()
const breadCrumbList = computed(() => {
  return route.matched
})
const username = computed(() => {
  return localStorage.getItem('username') || '用户'
})
const router = useRouter()
const userLogout = () => {
  ElMessageBox.alert('你想要退出吗', '退出登录', {
    confirmButtonText: '确定',
    callback: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      router.push('/login')
      ElMessage({
        type: 'success',
        message: '退出成功',
      })
    },
  })
}
const passwordFormVisible = ref(false)
const userId = localStorage.getItem('userid') || ''
const userInputPassword = ref('')
const userInputPasswordConfirm = ref('')
const openPasswordForm = () => {
  passwordFormVisible.value = true
}
const handlePasswordChange = async () => {
  if (userInputPassword.value !== userInputPasswordConfirm.value) {
    ElMessage({
      type: 'warning',
      message: '两次密码不一致',
    })
    return
  }
  const data: any = await changeUserPwd(+userId, {
    password: userInputPassword.value,
  })
  if (data.message) {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('userid')
    router.push('/login')
    ElMessage({
      type: 'success',
      message: '密码修改成功！请重新登陆',
    })
  }
}
</script>

<style scoped>
.header_container {
  display: flex;
  justify-content: space-between;
  height: 55px;
  width: 100%;
}
.header_left {
  display: flex;
}
.flod_icon {
  display: inline-block;
  width: 30px;
  font-size: 30px;
  line-height: 62px;
  text-align: center;
}
.breadcrumb {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  font-size: 50px;
}
.user_avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
/* ::v-deep .pwd_dialog {
  width: 300px;
} */
.el-dialog .el-input {
  width: 300px;
  margin-bottom: 20px;
}
</style>
