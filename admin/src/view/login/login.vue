<template>
  <div class="login_container">
    <el-card class="login_card">
      <span class="title">账户登录</span>
      <div class="login_fome">
        <el-form :model="loginData" :rules="rules" ref="loginFormRef">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入账号"
              :prefix-icon="User"
              v-model="loginData.username"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              show-password
              :prefix-icon="Lock"
              v-model="loginData.password"
            />
          </el-form-item>
          <el-form-item>
            <div class="valid_container">
              <el-input
                placeholder="验证码"
                :prefix-icon="Key"
                class="validcode"
                v-model="userInputValidCode"
              />
              <valid-code @input="createValidCode" />
            </div>
          </el-form-item>
        </el-form>
        <el-button color="#18a058" round class="loginbtn" @click="handleLogin">
          登录
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Lock, User, Key } from '@element-plus/icons-vue'
import { ElMessage, FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '../../api/login.api'
import ValidCode from './cpns/ValidCode.vue'
import rules from './config/login.rules'
// 组件传来的随机字符用来验证用户是否输入正确
const toValidCode = ref('')
const createValidCode = (data: any) => {
  toValidCode.value = data
}
const userInputValidCode = ref()
const loginData = reactive({
  username: '',
  password: '',
})
const router = useRouter()
const loginFormRef = ref<FormInstance>()

const handleLogin = () => {
  loginFormRef.value?.validate(async (valid) => {
    if (valid) {
      if (
        toValidCode.value.toLocaleLowerCase() !==
        userInputValidCode.value.toLocaleLowerCase()
      ) {
        ElMessage({
          type: 'warning',
          message: '验证码错误',
        })
        return
      }
      const data: any = await loginUser(loginData)
      console.log('data', data)
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.user.username)
        localStorage.setItem('userid', data.user.id)
      }
      ElMessage({
        type: 'success',
        message: '登录成功',
      })
      router.push('/home')
    }
  })
}
</script>

<style scoped>
.login_container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_card {
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  display: inline-block;
  width: 250px;
  height: 50px;
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #18a058;
  text-align: center;
}
.login_card {
  border-radius: 10px;
  width: 700px;
  height: 400px;
}
.login_fome {
  width: 240px;
}
.login_fome .el-input {
  height: 34px;
}
.loginbtn {
  display: inline-block;
  width: 100%;
  height: 30px;
}
.valid_container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.validcode {
  width: 50%;
  line-height: 34px;
  margin-right: 20px;
}
</style>
