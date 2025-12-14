<script setup>
import { ref, computed, reactive } from "vue";
import search from "./Productssearch.vue";
import { usedataStore } from "../stores/data.js";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import ProductsOperation from "./ProductsOperation.vue";

const dataStore = usedataStore();
// 组件加载时同步filteredProducts
dataStore.syncFilteredProducts();

const currentPage = ref(1);
const pageSize = ref(15);
const editshow = ref(false);

// 计算当前页显示的数据（使用filteredProducts支持搜索）
const pagedData = computed(() => {
  const data = dataStore.filteredProducts;
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return data.slice(start, end);
});

// 总条数
const total = computed(() => dataStore.filteredProducts.length);

// 页码改变
const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleUpdate = (val) => {
  currentPage.value = val;
};

// 每页条数改变
const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1;
};

const getCategoryName = (categoryId) => {
  const category = dataStore.categories.find((c) => c.id === categoryId);
  return category ? category.name : "无分类";
};

const idArr = ref([]);
const selected = (data) => {
  idArr.value = data.map((item) => item.id);
};

const initialData = {
  id: null,
  name: "",
  price: null,
  stock: null,
  category_id: null,
  status: "",
  image: "",
  description: "",
};

const editProductdata = reactive({ ...initialData });
const originalData = reactive({ ...initialData });
const edit = (index, row) => {
  formRef.value?.clearValidate();
  Object.assign(originalData, initialData);
  Object.assign(editProductdata, initialData);
  editshow.value = true;
  Object.assign(originalData, row);
  Object.assign(editProductdata, row);
};

const dialogClose = (closeFn) => {
  const hasContent =
    JSON.stringify(editProductdata) !== JSON.stringify(originalData);
  if (hasContent) {
    ElMessageBox.confirm("编辑的商品信息未保存，确定关闭吗？", "提示", {
      type: "warning",
      confirmButtonText: "确认",
      cancelButtonText: "取消",
    })
      .then(() => {
        editshow.value = false;
        if (closeFn) closeFn();
      })
      .catch(() => {});
  } else {
    if (closeFn) closeFn();
    else editshow.value = false;
  }
};
const handleCancel = () => {
  dialogClose(() => {
    editshow.value = false;
  });
};

const hint = (type, message) => {
  ElMessage({
    type: type,
    message: message,
    showClose: true,
  });
};

const formRef = ref();
const rules = {
  name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
};
const editProduct = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      dataStore.editProduct(editProductdata.id, {
        name: editProductdata.name,
        price: Number(editProductdata.price),
        stock: Number(editProductdata.stock),
        category_id: Number(editProductdata.category_id),
        status: Number(editProductdata.status),
        image: editProductdata.image,
        description: editProductdata.description,
      });
      hint("success", "修改商品信息成功");
      editshow.value = false;
    }
  });
};
</script>
<template>
  <div class="body">
    <search @alterPage="handleUpdate" />
    <ProductsOperation :list="idArr" />
    <div class="table-container">
      <el-table
        :data="pagedData"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
        border
        height="100%"
        :scrollbar-always-on="true"
        @selection-change="selected"
      >
        <el-table-column
          type="selection"
          min-width="55"
          align="center"
          fixed
        ></el-table-column>
        <el-table-column
          prop="id"
          label="商品ID"
          min-width="100"
          align="center"
          sortable
        />
        <el-table-column
          prop="name"
          label="商品名称"
          min-width="240"
          show-overflow-tooltip
          sortable
        />
        <el-table-column
          prop="description"
          label="商品描述"
          min-width="250"
          sortable
          :show-overflow-tooltip="{
            popperClass: 'custom-tooltip',
          }"
        />
        <el-table-column
          prop="category_id"
          label="商品分类"
          min-width="150"
          align="center"
          sortable
        >
          <template #default="{ row }">
            {{ getCategoryName(row.category_id) }}
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品价格" min-width="150" sortable>
          <template #default="{ row }">
            {{ Number(row.price).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="stock"
          label="商品库存"
          min-width="140"
          sortable
        />
        <el-table-column
          prop="status"
          label="商品状态"
          min-width="110"
          align="center"
          sortable
        >
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? "上架" : "下架" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="image"
          label="商品图片"
          min-width="140"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="100"
          fixed="right"
          align="center"
        >
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="edit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        v-model="editshow"
        width="500"
        title="编辑商品信息"
        :before-close="dialogClose"
      >
        <el-form :model="editProductdata" :rules="rules" ref="formRef">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="name">
                <div>商品名称</div>
                <el-input
                  placeholder="请输入"
                  maxlength="50"
                  style="width: 200px"
                  v-model="editProductdata.name"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <div>商品价格</div>
                <el-input-number
                  :min="0"
                  style="width: 200px"
                  :max="9999999.99"
                  :precision="2"
                  v-model="editProductdata.price"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item>
                <div>商品库存</div>
                <el-input-number
                  :min="0"
                  style="width: 200px"
                  :max="99999"
                  v-model="editProductdata.stock"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <div>商品分类</div>
                <el-select
                  style="width: 200px"
                  placeholder="请选择"
                  v-model="editProductdata.category_id"
                >
                  <el-option label="无分类" :value="0" />
                  <el-option label="手机数码" :value="1" />
                  <el-option label="智能配件" :value="2" />
                  <el-option label="运动服饰" :value="3" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item>
                <div>商品状态</div>
                <el-select
                  style="width: 200px"
                  placeholder="请选择"
                  v-model="editProductdata.status"
                >
                  <el-option label="上架" :value="1" />
                  <el-option label="下架" :value="0" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <div>商品图片</div>
                <el-input
                  placeholder="请输入"
                  maxlength="50"
                  v-model="editProductdata.image"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item>
                <div>商品描述</div>
                <el-form-item>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 8 }"
                    placeholder="请填写内容"
                    style="width: 450px"
                    maxlength="200"
                    show-word-limit
                    resize="vertical"
                    v-model="editProductdata.description"
                  />
                </el-form-item>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" justify="end">
            <el-col :span="3.5">
              <el-button plain @click="handleCancel">取消</el-button>
            </el-col>
            <el-col :span="4">
              <el-button
                plain
                style="background-color: #409eff"
                color="#fff"
                @click="editProduct"
                >保存</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 15, 20, 50, 100]"
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

.el-dialog {
  display: flex;
}

.el-input {
  width: 200px;
}
</style>
