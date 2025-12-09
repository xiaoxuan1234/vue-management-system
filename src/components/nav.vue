<script setup></script>
<template>
  <nav>
    <div class="LOGO">🛒电商管理系统</div>
    <el-menu
      class="nav-item"
      background-color="#171e38"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-sub-menu index="1">
        <template #title>商品管理</template>
        <el-menu-item>选项1</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>订单管理</template>
        <el-menu-item>选项1</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>用户管理</template>
        <el-menu-item>选项1</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>系统设置</template>
        <el-menu-item>选项1</el-menu-item>
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
  height: 60px;
  color: #fff;
  border-bottom: solid 1px #9493934b;
}

.el-menu {
  flex: 1;
  border-right: none;
}
</style>
