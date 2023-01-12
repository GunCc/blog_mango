<template>
    <div ref="wrapperRef">
        <!-- 内容区域 -->
        <div class="overflow-hidden" ref="contentRef">
            <slot></slot>
        </div>
    </div>
</template>
<script  lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "PageWrapper",
    // inheritAttrs: false 此作用域 与 props 将不绑定
    inheritAttrs: false
})
</script>
<style lang='less' scoped>

</style>