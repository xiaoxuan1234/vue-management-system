<script setup>
import { ref, reactive } from "vue";
import { usedataStore } from "../stores/data.js";
import { ElMessage, ElMessageBox } from "element-plus";

const dataStore = usedataStore();
const dialog = ref(false);
const DeleteBox = ref(false);

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});

const addProductdata = reactive({
  name: "",
  price: null,
  stock: null,
  category_id: null,
  status: "",
  image: "",
  description: "",
});

const formRef = ref();
const rules = {
  name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
};
const addProduct = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      dataStore.addProduct({
        name: addProductdata.name,
        price: Number(addProductdata.price),
        stock: Number(addProductdata.stock),
        category_id: Number(addProductdata.category_id),
        status: Number(addProductdata.status),
        image: addProductdata.image,
        description: addProductdata.description,
      });
      hint("success", "新增商品成功");
      done();
    }
  });
};

const done = () => {
  dialog.value = false;
  resetForm();
};

const resetForm = () => {
  addProductdata.name = "";
  addProductdata.price = null;
  addProductdata.stock = null;
  addProductdata.category_id = null;
  addProductdata.status = "";
  addProductdata.image = "";
  addProductdata.description = "";
};

const dialoginit = () => {
  resetForm();
  formRef.value?.clearValidate();
};
const dialogClose = (closeFn) => {
  const hasContent = Object.values(addProductdata).some(
    (val) => val !== "" && val !== null
  );
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

const hint = (type, message) => {
  ElMessage({
    type: type,
    message: message,
    showClose: true,
  });
};

const handleCancel = () => {
  dialogClose(() => {
    dialog.value = false;
  });
};

const deleteProduct = () => {
  if (props.list.length <= 0) {
    hint("error", "未选中商品");
  } else {
    DeleteBox.value = true;
  }
};

const confirmDelete = () => {
  props.list.forEach((value) => {
    dataStore.delProduct(value);
  });
  hint("success", "删除商品成功");
  DeleteBox.value = false;
};

</script>
<template>
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
                maxlength="50"
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
                v-model="addProductdata.category_id"
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
              <el-input
                v-model="addProductdata.image"
                placeholder="请输入图片路径"
                style="width: 200px"
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
    <el-button plain class="del-product" @click="deleteProduct">删除</el-button>
    <el-dialog width="500" title="确认删除商品?" v-model="DeleteBox">
      <div style="display: flex; justify-content: flex-end; gap: 10px">
        <el-button plain @click="DeleteBox = false">取消</el-button>
        <el-button
          plain
          color="#fff"
          style="background-color: #409eff"
          @click="confirmDelete"
          >确认</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
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

</style>
