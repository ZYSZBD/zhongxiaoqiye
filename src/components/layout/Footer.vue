<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-left">
        <div class="top-links">
          <div class="nav-links">
            <span>中华人民共和国工业和信息化部</span>
            <span>中国中小企业服务网</span>
            <span>江苏省工业和信息化厅</span>
            <span>“一企来办”企业综合服务平台</span>
          </div>
          <div class="system-select">
            <!-- <el-select v-model="system" placeholder="服务体系" size="small">
              <el-option label="省级平台" value="1" />
            </el-select> -->
             <el-select v-model="system" placeholder="Select" size="small" style="width: 180px">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
          </div>
        </div>

        <div class="info-card">
          <div class="card-logo">
            <img src="../../assets/img/icon-foot-1.png" alt="logo" />
          </div>
          <div class="card-content">
            <div class="sub-links">
              <a href="#">关于我们</a>
              <span class="divider">|</span>
              <a href="#">用户服务协议</a>
            </div>
            <div class="unit-details">
              <span>主管单位：江苏省工业和信息化厅</span>
              <span>版权所有：江苏省中小企业发展服务中心 / 江苏省新技术推广站</span>
              <span>技术支持：江苏苏豪智能科技有限公司</span>
            </div>
          </div>
        </div>

        <div class="beian-info">
          <span>苏公网安备 32010602011241号</span>
          <span class="icp">苏ICP备10212819-4号</span>
        </div>
      </div>

      <div class="footer-right">
        <div class="qr-box">
          <div class="qr-img"><img src="../../assets/img/erweima.png" alt="公众号" /></div>
          <div class="qr-text">
            <p>公众号</p>
            <p class="action">扫一扫关注</p>
          </div>
        </div>
        <div class="qr-box">
          <div class="qr-img"><img src="../../assets/img/erweima.png" alt="小程序" /></div>
          <div class="qr-text">
            <p>小程序</p>
            <p class="action">扫码体验</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
const system = ref('服务体系');
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<style scoped>
.app-footer {
  background-color: #004a92; /* 还原设计图背景色 */
  color: #fff;
  padding: 40px 0;
  font-family: "Microsoft YaHei", sans-serif;
}

.footer-container {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 10%;
  gap: 5%;
}

/* 左侧样式 */
.footer-left {
  flex: 1;
}

.top-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.nav-links span {
  font-size: 14px;
  margin-right: 25px;
  opacity: 0.9;
  cursor: pointer;
}

/* 调整 Select 样式 */
:deep(.el-input__wrapper) {
  background-color: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  box-shadow: none !important;
}
:deep(.el-input__inner) {
  color: #fff !important;
}

/* 信息卡片样式 */
.info-card {
  background: rgba(255, 255, 255, 0.05); /* 半透明背景 */
  border-radius: 4px;
  padding: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.card-logo {
  margin-right: 20px;
}

.sub-links {
  margin-bottom: 10px;
}

.sub-links a {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}

.divider {
  margin: 0 15px;
  opacity: 0.5;
}

.unit-details {
  font-size: 12px;
  opacity: 0.7;
  display: flex;
  gap: 20px;
}

.beian-info {
  font-size: 12px;
  opacity: 0.6;
}

.icp {
  margin-left: 30px;
}

/* 右侧二维码样式 */
.footer-right {
  display: flex;
  gap: 15px;
}

.qr-box {
  background: rgba(0, 0, 0, 0.1); /* 扫码区的深色背景块 */
  padding: 15px 10px;
  text-align: center;
  border-radius: 4px;
}

.qr-img {
  background: #fff;
  padding: 5px;
  width: 80px;
  height: 80px;
  margin: 0 auto 10px;
}

.qr-img img {
  width: 100%;
}

.qr-text p {
  margin: 2px 0;
  font-size: 13px;
}

.action {
  font-size: 12px;
  opacity: 0.8;
}
</style>