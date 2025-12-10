import { createApp } from "vue";

import { createPinia } from "pinia";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs"; // 中文语言包
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(pinia);
app.use(ElementPlus, { locale: zhCn });
app.mount("#app");
