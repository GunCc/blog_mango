import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupStore } from "./store";
import { setupElement } from "./plugin/element"

const app = createApp(App)

setupStore(app);
setupElement(app);

app.use(router).mount("#app");
