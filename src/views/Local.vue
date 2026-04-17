<template>
  <div class="local container">
    <app-breadcrumb :items="[{ name: '联市县' }]" />
    
    <div class="content-box">
      <h1 class="page-title">联市县</h1>
   
    </div>
  </div>
</template>

<script>
export default {
  name: 'Local'
};
</script>

<style scoped>
.container {
  width: 1200px;
  margin: 20px auto;
}

.content-box {
  margin-top: 30px;
  background: #fff;
  padding: 40px;
  border-radius: 4px;
  min-height: 500px;
}

.page-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 28px;
}
</style>
