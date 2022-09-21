import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import UserLayout from "@/components/layout/UserLayout.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: UserLayout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/Home.vue"),
        meta: {
          title: "首页",
          icon: "",
        },
      },
      {
        path: "goods",
        name: "goods",
        component: () => import("@/views/goods/index.vue"),
        meta: {
          title: "商品列表",
          icon: "",
        },
      },
      {
        path: "cart",
        name: "cart",
        component: () => import("@/views/cart/index.vue"),
        meta: {
          title: "购物车",
          icon: "",
        },
      },
      {
        path: "order",
        name: "order",
        component: () => import("@/views/order/index.vue"),
        meta: {
          title: "订单列表",
          icon: "",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("../views/exception/PageNotFount.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
