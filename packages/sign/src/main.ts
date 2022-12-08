import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import MyDialog from "./components/dialog/index";

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/main.css'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(MyDialog)

app.mount('#app')
