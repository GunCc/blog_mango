import type { LoginParams } from "@/api/sys/model/userModel";
import { PageEnum } from "@/enums/pageEnum";
import { router } from "@/router";
import type { ErrorMessageMode } from "@/types/axios";
import type { UserInfo } from "@/types/store";
import { defineStore } from "pinia";
import type { Nullable } from "vitest";
import type { RouteRecordRaw } from "vue-router";
import { usePermissionStore } from "./permission";

interface UserState {
    userInfo: Nullable<UserInfo>;
    token?: string;
}

export const useUserStore = defineStore({
    id: "app-user",
    state: (): UserState => ({
        userInfo: null,
        token: undefined
    }),
    getters: {
        // getUserInfo(): UserInfo {
        //     return this.userInfo || {}
        // },
        // getToken(): string {
        //     return this.token
        // }
    },
    actions: {
        /**
         * @description:登录
         */
        async login(
            params: LoginParams & {
                goHome?: boolean;
                mode?: ErrorMessageMode;
            }
        ) {
            const { goHome = true, mode, ...loginParams } = params;
            this.afterLoginAction(goHome)
        },
        /**
         * @description:登陆后的操作
         */
        async afterLoginAction(goHome?: boolean) {
            const permissionStore = usePermissionStore();
            const routes = await permissionStore.buildRoutesAction();
            routes.forEach((route) => {
                router.addRoute(route as unknown as RouteRecordRaw);
            });
            goHome && (await router.replace(PageEnum.BASE_HOME))
        }
    }
})