<template>
  <div class="chart-box">
    <div class="title">增长情况</div>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const chartRef = ref()
let chart = null
let timer = null

onMounted(() => {
  if (!chartRef.value) return
  
  const container = chartRef.value
  if (container.offsetWidth === 0 || container.offsetHeight === 0) {
    setTimeout(() => initChart(), 100)
    return
  }
  
  initChart()
})

const initChart = () => {
  chart = echarts.init(chartRef.value)

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderColor: '#00ffff',
      textStyle: { color: '#fff' }
    },

    legend: {
      top: 10,
      textStyle: { color: '#fff' },
      data: ['小巨人', '高新技术企业', '科技型中小企业']
    },

    grid: {
      left: '5%',
      right: '5%',
      bottom: '8%',
      top: '20%',
      containLabel: true
    },

    xAxis: {
      type: 'category',
      data: ['2022年度', '2023年度', '2024年度'],
      axisLine: {
        lineStyle: { color: '#00ffff' }
      },
      axisLabel: { color: '#fff' }
    },

    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: { color: '#00ffff' }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.1)'
        }
      },
      axisLabel: { color: '#fff' }
    },

    series: [
      {
        name: '小巨人',
        type: 'bar',
        barWidth: 18,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00eaff' },
            { offset: 1, color: '#005eff' }
          ])
        },
        data: [12000, 18000, 5640]
      },
      {
        name: '高新技术企业',
        type: 'bar',
        barWidth: 18,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00ffa6' },
            { offset: 1, color: '#00c853' }
          ])
        },
        data: [280000, 450000, 143719]
      },
      {
        name: '科技型中小企业',
        type: 'bar',
        barWidth: 18,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#66ffcc' },
            { offset: 1, color: '#009688' }
          ])
        },
        data: [150000, 300000, 306535]
      }
    ]
  }

  chart.setOption(option)
  
  // 启动自动轮播
  startAutoPlay()

  window.addEventListener('resize', () => {
    chart && chart.resize()
  })
}

// 自动轮播功能
const startAutoPlay = () => {
  let currentIndex = -1
  const seriesCount = 3 // 系列数量
  const dataCount = 3 // 每个系列的数据量
  
  timer = setInterval(() => {
    // 取消之前的高亮
    if (currentIndex !== -1) {
      for (let i = 0; i < seriesCount; i++) {
        chart.dispatchAction({
          type: 'downplay',
          seriesIndex: i,
          dataIndex: currentIndex
        })
      }
    }
    
    // 计算下一个索引
    currentIndex = (currentIndex + 1) % dataCount
    
    // 高亮当前数据
    for (let i = 0; i < seriesCount; i++) {
      chart.dispatchAction({
        type: 'highlight',
        seriesIndex: i,
        dataIndex: currentIndex
      })
    }
    
    // 显示提示框
    chart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: currentIndex
    })
  }, 2000) // 每2秒切换一次
}

onBeforeUnmount(() => {
  // 清除定时器
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  // 销毁图表实例
  if (chart) {
    chart.dispose()
    chart = null
  }
})
</script>

<style scoped>
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