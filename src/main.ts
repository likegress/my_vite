import { createApp } from 'vue'
import './assets/styles/style.css'
import App from './App.vue'
import router from "./router"
import ElmentPlus from "element-plus";
import "element-plus/dist/index.css";
const app = createApp(App)
app.use(router).use(ElmentPlus).mount("#app");
