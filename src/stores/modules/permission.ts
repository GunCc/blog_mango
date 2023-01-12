import { RoleEnum } from "@/enums/roleEnum";
import { asyncRoutes } from "@/router/routes";
import { transformRouteMenu } from "@/router/helper/menuHelper";
import { flatMultiLevelRoutes } from "@/router/helper/routeHelper";
import type { AppRouteRecordRaw, Menu } from "@/router/types";
import { filter } from "@/utils/helper/treeHelper";
import { defineStore } from "pinia";

interface PermissionState {
    frontMenuList: Menu[];
}

export const usePermissionStore = defineStore({
    id: "app-permission",
    state: (): PermissionState => ({
        // 菜单列表
        frontMenuList: []
    }),
    getters: {
        getFrontMenuList(): Menu[] {
            return this.frontMenuList;
        }
    },
    actions: {
        setFrontMenuList(list: Menu[]) {
            this.frontMenuList = list
        },
        async buildRoutesAction() {
            // 路由过滤器 在 函数filter 作为回调传入遍历使用
            const roleList: any[] = [RoleEnum.TEST]
            let routes: AppRouteRecordRaw[] = []
            const routeFilter = (route: AppRouteRecordRaw) => {

                const { meta } = route;
                // 抽出角色
                const { roles = [RoleEnum.TEST] } = meta || {};
                // 进行角色判断
                return roleList.some((role) => roles.includes(role))
            }

            const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
                const { meta } = route;
                const { ignoreRoute } = meta || {}
                return !ignoreRoute
            }
            switch (import.meta.env.MODE) {
                // 开发环境
                case "development":
                    // 对非一级路由进行过滤
                    routes = filter(asyncRoutes, routeFilter)
                    // 对一级路由根据权限过滤
                    routes = routes.filter(routeFilter)
                    // 将路由转换成菜单
                    const menuList = transformRouteMenu(routes);
                    // 移除掉 ignoreRoute:true 的路由 非一级路由
                    routes = filter(routes, routeRemoveIgnoreFilter);
                    // 移除掉 ignoreRoute:true 的路由 一级路由
                    routes = routes.filter(routeRemoveIgnoreFilter)
                    // 菜单排序
                    menuList.sort((a, b) => {
                        return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
                    })
                    // 设置菜单列表
                    this.setFrontMenuList(menuList)
                    // 将多级路由转换为2级路由
                    routes = flatMultiLevelRoutes(routes)
                    break;
            }

            return routes;
        }
    }
})