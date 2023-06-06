import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { setupStore } from "./store/index";
import router from "./router/router";

const app = createApp(App);

async function setupApp() {
  // 挂载vuex状态管理
  setupStore(app);
  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  // 挂载路由
  app.use(router);

  app.mount("#app");
}

setupApp();
