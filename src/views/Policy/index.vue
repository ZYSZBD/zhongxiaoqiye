<template>
  <div class="policy-page">
    <img
      data-v-4db0024a=""
      src="../../assets/img/top-bg.png"
      alt="背景"
      class="top_bg"
    />
    <section class="hero-section">
      <div class="container hero-container">
        <div class="hero-left">
          <div class="policy-brand">
            <div class="brand-tag">享政策</div>
            <div class="brand-text">
              <h1><span class="brand-text-blue">惠企政策</span> 一键享</h1>
              <p>申报、资金、财税等各类政策智能查找</p>
            </div>
          </div>

          <div class="search-type-tabs">
            <span :class="{ active: searchType === 0 }" @click="searchType = 0">
              搜政策
            </span>
            <span :class="{ active: searchType === 1 }" @click="searchType = 1">
              搜企业
            </span>
          </div>

          <div class="custom-search-group">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="
                searchType === 0 ? '请输入关键字搜索政策' : '请输入企业名称搜索'
              "
              class="search-input"
            />
            <button class="search-btn">搜 索</button>
          </div>

          <div class="hot-tags-area">
            <span class="hot-label">热 搜</span>
            <div class="tags-list">
              <span v-for="tag in hotTags" :key="tag" class="tag-link">{{
                tag
              }}</span>

              <el-dropdown trigger="click" popper-class="custom-more-dropdown">
                <span class="more-link">
                  更多 <el-icon><ArrowDown /></el-icon>
                </span>
                <template #dropdown>
                  <div class="more-tags-panel">
                    <div
                      v-for="(item, index) in moreTags"
                      :key="item"
                      class="more-tag-item"
                    >
                      <div class="tag-rank">
                        <i
                          v-if="index < 3"
                          class="iconfont icon-huangguan rank-icon"
                          :style="{ color: getRankColor(index) }"
                        ></i>
                        <span v-if="index < 3" class="rank-icon-num">{{
                          index + 1
                        }}</span>

                        <span v-else class="rank-num">{{ index + 1 }}</span>
                      </div>
                      <span class="tag-name">{{ item }}</span>
                    </div>
                  </div>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>

        <div class="hero-right"></div>
      </div>
    </section>
    <section class="quick-entry-section container">
      <div class="module-title">
        <img
          src="@/assets/img/title-icon-1.png"
          alt="icon"
          class="title-icon"
        />
        <span>快捷入口</span>
      </div>
      <div class="entry-grid">
        <div
          v-for="item in quickEntries"
          :key="item.title"
          class="entry-item"
          @click="handleEntryClick(item.path)"
        >
          <div class="entry-icon-wrapper">
            <img :src="item.icon" :alt="item.title" />
          </div>
          <div class="entry-info">
            <div class="entry-title">
              {{ item.title }}
              <span v-if="item.hot" class="hot-badge">HOT</span>
            </div>
            <div class="entry-sub">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="middle-banner container"
      @click="handleEntryClick('policy/matching')"
    >
      <img data-v-7da8d335="" src="@/assets/img/index_ad.png" alt="" />
    </section>

    <section class="data-map-section container">
      <div class="module-title">
        <img
          src="@/assets/img/title-icon-2.png"
          alt="icon"
          class="title-icon"
        />
        <span>数据地图</span>
      </div>

      <div class="map-content-card">
        <div class="map-visual-area">
          <!-- <div id="jiangsu-map" class="echarts-container"></div> -->
          <div ref="mapRef" class="echarts-container"></div>
        </div>

        <div class="data-dashboard-area">
          <div class="stat-panel">
            <div class="panel-row main-total">
              <div class="total-val">2.24<span>万+</span></div>
              <div class="total-lab">政策总数</div>
            </div>

            <div class="sub-section">
              <div class="sub-title">
                <i class="dot orange"></i> 政策结构分布<i class="border-m"></i>
              </div>
              <div class="metrics-grid">
                <div class="metric-item">
                  <div class="m-val">645<span>家+</span></div>
                  <div class="m-lab">本月新增</div>
                </div>
                <div class="metric-item">
                  <div class="m-val">1460<span>万+</span></div>
                  <div class="m-lab">扶持企业</div>
                </div>
                <div class="metric-item">
                  <div class="m-val">2844</div>
                  <div class="m-lab">收录部门</div>
                </div>
              </div>
            </div>

            <div class="sub-section">
              <div class="sub-title">
                <i class="dot orange"></i> 政策领域分布
                <span class="top-tag">TOP3</span><i class="border-m"></i>
              </div>
              <div class="metrics-grid">
                <div class="metric-item">
                  <div class="m-val">15.2%</div>
                  <div class="m-lab">高新技术服务</div>
                </div>
                <div class="metric-item">
                  <div class="m-val">14.8%</div>
                  <div class="m-lab">新能源与节能</div>
                </div>
                <div class="metric-item">
                  <div class="m-val">12.5%</div>
                  <div class="m-lab">电子信息</div>
                </div>
              </div>
            </div>
          </div>

          <div class="stat-panel mt-20">
            <div class="panel-row main-total">
              <div class="total-val color-blue">432<span>万+</span></div>
              <div class="total-lab">企业总数</div>
            </div>

            <div class="sub-section">
              <div class="sub-title">
                <i class="dot orange"></i> 资质分布<i class="border-m"></i>
              </div>
              <div class="metrics-grid">
                <div class="metric-item">
                  <div class="m-val">5.7<span>万+</span></div>
                  <div class="m-lab">高新企业</div>
                </div>
                <div class="metric-item">
                  <div class="m-val">2.23<span>万+</span></div>
                  <div class="m-lab">专精特新中小企业</div>
                </div>
                <div class="metric-item">
                  <div class="m-val">3022</div>
                  <div class="m-lab">专精特新小巨人</div>
                </div>
              </div>
            </div>

            <div class="sub-section">
              <div class="sub-title">
                <i class="dot orange"></i> 战略行业分布
                <span class="top-tag">TOP3</span><i class="border-m"></i>
              </div>
              <div class="metrics-grid">
                <div class="metric-item">
                  <div class="m-val">23%</div>
                  <div class="m-lab">新一代信息技术</div>
                </div>
                <div class="metric-item">
                  <div class="m-val">27%</div>
                  <div class="m-lab">高端装备制造</div>
                </div>
                <div class="metric-item">
                  <div class="m-val">19%</div>
                  <div class="m-lab">新材料</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="info-section container">
      <div class="module-title">
        <img
          src="@/assets/img/title-icon-3.png"
          alt="icon"
          class="title-icon"
        />
        <span>政策资讯</span>
      </div>

      <div class="info-content-card">
        <div class="custom-tabs">
          <div
            v-for="tab in tabs"
            :key="tab.name"
            :class="['tab-item', { active: activeTab === tab.name }]"
            @click="handleTabClick(tab.name)"
          >
            {{ tab.label }}
          </div>
        </div>

        <div class="policy-list" v-loading="loading">
          <div v-for="item in policyList" :key="item.id" class="policy-row">
            <div
              :class="[
                'level-tag',
                item.type == '国家级'
                  ? 'tag-national'
                  : item.type == '国家级'
                    ? 'tag-provincial'
                    : 'tag-city',
              ]"
            >
              {{ item.type }}
            </div>

            <div class="policy-main">
              <h3
                class="policy-title"
                @click="handleEntryClick('/policy/PolicyNews/details')"
              >
                {{ item.title }}
              </h3>
              <div class="policy-meta">
                <span class="meta-item meta-title"
                  ><i class="icon-file mr-10"> # </i>
                  {{ activeTab == "public" ? "公示公告" : "申报通知" }}
                </span>
                <span class="meta-item"
                  ><i
                    class="icon-dept mr-10 iconfont icon-qizhi- color-1078f9"
                  ></i
                  >发文部门：{{ item.dept }}</span
                >
                <span class="meta-item"
                  ><i
                    class="icon-view mr-10 iconfont icon-liulan color-1078f9"
                  ></i
                  >浏览量：{{ item.views }}</span
                >
                <span class="meta-item"
                  ><i
                    class="icon-time mr-10 iconfont icon-shijian color-1078f9"
                  ></i
                  >申报时间：{{ item.range }}</span
                >
              </div>
            </div>

            <div
              class="policy-status"
              v-if="activeTab == 'latest' || activeTab == 'new'"
            >
              <div class="status-badge">
                申报进行中
                <el-icon class="arrow-right"><ArrowRightBold /></el-icon>
              </div>
              <div class="countdown">
                <i class="clock-icon iconfont icon-tixingtishi"></i>
                剩余：<span>{{ item.days }}</span> 天
              </div>
            </div>
          </div>

          <div class="view-more" @click="handleEntryClick('policy/PolicyNews')">
            <span>查看更多</span>
            <el-icon><ArrowRight /></el-icon>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // 1. 引入路由钩子
const router = useRouter();
import axios from "axios";
import * as echarts from "echarts";
import jiangsuJson from "@/assets/json/jiangsu.json";
const searchQuery = ref("");
// 新增：0 代表搜政策，1 代表搜企业
const searchType = ref(0);
const activeTab = ref("latest");
const tabs = [
  { label: "最新申报", name: "latest" },
  { label: "公示中", name: "public" },
  { label: "新发文", name: "new" },
];

const policyList = ref([
  {
    id: 1,
    type: "国家级",
    levelType: "level-national",
    title:
      "《关于江苏省2026年度省级专精特新中小企业（第二批）认定和通过复核企业名单的公示》",
    dept: "常州市科学技术局",
    views: 6790,
    range: "2025-09-28 至 2025-12-31",
    days: 14,
  },
  {
    id: 2,
    type: "省级",
    levelType: "level-province",
    title:
      "《关于组织开展2026年度中小企业特色产业集群推荐和2023年度中小企业特色产业集群复核工作的通知》",
    dept: "常州市科学技术局",
    views: 6790,
    range: "2025-09-28 至 2025-12-31",
    days: 14,
  },
  {
    id: 3,
    type: "市级",
    levelType: "level-city",
    title:
      "《关于做好2026年享受税收优惠政策的集成电路企业项目清单制定工作的通知》",
    dept: "常州市科学技术局",
    views: 6790,
    range: "2025-09-28 至 2025-12-31",
    days: 14,
  },
  {
    id: 4,
    type: "市级",
    levelType: "level-city",
    title:
      "《关于做好2026年享受税收优惠政策的集成电路企业项目清单制定工作的通知》",
    dept: "常州市科学技术局",
    views: 56790,
    range: "2025-09-28 至 2025-12-31",
    days: 14,
  },
]);
const loading = ref(false);
const hotTags = ["高新技术企业", "国家级专精特新", "小巨人企业"];
// 获取前三名图标的函数
const getRankColor = (index) => {
  const colors = [
    "#FFD700", // 第一名：金色 (Gold)
    "#C0C0C0", // 第二名：银色 (Silver)
    "#CD7F32", // 第三名：铜色 (Bronze)
  ];
  return colors[index];
};
// 新增“更多”下拉菜单中的数据
const moreTags = ref([
  "高新技术企业",
  "国家科技型中小企业",
  "专精特新“小巨人”企业",
  "创新型中小企业",
  "江苏省专精特新中小企业",
  "科技型中小企业",
  "民营科技企业",
  "瞪羚企业",
  "独角兽企业",
  "两化融合贯标企业",
  "软件企业认定",
  "研发机构核定",
  "技术先进型服务企业",
  "上市后备企业",
  "工业互联网标杆工厂",
  "绿色工厂认定",
]);
// 在原有数据下方添加
const quickEntries = [
  {
    title: "政策匹配",
    desc: "为企业自动匹配政策",
    hot: true,
    icon: new URL("../../assets/img/hot-icon1.png", import.meta.url).href,
    path: "/policy/PolicyMatching", // 2. 添加跳转路径
  },
  {
    title: "企业匹配",
    desc: "为政策自动匹配企业",
    hot: true,
    icon: new URL("../../assets/img/hot-icon1.png", import.meta.url).href,
    path: "/policy/companymatching", // 2. 添加跳转路径
  },
  {
    title: "自评自测",
    desc: "为企业提供资质自评",
    hot: false,
    icon: new URL("../../assets/img/hot-icon1.png", import.meta.url).href,
    path: "/policy/selfAssessment", 
  },
  {
    title: "申报日历",
    desc: "为企业梳理申报时间",
    hot: false,
    icon: new URL("../../assets/img/hot-icon1.png", import.meta.url).href,
  },
  {
    title: "重点申报",
    desc: "为企业推送申报项目",
    hot: false,
    icon: new URL("../../assets/img/hot-icon1.png", import.meta.url).href,
    path: "/policy/PolicyDatabase",
  },
  {
    title: "数据大屏",
    desc: "可视化全流程数据",
    hot: false,
    icon: new URL("../../assets/img/hot-icon1.png", import.meta.url).href,
    path: "/policy/dataDashboard",
  },
];
const handleTabClick = (tab) => {
  activeTab.value = tab;
};
const handleEntryClick = (path) => {
  if (path.startsWith("http")) {
    window.open(path, "_blank"); // 打开外部链接
  } else {
    // router.push(path); // 内部路由跳转
        const routeUrl = router.resolve(path);
    window.open(routeUrl.href, "_blank");
  }
};
const mapRef = ref(null);
const initMap = () => {
  if (!mapRef.value) return;

  const myChart = echarts.init(mapRef.value);

  // 2. 注册地图：名称必须与 geo 配置中的 map 属性一致
  echarts.registerMap("js-map", jiangsuJson);

  const option = {
    // 提示框配置
    tooltip: {
      trigger: "item",
      formatter: "{b}<br/>精选政策：{c}",
    },
    // 3. 地图核心配置
    geo: {
      map: "js-map", // 使用注册的地图名称
      roam: false, // 是否开启缩放和平移
      zoom: 1.2, // 初始缩放比例
      label: {
        show: true, // 显示城市名称
        color: "#fff",
        fontSize: 14,
        fontStyle: "italic",
        fontWeight: "bold",
      },
      itemStyle: {
        // 普通状态下的样式（对应设计图的蓝色）
        areaColor: "#4d94ff",
        borderColor: "#65ffff",
        borderWidth: 1,
        shadowColor: "rgba(0, 54, 150, 0.3)",
        shadowBlur: 30,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
      },
      emphasis: {
        // 鼠标悬浮时的样式
        itemStyle: {
          areaColor: "#2b85ff",
          shadowBlur: 15,
        },
        label: {
          show: true,
          color: "#fff",
        },
      },
      select: {
    itemStyle: {
      areaColor: "#0cbd95", // 点击颜色
    }
  },
      // 关键：选中颜色
      regions: [
        {
          itemStyle: {
            areaColor: "#0cbd95", // 点击后的颜色（蓝色）
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        geoIndex: 0,
        // 模拟各城市的数据
        data: [
          { name: "南京市", value: 2568 },
          { name: "无锡市", value: 1800 },
          { name: "徐州市", value: 1650 },
          { name: "常州市", value: 1580 },
          { name: "苏州市", value: 2100 },
          { name: "南通市", value: 1420 },
          { name: "连云港市", value: 980 },
          { name: "淮安市", value: 1100 },
          { name: "盐城市", value: 1250 },
          { name: "扬州市", value: 1320 },
          { name: "镇江市", value: 1050 },
          { name: "泰州市", value: 1180 },
          { name: "宿迁市", value: 890 },
        ],
        visualMap: {
          min: 800,
          max: 3000,
          realtime: false,
          calculable: true,
          show: false, // 如果不需要左下角的色条可以设为 false
          inRange: {
            color: ["#adc6ff", "#2b85ff"], // 从浅蓝色到深蓝色的渐变
          },
        },
      },
    ],
  };

  myChart.setOption(option);

  // 响应式处理
  window.addEventListener("resize", () => myChart.resize());

  let currentIndex = -1;
const dataLen = option.series[0].data.length;

setInterval(() => {
  // 取消上一次高亮
  myChart.dispatchAction({
    type: "downplay",
    seriesIndex: 0,
    dataIndex: currentIndex,
  });

  // 下一个
  currentIndex = (currentIndex + 1) % dataLen;

  // 高亮当前
  myChart.dispatchAction({
    type: "highlight",
    seriesIndex: 0,
    dataIndex: currentIndex,
  });

  // 显示 tooltip
  myChart.dispatchAction({
    type: "showTip",
    seriesIndex: 0,
    dataIndex: currentIndex,
  });
}, 2000); // 2秒切换
  
};

onMounted(() => {
  initMap();
  // 这里需要引入江苏省的 geoJson 数据
  // axios.get('/path/to/jiangsu.json').then(res => {
  //   echarts.registerMap('JS', res.data);
  //   myChart.setOption({ ... });
  // });
});
</script>

<style scoped lang="scss">
/* 基础容器 */
.container {
  width: 75%;
  margin: 0 auto;
  position: relative;
}

.hero-section {
  padding: 80px 0 40px;
  z-index: 9;
  position: relative;
}

.hero-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* 左侧品牌区 */
.policy-brand {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.brand-tag {
  background-color: #2b85ff;
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 8px;
  margin-right: 20px;
}

.brand-text h1 {
  font-size: 30px;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  letter-spacing: 1px;
}

.brand-text p {
  font-size: 16px;
  color: #666;
  margin: 0;
}
.brand-text-blue {
  color: #1078f9;
}
/* 搜索类型切换 */
.search-type-tabs {
  margin-bottom: 15px;
  padding-left: 5px;
}

.search-type-tabs span {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-right: 30px;
  cursor: pointer;
  position: relative;
}

.search-type-tabs span.active {
  color: #2b85ff;
}

.search-type-tabs span.active::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #2b85ff;
  border-radius: 2px;
}

/* 定制搜索框 - 重点优化 */
.custom-search-group {
  display: flex;
  width: 844px;
  height: 56px;
  background: #fff;
  border: 2px solid #2b85ff;
  border-radius: 28px;
  // padding: 4px;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(43, 133, 255, 0.15);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0 25px;
  font-size: 16px;
  border-radius: 28px 0 0 28px;
}

.search-btn {
  background-color: #2b85ff;
  color: #fff;
  border: none;
  width: 120px;
  height: 100%;
  border-radius: 24px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background-color: #1a73e8;
}

/* 热搜标签区 */
.hot-tags-area {
  margin-top: 20px;
  display: flex;
  align-items: center;
  padding-left: 5px;
}

.hot-label {
  background: linear-gradient(90deg, #ff8a4d, #ff6a00);
  color: #fff;
  font-size: 12px;
  padding: 5px 15px;
  border-radius: 12px 12px 12px 0;
  margin-right: 15px;
}

.tags-list {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tag-link {
  font-size: 14px;
  color: #333;
  background: rgba(255, 255, 255, 0.8);
  padding: 5px 15px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.tag-link:hover {
  color: #2b85ff;
  background: #fff;
}

/* 修改“更多”按钮本身的样式，使其更圆润且有浅色背景 */
.more-link {
  font-size: 14px;
  color: #2b85ff;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: #eef5ff; /* 设计图中的浅蓝色 */
  padding: 4px 12px;
  border-radius: 14px;
  margin-left: 8px;
  transition: all 0.3s;
}

.more-link:hover {
  background: #2b85ff;
  color: #fff;
}

/* 深度定制下拉面板样式 */
:deep(.custom-more-dropdown) {
  padding: 0 !important;
  border: none !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
  border-radius: 8px !important;
}

/* 更多面板网格布局 */
.more-tags-panel {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 双列布局 */
  gap: 8px 15px; /* 行间距 8px，列间距 15px */
  padding: 16px;
  // width: 380px; /* 稍微加宽以容纳图标和长文字 */
  background: #fff;
  border-radius: 8px;
}

.more-tag-item {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.more-tag-item:hover {
  background-color: #f0f6ff;
}
/* 排名序号/图标区域 */
.tag-rank {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  flex-shrink: 0;
}

/* 阿里图标基础大小 */
.rank-icon {
  font-size: 30px; /* 根据你的设计稿调整大小 */
  display: inline-block;
  line-height: 1;
}
.rank-icon-num {
  position: absolute;
}

/* 普通数字样式 */
.rank-num {
  font-size: 14px;
  color: #999;
  font-weight: 500;
  font-family: Arial, sans-serif;
}

/* 标签文字样式 */
.tag-name {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 鼠标悬浮时文字变色 */
.more-tag-item:hover .tag-name {
  color: #2b85ff;
}
.top_bg {
  height: 625px;
  left: 0;
  margin-left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.title-icon {
  width: 24px;
  margin-right: 10px;
}

/* 快捷入口网格 */
.entry-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  background: #ffffff;
  box-shadow: 0px 0px 19px 0px rgba(180, 219, 255, 0.29);
  border-radius: 8px;
  padding: 18px;
}
.entry-item {
  background: #f8fbff;
  border: 1px dashed #d0e3ff;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
}
.entry-item:hover {
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-style: solid;
}
.entry-icon-wrapper img {
  width: 48px;
  height: 48px;
  margin-right: 15px;
}
.entry-title {
  font-weight: bold;
  font-size: 16px;
  color: #2b85ff;
  display: flex;
  align-items: center;
}
.hot-badge {
  background: #ff6a00;
  color: #fff;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 6px 0 10px 6px;
  margin-left: 5px;
}
.entry-sub {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

/* 模块标题 */
.module-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
}
.module-title span {
  font-size: 22px;
  font-weight: bold;
  color: #333;
}

/* 主卡片容器 */
.map-content-card {
  background: #e9f2ff; /* 还原底部的浅蓝色背景 */
  border-radius: 12px;
  display: flex;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 82, 217, 0.05);
  background: url("../../assets/img/map-bg.png") no-repeat center;
  background-size: cover;
  box-shadow: 0px 2px 7px 0px rgba(165, 165, 165, 0.22);
}

/* 左侧地图区 */
.map-visual-area {
  flex: 1.2;
  height: 700px;
  position: relative;
  margin-right: 24px;
}

.echarts-container {
  width: 100%;
  height: 100%;
}

/* 右侧面板区 */
.data-dashboard-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.stat-panel {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  flex: 1;
  box-shadow: 0px 2px 7px 0px rgba(165, 165, 165, 0.22);
  border-radius: 8px;
}

.main-total {
  text-align: center;
  margin-bottom: 15px;
}
.total-val {
  font-size: 28px;
  font-weight: bold;
  color: #2b85ff;
}
.total-val span {
  font-size: 14px;
  margin-left: 4px;
}
.total-lab {
  font-size: 13px;
  color: #999;
  margin-top: 2px;
}
.color-blue {
  color: #2b85ff;
}

.sub-section {
  padding: 15px 0;
}
.border-t {
  border-top: 1px solid #f0f5ff;
}
.border-m {
  background: rgba(55, 153, 255, 0.27);
  display: block;
  flex-grow: 1;
  height: 0.5px;
  margin-left: 0.5rem;
}
.sub-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 8px;
}
.dot.blue {
  background: #2b85ff;
}
.dot.orange {
  background: #ff7d00;
}

.top-tag {
  background: #ff7d00;
  color: #fff;
  font-size: 14px;
  padding: 1px 6px;
  border-radius: 4px 0px 10px 4px;
  margin-left: 10px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
      display: flex;
    justify-content: space-around;
}
.metric-item {
  text-align: left;
}
.m-val {
  font-size: 24px;
  font-weight: bold;
  color: #2b85ff;
}
.m-val span {
  font-size: 12px;
}
.m-lab {
  font-size: 14px;
  color: #888;
  margin-top: 5px;
}

.mt-20 {
  margin-top: 20px;
}
.info-content-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 82, 217, 0.05);
  padding: 30px;
}

/* Tabs 样式优化 */
.custom-tabs {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 20px;
}
.tab-item {
  padding: 10px 40px;
  font-size: 18px;
  color: #666;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}
.tab-item.active {
  color: #2b85ff;
  font-weight: bold;
}
.tab-item.active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 35%;
  width: 30%;
  height: 3px;
  background: #2b85ff;
}

/* 列表行样式 */
.policy-row {
  display: flex;
  align-items: center;
  padding: 25px 0;
  border-bottom: 1px solid #f5f7fa;
  transition: background 0.3s;
}
.policy-row:hover {
  background: #fafcff;
}

/* 等级标签还原 */
.level-tag {
  width: 8%;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 20px;
  flex-shrink: 0;
  padding: 6px 12px;
}
/* 国家级：亮橘色/红色系（代表权威） */
.tag-national {
  background: #fff4dc;
  color: #ff8416;
}

/* 省级：蓝色系（代表政务） */
.tag-provincial {
  background: #eff5ff;
  color: #27a1ff;
}
/* 市级：蓝色系（代表政务） */
.tag-city {
  background: #e3f5e6;
  color: #0fb250;
}
.policy-main {
  flex: 1;
}
.policy-title {
  font-size: 18px;
  color: #333;
  margin: 0 0 12px 0;
  cursor: pointer;
}
.policy-title:hover {
  color: #2b85ff;
}

.policy-meta {
  display: flex;
  gap: 5%;
}
.meta-item {
  font-size: 13px;
  color: #999;
  background: #f5f7fa;
  padding: 4px 12px;
  border-radius: 3px;
  display: flex;
  align-items: center;
}
.meta-title {
  color: #ff722c;
}
/* 右侧状态区 */
.policy-status {
  width: 150px;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.status-badge {
  background: #ffa940;
  color: #fff;
  padding: 6px 15px;
  border-radius: 20px 4px 20px 4px; /* 还原不对称圆角 */
  font-size: 13px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.arrow-right {
  margin-left: 5px;
  font-size: 12px;
}

.countdown {
  font-size: 13px;
  color: #666;
  display: flex;
  align-items: center;
}
.clock-icon {
  color: #ffa940;
  margin-right: 5px;
}
.countdown span {
  color: #ff4d4f;
  font-weight: bold;
  margin: 0 3px;
}

.view-more {
  text-align: right;
  margin-top: 25px;
  color: #2b85ff;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.middle-banner {
  cursor: pointer;
  img {
    width: 100%;
  }
}
.info-section {
  margin-bottom: 20px;
}
.icon-file {
  margin-right: 10px;
}
.mr-10 {
  margin-right: 10px;
}
.color-1078f9 {
  color: #1078f9;
}
</style>
