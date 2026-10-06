import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { queryClient } from "@/infrastructure/query-client.ts";

const app = createApp(App);

app.use(VueQueryPlugin, {
  queryClient,
});

app.use(router);

app.mount("#app");
