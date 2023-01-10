// 用于页面的HOOK

import { PageEnum } from "@/enums/pageEnum";
import { useRouter, type RouteLocationRaw, type Router } from "vue-router";

export type PathAsPageEnum<T> = T extends { path: string } ? T & { path: PageEnum } : T
export type RouteLocationRawEx = PathAsPageEnum<RouteLocationRaw>

/**
 * @description:错误捕捉
 */
function handleError(e: Error) {
    console.error(e)
}

/**
 * @description:页面切换
 */
export function useGo(_router?: Router) {
    const { push, replace } = _router || useRouter();
    function go(opt: RouteLocationRawEx = PageEnum.BASE_HOME, isReplace = false) {
        if (!opt) return;
        isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
    }
    return go;
}