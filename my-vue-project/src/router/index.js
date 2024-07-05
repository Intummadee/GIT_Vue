import { createRouter, createWebHistory } from 'vue-router'
import SiteNavigation from '../components/SiteNavigation.vue'


const routes = [
  {
    path: '/',
    name: 'SiteNavigation',
    component: SiteNavigation
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
