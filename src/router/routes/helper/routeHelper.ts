import type { AppRouteModule, AppRouteRecordRaw } from "@/router/types";
import { cloneDeep, omit } from "lodash-es"
import { createRouter, createWebHistory, type Router, type RouteRecordNormalized } from "vue-router";

/**
 * 将多级路由转换为 2 级路由
 */
export function flatMultiLevelRoutes(
    routeModules: AppRouteModule[]
) {
    const modules: AppRouteModule[] = cloneDeep(routeModules);
    for (let i = 0; i < modules.length; i++) {
        const routeModule = modules[i];
        // 判断是否为多级
        if (!isMultipleRoute(routeModule)) {
            // 声明终止当前循环，即跳过此次，进行下一轮
            continue;
        }
        // 路由提升
        promoteRouteLevel(routeModule)
    }
    return modules;
}

/**
 * @description：判断是否超过两级
 */
function isMultipleRoute(
    routeModule: AppRouteModule
) {
    // Reflect.has 与 in 操作符相同，用于检查一个对象（包括他的原型链）是否包含某个属性
    if (!routeModule || !Reflect.has(routeModule, "children") || !routeModule.children?.length) {
        return false;
    }
    const children = routeModule.children;
    let flag = false;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.children?.length) {
            flag = true;
            break
        }
    }
    return flag;
}

/**
 * @description: 路由提升
 */

function promoteRouteLevel(routeModule: AppRouteModule) {
    // 使用vue-router 拼接菜单
    // createRouter创建一个可以被Vue应用程序使用的路由实例
    let router: Router | null = createRouter({
        routes: [routeModule as unknown as RouteRecordNormalized],
        history: createWebHistory(),
    })
    // 获取所有的路有记录的完整列表
    const routes = router.getRoutes();
    // 将所有子路由添加到二级路由
    addToChildren(routes, routeModule.children || [], routeModule)
    router = null;
    // omit lodash 的函数 对传入的item对象的children进行删除
    routeModule.children = routeModule.children?.map(
        (item) =>
            omit(item, 'children')
    )
}

/**
 * 将所有子路由添加到二级路由
 */
function addToChildren(
    routes: RouteRecordNormalized[],
    children: AppRouteRecordRaw[],
    routeModule: AppRouteModule,
) {
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const route = routes.find(item => item.name == child.name);
        if (!route) continue;
        routeModule.children = routeModule.children || [];
        if (!routeModule.children.find(item => item.name === route.name)) {
            routeModule.children?.push(route as unknown as AppRouteModule)
        }
        if (child.children?.length) {
            addToChildren(routes, child.children, routeModule)
        }
    }
}