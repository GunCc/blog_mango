import type { App } from "vue";
import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import { basicRoutes } from "./routes";


// 创建一个路由示例
export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
})

// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router)
}