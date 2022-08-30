import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import main from '../view/main/main.vue'
import login from '../view/login/login.vue'
import { ElMessage } from 'element-plus'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: main,
    redirect: '/home',
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../view/main/home/home.vue'),
        meta: {
          title: '控制台',
        },
      },
      {
        path: '/management',
        name: 'management',
        redirect: '/management/article',
        meta: {
          title: '文章管理',
        },
        children: [
          {
            path: '/management/article',
            name: 'article',
            component: () => import('../view/main/article/article.vue'),
            meta: {
              title: '文章列表',
            },
          },
          {
            path: '/management/category',
            name: 'category',
            component: () => import('../view/main/article/category.vue'),
            meta: {
              title: '分类列表',
            },
          },
          {
            path: '/management/tag',
            name: 'tag',
            component: () => import('../view/main/article/tag.vue'),
            meta: {
              title: '标签管理',
            },
          },
          {
            path: '/management/addatricle',
            name: 'addAndEdit',
            component: () => import('../view/main/article/addArticle.vue'),
            meta: {
              title: '文章操作',
            },
          },
        ],
      },
      {
        path: '/history',
        name: 'history',
        component: () => import('../view/main/history/history.vue'),
        meta: {
          title: '建站日志',
        },
      },
      {
        path: '/link',
        name: 'link',
        component: () => import('../view/main/link/link.vue'),
        meta: {
          title: '友链管理',
        },
      },
      {
        path: '/works',
        name: 'works',
        component: () => import('../view/main/works/works.vue'),
        meta: {
          title: '作品管理',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../view/404/notFind.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const whieList = ['/', '/login']
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (whieList.includes(to.path) || token) {
    next()
  } else {
    next({ path: '/login' })
  }
})
export default router
