<template>
  <div ref="mapRef" class="map" style="height:100%"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, onBeforeUnmount, ref } from "vue";
import jiangsuJson from "@/assets/json/jiangsu.json"; // 👉 江苏地图JSON

const mapRef = ref();
let chart = null;
let tooltipTimer = null;

onMounted(() => {
  if (!mapRef.value) return;

  const container = mapRef.value;
  if (container.offsetWidth === 0 || container.offsetHeight === 0) {
    setTimeout(() => initMap(), 100);
    return;
  }

  initMap();
});

const initMap = () => {
  // 注册江苏地图
  echarts.registerMap("jiangsu", jiangsuJson);

  chart = echarts.init(mapRef.value);

  chart.setOption({
    backgroundColor: "transparent",
    tooltip: {
      show: true,
      trigger: "item",
      backgroundColor: "rgba(0, 15, 44, 0.8)",
      borderColor: "#00d2ff",
      borderWidth: 1,
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
      formatter: function (params) {
        return `
        <div style="padding: 10px;">
          <b style="color: #00d2ff; font-size: 0.7vw;">${params.name}</b><br/>
          <hr style="border:none; border-top: 1px solid rgba(0, 210, 255, 0.3); margin: 5px 0;" />
          政策数量：<span style="color: #ff4d4f;">${Math.floor(
            Math.random() * 20,
          )}</span> 条<br/>
          专精特新企业：<span style="color: #73d13d;">${Math.floor(
            Math.random() * 20,
          )}</span> 家
        </div>
      `;
      },
    },
    
    geo: {
        map: 'jiangsu',
        show: true,
        roam: false,
        zoom:1.1,
        label: {
            emphasis: {
                show: false
            }
        },
        layoutSize: "100%",
        itemStyle: {
            normal: {
                borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00F6FF'
                }, {
                    offset: 1,
                    color: '#53D9FF'
                }], false),
                borderWidth: 3,
                shadowColor: 'rgba(10,76,139,1)',
                shadowOffsetY: 0,
                shadowBlur: 60
            }
        }
    },
    series: [
      {
        type: "map", // 改为2D地图
        map: "jiangsu",
        name: "江苏地图",
        roam: false, // 禁止缩放和平移
          //  aspectScale: 0.75,
        zoom:1.1,
        label: {
          show: true,
          color: "#fff",
          fontSize: 12,
          fontWeight: "bold",
        },
        emphasis: {
          label: {
            show: true,
            color: "#fff",
            fontSize: 14,
          },
          itemStyle: {
            areaColor: "#00f6ff",
            shadowBlur: 10,
            shadowColor: "#00d2ff",
          },
        },
         itemStyle: {
            normal: {
                areaColor: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#073684' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: '#061E3D' // 100% 处的颜色
                    }],
                },
                borderColor: '#215495',
                borderWidth: 1,
            },
            emphasis: {
                areaColor: {

                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#073684' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: '#061E3D' // 100% 处的颜色
                    }],
                },
            }
        },
        select: {
          itemStyle: {
            areaColor: "#00f6ff",
          },
        },
      },
    ],
  });

  // 启动 tooltip 自动轮播
  startTooltipAutoPlay();

  // 响应式调整
  window.addEventListener("resize", () => {
    chart && chart.resize();
  });
};

// Tooltip 自动轮播功能
const startTooltipAutoPlay = () => {
  let currentIndex = -1;

  // 获取地图的所有区域名称
  const regions = jiangsuJson.features.map(
    (feature) => feature.properties.name,
  );
  const dataCount = regions.length;

  if (dataCount === 0) return;

  tooltipTimer = setInterval(() => {
    // 取消之前的高亮
    if (currentIndex !== -1) {
      chart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: currentIndex, // 2D地图使用dataIndex
      });
    }

    // 计算下一个索引
    currentIndex = (currentIndex + 1) % dataCount;

    // 高亮当前区域
    chart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: currentIndex, // 2D地图使用dataIndex
    });

    // 显示 tooltip
    chart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: currentIndex, // 2D地图使用dataIndex
    });
  }, 2000); // 每2秒切换一次
};

onBeforeUnmount(() => {
  // 清除 tooltip 定时器
  if (tooltipTimer) {
    clearInterval(tooltipTimer);
    tooltipTimer = null;
  }

  // 销毁图表实例
  if (chart) {
    chart.dispose();
    chart = null;
  }
});
</script>