import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const usedataStore = defineStore(
  "data",
  () => {
    //用户表
    const users = ref([
      {
        id: 0,
        username: "未登录",
        password: "",
        email: "",
        phone: "",
        Icon: "/img/icon/noLog.jpg",
        status: 0,
        created_at: "",
      },
      {
        id: 1,
        username: "小炫",
        password: "123456",
        email: "530141777@qq.com",
        phone: "13859237777",
        Icon: "/img/icon/001.jpg",
        status: 1,
        created_at: "2025-01-10",
      },
    ]);

    // 商品表 (status: 0下架 1上架)
    const products = ref([
      {
        id: 1,
        name: "小米17 Pro Max",
        description: "小米最新旗舰手机",
        price: 5799.0,
        stock: 999,
        category_id: 1,
        image: "/img/products/xiaomi.jpg",
        status: 1,
        created_at: "2025-01-10",
      },
      {
        id: 2,
        name: "小米17 Pro Max手机壳",
        description: "小米最新旗舰手机壳",
        price: 99.0,
        stock: 999,
        category_id: 2,
        image: "/img/products/xiaomi01.jpg",
        status: 1,
        created_at: "2025-01-10",
      },
    ]);

    //商品分类表
    const categories = ref([
      {
        id: 0,
        name: "无分类",
        parent_id: 0,
        sort: 0,
        status: 1,
      },
      {
        id: 1,
        name: "手机数码",
        parent_id: 0,
        sort: 1,
        status: 1,
      },
      {
        id: 2,
        name: "智能配件",
        parent_id: 0,
        sort: 2,
        status: 1,
      },
      {
        id: 3,
        name: "运动服饰",
        parent_id: 0,
        sort: 3,
        status: 1,
      },
    ]);

    // 订单表 (status: 0待付款 1已付款 2待发货, 3已发货, 4已完成 5已取消)
    const orders = ref([
      {
        id: 1,
        order_no: "20251209001",
        user_id: 1,
        total_amount: 9999.0,
        status: 1,
        receiver: "张三",
        phone: "13800001111",
        address: "福建省福州市xxx",
        remark: "尽快发货",
        paid_at: "2025-12-9 11:00:00",
        created_at: "2025-12-9 10:30:00",
      },
    ]);
    //商品详细表
    const orderItems = ref([
      {
        id: 1,
        order_id: 1,
        product_id: 1,
        product_name: "小米17 Pro Max",
        price: 8999.0,
        quantity: 1,
        subtotal: 5799.0,
      },
    ]);
    //默认标签选择
    const tab = ref([{ name: "home", title: "首页" }]);
    const selectedName = ref("home");

    //增加标签
    const tabAdd = (name, title) => {
      if (!tab.value.find((item) => item.name === name)) {
        tab.value.push({
          name: name,
          title: title,
        });
      }
      selectedName.value = name;
    };

    //当前用户ID
    const activeuserId = ref(1);

    //商品搜索项
    const searchForm = reactive({
      name: "",
      category: "",
      status: null,
      price: null,
      priceRange: "",
      created_at: "",
      description: "",
      stock: null,
      stockRange: "",
      image: "",
    });

    //过滤后的商品列表（用ref包装，方便整体替换）
    const filteredProducts = ref([...products.value]);

    // 同步filteredProducts
    const syncFilteredProducts = () => {
      filteredProducts.value = products.value.map((p) => ({ ...p }));
    };

    // 设置filteredProducts（搜索用）
    const setFilteredProducts = (data) => {
      filteredProducts.value = data;
    };

    //新增商品
    const addProduct = (product) => {
      const newId =
        products.value.length > 0
          ? Math.max(...products.value.map((p) => p.id)) + 1
          : 1;
      products.value.push({
        id: newId,
        ...product,
        created_at: new Date().toISOString().split("T")[0],
      });
      // 同步更新filteredProducts
      syncFilteredProducts();
    };

    //删除商品
    const delProduct = (id) => {
      const index = products.value.findIndex((value) => value.id == id);
      products.value.splice(index, 1);
      syncFilteredProducts();
    };

    const editProduct = (id, data) => {
      const index = products.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        products.value[index] = {
          ...products.value[index],
          ...data,
          created_at: new Date().toISOString().split("T")[0],
        };
      }
      syncFilteredProducts();
    };

    return {
      users,
      products,
      orders,
      orderItems,
      tabAdd,
      tab,
      selectedName,
      activeuserId,
      searchForm,
      filteredProducts,
      categories,
      addProduct,
      syncFilteredProducts,
      setFilteredProducts,
      delProduct,
      editProduct,
    };
  },
  {
    persist: {
      key: "data",
      storage: localStorage,
      pick: [
        "user",
        "products",
        "categories",
        "orders",
        "orderItems",
        "tab",
        "selectedName",
        "activeuserId",
      ],
      afterHydrate: (ctx) => {
        // 持久化数据恢复后同步filteredProducts
        ctx.store.syncFilteredProducts();
      },
    },
  }
);
