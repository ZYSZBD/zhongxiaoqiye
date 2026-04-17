<template>
  <div class="screen">
    <!-- 顶部 -->
    <header class="header">
      <div class="time">2026.04.15 09:25:47</div>
      <div class="title">政策大脑</div>
      <div class="actions">30秒 | 全屏</div>
    </header>

    <!-- 主体 -->
    <div class="main">
      <!-- 左侧 -->
      <div class="left">
        <div class="panel"><DataOverview /></div>
        <div class="panel"><PolicyTable /></div>
        <div class="panel"><GrowthChart /></div>
      </div>

      <!-- 中间 -->
      <div class="center">
        <div class="total">
          <div class="label">数据总量</div>
          <div class="number">128,120,000+</div>
        </div>

        <!-- 数据统计卡片 -->
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-label">政策相关</div>
            <div class="stat-value">2000万+</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">产业相关</div>
            <div class="stat-value">12万+</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">企业相关</div>
            <div class="stat-value">1.08亿+</div>
          </div>
        </div>

        <div class="map"><ChinaMap /></div>

        <!-- 产业板块数据卡片 -->
        <div class="industry-cards">
          <div class="industry-card">
            <div class="industry-title">新一代信息技术</div>
            <div class="industry-stats">
              <div class="stat-row">
                <span class="stat-key">产业链：</span>
                <span class="stat-num">71 条</span>
              </div>
              <div class="stat-row">
                <span class="stat-key">子节点：</span>
                <span class="stat-num">1352 个</span>
              </div>
              <div class="stat-row">
                <span class="stat-key">企业数：</span>
                <span class="stat-num">2,726,531 家</span>
              </div>
              <div class="stat-row">
                <span class="stat-key">惠企政策：</span>
                <span class="stat-num">72,771 项</span>
              </div>
              <div class="stat-row">
                <span class="stat-key">惠及企业：</span>
                <span class="stat-num">379,774 家</span>
              </div>
            </div>
          </div>
          <div class="industry-card">
            <div class="industry-title">高端装备制造</div>
            <div class="industry-stats">
              <div class="stat-row">
                <span class="stat-key">产业链：</span>
                <span class="stat-num">16 条</span>
              </div>
              <div class="stat-row">
                <span class="stat-key">子节点：</span>
                <span class="stat-num">461 个</span>
              </div>
              <div class="stat-row">
                <span class="stat-key">企业数：</span>
                <span class="stat-num">2,896,263 家</span>
              </div>
              <div class="stat-row">
                <span class="stat-key">惠企政策：</span>
                <span class="stat-num">87,619 项</span>
              </div>
              <div class="stat-row">
                <span class="stat-key">惠及企业：</span>
                <span class="stat-num">413,244 家</span>
              </div>
            </div>
          </div>
          <div class="industry-card">
            <div class="industry-title">新材料</div>
            <div class="industry-stats">
              <div class="stat-row">
                <span class="stat-key">产业链：</span>
                <span class="stat-num">54 条</span>
              </div>
              <div class="stat-row">
                <span class="stat-key">子节点：</span>
                <span class="stat-num">1085 个</span>
              </div>
              <div class="stat-row">
                <span class="stat-key">企业数：</span>
                <span class="stat-num">2,750,457 家</span>
              </div>
              <div class="stat-row">
                <span class="stat-key">惠企政策：</span>
                <span class="stat-num">76,216 项</span>
              </div>
              <div class="stat-row">
                <span class="stat-key">惠及企业：</span>
                <span class="stat-num">303,870 家</span>
              </div>
            </div>
          </div>
          <div class="industry-card highlight">
            <div class="industry-title">生物</div>
            <div class="industry-stats">
              <div class="stat-row">
                <span class="stat-key">产业链：</span>
                <span class="stat-num">17 条</span>
              </div>
              <div class="stat-row">
                <span class="stat-key">子节点：</span>
                <span class="stat-num">381 个</span>
              </div>
              <div class="stat-row">
                <span class="stat-key">企业数：</span>
                <span class="stat-num">2,590,798 家</span>
              </div>
              <div class="stat-row">
                <span class="stat-key">惠企政策：</span>
                <span class="stat-num">97,032 项</span>
              </div>
              <div class="stat-row">
                <span class="stat-key">惠及企业：</span>
                <span class="stat-num">246,789 家</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧 -->
      <div class="right">
        <div class="panel"><WordCloud /></div>
        <div class="panel"><IndustrialChain /></div>
        <div class="panel"><CompanyStatus /></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ChinaMap from "./JiangsuMap.vue";
import PolicyTable from "./PolicyTable.vue";
import WordCloud from "./WordCloud.vue";
import GrowthChart from "./Growthchart.vue";
import CompanyStatus from "./CompanyStatus.vue";
import IndustrialChain from "./IndustrialChain.vue";
import DataOverview from "./DataOverview.vue";
</script>

<style scoped>
.screen {
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at center, #0b1a2a, #020611);
  color: #fff;
  overflow: hidden;
  background: url(../../../assets/img/map-bg.jpg) no-repeat 50%;
  background-size: cover;
}

/* 顶部 */
.header {
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
  background: url('../../../assets/img/header-bg.png') no-repeat center;
  background-size: 100%;
}

.title {
  background: linear-gradient(0deg, #98edff, #fff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 2.083vw;
  font-weight: 800;
}


.time,
.actions {
  font-size: 0.667vw;
  color: #7ecfff;
}

/* 主体 */
.main {
  display: flex;
  height: calc(100% - 80px);
  padding: 20px;
  box-sizing: border-box;
}

/* 左右侧 */
.left,
.right {
  width: 28%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 中间 */
.center {
  flex: 1;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
}

/* 面板 */
.panel {
  flex: 1;
  /* border: 1px solid rgba(0, 255, 255, 0.3); */
  padding: 10px;
  position: relative;
  background: rgba(0, 20, 40, 0.6);
  overflow: hidden;

    background: url('../../../assets/img/content_bg.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    height: 15.156vw
}

/* 中间总数 */
.total {
  text-align: center;
  margin-bottom: 10px;
}

.total .label {
  color: #7ecfff;
  font-size: 18px;
}

.total .number {
  font-style: italic;
  color: #00c4d1;
  font-family: DOUYU;
  font-size: 1.875vw;
  font-weight: bold;
  text-shadow:
    0 0 0.417vw rgba(0, 196, 209, 0.4),
    0 0 0.833vw rgba(0, 196, 209, 0.4),
    0 0 1.25vw rgba(0, 196, 209, 0.4);
}

/* 数据统计卡片 */
.stats-cards {
  display: flex;
  justify-content: space-around;
  gap: 15px;
}

.stat-card {
  flex: 1;
  /* background: linear-gradient(
    135deg,
    rgba(0, 100, 200, 0.3),
    rgba(0, 50, 100, 0.2)
  );
  border: 1px solid rgba(0, 210, 255, 0.3); */
  border-radius: 8px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.stat-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s;
}

.stat-card:hover::before {
  left: 100%;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: rgba(0, 210, 255, 0.6);
  box-shadow: 0 4px 20px rgba(0, 210, 255, 0.3);
}

.stat-icon {
  color: #00d2ff;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
}

.stat-label {
  color: #7ecfff;
  font-size: 0.9vw;
  margin-bottom: 8px;
}

.stat-value {
  color: #00ffff;
  font-size: 1vw;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  background: url("../../../assets/img/title-bg.png") no-repeat 50%;
  background-size: cover;
  height: 2.188vw;
  width: 7.396vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 地图 */
.map {
  flex: 1;
  /* border: 1px solid rgba(0, 255, 255, 0.3); */
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 产业板块数据卡片 */
.industry-cards {
  display: flex;
  gap: 12px;
}

.industry-card {
  flex: 1;
  background: linear-gradient(
    135deg,
    rgba(0, 50, 100, 0.4),
    rgba(0, 30, 60, 0.3)
  );
  border: 1px solid rgba(0, 210, 255, 0.4);
  border-radius: 6px;
  padding: 10px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.industry-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #00d2ff, transparent);
  opacity: 0.6;
}

.industry-card.highlight {
  border-color: rgba(0, 255, 200, 0.6);
  box-shadow: 0 0 20px rgba(0, 255, 200, 0.2);
}

.industry-card.highlight::before {
  background: linear-gradient(90deg, transparent, #00ffc8, transparent);
}

.industry-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(0, 210, 255, 0.4);
  border-color: rgba(0, 210, 255, 0.8);
}

.industry-title {
  color: #00d2ff;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 210, 255, 0.5);
}

.industry-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  line-height: 1.5;
}

.stat-key {
  color: #7ecfff;
  flex-shrink: 0;
}

.stat-num {
  color: #00ffff;
  font-weight: bold;
  text-align: right;
  text-shadow: 0 0 8px rgba(0, 255, 255, 0.4);
}

/* 底部卡片 */
.bottom-cards {
  display: flex;
  gap: 10px;
}

.card {
  flex: 1;
  border: 1px solid rgba(0, 255, 255, 0.3);
  padding: 10px;
  text-align: center;
}
</style>
