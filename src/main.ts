import 'virtual:windi.css'
import '@/design/index.less';
import('ant-design-vue/es/style');

import { createApp } from "vue";
import { createPinia } from "pinia";
import { setupRouter } from "./router";

import App from "./App.vue";

// 项目初始化
async function init() {
    const app = createApp(App);

    setupRouter(app);
    
    app.use(createPinia()).mount("#app");
}

init();