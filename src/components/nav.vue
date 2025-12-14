<script setup>
import { ref, reactive } from "vue";
import { usedataStore } from "../stores/data.js";
const dataStore = usedataStore();
const Addtag = (name, title) => {
  dataStore.tabAdd(name, title);
};
</script>
<template>
  <nav>
    <div class="LOGO">🛒电商管理系统</div>
    <el-menu
      class="nav-item"
      background-color="#171e38"
      text-color="#fff"
      active-text-color="#409eff"
      :default-active="dataStore.selectedName"
    >
      <el-sub-menu index="1">
        <template #title> 首页 </template>
        <el-menu-item index="home" @click="Addtag('home', '首页')"
          >首页</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title> 商品管理 </template>
        <el-menu-item index="products" @click="Addtag('products', '商品管理')"
          >商品管理</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>订单管理</template>
        <el-menu-item index="orders" @click="Addtag('orders', '订单管理')"
          >订单管理</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>用户管理</template>
        <el-menu-item index="users" @click="Addtag('users', '用户管理')"
          >用户管理</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu index="5">
        <template #title>系统设置</template>
        <el-menu-item index="set" @click="Addtag('set', '系统设置')"
          >系统设置</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </nav>
</template>

<style scoped>
nav {
  flex: 0 0 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #171e38;
}

.LOGO {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  height: 55px;
  color: #fff;
  border-bottom: solid 1px #9493934b;
}

.el-menu {
  flex: 1;
  border-right: none;
}
</style>
