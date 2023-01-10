import { PageEnum } from "@/enums/pageEnum";
import { createRouter, createWebHistory } from "vue-router";
import type { AppRouteRecordRaw } from "../types";

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
    RootRoute
]