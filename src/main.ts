import 'normalize.css'
import '@/styles/base.css'
import 'virtual:svg-icons-register'
import 'ant-design-vue/dist/reset.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from '@/store/index'
import { initAppConfigStore } from './utils/initAppConfigStore';
import { setupGlobDirectives } from './directives';

const app = createApp(App)
// 初始化系统配置
app.use(store)
initAppConfigStore()
// 全局自定义指令
setupGlobDirectives(app)
app.use(router)
app.mount('#app')
