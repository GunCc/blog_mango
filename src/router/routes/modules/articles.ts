import { LAYOUT } from "@/router/constant";
import type { AppRouteModule } from "@/router/types";

// 文章管理
const article: AppRouteModule = {
    path: "/article",
    name: "Article",
    component: LAYOUT,
    redirect: "/article/articleType",
    meta: {
        title: "文章管理",
        icon: "a",
        orderNo:5,
    },
    children: [
        {
            path: "articleType",
            name: "ArticleType",
            component: () => import("@/views/article/type/index.vue"),
            meta: {
                title: "文章分类"
            }
        }
    ]
}

export default article