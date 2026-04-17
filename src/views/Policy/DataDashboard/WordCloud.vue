<template>
  <div class="chart-box">
    <div class="title">产业主题</div>
    <div ref="cloudRef" class="cloud"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import "echarts-wordcloud";
import { onMounted, ref } from "vue";

const cloudRef = ref();

onMounted(() => {
  const chart = echarts.init(cloudRef.value);

  chart.setOption({
    // 深蓝色背景，和原图一致
    backgroundColor: "#0a1a3f",
    // 标题（可选，原图左上角有「产业主题」，可按需开启）
    // title: {
    //   text: "产业主题",
    //   left: "10%",
    //   top: 20,
    //   textStyle: {
    //     color: "#ffffff",
    //     fontSize: 20,
    //     fontWeight: "bold",
    //     fontFamily: "Microsoft YaHei",
    //   },
    // },
    series: [
      {
        type: "wordCloud", // 词云图类型
        // 布局配置（完全匹配原图）
        shape: "rectangle", // 矩形自由排布
        gridSize: 10, // 词间距
        sizeRange: [10, 32], // 字号范围（最小/最大，对应权重）
        rotationRange: [0, 0], // 全部横向，不旋转
        left: "center",
        top: "center",
        width: "92%",
        height: "85%",
        // 关键词数据（按原图视觉权重排序，value 决定字号大小）
        data: [
          { name: "半导体设备", value: 100 },
          { name: "智能音箱", value: 95 },
          { name: "生物识别", value: 90 },
          { name: "钒液流电池", value: 88 },
          { name: "触摸屏", value: 85 },
          { name: "自动驾驶", value: 82 },
          { name: "光通信", value: 80 },
          { name: "能源互联网", value: 78 },
          { name: "边缘计算", value: 75 },
          { name: "智能交通", value: 72 },
          { name: "显示器", value: 70 },
          { name: "网约车", value: 65 },
          { name: "精密光电薄膜元件", value: 60 },
          { name: "智慧停车", value: 55 },
          { name: "3D玻璃", value: 52 },
          { name: "智能语音", value: 50 },
          { name: "OLED", value: 48 },
          { name: "LED", value: 45 },
          { name: "智能座舱", value: 42 },
          { name: "3D成像", value: 40 },
          { name: "小程序", value: 38 },
          { name: "激光雷达", value: 36 },
          { name: "ChatGPT", value: 35 },
          { name: "智能汽车", value: 32 },
          { name: "蓝宝石", value: 30 },
        ],
        // 文字样式（多色随机显示）
        textStyle: {
          color: function () {
            const colors = [
              "#ff6b6b", // 红色
              "#4ecdc4", // 青色
              "#45b7d1", // 蓝色
              "#96ceb4", // 绿色
              "#ffeaa7", // 黄色
              "#ff9ff3", // 粉色
              "#f7b500", // 橙色
              "#86d8f2", // 浅蓝
              "#67c23a", // 亮绿
              "#ff4d4f", // 鲜红
              "#409eff", // 天蓝
              "#e6a23c", // 金黄
            ];
            return colors[Math.floor(Math.random() * colors.length)];
          },
          fontFamily: "Microsoft YaHei, sans-serif",
          fontWeight: "bold",
        },
        //  hover 高亮效果（可选）
        emphasis: {
          shadowBlur: 10,
          shadowColor: "#333",
          textStyle: {
            fontSize: 40,
          },
        },
      },
    ],
  });
    // 响应式调整
  window.addEventListener("resize", () => {
    chart && chart.resize();
  });
});
</script>

<style scoped>
.cloud {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.chart-box {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.title {
  color: #00eaff;
  font-size: 0.833vw;
  background: url("../../../assets/img/title_bg.png") no-repeat;
  background-size: 100% auto;
  box-sizing: border-box;
  font-size: 1vw;
  height: 2vw;
  padding-left: 2.656vw;
  position: relative;
  font-style: italic;
}

.chart {
  flex: 1;
}
</style>
