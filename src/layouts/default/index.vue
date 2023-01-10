<template>
    <Layout>
        <LayoutSider />
        <Layout>
            <LayoutHeader />
            <LayoutContent />
            <LayoutFooter />
        </Layout>
    </Layout>
</template>
<script setup lang='ts'>
import LayoutHeader from "./header/index.vue"
import LayoutContent from "./content/index.vue"
import LayoutFooter from "./footer/index.vue"
import LayoutSider from "./sider/index.vue"
import { Layout } from "ant-design-vue"
</script>
<style lang='less' scoped>

</style>