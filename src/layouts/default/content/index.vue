<template>
    <Content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <router-view></router-view>
        </div>
    </Content>
</template>
<script setup lang='ts'>
import { Layout } from 'ant-design-vue';
const Content = Layout.Content
</script>
<style lang='less' scoped>

</style>