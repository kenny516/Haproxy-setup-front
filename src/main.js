import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import FormServer from './views/FormServer.vue'
import ListServer from './views/ListServer.vue'
const routes = [
  { path: '/form-server', component: FormServer },
  { path: '/list-server', component: ListServer },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
