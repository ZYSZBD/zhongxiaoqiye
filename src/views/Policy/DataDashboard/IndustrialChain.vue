<template>
  <div class="chart-box">
    <div class="title">产业链分析</div>
    <img src="../../../assets/img/fenxi.png" alt="" style="width:100%" />
    <!-- <div ref="chartRef" class="chart"></div> -->
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

const chartRef = ref();


</script>

<style scoped >
.chart-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
