<script setup>
import { ref, reactive } from "vue";
import headerVue from "./header.vue";
import { usedataStore } from "../stores/data.js";
import ProductsManage from "./ProductsManage.vue";
import OrdersManage from "./OrdersManage.vue";
import UsersManage from "./UsersManage.vue";
import SetManage from "./SetManage.vue";
const dataStore = usedataStore();
const datatab = dataStore.tab;
const components = {
  products: ProductsManage,
  orders: OrdersManage,
  users: UsersManage,
  set: SetManage,
};
const tabRemove = (name) => {
  const index = datatab.findIndex((item) => item.name === name);
  if (index === -1) return;
  datatab.splice(index, 1);
  if (datatab.length > 0) {
    const newIndex = index > 0 ? index - 1 : 0;
    dataStore.selectedName = datatab[newIndex].name;
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
          v-for="(value, key) in datatab"
          :key="value.name"
          :label="value.title"
          :name="value.name"
          >{{ value.content }}</el-tab-pane
        >
      </el-tabs>
    </div>
    <div class="manage" v-if="datatab.length > 0">
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
