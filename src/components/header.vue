<script setup>
import { usedataStore } from "../stores/data.js";
const dataStore = usedataStore();
const user = dataStore.user.find((item) => item.id === dataStore.activeuserId);
</script>
<template>
  <header>
    <el-dropdown trigger="click">
      <div class="user">
        <img class="head-portrait" :src="user.Icon" />
        <span>{{ user.username }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item divided style="color: #e74c3c"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </header>
</template>
<style scoped>
header {
  height: 60px;
  background-color: #fff;
  border-bottom: solid 1px #9493934b;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
img {
  background-color: blue;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user,
.el-dropdown {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 30px;
}
</style>
