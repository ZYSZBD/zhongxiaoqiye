<script setup>
import AppHeader from '../../components/layout/Header.vue'
// import AppNavbar from '../../components'
import AppFooter from '../../components/layout/Footer.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="main-layout">
    <AppHeader v-if="!$route.meta.hideCommon" />
    <!-- <AppNavbar /> -->
    
    <main class="content">
      <router-view />
    </main>

    <AppFooter v-if="!$route.meta.hideCommon" />
  </div>
</template>

<style>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgb(246, 250, 255);
}
.content {
  flex: 1; /* 确保内容不足时页脚也能在最底部 */
}
</style>