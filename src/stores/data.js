import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const usedataStore = defineStore(
  "data",
  () => {
    const web = reactive({
      title: "邓瑞编程",
      url: "dengruicode.com",
    });

    //定义一个响应式引用，存储用户数
    const users = ref(1000);

    //定义方法
    const userAdd = () => {
      users.value++;
    };

    return {
      web,
      users,
      userAdd,
    };
  },
  {
    persist: true,
  }
);
