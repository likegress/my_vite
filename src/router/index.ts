import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/Login",
  },
  {
    path: "/Login",
    name: "登录",
    component:()=> import("../components/layout/Login.vue")
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;