import { createRouter, createWebHistory } from 'vue-router'
import HomeVue from '@/views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:city?',
            name: 'Home',
            component: HomeVue,
        },
    ],
})

export default router
