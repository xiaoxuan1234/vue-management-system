<script setup>
import { ref, computed } from "vue";
import search from "./Productssearch.vue";
import { usedataStore } from "../stores/data.js";

const dataStore = usedataStore();
const currentPage = ref(1);
const pageSize = ref(10);

// 计算当前页显示的数据
const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return dataStore.filteredProducts.slice(start, end);
});

// 总条数
const total = computed(() => dataStore.filteredProducts.length);

// 页码改变
const handlePageChange = (page) => {
  currentPage.value = page;
};

// 每页条数改变
const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1;
};
</script>
<template>
  <div class="body">
    <search />
    <div class="add-del">
      <el-button
        plain
        class="add-product"
        color="#fff"
        style="background-color: #409eff"
        >新增</el-button
      >
      <el-button plain class="del-product">删除</el-button>
    </div>
    <div class="table-container">
      <el-table
        :data="pagedData"
        :header-cell-style="{ textAlign: 'center' }"
        border
        height="100%"
        :scrollbar-always-on="true"
      >
        <el-table-column
          type="selection"
          min-width="55"
          align="center"
          fixed
        ></el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          min-width="100"
          align="center"
        />
        <el-table-column
          prop="name"
          label="商品名称"
          min-width="240"
          show-overflow-tooltip
        />
        <el-table-column
          prop="description"
          label="商品描述"
          min-width="250"
          show-overflow-tooltip
        />
        <el-table-column
          prop="category"
          label="商品分类"
          min-width="150"
          align="center"
        />
        <el-table-column prop="price" label="商品价格" min-width="150">
          <template #default="{ row }">
            ¥ {{ Number(row.price).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="商品库存" min-width="150" />
        <el-table-column
          prop="status"
          label="商品状态"
          min-width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? "上架" : "下架" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="100"
          fixed="right"
          align="center"
        >
          <template #default="scope">
            <el-button size="small" type="primary"> 编辑 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<style scoped>
.body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.add-product {
  margin-left: 30px;
}

.del-product,
.add-product {
  margin-top: 10px;
  margin-bottom: 10px;
}

.add-del {
  border-bottom: 1px solid rgba(0, 0, 0, 0.055);
}

.el-pagination {
  margin-top: 10px;
  margin-bottom: 10px;
}

.table-container {
  flex: 1;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

:deep(.el-table) {
  flex: 1;
}
</style>
