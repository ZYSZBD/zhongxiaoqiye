<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item 
      v-for="(item, index) in items" 
      :key="index"
      :to="item.path ? { path: item.path } : undefined"
      @click="handleClick(item)"
      :style="item.style"
    >
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'AppBreadcrumb',
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    handleClick(item) {
      if (item.action === 'back') {
        this.$router.back();
      }
    }
  }
};
</script>
