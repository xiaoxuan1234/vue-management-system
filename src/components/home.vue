<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { usedataStore } from "../stores/data.js";
import * as echarts from "echarts";
const REVENUE = ref(null);
let chart = null;

const dataStore = usedataStore();

// 窗口大小变化时重新调整图表
const handleResize = () => {
  chart?.resize();
};

onMounted(() => {
  nextTick(() => {
    chart = echarts.init(REVENUE.value);
    window.addEventListener("resize", handleResize);

    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line", // 显示垂直线
          lineStyle: {
            color: "#409eff",
            width: 1,
          },
        },
        formatter: "{b}: ￥{c}", // 格式化显示内容
      },
      title: {
        text: "销售额",
        subtext: "￥34,566",
        left: 20,
        textStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        subtextStyle: {
          color: "#000",
          fontSize: 24,
          fontWeight: "bold",
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "1 Dec",
          "2 Dec",
          "3 Dec",
          "4 Dec",
          "5 Dec",
          "6 Dec",
          "7 Dec",
          "8 Dec",
          "9 Dec",
          "10 Dec",
          "11 Dec",
          "12 Dec",
          "13 Dec",
          "14 Dec",
        ],
        axisLabel: {
          formatter: (value, index) => {
            if ((index + 1) % 2 === 0 && index !== 13) return value;
            return " ";
          },
        },
      },
      yAxis: {
        type: "value",
        show: false, // 隐藏 Y 轴
      },
      series: [
        {
          type: "line",
          smooth: true, // 平滑曲线
          data: [
            5000, 2000, 3000, 4000, 3301, 1201, 2801, 2001, 3001, 3322, 2501,
            4100, 5000, 1540,
          ],
          areaStyle: {
            color: "#40a0ff44", // 填充颜色（半透明绿色）
          },
          lineStyle: {
            color: "#409eff", // 线条颜色
            width: 2,
          },
          itemStyle: {
            color: "#409eff",
          },
          showSymbol: false, // 隐藏数据点
        },
      ],
      grid: {
        left: -40,
        right: 0,
        bottom: 30,
        top: 120,
        containLabel: true,
      },
    };

    chart.setOption(option);
  });
});

// 组件卸载时移除监听器和销毁图表
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  chart?.dispose();
});

const data = ref([
  {
    id: "ORD001",
    name: "张三",
    price: "￥299",
    status: 5,
    created_at: "10分钟前",
  },
  {
    id: "ORD002",
    name: "李四",
    price: "￥1580",
    status: 3,
    created_at: "25分钟前",
  },
  {
    id: "ORD003",
    name: "王五",
    price: "￥680",
    status: 0,
    created_at: "30分钟前",
  },
  {
    id: "ORD004",
    name: "赵六",
    price: "￥2100",
    status: 4,
    created_at: "1个小时前",
  },
  {
    id: "ORD005",
    name: "钱七",
    price: "￥450",
    status: 2,
    created_at: "1天前",
  },
]);

const startMap = {
  0: { text: "待付款", type: "warning" },
  1: { text: "已付款", type: "primary" },
  2: { text: "待发货", type: "info" },
  3: { text: "已发货", type: "primary" },
  4: { text: "已完成", type: "success" },
  5: { text: "已取消", type: "danger" },
};
const Addtag = (name, title) => {
  dataStore.selectedName = name;
  dataStore.tabAdd(name, title);
};
</script>
<template>
  <div class="data-all">
    <div class="block-data" @click="Addtag('users', '用户管理')">
      <svg
        t="1765688571878"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4667"
        width="35"
        height="35"
      >
        <path
          d="M515.541449 7.082899c-280.359429 0-508.458551 228.120391-508.458551 508.458551s228.120391 508.458551 508.458551 508.458551 508.458551-228.120391 508.458551-508.458551S795.900879 7.082899 515.541449 7.082899zM515.541449 981.864196c-257.132626 0-466.301477-209.190121-466.301477-466.322747 0-257.132626 209.168851-466.322747 466.301477-466.322747s466.301477 209.190121 466.301477 466.322747S772.674075 981.864196 515.541449 981.864196zM614.574414 524.177056 614.574414 524.177056c47.751075-31.96876 79.230625-86.398604 79.230625-148.187857 0-98.437405-79.804915-178.24232-178.24232-178.24232-98.437405 0-178.24232 79.804915-178.24232 178.24232 0 61.810523 31.479551 116.219097 79.251895 148.187857-100.266622 39.519598-171.244501 137.170014-171.244501 251.453545 0 0.23397 0 0.446669 0.02127 0.659369 0 0.04254-0.02127 0.10635-0.02127 0.14889 0 15.612155 12.65563 28.246516 28.267786 28.246516 15.590885 0 21.886796-12.63436 21.886796-28.246516 0-0.340319-0.08508-0.659369-0.10635-1.020958 0.10635-118.005774 102.159649-219.995264 220.207964-219.995264 118.112124 0 220.207964 102.095839 220.207964 220.207964 0 0.14889-1.467628 29.054774 21.971875 29.054774 15.505806 0 28.076356-12.57055 28.076356-28.055086 0-0.06381-0.02127-0.12762-0.02127-0.2127 0-0.25524 0.02127-0.510479 0.02127-0.786989C785.797645 661.34707 714.798496 563.696654 614.574414 524.177056zM515.541449 510.734437c-74.402343 0-134.723968-60.321625-134.723968-134.723968 0-74.423613 60.321625-134.723968 134.723968-134.723968 74.423613 0 134.723968 60.321625 134.723968 134.723968S589.943792 510.734437 515.541449 510.734437z"
          fill="#409eff"
          p-id="4668"
        ></path>
      </svg>
      <div>新增用户数</div>
      <div class="data">
        <span>166</span>
        <el-tag type="danger">-3%</el-tag>
      </div>
    </div>
    <div class="block-data" @click="Addtag('products', '商品管理')">
      <svg
        t="1765689987465"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6406"
        width="35"
        height="35"
      >
        <path
          d="M624.64 999.424c-8.192 0-16.384-1.536-24.064-4.608l-1.536 0.512-523.776-174.592-0.512-1.024c-27.136-9.216-47.104-33.792-50.176-62.464l-1.024-1.536V288.256l0.512-1.024c1.024-19.456 11.264-37.376 27.136-48.64l1.024-0.512 1.536-0.512c3.072-2.048 6.656-3.584 10.24-5.12l381.952-199.68H445.44c11.776-7.168 25.088-10.752 38.912-10.752 8.192 0 16.384 1.536 24.064 3.584h1.024l457.728 138.24 1.536 1.536c18.944 3.584 32.256 20.48 32.256 39.424V657.408l-1.536 3.072c-3.072 22.528-13.824 44.032-30.208 59.904l-1.024 1.536-294.4 257.024h-0.512c-13.312 13.312-30.72 20.48-48.64 20.48zM71.168 762.368l535.04 177.664V436.736L71.168 281.6v480.768z m583.68-336.896V931.84l297.472-269.824V234.496l-297.472 190.976z m-227.84 130.048c-2.048 0-4.096-0.512-6.144-1.024L227.328 496.64c-12.8-3.584-19.968-16.384-16.896-29.184 1.536-6.144 5.632-11.264 11.264-14.336 5.632-3.072 11.776-4.096 17.92-2.56l193.536 57.856c8.192 2.048 14.336 8.704 16.896 16.896s0 16.896-6.144 23.04c-4.096 4.608-10.24 7.168-16.896 7.168z m-307.2-308.224l500.736 138.24L752.64 300.544 288.256 160.256l-168.448 87.04z m219.136-113.152L797.184 271.36 921.6 190.976 478.208 62.464l-139.264 71.68z"
          fill="#1296db"
          p-id="6407"
        ></path>
      </svg>
      <div>商品总数</div>
      <div class="data">
        <span>1666</span>
        <el-tag type="success">+5%</el-tag>
      </div>
    </div>
    <div class="block-data" @click="Addtag('orders', '订单管理')">
      <svg
        t="1765689931438"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5302"
        width="35"
        height="35"
      >
        <path
          d="M654.336 215.04l-86.016 160.768c-23.552 43.008-36.864 72.704-41.984 86.016h-2.048C506.88 427.008 458.752 345.088 378.88 215.04h-81.92l166.912 261.12h-143.36v71.68h165.888v71.68H321.536v71.68h165.888V808.96h71.68V690.176h142.336v-71.68H559.104v-71.68h142.336v-71.68h-122.88L726.016 215.04h-71.68z"
          p-id="5303"
          fill="#409eff"
        ></path>
        <path
          d="M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0z m0 942.08C274.432 942.08 81.92 749.568 81.92 512S274.432 81.92 512 81.92s430.08 192.512 430.08 430.08-192.512 430.08-430.08 430.08z"
          p-id="5304"
          fill="#409eff"
        ></path>
      </svg>
      <div>销售额</div>
      <div class="data">
        <span>￥34566.00</span>
        <el-tag type="danger">-5%</el-tag>
      </div>
    </div>
    <div class="block-data" @click="Addtag('orders', '订单管理')">
      <svg
        t="1765690104676"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="7472"
        width="35"
        height="35"
      >
        <path
          d="M512 70.62069 847.54432 70.62069C847.498063 70.62069 847.448276 953.342411 847.448276 953.342411 847.448276 953.360154 176.507445 953.37931 176.507445 953.37931 176.567543 953.37931 176.551724 512 176.551724 512L176.507445 285.609913 344.275862 70.62069 512 70.62069ZM298.748398 13.631891 113.369088 251.976722C108.548308 258.174852 105.931034 265.802999 105.931034 273.655172L105.931034 512 105.931034 953.249898C105.931034 992.29071 137.488984 1024 176.507445 1024L847.49259 1024C886.455437 1024 918.068966 992.339421 918.068966 953.342411L918.068966 70.657589C918.068966 31.604962 886.53771 0 847.54432 0L512 0 326.62069 0C315.724253 0 305.438155 5.030765 298.748398 13.631891ZM662.068966 494.344828C681.570339 494.344828 697.37931 478.535839 697.37931 459.034483 697.37931 439.533127 681.570339 423.724138 662.068966 423.724138L361.931034 423.724138C342.429678 423.724138 326.62069 439.533127 326.62069 459.034483 326.62069 478.535839 342.429678 494.344828 361.931034 494.344828L662.068966 494.344828ZM723.862069 670.896552C743.363443 670.896552 759.172414 655.087563 759.172414 635.586207 759.172414 616.084851 743.363443 600.275862 723.862069 600.275862L300.137931 600.275862C280.636575 600.275862 264.827586 616.084851 264.827586 635.586207 264.827586 655.087563 280.636575 670.896552 300.137931 670.896552L723.862069 670.896552ZM317.793103 247.314167C317.793103 247.205835 176.507445 247.172414 176.507445 247.172414L176.507445 317.793103 317.798665 317.793103C356.768839 317.793103 388.413793 286.26944 388.413793 247.314167L388.413793 70.62069 317.793103 70.62069 317.793103 247.314167Z"
          fill="#409eff"
          p-id="7473"
        ></path>
      </svg>
      <div>订单数</div>
      <div class="data">
        <span>6666</span>
        <el-tag type="success">+11%</el-tag>
      </div>
    </div>
  </div>
  <div class="chart">
    <div ref="REVENUE" class="REVENUE"></div>
  </div>
  <div class="table-container">
    <el-table class="table" :data="data">
      <el-table-column prop="id" label="订单号" />
      <el-table-column prop="name" label="客户" />
      <el-table-column prop="price" label="总金额" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="startMap[row.status]?.type">{{
            startMap[row.status]?.text
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="时间" />
    </el-table>
  </div>
</template>
<style scoped>
.block-data {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  padding: 25px;
  border-left: 1px rgba(0, 0, 0, 0.205) solid;
}

.block-data:hover {
  background-color: #f8f5f5;
}

.block-data:first-child {
  border-left: none;
}

.data-all {
  flex: 1;
  display: flex;
  border-radius: 10px;
  margin: 20px;
  background-color: #fff;
  border: 1px rgba(0, 0, 0, 0.24) solid;
}

.data {
  display: flex;
  gap: 10px;
}

.chart {
  display: flex;
  margin: 20px;
  border-radius: 10px;
  background-color: #fff;
  height: 400px;
  border: 1px solid rgba(0, 0, 0, 0.233);
  overflow: hidden;
}

.REVENUE {
  height: 100%;
  width: 100%;
}

.table {
  margin-top: 30px;
}

.table-container {
  margin: 20px;
}

:deep(.el-table td),
:deep(.el-table th) {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.144);
  height: 50px;
}

:deep(.el-table__header) {
  border-radius: 10px;
  overflow: hidden;
  background-color: #f5f7fa;
  border: 1px solid rgba(0, 0, 0, 0.466);
  margin-bottom: 10px;
}

:deep(.el-table__header th) {
  background-color: #f5f7fa;
  color: #666;
  font-weight: normal;
}
</style>
