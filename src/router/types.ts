import type { RoleEnum } from "@/enums/roleEnum";
import exp from "constants";
import type { Component } from "vue";
import type { RouteMeta, RouteRecordRaw } from "vue-router";


// 路由接口
// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
    name: string;
    meta: RouteMeta;
    component?: Component | string;
    components?: Component;
    children?: AppRouteRecordRaw[];
    props?: Recordable;
    fullPath?: string;
}


// 菜单接口
export interface Menu {
    name: string;

    icon?: string;

    path: string;

    // 路径包含参数，自动赋值
    paramPath?: string;

    disabled?: boolean;

    children?: Menu[];

    orderNo?: number;

    roles?: RoleEnum[];

    meta?:Partial<RouteMeta>;

    // tag:MenuTag;

    hideMenu?:boolean;
}
export type AppRouteModule = AppRouteRecordRaw;