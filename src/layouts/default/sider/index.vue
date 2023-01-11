<template>
    <Sider class="mango-blog-sider">
        <div class="logo"></div>
        <SiderMenu />
    </Sider>
</template>
<script setup lang='ts'>
import { Layout } from 'ant-design-vue';
import SiderMenu from "../menu/index.vue"
const Sider = Layout.Sider

</script>
<style lang='less' scoped>
.logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
}

.mango-blog-sider {
    min-height: 100vh;
    max-height: 100vh;
}
</style>