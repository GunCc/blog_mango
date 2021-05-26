import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Layout from '@/layout/Main/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
  },
  {
    path: "/Layout",
    name: "Layout",
    component: Layout
  },
];



const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 删除/重置路由
export function resetRoute(): void {
  router.getRoutes().forEach(route => {
    const { name } = route
    if (name) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router;
