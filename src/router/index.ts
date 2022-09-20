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
    ],
  },
  {
    path: "/login",
    name: "登录",
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
