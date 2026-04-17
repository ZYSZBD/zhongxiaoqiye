<template>
  <el-config-provider :locale="zhCn">
    <div id="app">
      <Header v-if="!isDataDashboard" />
      <router-view />
      <Footer v-if="!isDataDashboard" />
    </div>
  </el-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

const route = useRoute()

// 判断是否为数据大屏页面
const isDataDashboard = computed(() => {
  return route.path.toLowerCase().includes('/policy/datadashboard')
})
</script>