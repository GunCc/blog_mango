import { LAYOUT } from "@/router/constant";
import type { AppRouteModule } from "@/router/types";

// 系统管理路由
const system: AppRouteModule = {
    path: "/sys",
    name: "Sys",
    component: LAYOUT,
    redirect: "/sys/account",
    meta: {
        title: "系统管理"
    },
    children: [
        {
            path: "account",
            name: "SysAccount",
            component: () => import("@/views/sys/account/index.vue"),
            meta: {
                title: "账号管理"
            }
        }
    ]
}

export default system