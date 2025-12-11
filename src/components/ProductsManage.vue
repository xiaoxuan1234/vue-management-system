<script setup>
import { ref, computed, reactive } from "vue";
import search from "./Productssearch.vue";
import { usedataStore } from "../stores/data.js";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";

const dataStore = usedataStore();
// 组件加载时同步filteredProducts
dataStore.syncFilteredProducts();

const currentPage = ref(1);
const pageSize = ref(10);
const dialog = ref(false);

const addProductdata = reactive({
  name: "",
  price: null,
  stock: null,
  category: "",
  status: "",
  img: "",
  description: "",
});

const formRef = ref();
const rules = {
  name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
};

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

// 每页条数改变
const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1;
};

const getCategoryName = (categoryId) => {
  const category = dataStore.categories.find((c) => c.id === categoryId);
  return category ? category.name : "无分类";
};
const addProduct = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      dataStore.addProduct({
        name: addProductdata.name,
        price: Number(addProductdata.price),
        stock: Number(addProductdata.stock),
        category_id: Number(addProductdata.category),
        status: Number(addProductdata.status),
        image: addProductdata.image,
        description: addProductdata.description,
      });
      successfully();
      done();
    }
  });
};

const done = () => {
  dialog.value = false;
  for (let key in addProductdata) {
    addProductdata[key] = "";
  }
};

const dialoginit = () => {
  for (let key in addProductdata) {
    addProductdata[key] = "";
  }
  formRef.value?.resetFields();
};

const dialogClose = (closeFn) => {
  const hasContent = Object.values(addProductdata).some((val) => val !== "");
  if (hasContent) {
    ElMessageBox.confirm("商品信息未保存，确定关闭吗？", "提示", {
      type: "warning",
      confirmButtonText: "确认",
      cancelButtonText: "取消",
    })
      .then(() => {
        done();
        if (closeFn) closeFn();
      })
      .catch(() => {});
  } else {
    if (closeFn) closeFn();
    else dialog.value = false;
  }
};

const successfully = () => {
  ElMessage({
    type: "success",
    message: "新增商品成功",
    showClose: true,
  });
};

const handleCancel = () => {
  dialogClose(() => {
    dialog.value = false;
  });
};
</script>
<template>
  <div class="body">
    <search />
    <div class="product-operation">
      <el-button
        plain
        class="add-product"
        color="#fff"
        style="background-color: #409eff; margin-right: 10px"
        @click="dialog = true"
        >新增</el-button
      >
      <el-dialog
        v-model="dialog"
        width="500"
        title="新增商品"
        @closed="dialoginit"
        :before-close="dialogClose"
      >
        <el-form :model="addProductdata" :rules="rules" ref="formRef">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="name">
                <div>商品名称</div>
                <el-input
                  v-model="addProductdata.name"
                  placeholder="请输入"
                  style="width: 200px"
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
                  v-model="addProductdata.price"
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
                  v-model="addProductdata.stock"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <div>商品分类</div>
                <el-select
                  style="width: 200px"
                  placeholder="请选择"
                  v-model="addProductdata.category"
                >
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
                  v-model="addProductdata.status"
                >
                  <el-option label="上架" :value="1" />
                  <el-option label="下架" :value="0" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <div>商品图片</div>
                <el-input v-model="addProductdata.img" placeholder="请输入" />
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
                    v-model="addProductdata.description"
                    maxlength="200"
                    show-word-limit
                    resize="vertical"
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
                @click="addProduct"
                >保存</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
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
          :show-overflow-tooltip="{
            popperClass: 'custom-tooltip',
          }"
        />
        <el-table-column
          prop="category_id"
          label="商品分类"
          min-width="150"
          align="center"
        >
          <template #default="{ row }">
            {{ getCategoryName(row.category_id) }}
          </template>
        </el-table-column>
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

.el-dialog {
  display: flex;
}

.el-input {
  width: 200px;
}
</style>
