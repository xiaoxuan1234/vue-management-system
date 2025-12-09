<script setup>
import headerVue from "./header.vue";
</script>
<template>
  <div class="content">
    <headerVue />
    <div class="tag"></div>
    <div class="manage"></div>
  </div>
</template>

<style scoped>
.content {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}
.tag {
  height: 40px;
  background-color: #f8f8f8;
}

.manage {
  flex: 1;
  background-color: #f8f8f8;
}
</style>
