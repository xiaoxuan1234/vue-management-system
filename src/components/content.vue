<script setup>
import { ref, reactive } from "vue";
import headerVue from "./header.vue";
import { usedataStore } from "../stores/data.js";
import ProductsManage from "./ProductsManage.vue";
import OrdersManage from "./OrdersManage.vue";
import UsersManage from "./UsersManage.vue";
import SetManage from "./SetManage.vue";
import home from "./home.vue";
const dataStore = usedataStore();
const components = {
  home: home,
  products: ProductsManage,
  orders: OrdersManage,
  users: UsersManage,
  set: SetManage,
};
const tabRemove = (name) => {
  const index = dataStore.tab.findIndex((item) => item.name === name);
  if (index === -1) return;
  dataStore.tab.splice(index, 1);
  if (dataStore.tab.length > 0) {
    const newIndex = index > 0 ? index - 1 : 0;
    dataStore.selectedName = dataStore.tab[newIndex].name;
  }
};
</script>
<template>
  <div class="content">
    <headerVue />
    <div class="tag">
      <el-tabs
        v-model="dataStore.selectedName"
        type="card"
        closable
        @tab-remove="tabRemove"
      >
        <el-tab-pane
          v-for="(value, key) in dataStore.tab"
          :key="value.name"
          :label="value.title"
          :name="value.name"
          >{{ value.content }}</el-tab-pane
        >
      </el-tabs>
    </div>
    <div class="manage" v-if="dataStore.tab.length > 0">
      <component :is="components[dataStore.selectedName]" />
    </div>
  </div>
</template>

<style scoped>
.content {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
  overflow: hidden;
}
.tag {
  height: 40px;
  background-color: #f8f8f8;
}

.manage {
  flex: 1;
  background-color: #f8f8f8;
  overflow: auto;
}
</style>
