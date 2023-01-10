import type { AppRouteModule } from "@/router/types";
import { LAYOUT } from '@/router/constant';

const dashboard: AppRouteModule = {
    path: "/dashboard",
    name: "Dashboard",
    component: LAYOUT,
    redirect: '/dashboard/analysis',
    meta: {
        icon: "测试",
        title: "Dashboard"
    },
    children: [
        {
            path: "analysis",
            name: "Analysis",
            component: () => import("@/views/dashboard/analysis/index.vue"),
            meta: {
                title: "Analysis"
            }
        }
    ]
}

export default dashboard;