<script setup>
import { ref } from "vue";
import { usedataStore } from "../stores/data.js";
import { ArrowDown, ArrowUp } from "@element-plus/icons-vue";
const dataStore = usedataStore();
const searchForm = dataStore.searchForm;
const expanded = ref(false);
const emit = defineEmits(["alterPage"]);
const clear = () => {
  for (let key in searchForm) {
    searchForm[key] = "";
  }
  search();
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
    if (
      searchForm.description &&
      !item.description.includes(searchForm.description)
    ) {
      return false;
    }
    if (
      !checkPrice(item.stock, searchForm.stockRange, Number(searchForm.stock))
    ) {
      return false;
    }
    if (searchForm.created_at && item.created_at !== searchForm.created_at) {
      return false;
    }
    return true;
  });
  emit("alterPage", 1);
  dataStore.setFilteredProducts(result);
};
</script>
<template>
  <div class="search" :class="{ expanded: expanded }">
    <div class="search-content">
      <!-- 第一行：基础搜索项 -->
      <div class="search-row">
        <div class="search-item">
          <div>商品名称</div>
          <el-input
            v-model="searchForm.name"
            clearable
            placeholder="请输入"
            style="width: 200px"
          />
        </div>
        <div class="search-item">
          <div>商品分类</div>
          <el-select
            v-model="searchForm.category"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option label="无分类" value="0" />
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
            <template #prepend>
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
      <!-- 第二行：更多搜索项（展开时显示） -->
      <div class="search-row" v-show="expanded">
        <div class="search-item">
          <div>创建时间</div>
          <el-date-picker
            v-model="searchForm.created_at"
            type="date"
            placeholder="请选择"
            value-format="YYYY-MM-DD"
            style="width: 200px"
          />
        </div>
        <div class="search-item">
          <div>商品描述</div>
          <el-input
            v-model="searchForm.description"
            placeholder="请输入"
            style="width: 200px"
          />
        </div>
        <div class="search-item">
          <div>商品库存</div>
          <el-input v-model="searchForm.stock" clearable placeholder="请输入">
            <template #prepend>
              <el-select
                v-model="searchForm.stockRange"
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
    </div>
    <div class="search-btn">
      <div class="expand-btn" @click="expanded = !expanded">
        <span>{{ expanded ? "收起" : "展开" }}</span>
        <el-icon>
          <ArrowDown v-if="!expanded" />
          <ArrowUp v-else />
        </el-icon>
      </div>
      <div class="search-actions">
        <el-button plain @click="clear">重置</el-button>
        <el-button
          plain
          color="#fff"
          style="background-color: #409eff"
          @click="search"
          >查询</el-button
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.search {
  display: flex;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.158);
  transition: all 0.3s ease;
}

.search-content {
  flex: 1;
  margin-left: 30px;
}

.search-row {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.search-item {
  margin-top: 10px;
  margin-bottom: 10px;
}

.search-actions {
  display: flex;
  align-items: flex-start;
  margin-top: auto;
  margin-right: 20px;
  margin-left: 10px;
}

.search-btn {
  gap: 5px;
  display: flex;
  align-items: center;
  margin-top: auto;
  justify-content: center;
  margin-bottom: 10px;
}
.expand-btn {
  display: flex;
  cursor: pointer;
  color: #409eff;
  font-size: 14px;
}

.expand-btn:hover {
  color: #66b1ff;
}

.expand-btn .el-icon {
  margin-left: 4px;
}
</style>
