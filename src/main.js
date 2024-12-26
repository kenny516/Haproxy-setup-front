import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import FormServer from './views/FormServer.vue'
import ListServer from './views/ListServer.vue'
import Configuration from './views/Configuration.vue'
const routes = [
  { path: '/form-server', component: FormServer },
  { path: '/list-server', component: ListServer },
  { path: '/configuration', component: Configuration },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
