import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const usedataStore = defineStore(
  "data",
  () => {
    //用户表
    const user = reactive([
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
    const products = reactive([
      {
        id: 1,
        name: "小米17 Pro Max",
        description: "小米最新旗舰手机",
        price: 5799.0,
        stock: 999,
        category: "手机数码",
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
        category: "智能配件",
        category_id: 2,
        image: "/img/products/xiaomi01.jpg",
        status: 1,
        created_at: "2025-01-10",
      },
    ]);

    //商品分类表
    const categories = reactive([
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

    // 订单表 (status: 0待付款 1已付款 2已发货 3已完成 4已取消)
    const orders = reactive([
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
    const orderItems = reactive([
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
    const tab = reactive([{ name: "products", title: "商品管理" }]);
    const selectedName = ref("products");

    //增加标签
    const tabAdd = (name, title) => {
      if (!tab.find((item) => item.name === name)) {
        tab.push({
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
      status: "",
      price: "",
      priceRange: "",
    });

    //过滤后的商品列表
    const filteredProducts = reactive([...products]);

    return {
      user,
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
    };
  },
  {
    persist: true,
  }
);
