<template>
  <div class="top-left-module">
    <iframe 
      src="http://10.23.5.35:8080/test/zt/testlist" 
      frameborder="0" 
      class="embedded-iframe"
    ></iframe>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.top-left-module {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.embedded-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
