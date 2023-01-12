<template>
    <Menu theme="dark" mode="inline" :defaultSelectedKeys="defaultSelectedKeys" :selectedKeys="selectedKeys"
        :openKeys="openKeys" @click="handleMenuClick">
        <SubMenu v-for="menu in menus" :key="menu.path">
            <template #icon>
                <AppstoreOutlined />
            </template>
            <template #title>{{ menu.name }}</template>
            <MenuItem :key="item.path" v-for="item in menu.children">
            {{ item.name }}
            </MenuItem>
        </SubMenu>
    </Menu>
</template>
<script setup lang='ts'>
import { Menu, MenuItem, SubMenu } from 'ant-design-vue';
import { AppstoreOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAllParentPath } from "@/router/helper/menuHelper"
import { usePermissionStore } from '@/stores/modules/permission';
import type { Menu as MenuType } from '@/router/types';
import type { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';
import { useGo } from '@/hooks/web/usePage';
const { currentRoute } = useRouter();

let go = useGo()


// 当前选中的菜单项 key 数组
const selectedKeys = ref<string[]>([])
// 默认选中的列表
const defaultSelectedKeys = ref<string[]>([])
// 	当前展开的 SubMenu 菜单项 key 数组
const openKeys = ref<string[]>([])

// 菜单
const PermssionStore = usePermissionStore();
let menus = ref<MenuType[]>([]);
menus.value = PermssionStore.getFrontMenuList

// 修改OpenKeys
async function setOpenKeys(path: string) {
    openKeys.value = getAllParentPath(menus.value, path)
}
// 菜单点击
function handleMenuClick({ key }: { key: string, keyPath: string[] }) {
    go(key)
    selectedKeys.value = [key]
}
setTimeout(() => {
    setOpenKeys(currentRoute.value.path);
    selectedKeys.value = [currentRoute.value.path]
}, 1000)
</script>
<style lang='less' scoped>

</style>