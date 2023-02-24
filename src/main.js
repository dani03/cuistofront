import "@/bootstrap.js";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ValidationError from "@/components/ValidationError.vue";
import IconSpinnerComponent from "@/components/IconSpinnerComponent.vue";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("ValidationError", ValidationError);
app.component("IconSpinnerComponent", IconSpinnerComponent);

app.mount("#app");
