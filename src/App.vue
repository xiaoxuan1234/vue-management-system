<script setup>
import navVue from "./components/nav.vue";
import contentVue from "./components/content.vue";
import { usedataStore } from "./stores/data.js";

const dataStore = usedataStore();
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

<style>
/* 全局tooltip样式 */
.el-popper.is-light.is-pure,
.el-popper.is-dark {
  max-width: 400px !important;
  white-space: normal !important;
  word-break: break-all !important;
}
</style>
