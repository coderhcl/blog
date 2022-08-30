import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
const request = axios.create({
  baseURL: 'http://localhost:8008',
  timeout: 30000,
})

// 请求拦截
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    const con: any = config || {}
    if (token) {
      con.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: any) => {
    ElMessage({
      type: 'error',
      message: error.message,
    })
    return Promise.reject(error)
  },
)

// 响应拦截
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: any) => {
    ElMessage({
      type: 'error',
      message: error.message,
    })
    return Promise.reject(error)
  },
)

export default request
