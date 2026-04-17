import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// ✅ Element Plus 中文语言包配置
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { ElConfigProvider } from 'element-plus'

// ❗Element Plus 按需引入后：不再全量引入
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// ✅ 优化:只注册实际使用的图标,减少打包体积
import {
  LocationFilled,
  ArrowDown,
  CaretBottom,
  Search,
  Star,
  StarFilled,
  Folder,
  RefreshRight,
  QuestionFilled,
  ArrowUp,
  Document,
  ArrowRight,
  ArrowRightBold,
  AlarmClock,
  Plus,
  Share
} from '@element-plus/icons-vue'

// 全局组件
import AppBreadcrumb from '@/components/common/Breadcrumb.vue'

// 全局样式
import '@/assets/styles/global.css'

const app = createApp(App)

/**
 * ✅ 优化:只注册实际使用的图标
 * 减少初始加载时的 JavaScript 体积
 */
const iconsToRegister = {
  LocationFilled,
  ArrowDown,
  CaretBottom,
  Search,
  Star,
  StarFilled,
  Folder,
  RefreshRight,
  QuestionFilled,
  ArrowUp,
  Document,
  ArrowRight,
  ArrowRightBold,
  AlarmClock,
  Plus,
  Share
}

for (const [key, component] of Object.entries(iconsToRegister)) {
  app.component(key, component)
}

// 全局组件
app.component('AppBreadcrumb', AppBreadcrumb)

// ✅ 注册 Element Plus 配置提供者(用于设置中文)
app.component('ElConfigProvider', ElConfigProvider)

// 插件
app.use(createPinia())
app.use(router)

/**
 * ❗关键变化:
 * 不再 app.use(ElementPlus)
 * Element Plus 交给 unplugin-vue-components 自动按需引入
 */

// 挂载
app.mount('#app')