<script setup>
import { ref, reactive, computed } from "vue";
import { usedataStore } from "../stores/data.js";
import { ElMessage } from "element-plus";
const dataStore = usedataStore();

const user = computed(() => {
  return dataStore.users.find((item) => item.id === dataStore.activeuserId);
});
const drawerVisible = ref(false);
const form = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const loginmessage = reactive({
  name: "",
  password: "",
});

const formRef = ref();
const rules = {
  oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
  newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请输入确认密码", trigger: "blur" },
  ],
};

const hint = (type, message) => {
  ElMessage({
    type: type,
    message: message,
    showClose: true,
  });
};
const submit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (form.oldPassword !== user.value.password) {
        hint("error", "旧密码错误");
      } else if (form.newPassword !== form.confirmPassword) {
        hint("error", "新密码与确认密码不一样");
      } else if (form.oldPassword === form.newPassword) {
        hint("error", "新密码与旧密码一样");
      } else {
        user.value.password = form.newPassword;
        hint("success", "修改密码成功");
        drawerClose();
      }
    }
  });
};

const drawerClose = () => {
  formRef.value?.clearValidate();
  form.oldPassword = "";
  form.newPassword = "";
  form.confirmPassword = "";
  drawerVisible.value = false;
};

const logOut = () => {
  dataStore.activeuserId = 0;
};

const login = () => {
  const foundUser = dataStore.users.find(
    (item) => item.username === loginmessage.name
  );
  if (!foundUser) {
    hint("error", "用户不存在");
    return;
  }
  if (foundUser.password !== loginmessage.password) {
    hint("error", "密码错误");
    return;
  }
  dataStore.activeuserId = foundUser.id;
  hint("success", "登录成功");
  loginVisible.value = false;
  loginmessage.name = "";
  loginmessage.password = "";
};

const loginVisible = ref(false);

const handleUserClick = () => {
  if (dataStore.activeuserId === 0) {
    loginVisible.value = true;
  }
};
</script>
<template>
  <header>
    <!-- 已登录：显示下拉菜单 -->
    <el-dropdown v-if="dataStore.activeuserId !== 0" trigger="click">
      <div class="user">
        <img class="head-portrait" :src="user?.Icon" />
        <span>{{ user?.username }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click="drawerVisible = true"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item divided style="color: #e74c3c" @click="logOut"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 未登录：点击打开登录弹窗 -->
    <div v-else class="user" @click="handleUserClick">
      <img class="head-portrait" :src="user?.Icon" />
      <span>未登录</span>
    </div>

    <!-- 登录弹窗 -->
    <el-dialog v-model="loginVisible" title="登录" width="400px">
      <el-form>
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="loginmessage.name" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            show-password
            placeholder="请输入密码"
            v-model="loginmessage.password"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </header>
  <el-drawer
    v-model="drawerVisible"
    :before-close="drawerClose"
    title="修改密码"
    direction="rtl"
    size="500px"
  >
    <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
      <el-form-item label="旧密码" required prop="oldPassword">
        <el-input
          v-model="form.oldPassword"
          show-password
          placeholder="请输入旧密码"
          type="password"
        />
      </el-form-item>
      <el-form-item label="新密码" required prop="newPassword">
        <el-input
          v-model="form.newPassword"
          show-password
          placeholder="请输入密码"
          type="password"
        />
      </el-form-item>
      <el-form-item label="确认密码" required prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          show-password
          placeholder="请输入确认密码"
          type="password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style scoped>
header {
  height: 55px;
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
