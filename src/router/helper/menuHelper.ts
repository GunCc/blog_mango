import type { AppRouteModule, AppRouteRecordRaw, Menu } from "@/router/types";
import { findPath, treeMap } from "@/utils/helper/treeHelper";
import { isUrl } from "@/utils/is";
import { cloneDeep } from "lodash";

/**
 * @description：获取目前路由的完整路径
 */
export function getAllParentPath<T = Recordable>(
    treeData: T[],
    path: string
) {
    const menuList = findPath(treeData, (n) => n.path === path) as AppRouteRecordRaw[]
    return (menuList || []).map((item) => item.path)
}

/**
 * @description:将路由转换成菜单
 * @param routeModList 转换的路由
 * @param routerMapping 是否遍历修改
 */

export function transformRouteMenu(routeModList: AppRouteModule[], routerMapping = false) {
    // 深拷贝
    const cloneRouteModList = cloneDeep(routeModList);
    const routeList: AppRouteRecordRaw[] = [];

    // 对路由项进行修改
    cloneRouteModList.forEach((item) => {
        if (routerMapping && item.meta.hideChildrenInMenu && typeof item.redirect === 'string') {
            item.path = item.redirect
        }
        if (item.meta?.single) {
            const realItem = item?.children?.[0];
            realItem && routeList.push(realItem)
        } else {
            routeList.push(item)
        }
    })
    // 提取树指定结构
    const list = treeMap(routeList, {
        conversion: (node: AppRouteRecordRaw) => {
            const { meta: { title, hideMenu = false } = {} } = node;
            return {
                ...(node.meta || {}),
                meta: node.meta,
                name: title,
                hideMenu,
                path: node.path,
                ...(node.redirect ? { redirect: node.redirect } : {})
            }
        }
    });
    // 路径处理
    joinParentPath(list);
    return cloneDeep(list)
}

/**
 * @description：路径处理
 */
function joinParentPath(
    menus: Menu[],
    parentPath = ''
) {
    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        // 如果以 / 开头会被视为根路径
        // 这允许你利用组件嵌套，而无需使用嵌套 URL
        if (!(menu.path.startsWith("/") || isUrl(menu.path))) {
            // 路径不以 / 开头，也不是 url，加入父路径
            menu.path = `${parentPath}/${menu.path}`
        }
        if (menu?.children?.length) {
            joinParentPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path)
        }
    }
}