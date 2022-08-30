import { createApp } from 'vue'
import './styles/reset.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import route from './router/index'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app.use(route)
// 全局加载element和国际化
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
