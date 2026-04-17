<template>
  <div class="table">
    <div class="title">政策概况</div>
    <el-table
      :data="list"
      class="custom-table"
      size="small"
      :row-class-name="getRowClassName"
    >
      <el-table-column prop="rank" label="序号" width="60">
        <template #default="scope">
          <span class="rank-badge">{{ scope?.row?.rank || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        align="left"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="num1"
        label="惠企政策数"
        align="right"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="num2"
        label="惠及企业数"
        align="right"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="num3"
        label="补贴额(亿)	"
        align="right"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="proportion"
        label="占比"
        align="right"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const list = [
  {
    rank: 1,
    name: "工业和信息化部",
    num1: 2573,
    num2: 2049880,
    num3: 4096.4,
    proportion: "54%",
  },
  {
    rank: 2,
    name: "科学技术部",
    num1: 2686,
    num2: 842749,
    num3: 1076.4,
    proportion: "14%",
  },
  {
    rank: 3,
    name: "人力资源和社会保障部",
    num1: 2194,
    num2: 2859224,
    num3: 757.9,
    proportion: "10%",
  },
  {
    rank: 4,
    name: "商务部",
    num1: 557,
    num2: 366240,
    num3: 544.3,
    proportion: "7%",
  },
  {
    rank: 5,
    name: "农业农村部",
    num1: 1368,
    num2: 237861,
    num3: 292.6,
    proportion: "4%",
  },
  {
    rank: 6,
    name: "财政部",
    num1: 115,
    num2: 44028,
    num3: 135.6,
    proportion: "2%",
  },
];

// 当前高亮的行索引
const highlightIndex = ref(0);
// 定时器
let timer = null;

// 获取行类名
const getRowClassName = ({ rowIndex }) => {
  if (rowIndex === 0) return "first-row";
  if (rowIndex === 1) return "second-row";
  if (rowIndex === 2) return "third-row";
  return rowIndex === highlightIndex.value ? "highlight-row" : "";
};

// 开始轮播高亮效果
const startAutoHighlight = () => {
  timer = setInterval(() => {
    highlightIndex.value = (highlightIndex.value + 1) % list.length;
  }, 2000); // 每2秒切换一次高亮行
};

onMounted(() => {
  startAutoHighlight();
});

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped lang="scss">
/* 表格深度定制 */
.custom-table {
  background-color: transparent !important;
  margin-top: 5px;
  border: none;
  height: 100%;
  ::v-deep .el-table__body-wrapper {
    overflow-y: auto;
  }

  &::before {
    display: none;
  } // 去掉底部白线

  ::v-deep tr {
    background-color: transparent !important;
    color: #a5d8ff;
    font-size: 0.677vw;
    transition: all 0.5s ease;
  }

  ::v-deep th {
    background-color: rgba(0, 110, 255, 0.2) !important;
    color: #fff;
    border-bottom: 1px solid #0b4c9e;
    font-size: 0.688vw;
  }

  ::v-deep td {
    border-bottom: 1px solid rgba(11, 76, 158, 0.3);
  }
  ::v-deep.el-table th > .cell {
    color: #fff !important;
    // padding: 0 4px;
  }

  /* 第一行红色 */
  ::v-deep .first-row {
    color: #ff4d4f !important;
  }

  /* 第二行蓝色 */
  ::v-deep .second-row {
    color: #1890ff !important;
  }

  /* 第三行绿色 */
  ::v-deep .third-row {
    color: #52c41a !important;
  }

  /* 高亮行样式 */
  ::v-deep .highlight-row {
    background-color: rgba(0, 110, 255, 0.15) !important;
    animation: highlightPulse 2s ease-in-out;
  }

  @keyframes highlightPulse {
    0% {
      background-color: rgba(0, 110, 255, 0.3);
    }
    100% {
      background-color: rgba(0, 110, 255, 0.15);
    }
  }

  /* 序号图标样式 */
  .rank-badge {
    background: #0066cc;
    color: #fff;
    padding: 0.104vw 0.417vw;
    border-radius: 0.208vw;
    font-size: 0.625vw;
  }
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
</style>
