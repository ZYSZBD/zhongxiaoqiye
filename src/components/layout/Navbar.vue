<template>
  <div class="app-navbar">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      router
      background-color="#0066ff"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <div class="nav-container">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/policy">享政策</el-menu-item>
        <el-menu-item index="/service">找服务</el-menu-item>
        <el-menu-item index="/finance">获融资</el-menu-item>
        <el-menu-item index="/market">拓市场</el-menu-item>
        <el-menu-item index="/cloud">云学堂</el-menu-item>
        <el-menu-item index="/county">联市县</el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const activeIndex = ref('/policy'); // 默认选中享政策
</script>

<style scoped>
.nav-container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
}
.el-menu--horizontal { border-bottom: none; height: 50px; }
</style>