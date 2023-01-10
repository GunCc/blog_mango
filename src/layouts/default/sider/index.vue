<template>
    <Sider class="mango-blog-sider">
        <div class="logo"></div>
        <Menu theme="dark" mode="inline" :selectedKeys="selectedKeys">
            <MenuItem key="1">
            <user-outlined />
            <span>nav 1</span>
            </MenuItem>
            <MenuItem key="3">
            <user-outlined />
            <span>nav 1</span>
            </MenuItem>
            <MenuItem key="2">
            <user-outlined />
            <span>nav 1</span>
            </MenuItem>
        </Menu>
    </Sider>
</template>
<script setup lang='ts'>
import { Layout, Menu, MenuItem } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
const Sider = Layout.Sider
const selectedKeys = ref<string[]>(['1', '2'])
</script>
<style lang='less' scoped>
.logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
}

.mango-blog-sider{
    min-height: 100vh;
    max-height: 100vh;
}
</style>