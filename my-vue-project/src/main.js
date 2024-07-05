import { createApp } from 'vue'
import App from './App.vue'

// Router
import router from './router'

// Tailwind
import './assets/tailwind.css'


createApp(App).use(router).mount('#app')
