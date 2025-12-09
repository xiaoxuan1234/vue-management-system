<script setup>
import navVue from "./components/nav.vue";
import contentVue from "./components/content.vue";
import { usedataStore } from "./stores/data.js";

const dataStore = usedataStore();
dataStore.userAdd(); // 触发数据变化
console.log(dataStore.users);
</script>

<template>
  <div class="body">
    <nav-vue />
    <content-vue />
  </div>
</template>

<style scoped>
.body {
  display: flex;
  width: inherit;
  height: inherit;
}
</style>
