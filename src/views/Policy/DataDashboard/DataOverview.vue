<template>
  <div class="top-left-module">
    <div class="title">数据概览</div>
    <img src="../../../assets/img/data.png" alt="" style="width:100%" />
  </div>
</template>

<script setup>
const dataPolicy = [
  { label: "政策文件", value: "4716万+" },
  { label: "政策数量", value: "2万+" },
];
const dataIndustry = [
  { label: "产业主题", value: "100+" },
  { label: "供应链", value: "180亿+" },
];
const dataEnterprise = [
  { label: "工商信息", value: "1.9亿+" },
  { label: "企业资质", value: "4500万+" },
  { label: "信用数据", value: "3亿+" },
  { label: "投融资", value: "7500万+" },
];
</script>

<style scoped lang="scss">
.top-left-module {
  position: relative;
  overflow: hidden;
}

/* 标题样式：契合左上角边框 */
.module-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  .header-content {
    display: flex;
    align-items: center;
    gap: 8px;

    .icon-decorate {
      width: 4px;
      height: 18px;
      background: #00f2ff;
      display: inline-block;
    }

    .title-text {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      letter-spacing: 2px;
      text-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
    }
  }

  .header-line {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, #00f2ff, transparent);
    margin-top: 4px;
  }
}

.data-group {
  margin-bottom: 10px;

  .group-title {
    font-size: 10px;
    color: rgba(0, 242, 255, 0.6);
    margin-bottom: 8px;
    font-family: Arial, sans-serif;
  }
}

.items-wrap {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  &.grid-style {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

/* 极简卡片 */
.mini-card {
  flex: 1;
  min-width: 100px;
  background: rgba(255, 255, 255, 0.05);
  padding: 3px 12px;
  border-left: 2px solid #00f2ff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .lab {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 2px;
  }

  .val {
    font-size: 18px;
    font-weight: bold;
    color: #00f2ff;
    font-family: "DIN Alternate", sans-serif;
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
