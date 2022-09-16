import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
    children: [],
  },
  {
    path: "/Login",
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