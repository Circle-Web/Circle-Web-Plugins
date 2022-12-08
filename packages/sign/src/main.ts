import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import MyDialog from "./components/base/dialog/index";

import './assets/main.css'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(MyDialog)

app.mount('#app')
