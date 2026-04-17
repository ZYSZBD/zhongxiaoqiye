// src/router/index.js

import { createRouter, createWebHashHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// 热更新支持
if (import.meta.hot) {
  handleHotUpdate(router)
}

// 标题
router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = `${to.meta.title} - 江苏省中小企业公共服务平台`
  }
})

export default router