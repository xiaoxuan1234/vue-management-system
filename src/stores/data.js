import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const usedataStore = defineStore(
  "data",
  () => {
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
        image: "/img/products/xiaomi.jpg",
        status: 1,
        created_at: "2025-01-10",
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

    const tab = reactive([{ name: "products", title: "商品管理" }]);
    const selectedName = ref("products");

    const tabAdd = (name, title) => {
      if (!tab.find((item) => item.name === name)) {
        tab.push({
          name: name,
          title: title,
        });
      }
      selectedName.value = name;
    };

    const activeuserId = ref(1);

    return {
      user,
      products,
      orders,
      orderItems,
      tabAdd,
      tab,
      selectedName,
      activeuserId,
    };
  },
  {
    persist: true,
  }
);
