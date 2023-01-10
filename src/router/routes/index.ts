import { PageEnum } from "@/enums/pageEnum";
import { createRouter, createWebHistory } from "vue-router";
import type { AppRouteModule, AppRouteRecordRaw } from "../types";

// 获取 modules下所有路由
const modules = import.meta.glob("./modules/**/*.ts", { eager: true })
const routeModuleList: AppRouteModule[] = [];

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
    // @ts-ignore
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
})

// 异步路由
export const asyncRoutes = [...routeModuleList]

// 根路由
export const RootRoute: AppRouteRecordRaw = {
    path: "/",
    name: "Root",
    redirect: PageEnum.BASE_HOME,
    meta: {
        title: "Root",
    }
}

// 登录路由
export const LoginRoute: AppRouteRecordRaw = {
    path: "/login",
    name: "Login",
    component: () => import("@/views/sys/login/Login.vue"),
    meta: {
        title: "登录"
    }
}

export const basicRoutes = [
    LoginRoute,
    RootRoute,
    ...asyncRoutes
]