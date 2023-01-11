<template>
    <div>
        <RouterView />
    </div>
</template>
<script setup lang='ts'>
import { useUserStore } from './stores/modules/user';

const userStore = useUserStore();
userStore.login({
    username: "123",
    password: "123",
    captcha: ''
});
</script>
<style lang='less' scoped>

</style>