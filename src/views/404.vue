<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <p>抱歉，您访问的页面不存在</p>
      <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
};
</script>

<style scoped>
.not-found {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  text-align: center;
}

.content h1 {
  font-size: 120px;
  color: #409EFF;
  margin: 0 0 20px;
  line-height: 1;
}

.content p {
  color: #999;
  margin-bottom: 30px;
  font-size: 18px;
}
</style>
