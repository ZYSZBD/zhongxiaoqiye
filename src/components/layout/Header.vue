<template>
  <header :class="['site-header', { 'is-sticky': isSticky }]">
    <div class="top-bar">
      <div class="container" style="width: 75%;">
        <div class="header-left">
          <img
            src="@/assets/img/logo-left.png"
            alt="数字工信"
            class="main-logo"
          />
          <div class="location">
            <i class="iconfont icon-weizhi-xianxing"></i>
            <span class="city-name">南京市</span>
            <el-icon class="arrow-down"><ArrowDown /></el-icon>
          </div>
        </div>
        <div class="header-right">
          <div class="tag-link">
            <img src="@/assets/img/logo-right.png" alt="" class="icon" />
          </div>
          <div class="auth-links">
            <el-link :underline="false">登录</el-link>
            <span class="split">|</span>
            <el-link :underline="false">注册</el-link>
          </div>
        </div>
      </div>
    </div>

    <nav class="main-nav">
      <div class="container">
        <ul class="nav-list">
          <li
            v-for="item in menuItems"
            :key="item.name"
            :class="['nav-item', { active: activeMenu === item.path }]"
          >
            <router-link :to="item.path">
              {{ item.name }}
              <!-- <el-icon v-if="item.hasSub" class="nav-arrow"
                ><CaretBottom
              /></el-icon> -->
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router"; // 引入路由钩子
import {
  LocationFilled,
  ArrowDown,
  CaretBottom,
} from "@element-plus/icons-vue";
// 控制是否应用吸顶样式的变量
const isSticky = ref(false);

const handleScroll = () => {
  // 当滚动距离大于 10px 时，开启吸顶效果
  isSticky.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const route = useRoute();

// 使用计算属性，实时追踪当前路由路径
// 这样点击 <router-link> 导致路径变化时，active 样式会自动切换
const activeMenu = computed(() => route.path);
const menuItems = [
  { name: "首页", path: "/" },
  { name: "享政策", path: "/policy", hasSub: true },
  { name: "找服务", path: "/service" },
  { name: "促供需", path: "/supply-demand" },
  { name: "获融资", path: "/finance" },
  { name: "云学堂", path: "/academy" },
  { name: "拓市场", path: "/market" },
  { name: "联市县", path: "/local" },
  { name: "汇办事", path: "/service-hub" },
  { name: "找活动", path: "/activity" },
  { name: "选模型", path: "/model-selection" },
  { name: "法律服务", path: "/legal-service" },
  { name: "智改数转", path: "/digital-transformation" },
  { name: "工业遗存", path: "/industrial-heritage" },
  { name: "服务制造", path: "/service-manufacturing" },
];
</script>

<style scoped lang="scss">
.site-header {
  width: 100%;
  z-index: 1000;
  // transition: all 0.3s ease; /* 增加平滑切换动画 */
}
/* 吸顶状态下的样式 */
.site-header.is-sticky {
  position: sticky;
  top: 0;
  /* 变为灰色半透明 */
  background-color: rgb(243 248 255 / 61%);
  /* 毛玻璃效果 */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* 移除吸顶状态下内部组件的边框，避免多层线框重叠 */

.container {
  width: 75%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100%;
}

/* 第一层样式 */
.top-bar {
  height: 70px;
  border-bottom: 1px solid hsl(213deg 95% 52% / 55%);
}

.header-left {
  display: flex;
  align-items: center;
  flex: 1;
  z-index: 999;
}

.main-logo {
  height: 45px;
}

.location {
  margin-left: 30px;
  display: flex;
  align-items: center;
  color: #333;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
}

.location .city-name {
  margin: 0 4px;
}
.arrow-down {
  font-size: 12px;
  color: #999;
}

.header-right {
  display: flex;
  align-items: center;
  z-index: 999;
}

.tag-link {
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-right: 25px;
}
.auth-links {
  border: 1px solid #005bf1;
  border-radius: 20px;
  padding: 5px 20px;
  display: flex;
}
.auth-links .el-link {
  color: #2b85ff;
  font-weight: bold;
}
.auth-links .split {
  margin: 0 10px;
  color: #005bf1;
}

/* 第二层导航样式 */
.main-nav {
  height: 50px;
}

.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  justify-content: center;
  z-index: 999;
}

.nav-item {
  height: 100%;
  margin-right: 30px;
  position: relative;
  display: flex;
  align-items: center;
  transition: all 0.3s ease; /* 增加平滑过渡 */
}

.nav-item.active::after {
  /* content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #2b85ff; */
}

.nav-item a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
  display: flex;
  align-items: center;
  font-weight: bold;
  padding: 15px;
}

/* 重点：还原“享政策”激活状态 */
.nav-item.active {
  background-color: #2b85ff;
  border-radius: 0 0 15px 15px; /* 底部圆角 */
  transition: all 0.3s ease;
}

.nav-item.active a {
  color: #fff;
}
/* 悬浮效果（非激活状态下） */
.nav-item:not(.active):hover a {
  color: #2b85ff;
}
.nav-arrow {
  margin-left: 5px;
  font-size: 12px;
}
.icon-weizhi-xianxing {
  color: #005bf1;
}
@media (max-width: 2500px) {
  .nav-item {
  margin-right: 12px;  
}
}
@media (max-width: 2005px) {
  .container{
    width: 85%;
  }
  .nav-item {
  margin-right: 5px;  
}
 
}
@media (max-width: 1660px) {
  .nav-item a {
    font-size: 16px;
  }
 
}
@media (max-width: 1540px) {
  .nav-list{
    flex-wrap: wrap;
  }
  .main-nav{
    height: 100px;
  }
}
 
</style>
