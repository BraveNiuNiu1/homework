import { createApp } from 'vue'
import router from './router/index'
// import './style.css'
// pinia相当于Vuex
import pinia from './stores'
import App from './App.vue'
import './assets/base.sass'
// import { useActiveElement } from '@vueuse/core'

// 导入loading组件
import Loading from './components/Loading.vue';

const app = createApp(App)
// 定义全局组件
app.component('Loading', Loading)

// new Vue({rotuer})
createApp(App).use(router).use(pinia).mount('#app')
