<template>
  <div class="chart-box">
    <div class="title">企业状态</div>
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
      data: ['企业数量', '增长率']
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
      data: ['制造业', '科技', '金融', '医疗', '教育', '能源', '物流'],
      axisLine: {
        lineStyle: { color: '#00ffff' }
      },
      axisLabel: {
        color: '#fff',
        interval: 0,
        rotate: 20
      }
    },

    yAxis: [
      {
        type: 'value',
        name: '企业数量',
        axisLine: {
          lineStyle: { color: '#00ffff' }
        },
        splitLine: {
          lineStyle: { color: 'rgba(255,255,255,0.1)' }
        },
        axisLabel: { color: '#fff' }
      },
      {
        type: 'value',
        name: '增长率',
        axisLine: {
          lineStyle: { color: '#ffd54f' }
        },
        axisLabel: {
          color: '#ffd54f',
          formatter: '{value}%'
        },
        splitLine: { show: false }
      }
    ],

    series: [
      {
        name: '企业数量',
        type: 'bar',
        barWidth: 16,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00eaff' },
            { offset: 1, color: '#005eff' }
          ])
        },
        data: [120000, 150000, 90000, 80000, 60000, 110000, 70000]
      },
      {
        name: '增长率',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#ffd54f'
        },
        lineStyle: {
          width: 2,
          color: '#ffd54f'
        },
        data: [2.5, 3.2, 4.5, 3.8, 2.1, 5.0, 3.3]
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
  const dataCount = 7 // 数据项数量（7个行业）
  
  timer = setInterval(() => {
    // 取消之前的高亮
    if (currentIndex !== -1) {
      chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex
      })
      chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 1,
        dataIndex: currentIndex
      })
    }
    
    // 计算下一个索引
    currentIndex = (currentIndex + 1) % dataCount
    
    // 高亮当前数据（柱状图和折线图）
    chart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentIndex
    })
    chart.dispatchAction({
      type: 'highlight',
      seriesIndex: 1,
      dataIndex: currentIndex
    })
    
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