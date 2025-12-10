<script setup>
import { ref } from "vue";
import { usedataStore } from "../stores/data.js";
const dataStore = usedataStore();
const searchForm = dataStore.searchForm;
const clear = () => {
  for (let key in searchForm) {
    searchForm[key] = "";
  }
};

const checkPrice = (itemPrice, operator, value) => {
  if (!value) return true;

  switch (operator) {
    case "gt":
      return itemPrice > value; // 大于
    case "lt":
      return itemPrice < value; // 小于
    case "eq":
      return itemPrice === value; // 等于
    case "gte":
      return itemPrice >= value; // 大于等于
    case "lte":
      return itemPrice <= value; // 小于等于
    default:
      return true;
  }
};
const search = () => {
  dataStore.filteredProducts.length = 0;
  const result = dataStore.products.filter((item) => {
    if (searchForm.name && !item.name.includes(searchForm.name)) {
      return false;
    }
    if (
      searchForm.category !== "" &&
      item.category_id !== Number(searchForm.category)
    ) {
      return false;
    }
    if (searchForm.status !== "" && item.status !== Number(searchForm.status)) {
      return false;
    }
    if (
      !checkPrice(item.price, searchForm.priceRange, Number(searchForm.price))
    ) {
      return false;
    }
    return true;
  });
  dataStore.filteredProducts.push(...result);
};
</script>
<template>
  <div class="search">
    <div class="search-select">
      <div class="search-item">
        <div>商品名称</div>
        <el-input v-model="searchForm.name" clearable placeholder="请输入" />
      </div>
      <div class="search-item">
        <div>商品分类</div>
        <el-select
          v-model="searchForm.category"
          style="width: 200px"
          placeholder="请选择"
        >
          <el-option label="手机数码" value="1" />
          <el-option label="智能配件" value="2" />
          <el-option label="运动服饰" value="3" />
        </el-select>
      </div>
      <div class="search-item">
        <div>商品状态</div>
        <el-select
          v-model="searchForm.status"
          style="width: 200px"
          placeholder="请选择"
        >
          <el-option label="上架" value="1" />
          <el-option label="下架" value="0" />
        </el-select>
      </div>
      <div class="search-item">
        <div>商品价格</div>
        <el-input v-model="searchForm.price" clearable placeholder="请输入">
          <template #prepend v-model="priceRange">
            <el-select
              v-model="searchForm.priceRange"
              style="width: 100px"
              placeholder="请选择"
            >
              <el-option label="大于" value="gt" />
              <el-option label="小于" value="lt" />
              <el-option label="等于" value="eq" />
              <el-option label="大于等于" value="gte" />
              <el-option label="小于等于" value="lte" />
            </el-select>
          </template>
        </el-input>
      </div>
    </div>
    <el-button plain class="clear-search" @click="clear">重置</el-button>
    <el-button
      plain
      class="search-button"
      color="#fff"
      style="background-color: #409eff"
      @click="search"
      >查询</el-button
    >
  </div>
</template>
<style scoped>
.search {
  display: flex;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.158);
}

.search-select {
  display: flex;
  gap: 40px;
  width: 100%;
  height: 80px;
  margin-left: 30px;
}

.el-input {
  width: 220px;
}

.search-item {
  margin-top: 10px;
}

.clear-search {
  margin-left: 40px;
}

.clear-search,
.search-button {
  margin-top: 30px;
}

.search-button {
  margin-right: 20px;
}
</style>
