import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import { setupRouter } from "./router";


// 项目初始化
async function init() {
    const app = createApp(App);
    setupRouter(app);
    app.use(createPinia()).mount("#app");
}

init();