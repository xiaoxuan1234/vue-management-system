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
