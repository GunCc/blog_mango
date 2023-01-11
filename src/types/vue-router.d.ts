export { };
// 重写vue-router中的 RouteMeta
declare module 'vue-router' {
    interface RouteMeta extends Record<string | number | symbol, unknown> {
        // 标题
        title: string;
        // 是否隐藏
        hideMenu?: boolean;
        // 角色
        roles?: RoleEnum[];
        // 隐藏子菜单
        hideChildrenInMenu?: boolean;
        // 是否是单级菜单
        single?: boolean;
        // 对于children 是否隐藏 url
        hidePathForChildren?: boolean;
        // 仅为菜单生成 忽略路由
        ignoreRoute?: boolean;
        // 排序值
        orderNo?: number
    }
}