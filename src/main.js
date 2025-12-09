import { createApp } from "vue";

import { createPinia } from "pinia";

import ElementPlus from "element-plus"; //导入 ElementPlus 组件库的所有模块和功能
import "element-plus/dist/index.css"; //导入 ElementPlus 组件库所需的全局 CSS 样式
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(pinia);
app.use(ElementPlus);
app.mount("#app");
