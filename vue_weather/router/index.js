import { createRouter, createWebHistory } from 'vue-router'


import HomePage from '../src/views/HomePage.vue'



const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  // เพิ่ม routes อื่นๆ ตามต้องการ
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router